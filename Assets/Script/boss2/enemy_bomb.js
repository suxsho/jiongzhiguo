#pragma strict
//怪物脚本集合

var searchRange : float = 3.0;		//寻找范围，一般为一个屏幕那么大
var gizmoToggle : boolean = true;	//在关卡编辑器中画图的标记代码


var moveSpeed : float = 20.0;		//移动速度,设置为0怪就不动
var jumpSpeed : float = 0;			//跳跃的高度，如果设置的是0的话就不跳跃

var homePoint : Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var gravity : float = 20.0;				//重力
private var myTransform : Vector3;				//记录位置
private var controller : CharacterController;	//加载角色控制器

static var moveLife : boolean = true;					//怪是活动的，如果超过屏幕就改成false

private var firstGround : boolean = true;	//第一次撞地，避免每次落地都不同高度

//怪物属性配置，允许策划任意配置组合出不同的怪



function Start () 
{
	myTransform = transform.position;							
	//linkToPlayerProperties = GetComponent (playerProperties);
	controller = GetComponent (CharacterController);			//加载角色控制器
	//aniPlay = GetComponent (aniSprite);

	homePoint = transform.position;	
}

function Update () 
{


		
	if (controller.isGrounded)
	{
		if (firstGround)
		{
			var i = Random.Range(0, 100);
			firstGround = false;
		}
			velocity.y = jumpSpeed * i * 0.01;
			velocity.x = -moveSpeed* i * 0.01;	
	}

	
	/**移动*/
	
	velocity.y -= gravity * Time.deltaTime;   //重力
	controller.Move(velocity * Time.deltaTime);
	
	//print(velocity);
	
	/**一些位置还原的功能*/
	
	
	if (!moveLife)
		Destroy(gameObject);
	
	
	
	
}

function OnTriggerEnter(other:Collider)
{
	/**挂掉的脚本*/
		if (other.tag == "killbox")
	{
		velocity.x = 0;
	}
	
	/**撞到玩家的脚本   这个脚本就这样屏蔽因为不存在问题
	
	if (other.tag == "Player")
	{
		//gohomePoint();
	}*/
}

	/**描边相关*/
function OnDrawGizmos ()
{
	Gizmos.color = Color.blue;
	Gizmos.DrawWireSphere(transform.position,searchRange);
}