#pragma strict

var customSkin : GUISkin;
var text : String;
var slash : AudioClip;
var Obj : GameObject;

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

function OnGUI () 
{
	GUI.skin = customSkin;
	GUI.skin.label.fontSize = Mathf.Round(30 * m_fScaleWidth);  //自适应文字大小
	GUI.skin.button.fontSize = Mathf.Round(30 * m_fScaleWidth);    //自适应文字大小
    GUI.Label(Rect(20 * m_fScaleWidth, 25 * m_fScaleHeight, 930 * m_fScaleWidth, 60 * m_fScaleHeight), text);
}

function Update()
{

Screen.sleepTimeout = SleepTimeout.NeverSleep;
    //-----------------------------------------------------
    //            自动适应分辨率
    //-----------------------------------------------------
    m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
    m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
}
//繁体
if(gameConfig.language == "ChineseTraditional")
{
    text = "在一堆高樓大廈下有一座矮房子";
    yield WaitForSeconds (5);
    Camera.main.SendMessage("fadeOut"); 	//画面黑屏效果
    yield WaitForSeconds (1);
    Obj.transform.position.y = 0;
    text = "這裡有一比特喜歡玩遊戲的少年";
    yield WaitForSeconds (1);
    Camera.main.SendMessage("fadeIn"); 		//画面显示效果	
    yield WaitForSeconds (2.5);
    text = "他正在想这款游戏应该是怎样的";
    yield WaitForSeconds(2.5);
    text = "這個遊戲的開場好像讓他有點受不了";
    yield WaitForSeconds(2.5);
    text = "就是為什麼開篇動畫就是這樣的靜止畫面";
    yield WaitForSeconds(2.5);
    text = "而且好像還不允許跳過";
    yield WaitForSeconds(2.5);
    text = "這種枯燥無聊的開始畫面到底有什麼意義啊";
    yield WaitForSeconds (6);
    Obj.transform.position.y = 17;
    text = "";
    GetComponent.<Camera>().main.GetComponent.<AudioSource>().Stop();
    GetComponent.<Camera>().backgroundColor =  Color.black;
    GetComponent.<AudioSource>().PlayOneShot(slash);
    yield WaitForSeconds (3);
    text = "這是發生什麼事情了！";
    yield WaitForSeconds (3);
    Camera.main.SendMessage("fadeOut"); 	//画面黑屏效果
    yield WaitForSeconds (2);
    Application.LoadLevel (3);
}
else if (gameConfig.language == "English") {
    text = "There is a building here";
    yield WaitForSeconds(5);
    Camera.main.SendMessage("fadeOut"); 	//画面黑屏效果
    yield WaitForSeconds(1);
    Obj.transform.position.y = 0;
    text = "There's a teenager who likes to play games";
    yield WaitForSeconds(1);
    Camera.main.SendMessage("fadeIn"); 		//画面显示效果	
    yield WaitForSeconds(2.5);
    text = "He is thinking about what kind of game it is";
    yield WaitForSeconds(2.5);
    text = "but...";
    yield WaitForSeconds(2.5);
    text = "Why is the op not moving";
    yield WaitForSeconds(2.5);
    text = "How to play it";
    yield WaitForSeconds(2.5);
    text = "aaaaaa....";
    yield WaitForSeconds(2.5);
    Obj.transform.position.y = 17;
    text = "";
    GetComponent.<Camera>().main.GetComponent.<AudioSource>().Stop();
    GetComponent.<Camera>().backgroundColor = Color.black;
    GetComponent.<AudioSource>().PlayOneShot(slash);
    yield WaitForSeconds(3);
    text = "What happened!!!???";
    yield WaitForSeconds(3);
    Camera.main.SendMessage("fadeOut"); 	//画面黑屏效果
    yield WaitForSeconds(2);
    Application.LoadLevel(4);
}
else
{
    text = "在一堆高楼大厦下有一座矮房子";
    yield WaitForSeconds (5);
    Camera.main.SendMessage("fadeOut"); 	//画面黑屏效果
    yield WaitForSeconds (1);
    Obj.transform.position.y = 0;
    text = "这里有一位喜欢玩游戏的少年";
    yield WaitForSeconds (1);
    Camera.main.SendMessage("fadeIn"); 		//画面显示效果	
    yield WaitForSeconds (2.5);
    text = "他正在想这款游戏应该是怎样的";
    yield WaitForSeconds(2.5);
    text = "这个游戏的开场好像让他有点受不了";
    yield WaitForSeconds(2.5);
    text = "为什么开篇动画就是这样的静止画面";
    yield WaitForSeconds(2.5);
    text = "而且好像还不允许跳过";
    yield WaitForSeconds(2.5);
    text = "这种枯燥无聊的开始画面到底有什么意义啊";
    yield WaitForSeconds (2.5);
    Obj.transform.position.y = 17;
    text = "";
    GetComponent.<Camera>().main.GetComponent.<AudioSource>().Stop();
    GetComponent.<Camera>().backgroundColor =  Color.black;
    GetComponent.<AudioSource>().PlayOneShot(slash);
    yield WaitForSeconds (3);
    text = "哇！怎么突然我的身后电闪雷鸣了！";
    yield WaitForSeconds (3);
    Camera.main.SendMessage("fadeOut"); 	//画面黑屏效果
    yield WaitForSeconds (2);
    Application.LoadLevel (4);
}

