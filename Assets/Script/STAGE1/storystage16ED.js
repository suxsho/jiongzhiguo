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
private var m_fScreenWidth : float = 960;
private var m_fScreenHeight : float = 540;
// scale factor
private var m_fScaleWidth : float;
private var m_fScaleHeight : float;

//关声音
private var fireRate = 0.2;
private var nextFire = 0.0;
private var audioValue : float = 1;

function Start () 
{
	talkMode= false;				//开启说话
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
            if (i == 0) text = "How lovely this white cube!";
            if (i == 1) text = "I think you originally not like this";
            if (i == 2) text = "I'm sorry,I can't help you";
            if (i == 3) text = "Have you seen a person who used a glove to attack a monster?";
            if (i == 4) text = "I am looking for him, he is in danger.";
            if (i == 5) text = "In fact, God has given him a sword of destruction.";
            if (i == 6) text = "Can kill all monsters";
            if (i == 7) text = "But he can't lift the sword, so he can only use his gloves";
            if (i == 8) text = "He is probably dangerous now";
            if (i == 9) text = "what? What, you said that he just disappeared?";
            if (i == 10) text = "I must go find him right away!";
            if (i >= 11) { text = "Goodbye!I wish I can meet you again."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else
        {
            if (i == 0) text = "啊，一个可爱的白色小方块";
            if (i == 1) text = "你应该是被恶魔变成了这样吧";
            if (i == 2) text = "对不起，我也帮不了你";
            if (i == 3) text = "你有看见一个用拳套攻击怪物的人吗";
            if (i == 4) text = "我正在寻找他，他遇到危险了";
            if (i == 5) text = "本来神有赠送他一把灭世之剑";
            if (i == 6) text = "可以消灭一切魔物";
            if (i == 7) text = "可惜他举不起剑，所以只能用拳套了";
            if (i == 8) text = "他现在大概有危险吧";
            if (i == 9) text = "啊？什么，你说他刚才消失了？";
            if (i == 10) text = "我得马上去寻找他！";
            if (i >= 11) { text = "我们有缘再见！"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }



		
		//开始游戏
		
		if (obj.transform.position.y - target.position.y > -0.5)
		{
		    gameStart();
		    }
		}

	}


function gameStart()
{
    talkMode= false;
    playerControls.cancontrol = true;
}

//触发剧情
function OnTriggerEnter(other:Collider)
    {
        /**挂掉的脚本*/
        if (other.tag == "Player")
        {
            talkMode = true;
            playerControls.cancontrol = false;
        }
    }