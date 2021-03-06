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
	playerControls.cancontrol = false;		//先让角色不能移动
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
        //简体
		else
		{
		    if (i == 0) text = "通过了层层阻碍后终于再一次战胜了强敌";
		    if (i == 1) text = "没有了墨镜先生的指引所以我应该走向何方呢";
            if (i == 2) text = "不过也只能前进了吧，前方的风格很诡异呢";
            if (i == 3) text = "好像是要与之前的幽灵头目进行最终决战了";
		    if (i >=4) {text = "";obj.transform.position = Vector3.Lerp (obj.transform.position, target.position,Time.deltaTime * 5);}
		}

		
		//开始游戏
		
		if (obj.transform.position.y - target.position.y > -0.5)
		gameStart();
	}

}

function gameStart()
{
	talkMode= false;
	Application.LoadLevel ("world1");
	
}

