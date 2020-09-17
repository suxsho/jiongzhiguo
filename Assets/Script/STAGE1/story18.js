#pragma strict

//进入故事模式
var customSkin : GUISkin;		//加载皮肤
var i : int;
var text : String;				//显示的文字
var soundMusic : AudioClip;		//加载音乐
var talkMode : boolean = false; //对话模式（判断对话框出现

var obj : GameObject;
var objTips : GameObject;
var target : Transform;

var touchTips : boolean = false; //触摸提示，玩家在对话操作进行了触摸才会给这个提示

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

function Start () 
{
	bigPlayerControl.cancontrol = false;		//先让角色不能移动
	talkMode= true;				//开启说话
	var gameConfig = gameObject.GetComponent("gameConfig");
}

/**会话显示*/

function OnGUI () 
{
	GUI.skin = customSkin;		
	GUI.skin.label.fontSize = Mathf.Round(30 * m_fScaleWidth);  //自适应文字大小
	GUI.skin.button.fontSize = Mathf.Round(30 * m_fScaleWidth);    //自适应文字大小
	if(talkMode)
	GUI.Label (Rect (20 * m_fScaleWidth, 25 * m_fScaleHeight, 930 * m_fScaleWidth, 60 * m_fScaleHeight), text);										

	 //-----------------------------------------------------
     //            自动适应分辨率
     //-----------------------------------------------------
    m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
    m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
}

function Update () 
{
	/**按JUMP键说话跳跃的功能*/
	if(talkMode)
	{
		
		if(Input.GetButtonDown ("Jump"))
			i ++;
		if(Input.GetButton ("Fire1"))
		    i ++;

		if(Input.GetMouseButtonDown(0) && Input.touchCount > 0)
		{
		    touchTips = true;
		    i ++;
		}
		    
		
	    /**说话内容合集*/
        if (gameConfig.language == "English") {
            if (i == 0) text = "Hum hum";
            if (i == 1) text = "I usually like a funny character";
            if (i == 2) text = "But now it's dangerous...";
            if (i == 3) text = "You will find I'm very reliable";
            if (i == 4) text = "It's just I want to reduce the vigilance of the enemy";
            if (i == 5) text = "I jumped into the air, it was my power";
            if (i == 6) text = "Cube chan, wait, I'll save you!";
            if (i == 7) text = "You wait for me to come!";
            if (i == 8) text = "OH! remember! I,m M, not sunglasses kun!";
            if (i >= 9) { text = "now! try to click jump button!"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else
        {
            if (i == 0) text = "哼哼哼";
            if (i == 1) text = "虽然平时我就跟个搞笑角色一样存在";
            if (i == 2) text = "不过在囧之国遇到危机关头的时候";
            if (i == 3) text = "我可是很靠得住的";
            if (i == 4) text = "被你们关起来不逃走只是想降低敌人的警惕性你们知道吗";
            if (i == 5) text = "虽然说我一跳就升空了，不过我会告诉你们这就是我的力量";
            if (i == 6) text = "方块酱，等着，我去把你救出来！";
            if (i == 7) text = "现在你好好的等我来就行了！";
            if (i == 8) text = "对了，记得，请叫我艾萌，我不叫墨镜君！";
            if (i >= 9) { text = "来！按下跳跃试试吧！"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }


		
		//开始游戏
		
		if (obj.transform.position.y - target.position.y > -0.5)
		gameStart();
	}

}

function gameStart()
{
	talkMode= false;
	GetComponent.<AudioSource>().clip = soundMusic;
	GetComponent.<AudioSource>().Play(); 		//放音乐
    bigPlayerControl.cancontrol = true;		


	
}

