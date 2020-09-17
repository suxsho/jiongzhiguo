#pragma strict
//怪物脚本集合

var searchRange : float = 3.0;		//寻找范围，一般为一个屏幕那么大
var chaseTarget : Transform;		//拖动主角到这里即可
var gizmoToggle : boolean = true;	//在关卡编辑器中画图的标记代码


var moveSpeed : float = 20.0;		//移动速度,设置为0怪就不动
var bzSpeed : float = 20.0;		//暴走速度
var jumpSpeed : float = 0;			//跳跃的高度，如果设置的是0的话就不跳跃

var homePoint : Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var gravity : float = 20.0;				//重力
private var myTransform : Vector3;				//记录位置
private var distanceToTarget : float = 0.0;		//与怪的距离，这个不动
private var controller : CharacterController;	//加载角色控制器

var moveLife : boolean = true;					//怪是活动的，如果超过屏幕就改成false

var jiongbi : GameObject;						//拖入囧币，怪把其他撞挂的时候就会出现

//怪物属性配置，允许策划任意配置组合出不同的怪



function Start () 
{
	myTransform = transform.position;							
	//linkToPlayerProperties = GetComponent (playerProperties);
	controller = GetComponent (CharacterController);			//加载角色控制器
	//aniPlay = GetComponent (aniSprite);

	homePoint = transform.position;	
}

function LateUpdate () 
{
    //角色挂了后或者奖励模式都还原
	
    if (playerconfig.dead || bonusMode.start)
    {
        if (homePoint.x < chaseTarget.transform.position.x)
        {
            transform.position.x = chaseTarget.transform.position.x + Random.Range(20, 50);
            velocity.x = -10;
            moveLife = true;
        }
        else
        {
            gohomePoint();
        }
    }
}

function Update () 
{

	distanceToTarget = Vector3.Distance(chaseTarget.transform.position,transform.position);	//判定角色的位置
		
	if (distanceToTarget <= searchRange  && moveLife)
	{
			velocity.x = -moveSpeed;	
	}
	


		
	/**超出屏幕暴走行动*/
	
	if (transform.position.x - chaseTarget.transform.position.x < -30 && moveLife)
	{
		//要分别怪是哪一个，不能把位置放在一起不然都不见了

			transform.position.x = chaseTarget.transform.position.x - Random.Range(20, 50);
			transform.position.y = -2;	
			velocity.x = bzSpeed;	
			moveLife = false;
	}
	
	if (transform.position.x - chaseTarget.transform.position.x > 30 && !moveLife)
	{
		//要分别怪是哪一个，不能把位置放在一起不然都不见了

			transform.position.x = chaseTarget.transform.position.x + Random.Range(20, 50);
			transform.position.y = -2;	
			velocity.x = -10;
			moveLife = true;	
	}
	
	/**移动*/
	
	velocity.y = Mathf.PingPong( Time.time, 4) - 2;   //飞翔

	controller.Move(velocity * Time.deltaTime);
	
	//print(velocity);
	
	/**一些位置还原的功能*/
	

	
	
	
	
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
	//撞到其他怪变囧币，用法是把撞击怪的tag设置成enemyHit
	if (gameObject.tag == "enemyHit")
	{
		if (other.tag == "enemy")
		{
			Instantiate(jiongbi,transform.position,transform.rotation); 
			Destroy(other.gameObject);
		}
	}
}

function gohomePoint()
{
	moveLife = true;   	//让怪的状态变活
	transform.position  =  homePoint;
	velocity.x = 0;
	velocity.y = 0;
}

	/**描边相关*/
function OnDrawGizmos ()
{
	Gizmos.color = Color.blue;
	Gizmos.DrawWireSphere(transform.position,searchRange);
}