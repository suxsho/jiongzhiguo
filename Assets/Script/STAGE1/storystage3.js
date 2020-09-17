#pragma strict


var customSkin : GUISkin;		
var i : int;
var text: String;	
var soundMusicStart: AudioClip;	
var soundMusic : AudioClip;		
static var talkMode : boolean = false; 
var talkSave : boolean = true;	

var tarCamera1 : Transform;		
var tarCamera2 : Transform;		

var smoothTime : float = 0.01;	

var playerDead : int;			



var fireRate = 0.2;
private var nextFire = 0.0;
var audioValue : float = 1;

var j : int = 0;    //解决音乐播放连续的问题

var clearMode : boolean = false;            //防止过关往死里给星星BUG而做的设置

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

function Start () 
{
    talkMode= true;		
    var gameConfig = gameObject.GetComponent("gameConfig");		
    firstStage();
}



function OnGUI () 
{
	GUI.skin = customSkin;		
	GUI.skin.label.fontSize = Mathf.Round(30 * m_fScaleWidth);  //自适应文字大小
	GUI.skin.button.fontSize = Mathf.Round(30 * m_fScaleWidth);    //自适应文字大小
	if(talkMode && gameConfig.player >= 0)
	GUI.Label (Rect (20 * m_fScaleWidth, 25 * m_fScaleHeight, 930 * m_fScaleWidth, 60 * m_fScaleHeight), text);										

	 //-----------------------------------------------------
     //            自动适应分辨率
     //-----------------------------------------------------
    m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
    m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
}

function LateUpdate()
{
		if (playerconfig.dead)
			{
				if(talkMode)
				i = 500;
				else
				i = 0;

                GetComponent.<AudioSource>().clip = soundMusicStart;		
				playerDead += 1;
				GetComponent.<AudioSource>().volume = 0;
			}
}

function Update () 
{
	if(talkMode && talkSave && gameConfig.player >= 0)
	{
		playerControls.cancontrol = false;		
		enemy_boss1.cancontrol = false;		
		j = 0;

		if(gameConfig.plantform == "ipad")
		{
			this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,12, Time.deltaTime * smoothTime);
			tarCamera1.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(tarCamera1.GetComponent.<Camera>().orthographicSize,12,  Time.deltaTime * smoothTime);
		}
		else
		{
			this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,9, Time.deltaTime * smoothTime);
			tarCamera1.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(tarCamera1.GetComponent.<Camera>().orthographicSize,9,  Time.deltaTime * smoothTime);
		}

		//tarCamera2.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(tarCamera2.GetComponent.<Camera>().orthographicSize,200,  Time.deltaTime * smoothTime);
		
		if(Input.GetButtonDown ("Jump"))
			i ++;
		if(Input.GetButton ("Fire1"))
		    i ++;
		if(Input.GetMouseButtonDown(0))
		    i ++;
	    //繁体
		if(gameConfig.language == "ChineseTraditional")
		{
		    if (i == 0 && playerDead < 3){text = "你好啊，歡迎來到我的領地";gameStart0();} 
		    if (i == 0 && playerDead >= 3) text = "你好啊，歡...我好像說了多少次重複的話了！";
		    if (i == 1 && playerDead < 3) text = "我是守關人，所以你需要打敗我才可以繼續前進";
		    if (i == 1 && playerDead >= 3) text = "好吧你真有毅力，反正你是不可能讓我掉下去的";
		    if (i == 2 && playerDead < 3) text = "聽說你沒有任何攻擊敵人的能力，所以我奉勸你到此為止吧";
		    if (i == 2 && playerDead >= 3) {text = "接著死吧";gameStart1();}
		    if (i == 3 && playerDead < 3) text = "什麼？你覺得你能贏我？";
		    if (i == 4 && playerDead < 3) text = "你說你沒認為能贏我？不管！我就要強行推動劇情的發展";
		    if (i == 5 && playerDead < 3) text = "哈哈哈哈，你這個弱者，你絕不可能贏我的";
		    if (i == 6 && playerDead < 3) text = "開始吧";

		    if (i == 7) gameStart1();
		    if (i == 101 && playerDead < 3) {audiodown();text = "切！疏忽了不小心掉下去了";}
		    if (i == 101 && playerDead >= 3) {audiodown();text = "你終於傷了我一下了";}
		    if (i == 102 && playerDead < 3) {audiodown();text = "看我這次跳低點";}
		    if (i == 102 && playerDead >= 3) {audiodown();text = "不過接下來沒有那麼容易了";}
		    if (i == 103) {text = "再来！";gameStart2();}
		
		    if (i == 201 && playerDead < 3) {audiodown();text = "好吧你果然很強";}
		    if (i == 201 && playerDead >= 3){audiodown();text ="到這裡了，看來你要死了，然後再接著重新看剛才那些廢話";}
		    if (i == 202) {audiodown();text = "好吧，我不跳了，看你还怎么把我弄下去";}
		    if (i == 203) {audiodown();text = "準備受死吧！";gameStart3();}
		
		    if (i == 301) {audiodown();text = "啊我認輸了";}
		    if (i == 302) {audiodown();text = "你可以直接去下一个世界了";}
		    if (i == 303) {audiodown();text = "但我相信你一定会在下个世界止步不前";gameStart4();}
		
		    if (i == 500) text = "哈哈哈你在賣萌嗎?你這怎麼死掉的笑死我了";
		    if (i == 501) i = 0;
        }
        else if (gameConfig.language == "English")
        {
            if (i == 0 && playerDead < 3) { text = "Hello, welcome to my territory"; gameStart0(); }
            if (i == 0 && playerDead >= 3) text = "Hello, welc...I seem to say how many times I repeat it!";
            if (i == 1 && playerDead < 3) text = "I'm Keepman, so you need to beat me";
            if (i == 1 && playerDead >= 3) text = "Well, you have a stamina. You can't get me fall, anyway";
            if (i == 2 && playerDead < 3) text = "I advise you to stop here.";
            if (i == 2 && playerDead >= 3) { text = "Die again!"; gameStart1(); }
            if (i == 3 && playerDead < 3) text = "Because you can't beat me";
            if (i == 4 && playerDead < 3) text = "Huh? Do you think you can win me?";
            if (i == 5 && playerDead < 3) text = "Hahaha, you can never win me";
            if (i == 6 && playerDead < 3) text = "Now Start!!";

            if (i == 7) gameStart1();
            if (i == 101 && playerDead < 3) { audiodown(); text = "Careless fall off"; }
            if (i == 101 && playerDead >= 3) { audiodown(); text = "You're finally attacking me"; }
            if (i == 102 && playerDead < 3) { audiodown(); text = "Watch me jump down this time"; }
            if (i == 102 && playerDead >= 3) { audiodown(); text = "But it's not so easy,Next"; }
            if (i == 103) { text = "Again!"; gameStart2(); }

            if (i == 201 && playerDead < 3) { audiodown(); text = "Wow, you're really strong"; }
            if (i == 201 && playerDead >= 3) { audiodown(); text = "Now The last... It looks like you're going to die"; }
            if (i == 202) { audiodown(); text = "OK, I'm not jumping, and see how you're going to get me down"; }
            if (i == 203) { audiodown(); text = "Be ready to die!"; gameStart3(); }

            if (i == 301) { audiodown(); text = "I am lost."; }
            if (i == 302) { audiodown(); text = "You can go straight to the next world"; }
            if (i == 303) { audiodown(); text = "But I believe you're going to stop in the next world"; gameStart4(); }

            if (i == 500) text = "HAHAHAHAHA,What are you doing?";
            if (i == 501) i = 0;
        }
		else
		{
		    if (i == 0 && playerDead < 3){text = "你好啊，欢迎来到我的领地";gameStart0();} 
		    if (i == 0 && playerDead >= 3) text = "你好啊，欢...我好像说了多少次重复的话了！";
		    if (i == 1 && playerDead < 3) text = "我是守关人，所以你需要打败我才可以继续前进";
		    if (i == 1 && playerDead >= 3) text = "好吧你真有毅力，反正你是不可能让我掉下去的";
		    if (i == 2 && playerDead < 3) text = "听说你没有任何攻击敌人的能力，所以我奉劝你到此为止吧";
		    if (i == 2 && playerDead >= 3) {text = "接着死吧";gameStart1();}
		    if (i == 3 && playerDead < 3) text = "什么？你觉得你能赢我？";
		    if (i == 4 && playerDead < 3) text = "你说你没认为能赢我？不管！我就要强行推动剧情的发展";
		    if (i == 5 && playerDead < 3) text = "哈哈哈哈，你这个弱者，你绝不可能赢我的";
		    if (i == 6 && playerDead < 3) text = "开始吧";

		    if (i == 7) gameStart1();
		    if (i == 101 && playerDead < 3) {audiodown();text = "切！疏忽了不小心掉下去了";}
		    if (i == 101 && playerDead >= 3) {audiodown();text = "你终于伤了我一下了";}
		    if (i == 102 && playerDead < 3) {audiodown();text = "看我这次跳低点";}
		    if (i == 102 && playerDead >= 3) {audiodown();text = "不过接下来没有那么容易了";}
		    if (i == 103) {text = "再来！";gameStart2();}
		
		    if (i == 201 && playerDead < 3) {audiodown();text = "好吧你果然很强";}
		    if (i == 201 && playerDead >= 3){audiodown();text ="到这里了，看来你要死了，然后再接着重新看刚才那些废话";}
		    if (i == 202) {audiodown();text = "好吧，我不跳了，看你还怎么把我弄下去";}
		    if (i == 203) {audiodown();text = "准备受死吧！";gameStart3();}
		
		    if (i == 301) {audiodown();text = "啊我认输了";}
		    if (i == 302) {audiodown();text = "你可以直接去下一个世界了";}
		    if (i == 303) {audiodown();text = "但我相信你一定会在下个世界止步不前";gameStart4();}
		
		    if (i == 500) text = "哈哈哈你在卖萌吗?你这怎么死掉的笑死我了";
		    if (i == 501) i = 0;
		}

	
	}
	
		

	
	if(!talkMode)
	{
	if(gameConfig.plantform == "ipad")
		{
			this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,14,  Time.deltaTime * smoothTime);
			tarCamera1.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,14,  Time.deltaTime * smoothTime);
		}
		else
		{
			this.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,11,  Time.deltaTime * smoothTime);
			tarCamera1.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,11,  Time.deltaTime * smoothTime);
		}
			
			//tarCamera2.GetComponent.<Camera>().orthographicSize = Mathf.Lerp(this.GetComponent.<Camera>().orthographicSize,100,  Time.deltaTime * smoothTime);
	}	
	


}


function gameStart0()
{
    yield WaitForSeconds(2.5);
    if (i == 0 && playerDead < 3)
    {
        if (gameConfig.language == "English")
            text = "Why do not you touch screen?";
            else
            text = "你快按啊，你不按我的对话怎么继续啊！！";
    }

}


function gameStart1()
{
	yield WaitForSeconds(0.5);
	i = 101;
	talkMode= false;
	enemy_boss1.cancontrol = true;
	GetComponent.<AudioSource>().clip = soundMusic;
	if(j == 0)
	{
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().pitch = 1; 
	    GetComponent.<AudioSource>().volume = 1;
	    j++;
	}
	audioValue = 1; 
	playerControls.cancontrol = true;
}

function gameStart2()
{
	yield WaitForSeconds(0.5);
	i = 201;
	talkMode= false;
	enemy_boss1.cancontrol = true;
    //audio.clip = soundMusic;
	if(j == 0)
	{
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().volume = 1;
	    GetComponent.<AudioSource>().pitch = 1.2; 	
	    j++;
	}

	playerControls.cancontrol = true;
	audioValue = 1; 
}

function gameStart3()
{
	yield WaitForSeconds(0.5);
	i = 301;
	talkMode= false;
	enemy_boss1.cancontrol = true;
    //audio.clip = soundMusic;
	if(j == 0)
	{
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().volume = 1;
	    GetComponent.<AudioSource>().pitch = 1.5; 	
	    j++;
	}
	playerControls.cancontrol = true;
	audioValue = 1; 
}

function gameStart4()
{


    if(gameConfig.worldMostNumber == 1)
        gameConfig.worldMostNumber = 2;
    yield WaitForSeconds (2);
    Camera.main.SendMessage("fadeOut");
    if (gameConfig.stages[3 - 1] == 0) {
        gameConfig.stgOverMode = true;
        gameConfig.allStar += 1;                     //给一个星星
        gameConfig.stages[3 - 1] = 1;

        yield WaitForSeconds(2);

        gameConfig.saveStageDate();
        Application.LoadLevel("story1-2");
    }
    else
    {
        yield WaitForSeconds(2);

        gameConfig.saveStageDate();
        Application.LoadLevel("world2");
    }

}



function audiodown()
{

	if(Time.time > nextFire){

	nextFire = Time.time + fireRate;
	audioValue -= 0.2 ;
	GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = audioValue;
	}
	
}

/**stgOverStart 初次进入关卡判断是不是要向服务器POST没有过关的信息*/
function firstStage() {
        if (gameConfig.stages[3 - 1] == 0) {
            gameConfig.stgOverStart = true;

        }
}