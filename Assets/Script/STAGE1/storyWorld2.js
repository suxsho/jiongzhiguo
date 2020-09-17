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
            if (i == 0) text = "I saw you fought with that very strange man";
            if (i == 1) text = "I'm still thinking how to help you";
            if (i == 2) text = "It turned out that you were better than me";
            if (i == 3) text = "It seems that we do not mean that there is no fighting power";
            if (i == 4) text = "It's very good";
            if (i == 5) text = "Ha ha you don't say I like a cameo role";
            if (i == 6) text = "I can guess what you want to say";
            if (i == 7) text = "I saw it,the king was in the world 5 of the castle";
            if (i == 8) text = "The next we will go to the world 2";
            if (i == 9) text = "Ah? Why do you say why I know it so clearly";
            if (i == 10) text = "Because I can jump very high, ha ha ha";
            if (i == 11) text = "Next we continue their efforts, jump now!";
            if (i >= 12) { text = "flyyyyyyyy!"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else
        {
            if (i == 0) text = "刚才我看到你和那个长的极其奇怪的家伙对战了";
            if (i == 1) text = "我还在想怎么可以帮助一下你";
            if (i == 2) text = "结果没想到你比我更有办法啊";
            if (i == 3) text = "看来我们变成这样也不是说就没有战斗力啊";
            if (i == 4) text = "突然觉得这副身体好像也是很不错的";
            if (i == 5) text = "哈哈哈哈你就不要说我就像龙套角色一样的了";
            if (i == 6) text = "我发现我可以读心哦，就现在你肯定在吐槽我";
            if (i == 7) text = "说起来之前我看了下，国王被关在第五世界的城堡里";
            if (i == 8) text = "之前的叫做第一世界，接下来要去的是第二世界吧";
            if (i == 9) text = "啊？你说为什么我知道的那么清楚啊";
            if (i == 10) text = "因为刚才我在半空中把这片大地一眼看透了，就是五块大陆哦";
            if (i == 11) text = "接下来我们继续各自努力吧，我先跳囖";
            if (i >= 12) { text = "看我飞行！！"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
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
    Application.LoadLevel("world2");	
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