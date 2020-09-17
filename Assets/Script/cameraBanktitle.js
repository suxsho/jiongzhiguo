#pragma strict
/** 背景摄像机 */

var cameraTarget			: GameObject;				//摄像机跟随目标				
var player 					: GameObject;				//调用player数据所需要的字段，把player拉过来就可以了

var smoothTime 				: float = 0.1;				//跟随的缓冲时间
var cameraFollowX 			: boolean = true;			//摄像机X方向跟随是否开启
var cameraFollowY 			: boolean = true;			//摄像机Y方向跟随是否开启
var cameraFollowHeight 		: boolean = false;			//摄像机在屏幕所处高度判定（去掉Y方向跟随的时候用）
var cameraHight 			: float = 2.5;				//定义屏幕高度的具体值
var cameraZoom 				: boolean = false;			//摄像机缩放功能是否开启
var cameraZoomMax 			: float = 4.0;				//摄像机缩放最大
var cameraZoomMin 			: float = 2.6;				//摄像机缩放最小
var cameraZoomTime 			: float = 0.03;				//缩放的缓冲时间
var velocity 				: Vector2;					//定义摄像机的位置，与移动有关系

var bankSp					:float = 0.5;				//背景移动速度

var cameraMax				: float;					//摄像机最大的位置

private var thisTransform : Transform;					//定义摄像机移动相关的属性
private var curPos : float = 0.0;						//确定角色Y所在的位置
private var playerJumpHight = 0.0;						//对角色高度进行判定


/** 设置位置 */

function Start () 
{
	var gameConfig = gameObject.GetComponent("gameConfig");
	thisTransform = transform;
	IOSscreen();
}

//IOS 分辨率
function IOSscreen()
{
	if(gameConfig.plantform == "ipad")
	{
		cameraZoomMin = 12;
		this.GetComponent.<Camera>().orthographicSize = 12;
	}	
}

function Update () 
{
	/** 给摄像机增加左右移动可确定位置的功能 */
	if (cameraFollowX)
	{
		thisTransform.position.x = Mathf.SmoothDamp (thisTransform.position.x, cameraTarget.transform.position.x / bankSp,velocity.x,smoothTime);
	}
	
	if (cameraFollowY)
	{
		thisTransform.position.y = Mathf.SmoothDamp (thisTransform.position.y, cameraTarget.transform.position.y / bankSp,velocity.y,smoothTime);
	}
	
	if (!cameraFollowY && cameraFollowHeight)
	{
		GetComponent.<Camera>().transform.position.y = cameraHight;
	}
	
	var playerControl = player.GetComponent(playerControls);
	
	/** 有关于摄像机缩放功能的内容 */
	
	if (cameraZoom)
	{
		curPos = player.transform.position.y;
		
		playerJumpHight = curPos - 6;
		
		/*if (playerJumpHight < 0)
		{
			playerJumpHight *= -1;
		}*/
		
		if (playerJumpHight < 0)
		{
			playerJumpHight = 0;
		}
		
		if (playerJumpHight > cameraZoomMax)
		{
			playerJumpHight = cameraZoomMax;
		}
		
		this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,playerJumpHight + cameraZoomMin, Time.time * cameraZoomTime);
	}
	
	/** 不允许摄像机坐标小于0 */
	
	if(transform.position.x <= 0)
	transform.position.x = 0;
	
	/** 不允许摄像机坐标大于最右 */
	
	if(transform.position.x >= cameraMax / bankSp)
	transform.position.x = cameraMax / bankSp;

}