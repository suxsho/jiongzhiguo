#pragma strict
//BOSS5 第一轮
var soundD	: AudioClip;
var i : float;
var j : float;                                  //判断模式
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var speed : float;
var homePoint : Vector3;				//存档点

var movePoint : float;
var moveSpeed : float;

enum monsterMode {up,down};
var mode: monsterMode;   //定义一个序列组

var seTime: float = 0.48;

function Start () {
    i = 1;

    homePoint = transform.position;	
}

function LateUpdate () 
{
    transform.Translate(velocity * Time.deltaTime);
    velocity.x = 0;
    velocity.y = speed;

    if (playerconfig.dead)
    {
        transform.position = homePoint;	
        storyboss52.talkMode = true;
        j = 0;
    }
}

function FixedUpdate () 
{
    //每秒执行一次操作

    if (i >= seTime && !storyboss52.talkMode)  
    {

        j++;
        if(j == 4)
            j = 0;
        //-----下面的保持不动------
        i = 0;
    }
    i += Time.deltaTime;

    //判定位置


    if(j == 0)
    {
        if (mode == mode.up) {
            speed = moveSpeed;
            if (transform.position.y >= homePoint.y) {
                speed = 0;
                transform.position.y = homePoint.y;
            }
        }
        else
            speed = 0;
    }
    else if (j == 1)
    {
        if(mode == mode.up)
        {
            speed = 0;      
        }
            
       else if(mode == mode.down)
        {
           speed = moveSpeed * -1;
           if(transform.position.y <= movePoint)
           {
               speed = 0;
               transform.position.y = movePoint;
           }

        }
            

    }
    else if (j == 2)
    {
        if (mode == mode.down)
        {
            speed = moveSpeed;
            if (transform.position.y >= homePoint.y) {
                speed = 0;
                transform.position.y = homePoint.y;
            }
        }
        else
        speed = 0;
    }
    else if (j ==3)
    {
        if(mode == mode.up)
        {
            speed = moveSpeed * -1;
            if (transform.position.y <= movePoint)
            {
                speed = 0;
                transform.position.y = movePoint;
            }
        }
            
       else if(mode == mode.down)
        {
            speed = 0;
        }
            

    }
}
