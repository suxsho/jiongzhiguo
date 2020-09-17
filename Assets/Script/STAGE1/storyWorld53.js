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

function Update() 
{
    cameraSmooth2D.cameraShake = true;
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
            if (i == 0) text = "Ahahah Fortunately, I arrived in time ";
            if (i == 1) text = "Cube Chan, I did a good job";
            if (i == 2) text = "[King] Ahhhhhhh, who am I, where am I?";
            if (i == 3) text = "[King] Who are you, why are you so strange?";
            if (i == 4) text = "Did the king wake up? I am your right guard M!";
            if (i == 5) text = "[King] How do you all become like this!";
            if (i == 6) text = "Weird magic,and you are very strange too, you don't know?";
            if (i == 7) text = "[King] Ahhhhhh, what happened!";
            if (i == 8) text = "It's a long story, in short, we finally saved you!";
            if (i == 9) text = "Cube Chan, I took the King  go now!";
            if (i == 10) text = "This king ... bigger than me .. so tired";
            if (i == 11) text = "Escape by yourself!";
            if (i >= 12) { text = "I am leaving first!"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
		else
		{
            if (i == 0) text = "啊哈哈哈，还好我及时到场了！";
		    if (i == 1) text = "方块酱我做的不错吧";
            if (i == 2) text = "【国王】 啊啊啊啊啊啊我是谁我在哪";
            if (i == 3) text = "【国王】 你们又是谁，怎么长的怪怪的";
            if (i == 4) text = "啊国王清醒了吗！我是你的右护M啊！";
            if (i == 5) text = "【国王】 你们怎么全都变成这样了！";
            if (i == 6) text = "奇怪的魔法啊，其实你也变得很奇怪了你不知道吗";
            if (i == 7) text = "【国王】 天啊，发生什么事情了！";
            if (i == 8) text = "说来话长，总之我们终于救出你了！";
            if (i == 9) text = "方块酱，我带着国王先走一步咯！";
            if (i == 10) text = "我要顶着跟我差不多大的国王出去还真有点困难啊！";
            if (i == 11) text = "你自己加油逃出来吧！";
            if (i >= 12) { text = "我先走了哦";obj.transform.position = Vector3.Lerp (obj.transform.position, target.position,Time.deltaTime * 5);}
		}

		
		//开始游戏
		
		if (obj.transform.position.y - target.position.y > -0.5)
		{
		    gameStart();
		    if(Time.time > nextFire){

		        nextFire = Time.time + fireRate;
		        audioValue -= 0.2 ;
		        GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = audioValue;
		    }
		}

	}

}

function gameStart()
{

    Camera.main.SendMessage("fadeOut");
    yield WaitForSeconds (3);
	talkMode= false;
	Application.LoadLevel ("story5-5");	
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