#pragma strict
//按照音乐节奏上下移动的怪
var soundD	: AudioClip;
var i : float;
var j : float;                                  //判断模式
private var velocity : Vector3 = Vector3.zero; 	//初始位置
private var speed : float;
var homePoint : Vector3;				//存档点

var movePoint : float;
var moveSpeed: float;

var seTime: float = 0.48;

enum boss5Mode {up,down};
var mode: boss5Mode;   //定义一个序列组
function Start () {
    i = 1;

    homePoint = transform.position;	
}

function LateUpdate () 
{
    transform.Translate(velocity * Time.deltaTime);
    velocity.x = 0;
    velocity.y = speed;
}

function FixedUpdate () 
{
    //每秒执行一次操作

    if (i >= seTime)  
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
        speed = 0;
    }
    else if (j == 1)
    {
        if(mode == mode.up)
        {
            speed = moveSpeed;
            if(transform.position.y >= movePoint)
            {
                speed = 0;
                transform.position.y = movePoint;
            }
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
        speed = 0;
    }
    else if (j ==3)
    {
        if(mode == mode.up)
        {
            speed = moveSpeed * -1;
            if(transform.position.y <= homePoint.y)
            {
                speed = 0;
                transform.position.y = homePoint.y;
            }
        }
            
       else if(mode == mode.down)
        {
            speed = moveSpeed;
            if(transform.position.y >= homePoint.y)
            {
                speed = 0;
                transform.position.y = homePoint.y;
            }
        }
            

    }
}
