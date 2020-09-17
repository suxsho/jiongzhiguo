#pragma strict
//让地板消失 或出现
//判断碰撞角色
var  mat : Material;
var  mat2 : Material;
var  mat3 : Material;
var  mat4 : Material;
var  mat5 : Material;
var  mat6 : Material;

var colorA : float = 1.0;
var i : float;

var outLine : boolean = false;      //判断玩家是否在区域
var recover : boolean = false;      //反向玩法（即进入区域后会看见看不到的内容

function Start()
{
  
}
function LateUpdate () 
{
    //如果玩家死掉颜色还原
    if (playerconfig.dead && !recover)
    {
        mat.color.a = 1.0;
        mat2.color.a = 1.0;
        mat5.color.a = 1.0;
    }
    else if (playerconfig.dead && recover)
    {
        mat3.color.a = 0.0;
        mat4.color.a = 0.0;
        mat6.color.a = 0.0;
    }
}

function Update () 
{
    //改变透明度
    if(outLine)
    {
        if (!recover)
        {
            //每秒执行一次操作
            if (i >= 0.05 && colorA >= 0.0)  
            {
                colorA -= 0.1;
                mat.color.a = colorA;
                mat2.color.a = colorA;  
                mat5.color.a = colorA; 
                //-----下面的保持不动------
                i = 0;
            }
        }
        else if (recover)
        {
            //每秒执行一次操作
            if (i >= 0.05 && colorA <= 1.0)  
            {
                colorA += 0.2;
                mat3.color.a = colorA;
                mat4.color.a = colorA;   
                mat6.color.a = colorA; 
                //-----下面的保持不动------
                i = 0;
            }
        }

        i += Time.deltaTime;

    }
    if(!outLine)
    {
        if (!recover)
        {
            //每秒执行一次操作
            if (i >= 0.05 && colorA <= 1.0)  
            {
                colorA += 0.2;
                mat.color.a = colorA;
                mat2.color.a = colorA;   
                mat5.color.a = colorA; 
                //-----下面的保持不动------
                i = 0;
            }
        }
        else if (recover)
        {
            //每秒执行一次操作
            if (i >= 0.05 && colorA >= 0.0)  
            {
                colorA -= 0.1;
                mat3.color.a = colorA;
                mat4.color.a = colorA;   
                mat6.color.a = colorA;  
                //-----下面的保持不动------
                i = 0;
            }
        }
        i += Time.deltaTime;
    }
}
//进入区域
function OnTriggerEnter (other : Collider)
    {
        if (other.tag == "Player")
        {
            outLine = true;
        }

	
    }
//离开区域
    function OnTriggerExit (other : Collider)
        {
            if (other.tag == "Player")
            {
                outLine = false;             
            }
	
        }
