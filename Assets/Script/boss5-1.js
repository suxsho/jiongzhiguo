#pragma strict
//BOSS 5-1 改写脚本

var moveSpeedX : float = 20.0;		//移动速度
var moveSpeedY : float = 20.0;		//移动速度

var moveRange : float = 5.0;		//移动范围



var homePoint: Vector3;				//存档点
var P2HomePoint: Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var moveDirection : int;			//定义左右移动的方向，如果是负的则把这个设置成1
private var gravity : float = 20.0;				//重力
private var myTransform : Vector3;				//记录位置
//private var controller : CharacterController;	//加载角色控制器
private var chkVel: Vector3 = Vector3.zero; 	//检查的位

static var chk: boolean = false; 	//检查的位
private var moveChk: boolean = false; 	//moveland自检
var playerMove = true;					//让角色跟随地面移动

var player2: GameObject;




function Start () 
{
	myTransform = transform.position;							
	//linkToPlayerProperties = GetComponent (playerProperties);
	//controller = GetComponent (CharacterController);			//加载角色控制器
	//aniPlay = GetComponent (aniSprite);

    //记录初始位置
    homePoint = transform.position;
    P2HomePoint = player2.transform.position;	

    if (storyboss51.hp == 3)
        velocity.x = 0;

}

function LateUpdate() {
    //角色挂了后或者奖励模式都还原

    if (playerconfig.dead || bonusMode.start) {
        gohomePoint();
    }
}


function Update () 
{
		/**移动功能 附加HP*/	
		if (moveDirection == 0)
        {
            if (storyboss51.hp < 3 || storyboss51.talkMode)
            {
                velocity.x = moveSpeedX;
                velocity.y = moveSpeedY;
            }
				
		}	
		if (moveDirection == 1)
        {
            if (storyboss51.hp < 3 || storyboss51.talkMode)
            {
                velocity.x = -moveSpeedX;
                velocity.y = -moveSpeedY;
            }
        }	

        /**对话模式的时候不移动*/
        if (storyboss51.talkMode)
            velocity.x = 0;
        if (storyboss51.hp == 1)
        {
            moveSpeedX = 25;
        }

    /**BOSS过关后小白块飞出去*/
       if (storyboss51.hp == 0)
            player2.transform.Translate(Vector3.up * 10 * Time.deltaTime);


		
    /**平台运动翻转功能*/
		    if (homePoint.x - transform.position.x < -moveRange || homePoint.y - transform.position.y < -moveRange)
		    {
		        moveDirection = 1;
		    }	
		    if (homePoint.x - transform.position.x > moveRange || homePoint.y - transform.position.y > moveRange)
		    {
		        moveDirection = 0;
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
        velocity.x = 0;
        yield WaitForSeconds(0.05);
        storyboss51.talkMode = true;
	}
}
function OnTriggerExit (other : Collider)
{
	//if (other.tag == "Player")
		moveChk = false;		//不允许进行滑块检测

}

function gohomePoint() {
    transform.position = homePoint;
    player2.transform.position = P2HomePoint;
    velocity.x = 0;
    velocity.y = 0;
    moveSpeedX = 5;
}
