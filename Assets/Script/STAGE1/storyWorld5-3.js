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
var m_fScaleHeight: float;

//关声音
private var fireRate = 0.2;
private var nextFire = 0.0;
private var audioValue: float = 1;

function Start () 
{
	playerControls.cancontrol = false;		//先让角色不能移动
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
    openTalk();
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
        if (gameConfig.language == "English")
        {
            if (i == 0) text = "Hey! Wait! Who tell you it's end! ? (Touch continue)";
            if (i == 1) text = "I am still there";
            if (i == 2) text = "Hey! Can this STAFF stop?";
            if (i >= 3) { text = "...."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
		else
		{
		    if (i == 0) text = "喂！等等！谁告诉你结束了！？(点击继续）";
		    if (i == 1) text = "方块酱也被抓走了就结束了吗？";
            if (i == 2) text = "我还在呢，急什么急啊！";
            if (i == 3) text = "喂！这个字幕能不能停下来啊！";
		    if (i >=4) {text = "....";obj.transform.position = Vector3.Lerp (obj.transform.position, target.position,Time.deltaTime * 5);}
		}

		
		//开始游戏
		
        if (obj.transform.position.y - target.position.y > -0.5)
        {
            gameStart();
            if (Time.time > nextFire) {

                nextFire = Time.time + fireRate;
                audioValue -= 0.2;
                GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = audioValue;
            }
        }

	}

}

function gameStart()
{
    Camera.main.SendMessage("fadeOut");
    yield WaitForSeconds(3);
    talkMode = false;
	Application.LoadLevel ("stageUI17");
	
}

//等待几秒后出现剧情
function openTalk()
{
    yield WaitForSeconds(15);
    talkMode = true;				//开启说话
}

