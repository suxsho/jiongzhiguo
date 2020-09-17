#pragma strict
//所有关卡完成后进入的统计界面，如果玩家的分数超过0就可以进入最终关

var customSkin : GUISkin;		//加载皮肤
static public var totalScore : int;
//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;
function Start () 
{
    //计算总分
    var gamecenter = gameObject.GetComponent("gamecenter");
    totalScore = gameConfig.player * 100 + gameConfig.jiongBi;
    getNewScore();
}

function getNewScore()
{

}

function OnGUI () 
{
    if(playerControls.cancontrol)
    {
        GUI.skin = customSkin;	
        GUI.skin.label.fontSize = Mathf.Round(30 * m_fScaleWidth);  //自适应文字大小
        if (gameConfig.language == "English")
            GUI.Label(Rect(100 * m_fScaleWidth, 10 * m_fScaleHeight, 900 * m_fScaleWidth, 100), "Yor are all dead: " + PlayerPrefs.GetInt("alldead"));
            else
        GUI.Label(Rect(100 * m_fScaleWidth, 10 * m_fScaleHeight, 900 * m_fScaleWidth, 100), "在整个游戏中，一共失败的次数是：" + PlayerPrefs.GetInt("alldead"));


    }

    //-----------------------------------------------------
     //            自动适应分辨率
     //-----------------------------------------------------
    m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
    m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 

}

function Update () {
	
}
