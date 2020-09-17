#pragma strict
static var alpha : float = 0.0;
static var talkMode : boolean = false;

var customSkin : GUISkin;		//加载皮肤
//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

function Start () {

}

function OnGUI () 
{
	GUI.skin = customSkin;												//调用皮肤
    if (talkMode)
    {
        if (gameConfig.language == "English")
            GUI.Label(Rect(20 * m_fScaleWidth, 25 * m_fScaleHeight, 930 * m_fScaleWidth, 60 * m_fScaleHeight), "BOSS：Pause!!");	
            else
        GUI.Label(Rect(20 * m_fScaleWidth, 25 * m_fScaleHeight, 930 * m_fScaleWidth, 60 * m_fScaleHeight), "BOSS：看我让你暂停！");		//位置以后再调
    }
	   

    //-----------------------------------------------------
    //            自动适应分辨率
    //-----------------------------------------------------
	m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
	m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
}

function Update () 
{
	GetComponent.<GUITexture>().color.a = alpha;
}