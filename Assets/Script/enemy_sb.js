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

var crashSound: AudioClip;

//EID = 7
private var dir: boolean = false;

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
		
    //EID = 0 普通怪
	if (controller.isGrounded && distanceToTarget <= searchRange && eid == 0)
	{
			velocity.y = jumpSpeed;
			velocity.x = -moveSpeed;	
	}
    //EID = 1 假终点
	if (controller.isGrounded && distanceToTarget <= searchRange && eid == 1)
	{
	    velocity.y = jumpSpeed;
	    velocity.x = moveSpeed;	
	    GetComponent.<AudioSource>().clip = crashSound;
	    GetComponent.<AudioSource>().Play();
	    stageClearFool = true;
	}
	if (controller.isGrounded && stageClearFool  && distanceToTarget >= searchRange && eid == 1)
	{
	    velocity.x = 0;
	    stageClearFool = false;
	}

    //EID2 假终点2（扔炸弹的）
    //EID = 1 假终点
	if (controller.isGrounded && distanceToTarget <= searchRange && eid == 2)
	{
	    GetComponent.<AudioSource>().clip = crashSound;
	    GetComponent.<AudioSource>().Play();
	    velocity.y = jumpSpeed;
	    //velocity.x = moveSpeed;	
	    stageClearFool = true;
	    i = 0.2;
	}
	if(stageClearFool && eid == 2)
	{
	    if( transform.position.y >= 5)
	    {
	        transform.position.y = 5;
	        velocity.y = 0;
	        gravity = 0;
	        velocity.x = moveSpeed;
	    

            //每秒仍炸弹
	        if (i >= 0.2 && j < 45)
	        {
	       
	            Instantiate(jiongbi,Vector2(transform.position.x, transform.position.y-1),transform.rotation); 
	            j++;
	            //-----这部分的不动------
	            i = 0;
	        }
	        i += Time.deltaTime;
	        //-----这部分的不动------//
	    
	    }
	}

    //EID == 4 固定不动+每秒扔炸弹
	if (distanceToTarget <= searchRange && eid == 4)
	{
	        //每秒仍炸弹
	        if (i >= 2)
	        {
	       
	            Instantiate(jiongbi,Vector2(transform.position.x, transform.position.y-1),transform.rotation); 
	            //-----这部分的不动------
	            i = 0;
	        }
	        i += Time.deltaTime;
	        //-----这部分的不动------//
	}

    //EID == 5 从左往右滚动的石头
	if (controller.isGrounded && chaseTarget.transform.position.x - transform.position.x >= 25 && transform.position.y - chaseTarget.transform.position.y <= 5 && eid == 5)
	{
	    velocity.y = jumpSpeed;
	    velocity.x = -moveSpeed;
	}

    //EID == 6 S型的飞行怪（重力改成0）
	if (distanceToTarget <= searchRange && eid == 6)
	{
	    velocity.x = moveSpeed;
	    velocity.y =  Mathf.Sin(Time.time * 2) * jumpSpeed;
    }

    //EID == 7 走动型侦查怪
    if (distanceToTarget <= searchRange && eid == 7) {
        if (chaseTarget.transform.position.x < transform.position.x)
            velocity.x = -moveSpeed;
        else
            velocity.x = moveSpeed;
        velocity.y = Mathf.Sin(Time.time * 2) * jumpSpeed;
    }
    else if(eid == 7)
    {
        if (transform.position.x - homePoint.x >= 5 && !dir)
            dir = true;
        else if (transform.position.x - homePoint.x <= -5 && dir)
            dir = false;
        if(!dir)
            velocity.x = 2;
        else
            velocity.x = -2;
        velocity.y = Mathf.Sin(Time.time * 2) * jumpSpeed;
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
        controller.Move(velocity * Time.deltaTime);
    //下落最大重力限制
        if (velocity.y <= -20)
            velocity.y = -20;
	
	//print(velocity);
	
	/**一些位置还原的功能*/
	
	//角色挂了后或者奖励模式都还原
	


	if (playerconfig.dead || bonusMode.start)
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
    if (eid != 6)
	transform.position  =  homePoint;
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
	    transform.position.x = homePoint.x;
	}

}

	/**描边相关*/
function OnDrawGizmos ()
{
	Gizmos.color = Color.blue;
	Gizmos.DrawWireSphere(transform.position,searchRange);
}