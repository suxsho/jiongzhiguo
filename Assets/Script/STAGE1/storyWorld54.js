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
cameraSmooth2D.cameraShake = false;
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
            if (i == 0) text = "呜呜呜，你们再飞呜？世界已经被我停止了呜！";
		    if (i == 1) text = "国王又被我抓起来了呜？";
            if (i == 2) text = "在这里告诉你们个可怕的事呜";
            if (i == 3) text = "其实把你们变成方块的就是我呜，呜呜呜";
            if (i == 4) text = "国王被捉走，让你们挑战的都是我呜";
            if (i == 5) text = "所以我说过许多次了，我是这个世界的主宰呜呜呜";
            if (i == 6) text = "好了呜，最后的时刻了，我就让你和国王同归于尽呜";
            if (i >= 7) { text = "呜呜呜！！";obj.transform.position = Vector3.Lerp (obj.transform.position, target.position,Time.deltaTime * 5);}
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
	Application.LoadLevel ("boss5");	
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