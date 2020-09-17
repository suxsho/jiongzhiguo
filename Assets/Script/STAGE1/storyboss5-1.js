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
		    if (i == 0) text = "嘿，方块酱，我来了！";
		    if (i == 1) text = "被关在笼子里真是辛苦你了，而且这笼子这么鬼畜的运动";
		    if (i == 2) text = "这到底是什么鬼啊！！！";
            if (i == 3) text = "你还好吗，这么久都这样不晕吗";
            if (i == 4) text = "啊，什么，是因为我来到这里之后笼子才这样奇妙运动的吗";
		    if (i == 5) text = "难道是笼子知道我要救你出去，它故意不配合我吗";
		    if (i == 6) text = "总之，我还是要试试把你救出来";
            if (i == 7) text = "应该跳起来撞关你的笼子就可以了";
		    if (i >=8) {text = "不过好像撞不准我就飞走了呢";obj.transform.position = Vector3.Lerp (obj.transform.position, target.position,Time.deltaTime * 5);}

		
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

