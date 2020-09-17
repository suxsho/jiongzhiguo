#pragma strict
//按照音乐模式抖动的摄像机
var soundD	: AudioClip;
var i : float;
var j : float;

var soundEf : boolean = false;
function Start () {
    i = 1;
    GetComponent.<AudioSource>().clip = soundD;  
}

function FixedUpdate () 
{
    //每秒执行一次操作

    if (i >= 0.48)  
    {
        if(soundEf)
        GetComponent.<AudioSource>().Play();
        //-----下面的保持不动------
        i = 0;
    }
    i += Time.deltaTime;
}

//进入区域
function OnTriggerEnter (other : Collider)
    {
        if (other.tag == "Player")
        {
            soundEf = true;
        }

	
    }
    //离开区域
    function OnTriggerExit (other : Collider)
        {
            if (other.tag == "Player")
            {
                soundEf = false;     
            }
	
        }
