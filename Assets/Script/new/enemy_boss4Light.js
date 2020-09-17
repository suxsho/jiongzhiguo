#pragma strict
//怪物脚本集合

var searchRange : float = 3.0;		//寻找范围，一般为一个屏幕那么大
var chaseTarget : Transform;		//拖动主角到这里即可
var gizmoToggle : boolean = true;	//在关卡编辑器中画图的标记代码
var eid : int = 0;                  //ID如果等于0就按照默认执行

var moveSpeed : float = 20.0;		//移动速度,设置为0怪就不动
var jumpSpeed : float = 0;			//跳跃的高度，如果设置的是0的话就不跳跃

var homePoint : Vector3;				//存档点
private var velocity : Vector3 = Vector3.zero; 	//初始位置
var gravity : float = 20.0;				//重力
private var myTransform : Vector3;				//记录位置
private var distanceToTarget : float = 0.0;		//与怪的距离，这个不动
private var controller : CharacterController;	//加载角色控制器

var moveLife : boolean = true;					//怪是活动的，如果超过屏幕就改成false

var jiongbi : GameObject;						//拖入囧币，怪把其他撞挂的时候就会出现

private var stageClearFool : boolean = false;      //假终点专用功能
private var i : float;                                        //计数
private var j : float;

var crashSound : AudioClip;

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

    distanceToTarget = Vector3.Distance(chaseTarget.transform.position,transform.position);	//判定角色的位置
		


    //EID == 6 S型的飞行怪（重力改成0）
	if (distanceToTarget <= searchRange && eid == 6)
	{
	    velocity.x = moveSpeed;
	    velocity.y =  Mathf.Sin(Time.time * 2) * jumpSpeed;
	}
		
	/**移除屏幕*/
	
		if (transform.position.x - chaseTarget.transform.position.x < -1000 && moveLife)
	{
		//要分别怪是哪一个，不能把位置放在一起不然都不见了
		if (gameObject.tag == "enemyHit")
		{
			transform.position.x = -30;
			transform.position.y = -60;	
		}
		
		if (gameObject.tag == "enemy")
		{
			transform.position.x = -30;
			transform.position.y = -60;	
		}
		
		moveLife = false;
	}
	
	/**移动*/
	
		if(!controller.isGrounded)
		    velocity.y -= gravity * Time.deltaTime;   //重力

		if (!storyboss4.talkMode)
	controller.Move(velocity * Time.deltaTime);
	
	//print(velocity);
	
	/**一些位置还原的功能*/
	
	//角色挂了后或者奖励模式都还原

	if (playerconfig.dead || bonusMode.start)
            gohomePoint();

    //超出屏幕范围还原
    if (transform.position.x < -30)
        gohomePoint();
	
	
	
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

	if (gameObject.tag == "bomb")
	{
	    if (other.tag == "enemy")
	    {
	        Instantiate(jiongbi,transform.position,transform.rotation); 
	        cameraSmooth2D.cameraShake = true;
	        other.gameObject.transform.position.x = -30;
	        other.gameObject.transform.position.y = -60;	

	        transform.position.x = -20;
	        transform.position.y = -60;	

	        GetComponent.<AudioSource>().clip = crashSound;
	        GetComponent.<AudioSource>().Play();
	    }

	    if (other.tag == "boss")
	    {
	        Instantiate(jiongbi,transform.position,transform.rotation); 
	        cameraSmooth2D.cameraShake = true;

	        transform.position.x = -20;
	        transform.position.y = -60;	

	        GetComponent.<AudioSource>().clip = crashSound;
	        GetComponent.<AudioSource>().Play();
	    }

	    if (other.tag == "Player" && !playerconfig.superTime)
	    {
	        Instantiate(jiongbi,transform.position,transform.rotation); 
	        cameraSmooth2D.cameraShake = true;
	        transform.position.x = -20;
	        transform.position.y = -60;	

	        GetComponent.<AudioSource>().clip = crashSound;
	        GetComponent.<AudioSource>().Play();
	    }

	    if (other.tag == "moveLand")
	    {
	        velocity.x = 5;
	    }
	}
}

function gohomePoint()
{
    moveLife = true;   	//让怪的状态变活
    stageClearFool = false;

	velocity.x = 0;
	velocity.y = 0;

    //EID2 恢复重力
	if(eid == 2)
	{
	    gravity = 20;
	    j = 0;
	}
	   

    //EID3 清除物体
	if(eid == 3)
	    Destroy(gameObject);

    //EID6 Y不变
	if (eid == 6)
    {
        if (!storyboss4.advMode) {
            transform.position.x = homePoint.x;
        }
        else {
            transform.position.x = 30;
        }

	}

}

	/**描边相关*/
function OnDrawGizmos ()
{
	Gizmos.color = Color.blue;
	Gizmos.DrawWireSphere(transform.position,searchRange);
}