#pragma strict
/**岩浆的代码*/
var homePoint : Vector3;						//存档点
static var speed : float = 5.0;						//岩浆移动速度

static var start : boolean = false;

private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var homeChk : boolean = false;

function Start () 
{
    homePoint = transform.position;				//确定初始位置
    start = false;
}

//角色死掉操作
function LateUpdate()
{
    /**碰撞效果*/

    if (playerconfig.dead)
    {
        transform.position  =  homePoint;
        start = false;
    }
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
		 	velocity.y = speed;
	 		transform.Translate(velocity *  Time.deltaTime);		//移动参数
	 

	}
	
}

