#pragma strict
//倒计时功能

var timeR : int = 5;
private var timeSave : int;			//用于存储初始时间
private var nextFire = 0.0;		//用于按秒减时间
private var timeover : boolean = false;		//记录timeover状态
//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

function Start () 
{
    timeSave = timeR;
    
}

function LateUpdate()
{
    if (playerconfig.dead)
    {
        timeR = timeSave;
        timeover = false;
    }
}

function Update () 
{

	GetComponent.<GUIText>().text = timeR.ToString();		//显示剩余时间
	GetComponent.<GUIText>().fontSize = Mathf.Round(40 * m_fScaleWidth);

    //-----------------------------------------------------
    //            自动适应分辨率
    //-----------------------------------------------------
	m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
	m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
	/**按秒计时功能*/
	if(Time.time > nextFire && !stageOver.stageO)
	{
		nextFire = Time.time + 1;
		//上面的内容固定不变
		timeR -= 1;
	}
	
	
	/**时间到0不再减*/
	if (timeR < 0)
		timeR = 0;
	
	/**时间到0玩家死*/
	
	if (timeR <= 0 && !timeover)
	{
		playerconfig.timeover = true;
		timeover = true;
	}
}