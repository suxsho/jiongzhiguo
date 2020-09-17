#pragma strict
//玩家碰撞到这个东西后出现隐藏的机关，需要在gameobject里设置机关

enum choseMode {SW,CUBE};
@Tooltip ("开关，SW是碰撞点，CUBE是放入的object")
var choseMode : choseMode;   //定义一个序列组

var CUBEy : float = 6.5;

private var velocity : Vector3 = Vector3.zero; 	     //速度
private var homePoint : Vector3 = Vector3.zero; 	//初始位置

static var cubeUpmode = false;         //cube是否为UP模式

private var i : float;
var soundD	: AudioClip;


function Start () {
    if(choseMode == choseMode.CUBE)
        homePoint = transform.position;	

}

function Update () {
    CUBEScript();
    //给cube添加固定移动速度
    if(choseMode == choseMode.CUBE)
        transform.Translate(velocity * Time.deltaTime);

    if(choseMode == choseMode.SW)
    {
        if(cubeUpmode)
            gameObject.GetComponent.<Renderer>().material.color.a = 0.2;
        else
            gameObject.GetComponent.<Renderer>().material.color.a = 1.0;
    }

}

function LateUpdate () 
{
    /*角色死亡返回*/
    if(choseMode == choseMode.CUBE)
    if (playerconfig.dead)
    {
        transform.position  =  homePoint;
        velocity.x = 0;
        velocity.y = 0;

        cubeUpmode = false;
    }
}

//碰撞判断
function OnTriggerEnter (other : Collider )
    { 
        if(choseMode == choseMode.SW)
        if (other.tag == "Player")
        {
            SWScript();
        }
    }

//开关执行的操作
function SWScript()
{

    if(!cubeUpmode)
    {
        GetComponent.<AudioSource>().clip = soundD;
        GetComponent.<AudioSource>().Play();
    }
    cubeUpmode = true;

}

//CUBE执行的操作
function CUBEScript()
{
    if(choseMode == choseMode.CUBE)
    {
        if(transform.position.y >= CUBEy)
        {
            velocity.y = 0;
            if (i >= 3)  
            {
                cubeUpmode = false;
                //-----下面的保持不动------
                i = 0;
            }
            i += Time.deltaTime; 

        }



        //模式判断
        if(cubeUpmode)
        {
            if(transform.position.y <= CUBEy)
            velocity.y = 30;
        }        
        else if(transform.position.y >= homePoint.y)
        {
            velocity.y = -30;
            i = 0;
        }
            
        else if(transform.position.y <= homePoint.y)
        {
            velocity.y = 0;
            i = 0;
        }
            
    }
}


