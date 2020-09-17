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
            if (i == 0) text = "What!You found 12 dianonds wuu?";
            if (i == 1) text = "wuuuuu!I'm lost!!!";
            if (i == 2) text = "I konw you want me return them original wuu";
            if (i == 3) text = "but, I don't konw how to do...wuu";
            if (i == 4) text = "I just.. just want you play with me wuu";
            if (i == 5) text = "I hope you can remember me wuu..";
            if (i == 6) text = "I konw you from the other world wuu";
            if (i == 7) text = "I don't think that you can find me at last wuu";
            if (i == 8) text = "Wuu you will forgot me in the future wuu";
            if (i == 9) text = "So I made one and one challenge wuu";
            if (i == 10) text = "At last the challenge have been overed wuu";
            if (i == 11) text = "Nobody remember me,I'm a along ghost forever wuu";
            if (i >= 12) { text = "see you!wuu"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
        }
        else
        {
            if (i == 0) text = "我这精心设计的钻石挑战，居然也达成了呜";
            if (i == 1) text = "好呜，我承认你们战胜我了呜";
            if (i == 2) text = "我知道呜，你们要想让我把你们变回去呜";
            if (i == 3) text = "只是呜，我不知道变回去的方法呜";
            if (i == 4) text = "我只是想愚弄你们呜，想让你们陪我玩呜";
            if (i == 5) text = "只是希望你们记得我这个幽灵呜";
            if (i == 6) text = "我知道你不是这个世界的人呜，就像游戏一样呜";
            if (i == 7) text = "我根本就没有想过你还能最后见到我呜";
            if (i == 8) text = "不过，最后总会忘记的呜";
            if (i == 9) text = "所以为了多让你留在这里，我设计了一个又一个挑战呜";
            if (i == 10) text = "但是我的精力也是有限的呜，我只能做到这样了呜";
            if (i == 11) text = "最后没有人会记得我，我还是那个孤独的幽灵呜";
            if (i >= 12) { text = "再见呜"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
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
    Application.LoadLevel("world6-7-2");	
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