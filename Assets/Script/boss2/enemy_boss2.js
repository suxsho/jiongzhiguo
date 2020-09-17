#pragma strict
//BOSS2

var searchRange : float = 3.0;		//寻找范围，一般为一个屏幕那么大
var chaseTarget : Transform;		//拖动主角到这里即可
var gizmoToggle : boolean = true;	//在关卡编辑器中画图的标记代码

static var hp : int = 5; 					//BOSS HP

var moveSpeed : float = 12.0;		//移动速度,设置为0怪就不动
var jumpSpeed : float = 0;			//跳跃的高度，如果设置的是0的话就不跳跃

var homePoint : Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var gravity : float = 20.0;				//重力
private var myTransform : Vector3;				//记录位置
private var distanceToTarget : float = 0.0;		//与怪的距离，这个不动
private var controller : CharacterController;	//加载角色控制器

var moveLife : boolean = true;					//怪是活动的，如果超过屏幕就改成false

static var cancontrol : boolean = true;

//var jiongbi : GameObject;						//拖入囧币，怪把其他撞挂的时候就会出现

//怪物属性配置，允许策划任意配置组合出不同的怪

static var playerPos : Vector3= Vector3.zero;	//定义角色位置


var bomb : GameObject;	//子弹

/**发射子弹的*/
private var nextFire = 0.0;

private var talkMode_BOSS : boolean = false; 	//控制打BOSS的时候对话


function Start () 
{
	myTransform = transform.position;							
	//linkToPlayerProperties = GetComponent (playerProperties);
	controller = GetComponent (CharacterController);			//加载角色控制器
	//aniPlay = GetComponent (aniSprite);

	homePoint = transform.position;	

}

function LateUpdate()
{
		if (playerconfig.dead)
	{
		hp = 5;
		moveSpeed = 0;	//把速度归零不然BOSS要跑
		fire.start = false;	//把岩浆消除了
		enemy_bomb.moveLife = false;	//把BOSS的子弹消除了
		gohomePoint();

	}

}

function Update () 
{
	//print(hp);
	distanceToTarget = Vector3.Distance(chaseTarget.transform.position,transform.position);	//判定角色的位置
	
	playerPos = chaseTarget.transform.position;
	
	if (controller.isGrounded)
	{
	
		velocity.x = moveSpeed;
		velocity.y = jumpSpeed;
		
	}

	
	/**不同HP的不同属性*/
	if (hp == 5)
	{
		moveSpeed = 0;
		jumpSpeed = 0;
	}
	
	if (hp == 4)
	{
		moveSpeed = 12;
		jumpSpeed = 0;
	}

	if (hp == 3)
	{
		if (talkMode_BOSS)
		{
			storystage7.talkMode= true;				//开启说话
			talkMode_BOSS =	false;
		}
		moveSpeed = 12;
		jumpSpeed = 0;
	}
	
	if (hp == 2)
	{
		if (talkMode_BOSS)
		{
			storystage7.talkMode= true;				//开启说话
			talkMode_BOSS =	false;
		}
		useBomb();
		moveSpeed = 12;
		jumpSpeed = 0;
	}
	
	if (hp == 1)
	{
		if (talkMode_BOSS)
		{
			storystage7.talkMode= true;				//开启说话
			talkMode_BOSS =	false;
		}
		moveSpeed = 12;
		jumpSpeed = 0;
	}
	
		if (hp == 0)
	{
		if (talkMode_BOSS)
		{
			storystage7.talkMode= true;				//开启说话
			talkMode_BOSS =	false;
		}
		moveSpeed = 12;
		jumpSpeed = 0;
	}
		if (hp == -1)
	{
		if (talkMode_BOSS)
		{
			storystage7.talkMode= true;				//开启说话
			talkMode_BOSS =	false;
		}
		moveSpeed = 12;
		jumpSpeed = 0;
	}
	
	
	/**BOSS一边跑一边对话的脚本*/
	
	

		
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

}

function OnTriggerEnter(other:Collider)
{
	/**挂掉的脚本*/
		if (other.tag == "oldsave")
	{
		jumpSpeed = 10;
		
		yield WaitForSeconds(1);
		
		jumpSpeed = 0;
	}
	
	if (other.tag == "Finish")
	{
		hp--;
		talkMode_BOSS = true;
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
	transform.position  =  homePoint;
	velocity.x = 0;
	velocity.y = 0;
	
	playerControls.cancontrol = false;		//先让角色不能移动
	cancontrol = false;
	storystage7.talkMode= true;				//开启说话
}

function useBomb()
{
	if(Time.time > nextFire)
	{
		nextFire = Time.time + Random.Range(1.0, 2.0);
		Instantiate(bomb,Vector3(transform.position.x,transform.position.y,-0.2),transform.rotation);		
	}
	
}

	/**描边相关*/
function OnDrawGizmos ()
{
	Gizmos.color = Color.blue;
	Gizmos.DrawWireSphere(transform.position,searchRange);
}