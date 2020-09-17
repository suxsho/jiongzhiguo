#pragma strict
//第五关BOSS本体的代码

var searchRange : float = 3.0;		//寻找范围，一般为一个屏幕那么大
var chaseTarget : Transform;		//拖动主角到这里即可
var gizmoToggle : boolean = true;	//在关卡编辑器中画图的标记代码

var moveSpeed : float = -3.0;		//移动速度,设置为0怪就不动
var moveSpeedY : float = -3.0;		//移动速度,设置为0怪就不动
var jumpSpeed : float = 0;			//跳跃的高度，如果设置的是0的话就不跳跃

var homePoint : Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var gravity : float = 0.0;				//重力
private var myTransform : Vector3;				//记录位置
private var distanceToTarget : float = 0.0;		//与怪的距离，这个不动
private var controller : CharacterController;	//加载角色控制器
var moveLife : boolean = true;					//怪是活动的，如果超过屏幕就改成false
static var cancontrol: boolean = false;

var crashSound: AudioClip;

//怪物属性配置，允许策划任意配置组合出不同的怪

static var playerPos : Vector3= Vector3.zero;	//定义角色位置

function OnGUI () 
{
		if (playerconfig.dead)
	{
		    playerControls.cancontrol = false;		//先让角色不能移动
		    cancontrol = false;
		gohomePoint();
	}
}

function Start () 
{
	myTransform = transform.position;							
	controller = GetComponent (CharacterController);			//加载角色控制器
    homePoint = transform.position;
}

function Update () 
{

    //基础加载
	distanceToTarget = Vector3.Distance(chaseTarget.transform.position,transform.position);	//判定角色的位置
	
	playerPos = chaseTarget.transform.position;

    velocity.y = Mathf.Sin(Time.time * 2) * 1.5; 

    //moveSpeed改变
    if (storyboss52.hp == 3)
        moveSpeed = 3;
    if (storyboss52.hp == 2)
        moveSpeed = 5;
    if (storyboss52.hp == 1)
        moveSpeed = 7;

    if (storyboss52.talkMode)
        velocity.x = 0;
    //判断主角的位置
    if (!storyboss52.talkMode)
    {
        if (playerPos.x < transform.position.x)
            moveLeft();
        else if (playerPos.x > transform.position.x)
            moveRight();
        else
            velocity.x = 0;
    }



	
	/**移动*/
    controller.Move(velocity * Time.deltaTime);	

}

//前往左边的安全点
function moveLeft()
{
    if (transform.position.x >= -15)
        velocity.x = -moveSpeed;
    else
        velocity.x = 0;
}

//前往右边的安全点
function moveRight()
{
    if (transform.position.x <= 15)
        velocity.x = moveSpeed;
    else
        velocity.x = 0;
}

function OnTriggerEnter(other:Collider)
{
	/**撞到玩家的脚本   这个脚本就这样屏蔽因为不存在问题
	
	if (other.tag == "Player")
	{
		//gohomePoint();
	}*/
	//撞到其他怪变囧币，用法是把撞击怪的tag设置成enemyHit

		if (other.tag == "bomb")
        {
            storyboss52.talkMode = true;
            if (transform.position.x < 0)
                other.gameObject.transform.position.x = 15.4;
            else
                other.gameObject.transform.position.x = -15.4;
            other.gameObject.transform.position.y = 7.9;
            GetComponent.<AudioSource>().clip = crashSound;
            GetComponent.<AudioSource>().Play();
		}
}


function gohomePoint()
{
    moveLife = true;   	//让怪的状态变活
	transform.position  =  homePoint;
	velocity.x = 0;
}

	/**描边相关*/
function OnDrawGizmos ()
{
	Gizmos.color = Color.blue;
	Gizmos.DrawWireSphere(transform.position,searchRange);
}