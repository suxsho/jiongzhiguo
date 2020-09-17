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
            if (gameConfig.emerald < 12) {
                if (i == 0) text = "Ahhhhh, my castle, it’s like this now";
                if (i == 1) text = "And, we have become like this";
                if (i == 2) text = "just now , M told me";
                if (i == 3) text = "All this is done by the ghost, I want him to change us back";
                if (i == 4) text = "But we need to find 12 diamonds to find him";
                if (i == 5) text = "It’s too hard, Ahhhh Let me GG";
                if (i == 6) text = "I have heard that your soul is not from here";
                if (i == 7) text = "Is from another world,Is it like this?";
                if (i == 8) text = "So, can't let you help me";
                if (i == 9) text = "I know how to get you home, so I will send you back.";
                if (i == 10) text = "Thank you for your hard work!";
                if (i == 11) text = "And Tnank you come here!";
                if (i >= 12) { text = "..."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }
            else {
                if (i == 0) text = "You actually found 12 diamonds?";
                if (i == 1) text = "We all gave up at the beginning";
                if (i == 2) text = "Of course, thank you very much for doing this for us";
                if (i == 3) text = "So at least you can find the ghost";
                if (i == 4) text = "i will do accounts with he";
                if (i == 5) text = "We decided to let the ghost do something for us";
                if (i >= 6) { text = "..."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }
        }
        else
        {
            if (gameConfig.emerald < 12)
            {
                if (i == 0) text = "啊，我的城堡，现在就变成这样了";
                if (i == 1) text = "以及，我们也变成这样了";
                if (i == 2) text = "刚才我听艾萌告诉我了";
                if (i == 3) text = "是那个幽灵做的吧，想让他把我们变回去";
                if (i == 4) text = "但是他要我们收集到12块钻石才能找到他";
                if (i == 5) text = "这太难了吧，还是让这个王国彻底完蛋吧";
                if (i == 6) text = "另外，我有听说过，你的灵魂并不是来自于这里";
                if (i == 7) text = "而是另一个世界的灵魂，是这样的吧";
                if (i == 8) text = "所以，也不能强求让你帮助我";
                if (i == 9) text = "我知道让你回家的方法哦，所以我送你回去吧";
                if (i == 10) text = "这一路辛苦你了呢";
                if (i == 11) text = "感谢你来囧之国做客，希望以后有机会再来啊";
                if (i >= 12) { text = "..."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }
            else
            {
                if (i == 0) text = "你居然收集到了12块钻石？";
                if (i == 1) text = "说起来原本我们都放弃了，变不回来也没办法了";
                if (i == 2) text = "当然很感谢你能为我们做这样的事";
                if (i == 3) text = "这样至少可以找到幽灵了，我们还有账要跟他算呢";
                if (i == 4) text = "虽然说我们对能不能变回来都不抱以期望了";
                if (i == 5) text = "不过在你的帮助下，我们决定让幽灵帮我们做些事";
                if (i >= 6) { text = "..."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }

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
    talkMode = false;
    if (gameConfig.emerald < 12)
        Application.LoadLevel("end1");
    else
        Application.LoadLevel("world6-7");
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