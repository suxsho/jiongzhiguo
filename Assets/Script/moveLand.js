#pragma strict
//可移动的平台

var moveSpeedX : float = 20.0;		//移动速度
var moveSpeedY : float = 20.0;		//移动速度

var moveRange : float = 5.0;		//移动范围



var homePoint : Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var moveDirection : int;			//定义左右移动的方向，如果是负的则把这个设置成1
private var gravity : float = 20.0;				//重力
private var myTransform : Vector3;				//记录位置
//private var controller : CharacterController;	//加载角色控制器
private var chkVel: Vector3 = Vector3.zero; 	//检查的位

static var chk: boolean = false; 	//检查的位
private var moveChk: boolean = false; 	//moveland自检
var playerMove = true;					//让角色跟随地面移动

var roundMode : boolean = false;        //旋转模式（移动块会按照方形旋转）



function Start () 
{
	myTransform = transform.position;							
	//linkToPlayerProperties = GetComponent (playerProperties);
	//controller = GetComponent (CharacterController);			//加载角色控制器
	//aniPlay = GetComponent (aniSprite);

	homePoint = transform.position;	

	if(roundMode)
	    moveDirection = 11;
}

function Update () 
{
		/**移动功能*/	
		if (moveDirection == 0)
		{
			velocity.x = moveSpeedX;	
			velocity.y = moveSpeedY;				
		}	
		if (moveDirection == 1)
		{
			velocity.x = -moveSpeedX;	
			velocity.y = -moveSpeedY;				
		}	

		if (moveDirection == 11)
		{
		    velocity.x = moveSpeedX;	
		    velocity.y = 0;				
		}	
		if (moveDirection == 12)
		{
		    velocity.x = 0;	
		    velocity.y = moveSpeedY;				
		}	
		if (moveDirection == 13)
		{
		    velocity.x = -moveSpeedX;	
		    velocity.y = 0;				
		}	
		if (moveDirection == 14)
		{
		    velocity.x = 0;	
		    velocity.y = -moveSpeedY;				
		}	
		
    /**平台运动翻转功能*/
		if(!roundMode)
		{
		    if (homePoint.x - transform.position.x < -moveRange || homePoint.y - transform.position.y < -moveRange)
		    {
		        moveDirection = 1;
		    }	
		    if (homePoint.x - transform.position.x > moveRange || homePoint.y - transform.position.y > moveRange)
		    {
		        moveDirection = 0;
		    }
		}
		else
		{
		    if (homePoint.x - transform.position.x < -moveRange && moveDirection == 11)
		        moveDirection = 12;
		    if (homePoint.y - transform.position.y < -moveRange && moveDirection == 12)
		        moveDirection = 13;
		    if (homePoint.x - transform.position.x > moveRange && moveDirection == 13)
		        moveDirection = 14;
		    if (homePoint.y - transform.position.y > moveRange && moveDirection == 14)
		        moveDirection = 11;
		}

		
		if(moveChk && chk && playerMove)
		{
            playerControls.drag = velocity;
            bigPlayerControl.drag = velocity;
		}

	//velocity.y -= gravity * Time.deltaTime;   //重力
	transform.Translate(velocity * Time.deltaTime);
	
	//print("velocity:" + velocity);
	//print(chkVel);	

		
	
}
/**判断角色碰撞更改速度*/
function OnTriggerEnter (other : Collider)
{
    if (other.tag == "Player")
    {
		moveChk = true;
	}
}
function OnTriggerExit (other : Collider)
{
	//if (other.tag == "Player")
		moveChk = false;		//不允许进行滑块检测

}
