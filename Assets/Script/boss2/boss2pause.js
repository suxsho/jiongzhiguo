#pragma strict
//暂停功能

static var pauseBoo : boolean = false;		//暂停判断
var soundPause		: AudioClip;			//暂停



function Update () 
{

	/**暂停与开始*/
	if (pauseBoo)
	{
		Time.timeScale = 0;		//直接将时间停止
		
		var i = Random.Range(0, 1000);
		if (i > 998 )
		{
			i = 0;
			storystage7.musicPlay = 2;	//2代表隔壁代码音乐继续放
			pauseGUI.alpha = 0;			//暂停字幕消失
			pauseGUI.talkMode = false;	//消失暂停文字
			pauseBoo = false;
		}
	}
	
	if (!pauseBoo)
	{
		Time.timeScale = 1;		//启动
	}

}

//判断碰撞角色

function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Player")
	{
		GetComponent.<AudioSource>().clip = soundPause;
		GetComponent.<AudioSource>().Play();				//放暂停音乐
		storystage7.musicPlay = 1;	//1代表隔壁的音乐停了
		pauseGUI.alpha = 1;			//出现暂停字幕
		pauseGUI.talkMode = true;	//出现暂停文字
		pauseBoo = true;
	}
	
}