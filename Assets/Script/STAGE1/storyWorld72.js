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
            if (i == 0) text = "Wait!!";
            if (i == 1) text = "Danm ghost!You think it's over?";
            if (i == 2) text = "You can't return ours to original?";
            if (i == 3) text = "Okey...The king told me....";
            if (i == 4) text = "If you can't return,We have no way too";
            if (i == 5) text = "Now,We have to keep this appearance...";
            if (i == 6) text = "But you must atone and find how to return us";
            if (i == 7) text = "And bulid our country with us!";
            if (i == 8) text = "We want change our country,Make it a park";
            if (i == 9) text = "You must do this";
            if (i == 10) text = "I wish everyone love here in the future";
            if (i == 11) text = "Thank you Cube Chan";
            if (i == 12) text = "I don't know you are from other world";
            if (i == 13) text = "good bye!!";
            if (i >= 13) { text = "..."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else
        {
            if (i == 0) text = "等一等！";
            if (i == 1) text = "可恶的幽灵！你以为这样就完了吗";
            if (i == 2) text = "你不仅把我们变成这样，居然还没办法变回去！";
            if (i == 3) text = "不过，之前我已经和国王商讨过了";
            if (i == 4) text = "现在已经这样了，怎么抱怨也没用的对吧";
            if (i == 5) text = "所以既然都无法改变，那就暂时让我们保持这样吧";
            if (i == 6) text = "所以你得赎罪，一方面要帮助我们找回变回原样的办法";
            if (i == 7) text = "另外就是帮助我们一起发展王国吧！";
            if (i == 8) text = "吸引那些游客前来观光，把囧之国打造成一个挑战的乐园";
            if (i == 9) text = "这也就是你赎罪的方法了";
            if (i == 10) text = "我希望以后大家都会喜欢囧之国的";
            if (i == 11) text = "对了，方块酱的话，感谢你一路的帮助";
            if (i == 12) text = "在一开始，我根本不知道你不是这里的人";
            if (i == 13) text = "也没有什么多余想说的，只有一句：谢谢你";
            if (i >= 13) { text = "再见啦..."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
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
	Application.LoadLevel ("end2");	
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