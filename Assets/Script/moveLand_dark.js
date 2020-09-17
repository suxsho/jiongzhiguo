#pragma strict
//黑暗移动平台

var moveSpeedX : float = 20.0;		//移动速度
var moveSpeedY : float = 20.0;		//移动速度

var moveRange : float = 5.0;		//移动范围



var homePoint : Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var moveDirection : int;			//定义左右移动的方向，如果是负的则把这个设置成1
private var gravity : float = 20.0;				//重力
private var myTransform : Vector3;				//记录位置
//private var controller : CharacterController;	//加载角色控制器

private var moveChk: boolean = false; 	//moveland自检

var playerMove = true;					//让角色跟随地面移动

function Start () 
{
	myTransform = transform.position;							
	//linkToPlayerProperties = GetComponent (playerProperties);
	//controller = GetComponent (CharacterController);			//加载角色控制器
	//aniPlay = GetComponent (aniSprite);

	homePoint = transform.position;	
}
function LateUpdate () 
{
    /*角色死亡返回*/
    if (playerconfig.dead)
    {
        transform.position  =  homePoint;
        velocity.x = 0;
        velocity.y = 0;
    }
}

function Update () 
{




	//velocity.y -= gravity * Time.deltaTime;   //重力
	transform.Translate(velocity * Time.deltaTime);
	
	//print("velocity:" + velocity);
	//print(chkVel);	
	/*让滑块停下来*/
	if(transform.position.x - homePoint.x >= moveRange)
	{
		velocity.x = 0;
	}

	if(playerMove && moveChk)
	{
	    playerControls.drag = velocity;
	}
		


	
}
/**判断角色碰撞更改速度*/
function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Player")
	{
	    velocity.x = moveSpeedX;
	    moveChk = true;
	}
}

function OnTriggerExit (other : Collider)
    {
        if (other.tag == "Player")
            moveChk = false;

    }
