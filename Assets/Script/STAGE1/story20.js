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
    firstStage();
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
        if (gameConfig.language == "English")
        {
            if (i == 0) text = "WuWuWu, I don't want you to leave Wuu";
            if (i == 1) text = "you save the king now, no one will play with me wuu";
            if (i == 2) text = "Can't let you escape wuu";
            if (i == 3) text = "You can't leave me wuu";
            if (i == 4) text = "If you leave, no one will play with me wuu! ! !";
            if (i == 5) text = "I called all the enemies of the world to stop you wuu! ! ! !";
            if (i == 6) text = "And the magma will chasing you!!!!!";
            if (i == 7) text = "You are impossible to escape wuu!!!!!!";
            if (i >= 8) { text = "wuuwuuwuwuu!!!"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else
        {
            if (i == 0) text = "呜呜呜，我不要让你离开呜";
            if (i == 1) text = "你救出国王就没人陪我玩了呜";
            if (i == 2) text = "不可以让你逃出去呜！";
            if (i == 3) text = "你不能离开我的呜！！";
            if (i == 4) text = "要是你也走了，就再也没人陪我玩了呜！！！";
            if (i == 5) text = "我叫了全世界所有的敌人来阻止你呜！！！！";
            if (i == 6) text = "还有岩浆追你的呜";
            if (i == 7) text = "你是不可能逃掉的呜";
            if (i >= 8) { text = "呜呜呜"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }


		
		//开始游戏
		
		if (obj.transform.position.y - target.position.y > -0.5)
		gameStart();
	}

}

function gameStart()
{
    talkMode = false;
	GetComponent.<AudioSource>().clip = soundMusic;
	GetComponent.<AudioSource>().Play(); 		//放音乐
	playerControls.cancontrol = true;


	
}

/**stgOverStart 初次进入关卡判断是不是要向服务器POST没有过关的信息*/
function firstStage() {
    if (gameConfig.stages[19 - 1] == 0) {
        gameConfig.stgOverStart = true;
    }
}

