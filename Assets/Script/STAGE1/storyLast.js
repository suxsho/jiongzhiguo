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
	    //繁体
		if(gameConfig.language == "ChineseTraditional")
		{
            if (i == 0) text = "啊！方块酱！我还担心你回不来了呢！";
            if (i == 1) text = "真是不容易啊，我们终于救出国王了";
            if (i == 2) text = "只是，我们还不能变回原来的样子";
            if (i == 3) text = "说起来，我发现这里有一份数据呢";
            if (i >= 4) { text = "我们来看看吧"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else if (gameConfig.language == "English")
        {
            if (i == 0) text = "Hey! Cube chan! you are back!";
            if (i == 1) text = "It’s not easy, we finally saved the king.";
            if (i == 2) text = "but,We still can't change back to the original";
            if (i == 3) text = "Then,I find a data.";
            if (i >= 4) { text = "Let us see"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }

		else
		{
            if (i == 0) text = "啊！方块酱！我还担心你回不来了呢！";
            if (i == 1) text = "真是不容易啊，我们终于救出国王了";
            if (i == 2) text = "只是，我们还不能变回原来的样子";
            if (i == 3) text = "说起来，我发现这里有一份数据呢";
            if (i >= 4) { text = "我们来看看吧"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
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

