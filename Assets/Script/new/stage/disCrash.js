#pragma strict
//碰撞消失，用于空中突然掉下东西
var chaseTarget : Transform;		//判定的目标
var side : float = 0.0;		//偏移距离
private var homePoint : Vector3;				//存档点

function Start () {
    //记录初始位置
    homePoint = transform.position;	
}

function Update () 
{
    //如果目标坐标>改物体位置，上移（让东西掉下来）
    if(homePoint ==  transform.position && !playerconfig.dead)
        if(Mathf.Abs(chaseTarget.transform.position.x - transform.position.x) <= side && Mathf.Abs(chaseTarget.transform.position.y - transform.position.y)  <= 30)
            transform.position.y += 100;

}

function LateUpdate () 
{
    //角色死掉后
    if (playerconfig.dead || bonusMode.start)
        transform.position  =  homePoint;
}
