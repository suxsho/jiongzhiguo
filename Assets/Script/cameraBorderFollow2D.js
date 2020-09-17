#pragma strict
/** 滑动摄像机 */

var cameraTarget 			: GameObject;					//拖入摄像机跟随
var player 					: GameObject;					//拖入放入角色脚本的组件

var cameraHight 			: float 			= 0.0;		//摄像机高度定义
var smoothTime 				: float 			= 0.2;		//浮动时间

var borderX 				: float 			= 2.0;		//左边距离
var borderY 				: float 			= 2.0;		//右边距离

private var velocity 		: Vector2;						//定义运动速度

private var moveScreenRight : boolean 			= false;	//是否开启右侧屏幕切换模式
private var moveScreenLeft 	: boolean 			= false;	//是否开启左侧屏幕切换模式

function Start () 
{
	cameraHight = GetComponent.<Camera>().transform.position.y;				//定义摄像机高度
}

function Update () 
{
	var moveDir = player.GetComponent(playerControls);		//调用player的脚本
	
	/** 右边滑动判定 */
	
	if (cameraTarget.transform.position.x > GetComponent.<Camera>().transform.position.x + borderX && moveDir.moveDirection == 1)
	{
		moveScreenRight = true;
	}
	
	if (moveScreenRight)
	{
		GetComponent.<Camera>().transform.position.x = Mathf.SmoothDamp(GetComponent.<Camera>().transform.position.x , GetComponent.<Camera>().transform.position.x + borderX, velocity.y , smoothTime );
	}
	
	if (cameraTarget.transform.position.x < GetComponent.<Camera>().transform.position.x - borderX && moveDir.moveDirection == 1)
	{
		moveScreenRight = false;
	}
	
	/** 左边滑动判定 */
	
	if (cameraTarget.transform.position.x < GetComponent.<Camera>().transform.position.x - borderX && moveDir.moveDirection == 0)
	{
		moveScreenLeft = true;
	}
	
	if (moveScreenLeft)
	{
		GetComponent.<Camera>().transform.position.x = Mathf.SmoothDamp(GetComponent.<Camera>().transform.position.x , GetComponent.<Camera>().transform.position.x - borderX, velocity.y , smoothTime );
	}
	
	if (cameraTarget.transform.position.x > GetComponent.<Camera>().transform.position.x + borderX && moveDir.moveDirection == 0)
	{
		moveScreenLeft = false;
	}
	
	/** 摄像机高度确定 */
	
	GetComponent.<Camera>().transform.position.y = cameraHight;
}