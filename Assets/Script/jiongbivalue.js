#pragma strict
//囧币显示

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

function Start () {
	var gameConfig = gameObject.GetComponent("gameConfig");
}

function Update () {
    GetComponent.<GUIText>().fontSize = Mathf.Round(40 * m_fScaleWidth);
    GetComponent.<GUIText>().text = gameConfig.jiongBi.ToString();

    //-----------------------------------------------------
    //            自动适应分辨率
    //-----------------------------------------------------
    m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
    m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
}