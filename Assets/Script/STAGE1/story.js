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
        if (gameConfig.language == "English")
        {
            if (i == 0) text = "Ah, I find you in the end!";
            if (i == 1) text = "We are really cursed";
            if (i == 2) text = "I can only jump, and jump very high";
            if (i == 3) text = "Can't control myself at all";
            if (i == 4) text = "looks as if you're okay, but you can't take weapons";
            if (i == 5) text = "And you can't talk?";
            if (i == 6) text = "Because I've been talking to myself";
            if (i == 7) text = "（Cube nodded silently）";
            if (i == 8) text = "All right, self - introduction. I'm M,The king's guard";
            if (i == 9) text = "Then the king was captured, and we were now turned into this.";
            if (i == 10) text = "We're going to save the king now, and turn back to the original";
            if (i == 11) text = "The world is divided into blocks,";
            if (i == 12) text = "and we have to collect lanterns and open the boundary.";
            if (i == 13) text = "Those damn enemies I don't know how to kill them!";
            if (i == 14) text = " It seems to be the only way to dodge the past";
            if (i >= 15) { text = "I jump now!! Wow, ah ah..."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else
        {
            if (i == 0) text = "啊，总算找到你了！";
            if (i == 1) text = "我发现我们的确是被魔王诅咒了";
            if (i == 2) text = "我现在已经是个废物了，我只能跳跃，而且跳的非常高";
            if (i == 3) text = "根本控记不聚记几";
            if (i == 4) text = "不过你看起来好像还好，除了不能拿武器";
            if (i == 5) text = "哦不，我发现你是不是失忆了，而且也不会说话了？";
            if (i == 6) text = "因为我发现我一直在自言自语，好像你也不记得之前的事情";
            if (i == 7) text = "（方块酱用心灵感应让墨镜酱知道了自己失忆和失语的事实）";
            if (i == 8) text = "好吧，我从新介绍下我自己吧，我叫艾萌，我们都是国王的护卫";
            if (i == 9) text = "之后国王被俘虏了，我们也被变成了现在这样";
            if (i == 10) text = "所以我们现在要去救国王，以及让我们变回原本的样子";
            if (i == 11) text = "世界也被分成了一个个区块，我们还得收集灯笼打开结界";
            if (i == 12) text = "而且最该死的是，我们现在的这种状态，战斗力甚至连5都没有";
            if (i == 13) text = "那些该死的敌人我都不知道怎么消灭他们！好像只能一路躲避过去了";
            if (i == 14) text = "我们只能分头行动了，感觉你还比我更灵活，因为我只能跳";
            if (i >= 15) { text = "我先跳了！！哇啊啊啊啊救命啊"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
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

