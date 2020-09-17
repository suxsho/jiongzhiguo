#pragma strict
//BOSS4的AI控制
private var velocity: Vector3 = Vector3.zero;
private var homePoint : Vector3;						//存档点

 var i:int = 0;
 private var j: float;

private var playerDead: int = 0;
function Start () {
    homePoint = transform.position;				//确定初始位置
}

//角色死掉操作
function LateUpdate()
{
    /**碰撞效果*/

    if (playerconfig.dead)
    {
        transform.position  =  homePoint;
        i = 0;
        playerDead++;
    }
}

function Update () {

    //拖动场景移动
    if (!storyboss4.talkMode)
    {
        if(i<= 3)
            velocity.x = -1;
        else if (i <= 5)
            velocity.x = -2.5;
        else if (i <= 7)
            velocity.x = -1;
        else if (i <= 8)
            velocity.x = -3;
        else if (i <= 10)
            velocity.x = -0.5;
        else if (i <= 11)
            velocity.x = 0.5;
        else if (i <= 12)
            velocity.x = 2.5;
        else if (i <= 15)
            velocity.x = 3;
        else if (i <= 19)
            velocity.x = -3;
        else if (i <= 24)
            i = 0;


    }
    else
    {
        velocity.x = 0;
    }

    //计时模式
    if (j >= 2)  
    {

        i ++;
        //-----下面的保持不动------
        j = 0;
    }
    j += Time.deltaTime;
    transform.Translate(velocity * Time.deltaTime);



}
