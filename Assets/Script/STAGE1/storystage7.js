#pragma strict

//进入故事模式
var customSkin : GUISkin;		//加载皮肤
var i : int;
var text : String;				//显示的文字
var soundMusic : AudioClip;		//加载音乐
static var talkMode : boolean = false; //对话模式（判断对话框出现
var talkSave : boolean = true;	//存储对话状态，如果聊天过了一次后再进入这个场景角色就不见了

var tarCamera1 : Transform;		//调用背景摄像机1
var tarCamera2 : Transform;		//调用背景摄像机2

var smoothTime : float = 0.01;	//跟随的缓冲时间

var playerDead : int;			//记录角色死了多少个（小彩蛋

//调整声音专用参数

var fireRate = 0.2;
private var nextFire = 0.0;
var audioValue : float = 1;

static var musicPlay : int = 0; 

var startTalk : boolean = true;        //开始对话阶段（避免中途出现对话框有BUG

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

var j : int = 0;

function Start () 
{
	talkMode= true;				//开启说话	
	var gameConfig = gameObject.GetComponent("gameConfig");	
}

/**会话显示*/

function OnGUI () 
{
	GUI.skin = customSkin;		
	GUI.skin.label.fontSize = Mathf.Round(30 * m_fScaleWidth);  //自适应文字大小
	GUI.skin.button.fontSize = Mathf.Round(30 * m_fScaleWidth);    //自适应文字大小
    if (talkMode && gameConfig.player >= 0)
	GUI.Label (Rect (20 * m_fScaleWidth, 25 * m_fScaleHeight, 930 * m_fScaleWidth, 60 * m_fScaleHeight), text);										

	 //-----------------------------------------------------
     //            自动适应分辨率
     //-----------------------------------------------------
    m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
    m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
}

//角色死掉操作
function LateUpdate()
{
		if (playerconfig.dead)
			{
            if (i == 401 || i == 501)
                i = 502;
            else
                i = 0;
				startTalk = true;
                GetComponent.<AudioSource>().clip = null;		
				playerDead += 1;
				GetComponent.<AudioSource>().volume = 0;
			}

	/**控制音乐的播放和暂停,1暂停，2播放*/

	if (musicPlay == 1)
	{
	    GetComponent.<AudioSource>().Pause();
		gameConfig.pauseMode = true;
	    //GetComponent.<AudioSource>().volume = 0;
		musicPlay = 0;
	}
	
	if (musicPlay == 2)
	{
	    GetComponent.<AudioSource>().Play();
		gameConfig.pauseMode = false;
	    GetComponent.<AudioSource>().volume = 1;
    	musicPlay = 0;
	}
}

function Update () 
{
    //修复角色在死掉的时候不断的跳可以跑动的问题
    if(i<=100 && playerControls.cancontrol)
    {
        playerControls.cancontrol = false;		//先让角色不能移动
        enemy_boss1.cancontrol = false;			//BOSS也不能动
    }

	/**按JUMP键说话跳跃的功能*/
    if(talkMode && talkSave && gameConfig.player >= 0)
	{
	    j = 0;
		
		//摄像机归位

		if(gameConfig.plantform == "ipad")
		{
			this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,12, Time.deltaTime * smoothTime);
			//tarCamera1.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(tarCamera1.GetComponent.<Camera>().orthographicSize,12,  Time.deltaTime * smoothTime);
			//tarCamera2.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(tarCamera2.GetComponent.<Camera>().orthographicSize,12,  Time.deltaTime * smoothTime);
		}
		else
		{
			this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,9, Time.deltaTime * smoothTime);
			tarCamera1.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(tarCamera1.GetComponent.<Camera>().orthographicSize,9,  Time.deltaTime * smoothTime);
			//tarCamera2.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(tarCamera2.GetComponent.<Camera>().orthographicSize,9,  Time.deltaTime * smoothTime);
		}
		

		
		if(Input.GetButtonDown ("Jump") && startTalk)
			i ++;
		if(Input.GetButton ("Fire1") && startTalk)
		    i ++;
		if(Input.GetMouseButtonDown(0))
		    i ++;
		
	    /**说话内容合集*/
	    //繁体
		if(gameConfig.language == "ChineseTraditional")
		{
		    if (i == 0 && playerDead < 3) 
		    { 		playerControls.cancontrol = false;		//先让角色不能移动
		        enemy_boss1.cancontrol = false;			//BOSS也不能动
		        text = "喲，你好啊，我是這裡的守關人";
		    }
		    if (i == 0 && playerDead >= 3)
		    { 		playerControls.cancontrol = false;		//先让角色不能移动
		        enemy_boss1.cancontrol = false;			//BOSS也不能动
		        text = "哈哈哈哈，你知道嗎你死了"+ playerDead +"次了";
		    } 
		    if (i == 1 && playerDead < 3) text = "你可以叫我兔君";
		    if (i == 1 && playerDead >= 3) text = "放棄就不會死，怎麼就不明白！";
		    if (i == 2 && playerDead < 3) text = "聽說你一點戰鬥力都沒有，所以我們換個玩法吧";
		    if (i == 2 && playerDead >= 3) text = "好了準備BGM,再繼續對話就開始了！";
		    if (i == 3 && playerDead < 3) text = "我們來玩跑酷吧，不過我沒給你裝自動跑動裝置";
		    if (i == 3 && playerDead >= 3) {i=8;gameStart1();}
		    if (i == 4 && playerDead < 3) text = "記得手動跑動哦，能超過我就算你贏";
		    if (i == 5 && playerDead < 3) text = "順帶不跑是不行的，後面有東西會追你";
		    if (i == 6 && playerDead < 3) text = "好了準備BGM,再繼續對話就開始了！順帶這關不能按暫停哦，因為...";

		    if (i == 7 && playerDead <3) {i = 8;gameStart1();}
		
		    if (i == 101) {text = "你覺得這樣傻跑有意思嗎，所以前方准備跳躍運動！";gameStart2();}
		    if (i == 201) {text = "居然這樣都能過來，看我仍蘿蔔砸死你！";gameStart3();}
		    if (i == 301) {text = "居然還能挺住，那我要使用超高能絕招了！！";gameStart4();}
		    if (i == 401) {text = "哈哈哈我贏了，你果然永遠跑不過我！！";gameStart5();}
		
		    if (i == 501) {text = "旁白：雖然不太明白，但是兔君不見了呢，那就算過關了吧";gameStart6();}
        }
        else if (gameConfig.language == "English")
        {
            
                if (i == 0 && playerDead < 3) {
                playerControls.cancontrol = false;		//先让角色不能移动
                    enemy_boss1.cancontrol = false;			//BOSS也不能动
                    text = "Oh, Hello, I'm the gatekeeper here";
                }
                if (i == 0 && playerDead >= 3) {
                playerControls.cancontrol = false;		//先让角色不能移动
                    enemy_boss1.cancontrol = false;			//BOSS也不能动
                    text = "Hahaha, do you know that you died" + playerDead + "times";
                }
                if (i == 1 && playerDead < 3) text = "You can call me a rabbikun";
                if (i == 1 && playerDead >= 3) text = "Give up will not die, how do not understand!";
                if (i == 2 && playerDead < 3) text = "I heard you can't battle, so let's play another game.";
                if (i == 2 && playerDead >= 3) text = "Good! prepare BGM, and then continue tap to start!";
                if (i == 3 && playerDead < 3) text = "Let's play parkour, but you must Manual mode.";
                if (i == 3 && playerDead >= 3) { i = 8; gameStart1(); }
                if (i == 4 && playerDead < 3) text = "Remember to run by hand. I can beat me even if you win";
                if (i == 5 && playerDead < 3) text = "If you don't run,something in the back that will chase you";
                if (i == 6 && playerDead < 3) text = "prepare BGM!OH this stage you can't pause,because..";

                if (i == 7 && playerDead < 3) { i = 8; gameStart1(); }

                if (i == 101) { text = "Just run?Ready for jumping ahead!"; gameStart2(); }
                if (i == 201) { text = "Let me still kill you with the radish!"; gameStart3(); }
                if (i == 301) { text = "Can still hold up?So I'm going to use a super skill"; gameStart4(); }
                if (i == 401) { text = "Ha ha ha, I won. You can never win from me!"; gameStart5(); }

                if (i == 501) { text = "Narrator: where did the rabbikun?"; gameStart6(); }
        }
		else
		{
		    if (i == -1) text = "哈哈哈哈放弃吧";
		    if (i == 0 && playerDead < 3) 
		    { 		playerControls.cancontrol = false;		//先让角色不能移动
		        enemy_boss1.cancontrol = false;			//BOSS也不能动
		        text = "哟，你好啊，我是这里的守关人";
		    }
		    if (i == 0 && playerDead >= 3)
		    { 		playerControls.cancontrol = false;		//先让角色不能移动
		        enemy_boss1.cancontrol = false;			//BOSS也不能动
		        text = "哈哈哈哈，你知道吗你死了"+ playerDead +"次了";
		    } 
		    if (i == 1 && playerDead < 3) text = "你可以叫我兔君";
		    if (i == 1 && playerDead >= 3) text = "放弃就不会死，怎么就不明白！";
		    if (i == 2 && playerDead < 3) text = "听说你一点战斗力都没有，所以我们换个玩法吧";
		    if (i == 2 && playerDead >= 3) text = "好了准备BGM,再继续对话就开始了！";
		    if (i == 3 && playerDead < 3) text = "我们来玩跑酷吧，不过我没给你装自动跑动装置";
		    if (i == 3 && playerDead >= 3) {i=8;gameStart1();}
		    if (i == 4 && playerDead < 3) text = "记得手动跑动哦，能超过我就算你赢";
		    if (i == 5 && playerDead < 3) text = "顺带不跑是不行的，后面有东西会追你";
		    if (i == 6 && playerDead < 3) text = "好了准备BGM,再继续对话就开始了！顺带这关不能按暂停哦，因为...";

		    if (i == 7 && playerDead <3) {i = 8;gameStart1();}
		
		    if (i == 101) {text = "你觉得这样傻跑有意思吗，所以前方准备跳跃运动！";gameStart2();}
		    if (i == 201) {text = "居然这样都能过来，看我仍萝卜砸死你！";gameStart3();}
		    if (i == 301) {text = "居然还能挺住，那我要使用超高能绝招了！！";gameStart4();}
		    if (i == 401) {text = "哈哈哈我赢了，你果然跑不过我，看我华丽的跳到达终点吧！！";gameStart5();}
		
            if (i == 501) { text = "兔君不小心掉下了悬崖，那..就算过关了吧"; gameStart6(); }

            if (i == 502) { text = "哈哈哈哈，你居然和我一起挂掉了，笑死我了！"; }
            if (i == 503) i = 0;
		}

	
	}
	
		
					//talkSave = false;			//让对话不再出现了，测试阶段屏蔽这个功能
		
	
		
		/**如果已经对话过了*/
		
		/*if(!talkSave)
		{
			gameStart();
		}*/
	
	if(!talkMode)
	{
			if(gameConfig.plantform == "ipad")
		{
			this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,14,  Time.deltaTime * smoothTime);
			tarCamera1.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,14,  Time.deltaTime * smoothTime);
			//tarCamera2.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,11,  Time.deltaTime * smoothTime);
		}
		else
		{
			//对话结束后直接让摄像机距离放远
			this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,11,  Time.deltaTime * smoothTime);
			tarCamera1.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,11,  Time.deltaTime * smoothTime);
			//tarCamera2.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,11,  Time.deltaTime * smoothTime);
		}
		

	}	
	
	



}
//BOSS 的3个状态
function gameStart1()
{
    yield WaitForSeconds(0.5);
    startTalk = false;
	enemy_bomb.moveLife = true;	//把BOSS的子弹开启
	talkMode= false;
	enemy_boss1.cancontrol = true;
	playerControls.cancontrol = true;
	enemy_boss2.hp = 4;
	fire.start = true;
	fire.speed = 12.0;
    /**播放BGM*/
	if(i<=100 && i>=8)
	{
	    if(j == 0)
	    {
	        GetComponent.<AudioSource>().clip = soundMusic;
	        GetComponent.<AudioSource>().Play(); 		//放音乐
	        GetComponent.<AudioSource>().pitch = 1; 	//音乐加速
	        GetComponent.<AudioSource>().volume = 1;
	        j++;
	    }
	    audioValue = 1; //把音量降低参数还原

	    i = 101;
	}

}

function gameStart2()
{
    yield WaitForSeconds(2);
    if(i == 101)
    {
        talkMode= false;
            i = 201;
    }

}

function gameStart3()
{
    yield WaitForSeconds(2);
    if(i == 201)
    {
        talkMode= false;
        i = 301;
    }
}
function gameStart4()
{
    yield WaitForSeconds(3);
    if(i == 301)
    {
        talkMode= false;
        i = 401;
    }

}
function gameStart5()
{
    yield WaitForSeconds(5);
    if(i == 401)
    {
        i = 501;
    }
}




function gameStart6()
{

}

//音乐声音减小
function audiodown()
{



	if(Time.time > nextFire){

	nextFire = Time.time + fireRate;
	audioValue -= 0.2 ;
	GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = audioValue;
	}
	
}