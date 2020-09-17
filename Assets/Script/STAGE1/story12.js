#pragma strict

//进入故事模式
var customSkin : GUISkin;		//加载皮肤
var i : int;
var text : String;				//显示的文字
var soundMusic : AudioClip;		//加载音乐
var talkMode : boolean = false; //对话模式（判断对话框出现

var obj : GameObject;
var target : Transform;

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

function Start () 
{
	playerControls.cancontrol = false;		//先让角色不能移动
	talkMode= true;				//开启说话
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

		if(Input.GetMouseButtonDown(0))
		    i ++;
		
		    /**说话内容合集*/
        if (gameConfig.language == "English") {
            if (i == 0) text = "hi!long time no see";
            if (i == 1) text = "This stage is very difficult";
            if (i == 2) text = "its a challenge stage";
            if (i == 3) text = "If you think it's very hard";
            if (i == 4) text = "you can try to exit this stage";
            if (i == 5) text = "now first, let's try it.";
            if (i >= 6) { text = "hurry up！"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else {
            if (i == 0) text = "总觉得好像我们曾经在这个地方遇见过";
            if (i == 1) text = "哦对了，看来我们是乱入到了挑战模式里了";
            if (i == 2) text = "我发现这里除了普通关卡外，还有挑战关卡";
            if (i == 3) text = "挑战关卡感觉就是之前某个关卡的加强版";
            if (i == 4) text = "不过好像难度提高了不少";
            if (i == 5) text = "但愿可以顺利通过吧";
            if (i == 6) text = "总之我会和你一起努力的！";
            if (i >= 7) { text = "加油哦！"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
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
	playerControls.cancontrol = true;
	
}

