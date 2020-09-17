#pragma strict
/**智能的追玩家的火焰*/
var homePoint : Vector3;						//存档点
static var speed : float = 5.0;						//岩浆移动速度

static var start : boolean = false;

private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var homeChk : boolean = false;

function Start () 
{
	homePoint = transform.position;				//确定初始位置
}

function Update () 
{

	/**如果开始为否则移除*/
	if (!start)
	{
		transform.position.x = 780;
		transform.position.y = -30;	
		
		homeChk = true;
	}
	
	else
	{
		if (homeChk)
		{
	 		transform.position = homePoint;
	 		homeChk = false;
        }

        //根据玩家速度来判断他的速度
        if (GameObject.Find("player").transform.position.x - transform.position.x > 35)
            velocity.x = speed * 20;
        else if (GameObject.Find("player").transform.position.x - transform.position.x > 30)
            velocity.x = speed * 2;
        else if (GameObject.Find("player").transform.position.x - transform.position.x < 17)
            velocity.x = speed;


	 		transform.Translate(velocity *  Time.deltaTime);		//移动参数
	
	}
	
}

function LateUpdate() {
    if (playerconfig.dead) {
        start = false;
    }
}

function OnTriggerEnter(other:Collider)
{
	/**碰刺停*/
		if (other.tag == "ci")
		{
			speed = 0;
		}
	
}
