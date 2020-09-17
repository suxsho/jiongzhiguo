#pragma strict
//提示盒子，用来收囧币的

var customSkin : GUISkin;		//加载皮肤

var jiongbi : int;
var text : String;				//显示给玩家看的文本存储

var textQ : String; 			//配置的提问文字
var textA : String; 			//配置的回答文字
//繁体
var textQT : String; 			//配置的提问文字
var textAT: String; 			//配置的回答文字

//英文
var textQEng: String; 			//配置的提问文字
var textAEng: String; 			//配置的回答文字

var talkMode : boolean = false; //对话模式（判断对话框出现
var touchGetdown : boolean = false;

private var waitTimeMode : boolean = false;	//防止角色跳起来到盒子上面又下来的时候再出现提示

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;


/**显示内容*/

function OnGUI () 
{
    GUI.skin = customSkin;												//调用皮肤
    GUI.skin.button.fontSize = Mathf.Round(30 * m_fScaleWidth);
    GUI.skin.label.fontSize = Mathf.Round(30 * m_fScaleWidth);
	if(talkMode)
	{
	    GUI.Label (Rect (20 * m_fScaleWidth, 80 * m_fScaleHeight, 930 * m_fScaleWidth, 60 * m_fScaleHeight), text);		//位置以后再调
        if (!touchGetdown)
            if (gameConfig.language == "English")
            {
                if (GUI.Button(Rect(0 * m_fScaleWidth, 175 * m_fScaleHeight, 90 * m_fScaleWidth, 300 * m_fScaleHeight), "Next"))
                    touchGetdown = true;
            }
            else
            {
                if (GUI.Button(Rect(0 * m_fScaleWidth, 175 * m_fScaleHeight, 90 * m_fScaleWidth, 300 * m_fScaleHeight), "继续"))
                    touchGetdown = true;
            }

        if (gameConfig.language == "English")
        {
            if (GUI.Button(Rect(880 * m_fScaleWidth, 175 * m_fScaleHeight, 90 * m_fScaleWidth, 300 * m_fScaleHeight), "Exit"))
                tipsClose();
        }
        else
        {
            if (GUI.Button(Rect(880 * m_fScaleWidth, 175 * m_fScaleHeight, 90 * m_fScaleWidth, 300 * m_fScaleHeight), "退出"))
                tipsClose();
        }

	}

    //-----------------------------------------------------
    //            自动适应分辨率
    //-----------------------------------------------------
	m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
	m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
	
}

/**连接gameconfig数据中心*/
function Start () 
{
	var gameConfig = gameObject.GetComponent("gameConfig");
}

function Update() 
{	
	//没有看答案的时候按g看答案
    if (talkMode && Input.GetButtonDown("Fire1") || talkMode && touchGetdown)
	{
		//在没获得答案的时候扣囧币获得答案后就不扣了
		if(text != textA)
		{
			//在没有获得答案的状态下先判断角色是否有足够的囧币
			if(gameConfig.jiongBi - jiongbi >= 0)
			{
			    gameConfig.jiongBi -= jiongbi;	//扣除囧币
			    if(gameConfig.language == "ChineseTraditional")
                    text = textAT;					//显示回答文字
                else if (gameConfig.language == "English")
                    text = textAEng;
			    else
			        text = textA;					//显示回答文字
			}
			else
            {
                if (gameConfig.language == "English")
                    text = "Is your coin enough to pay?";
                    else
				text = "你的币真够支付吗？";
			}
			
		}
		else
		{
		    if(gameConfig.language == "ChineseTraditional")
                text = textAT;					//显示回答文字
            else if (gameConfig.language == "English")
                text = textAEng;
		    else
		        text = textA;
		}
			
			
		
		//如果囧币不够
		
		
	}
	
	//按K统一关闭
	if (talkMode && Input.GetButtonDown("Jump"))
	{
		tipsClose();		
	}
}


/**角色碰到盒子后游戏内容停止*/

function OnTriggerEnter(other:Collider)
{
	if (!waitTimeMode)
	{
		if(other.gameObject.tag == "Player")
		{
		    if(gameConfig.language == "ChineseTraditional")
                text = textQT;			//显示提问的文字
            else if (gameConfig.language == "English")
                text = textQEng;
		    else
		        text = textQ;
			talkMode = true;
			Time.timeScale = 0;		//直接将时间停止
			playerControls.cancontrol = false;
		}
	}
}

/**防止角色挑起落下又继续撞到盒子的时间判断*/

function tipsClose()
{
    talkMode = false;	//取消对话框
    touchGetdown = false;
    Time.timeScale = 1;	//以正常速度开始游戏
    playerControls.cancontrol = true;
	waitTimeMode = true;
	//给盒子变个颜色表示状态变了
	gameObject.GetComponent.<Renderer>().material.color.a = 0.2;
	
	yield WaitForSeconds(1);
	waitTimeMode = false;
	//给盒子变个颜色表示状态变了
	gameObject.GetComponent.<Renderer>().material.color.a = 1;
}