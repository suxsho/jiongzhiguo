#pragma strict
//怪物脚本集合

var searchRange : float = 3.0;		//寻找范围，一般为一个屏幕那么大
var i : float;		//寻找范围，一般为一个屏幕那么大
var j : float;		//寻找范围，一般为一个屏幕那么大
var chaseTarget : Transform;		//拖动主角到这里即可
var gizmoToggle : boolean = true;	//在关卡编辑器中画图的标记代码

static var hp : int = 3; 					//BOSS HP

var moveSpeed : float = -3.0;		//移动速度,设置为0怪就不动
var moveSpeedY : float = -3.0;		//移动速度,设置为0怪就不动
var jumpSpeed : float = 0;			//跳跃的高度，如果设置的是0的话就不跳跃

var homePoint : Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var gravity : float = 0.0;				//重力
private var timeF : float = 3.0;				//丢炸弹持续时间
private var myTransform : Vector3;				//记录位置
private var distanceToTarget : float = 0.0;		//与怪的距离，这个不动
private var controller : CharacterController;	//加载角色控制器

var moveLife : boolean = true;					//怪是活动的，如果超过屏幕就改成false
static var cancontrol : boolean = false;

var bomb : GameObject;						//拖入囧币，怪把其他撞挂的时候就会出现
enum Direction {Left,Right};
var myDirection : Direction;   //定义一个序列组

//怪物属性配置，允许策划任意配置组合出不同的怪

static var playerPos : Vector3= Vector3.zero;	//定义角色位置

function OnGUI () 
{
		if (playerconfig.dead)
	{
		    hp = 3;
		    playerControls.cancontrol = false;		//先让角色不能移动
		    cancontrol = false;
		    storyboss3.talkMode= true;				//开启说话
		gohomePoint();
	}
}

function Start () 
{
	myTransform = transform.position;							
	//linkToPlayerProperties = GetComponent (playerProperties);
	controller = GetComponent (CharacterController);			//加载角色控制器
	//aniPlay = GetComponent (aniSprite);
	myDirection = myDirection.Left;
	homePoint = transform.position;	
	i=3;
	j=3;
	hp = 3;
}

function Update () 
{
	distanceToTarget = Vector3.Distance(chaseTarget.transform.position,transform.position);	//判定角色的位置
	
	playerPos = chaseTarget.transform.position;
	
    /**不同HP的不同属性*/
	if(cancontrol)
	{
	    if (hp == 3)
	    {
	        velocity.x =  moveSpeed;
	        timeF = 3.0;
	    }
	
	    if (hp == 2)
	    {
	        velocity.x =  moveSpeed *1.2;
	        timeF = 2.2;
	    }

	    if (hp == 1)
	    {
	        velocity.x =  moveSpeed * 1.4; 
	        timeF = 1.3;
	    }
	}
	else
	{
	    velocity.y =  Mathf.Sin(Time.time * 2) * 1.5; 
	}

    //回到起始点
	if (transform.position.x < -20)
	    gohomePoint2();
	if (transform.position.y > 20)
	    gohomePoint2();

    //扔炸弹
	if (j >= timeF && cancontrol)  
	{
	    Instantiate(bomb,Vector2(transform.position.x, transform.position.y-3),transform.rotation); //这里写入自己的代码
	    //-----下面的保持不动------
	    j = 0;
	}
	j += Time.deltaTime;
    //移动速度
	if (i >= 2.5 && cancontrol)  
	{
	    if(myDirection == myDirection.Left)
	    {
	        if(moveSpeed< -1)
	        moveSpeed += 0.5;
	        velocity.y =  Mathf.Sin(Time.time * 2) * 1.5; 
	    }   
	    if(myDirection == myDirection.Right)
	    {
	        if(moveSpeed> 1)
	            moveSpeed -= 0.5;
	        if(transform.position.y >-4)
	            velocity.y =  -4; 
	        else
	        {
	            moveSpeed = -3.0;
	            myDirection = myDirection.Left; 
	        }
	            
	    }
	        
	    //-----下面的保持不动------
	    i = 0;
	}
	i += Time.deltaTime;
	
	if(moveSpeed >= -1 && myDirection == myDirection.Left && transform.position.x < chaseTarget.transform.position.x)
	{
	    if (hp == 3)
	        moveSpeed = 3.0;
	    if (hp == 2)
	        moveSpeed = 3.5;
	    if (hp == 1)
	        moveSpeed = 4.5;
	    myDirection = myDirection.Right;
	}
	else if(myDirection == myDirection.Right  && transform.position.x > chaseTarget.transform.position.x)
	{
	    moveSpeed = -3.0;
	    myDirection = myDirection.Left;
	}
	/**移除屏幕
	
		if (transform.position.x - chaseTarget.transform.position.x < -30 && moveLife)
	{
		//要分别怪是哪一个，不能把位置放在一起不然都不见了
		if (gameObject.tag == "enemyHit")
		{
			transform.position.x = 700;
			transform.position.y = -30;	
		}
		
		if (gameObject.tag == "enemy")
		{
			transform.position.x = 780;
			transform.position.y = -30;	
		}
		
		moveLife = false;
	}*/
	
	/**移动*/
	
	velocity.y -= gravity * Time.deltaTime;   //重力
	controller.Move(velocity * Time.deltaTime);
	
	//print(velocity);
	
	/**一些位置还原的功能*/
	
	//角色挂了后或者奖励模式都还原
	


	
	
	
	
}

function OnTriggerEnter(other:Collider)
{
	/**挂掉的脚本*/
		if (other.tag == "killbox")
	{
		    gohomePoint2();
		}
		if (other.tag == "bomb")
		{
		    hp -= 1;
		    playerControls.cancontrol = false;		//先让角色不能移动
		    cancontrol = false;
		    storyboss3.talkMode= true;				//开启说话
		    gohomePoint();
		}
	
	/**撞到玩家的脚本   这个脚本就这样屏蔽因为不存在问题
	
	if (other.tag == "Player")
	{
		//gohomePoint();
	}*/
	//撞到其他怪变囧币，用法是把撞击怪的tag设置成enemyHit
/*	if (gameObject.tag == "enemyHit")
	{
		if (other.tag == "enemy")
		{
			Instantiate(jiongbi,transform.position,transform.rotation); 
			Destroy(other.gameObject);
		}
	}*/
}

function gohomePoint()
{
    moveLife = true;   	//让怪的状态变活
    moveSpeed = -3;
    i=3;
    j=3;
	transform.position  =  homePoint;
	velocity.x = 0;
	velocity.y = 0;
	myDirection = myDirection.Left;

}
function gohomePoint2()
{
    moveLife = true;   	//让怪的状态变活
    moveSpeed = 5;
    i=3;
    j=3;
    transform.position  =Vector2(-18,18);
    velocity.x = 0;
    velocity.y = 0;
    myDirection = myDirection.Right;

}

	/**描边相关*/
function OnDrawGizmos ()
{
	Gizmos.color = Color.blue;
	Gizmos.DrawWireSphere(transform.position,searchRange);
}