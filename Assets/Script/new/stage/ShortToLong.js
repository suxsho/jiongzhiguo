#pragma strict
//自动伸长缩短的棒子

private var a : float;      //棒子长度
private var longMode : boolean = false;       //是否处于增长模式，否等于变短
private var i : float;


@Header ("设置X的最大值和最小值")
var minX : float = 5;
var maxX : float = 20;

@Header ("设置X的速度")
var speedX : float = 0.1;

function Start () {
    a = maxX;
}

function Update () 
{
    //固定默认的长度
    transform.localScale.x = a;

    if(a <= minX)
        longMode = true;
    if (a >= maxX)
        longMode = false;

    if(longMode)
    {
        toLong();
    }
    else
    {
        toShort();
    }

}

//伸长
function toLong()
{
    if (i >= 0.01)  
    {
        a += speedX;
        //-----下面的保持不动------
        i = 0;
    }
    i += Time.deltaTime;
}

//缩短
function toShort()
{
    if (i >= 0.01)  
    {
        a -= speedX;
        //-----下面的保持不动------
        i = 0;
    }
    i += Time.deltaTime;
}
