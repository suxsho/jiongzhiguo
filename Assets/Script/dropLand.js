#pragma strict
/***用于描写砖块功能的代码库*/

var gravity 			: float = 2;
var second 				:  float = 0.3;										//降落缓冲时间
var homePoint 			: Vector3;											//存档点，记住物体的默认位置以便还原
var targetPoint 		: Vector3;											//降落点，物体降落到这个点还原

var check : boolean = false;
var playerDead : boolean = false;
private var velocity 		: Vector3		= Vector3.zero;					//定义初始速度
private var speed : float = 0.0;
private var distanceToTarget : float = 0.0;									//与怪的距离，这个不动

function Start()
{
	/***设置初始点和降落点位置*/	
	homePoint = transform.position;	
	targetPoint = Vector3(transform.position.x,transform.position.y - 200.0,0.0);
}

function LateUpdate () 
{
	/***检测玩家站在砖块上就下落的代码*/
	if (check)
	{
		velocity.y -= gravity;	
	}
		transform.Translate(velocity * Time.deltaTime);
	
	//角色死亡返回
	if (playerconfig.dead)
	{
		gohomePoint();
	}
	
	if (transform.position.y < targetPoint.y)
	{
		gohomePoint();
	}
	
}

/***碰撞检测*/
function OnTriggerEnter(otherObject:Collider)
{
	if(otherObject.gameObject.tag == "Player")
	{
		yield WaitForSeconds(second);
		if (!playerDead)
		check = true;
	}
}


/***返回初始点*/
function gohomePoint()
{
	check = false;
	velocity.y = 0;
	transform.position  =  homePoint;
}
