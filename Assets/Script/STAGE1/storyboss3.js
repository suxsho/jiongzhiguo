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

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

var j : int;

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
    if (talkMode && gameConfig.player >= 0)
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

    if(talkMode && talkSave  && gameConfig.player >= 0)
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
		    if (i == 0 && playerDead < 3){text = "哈哈哈哈，我又回来了";} 
		    if (i == 0 && playerDead >= 3) text = "哈哈哈哈，這下你過不到我這關了吧！";
		    if (i == 1 && playerDead < 3) text = "上次我居然不小心跳坑死掉了";
		    if (i == 1 && playerDead >= 3) text = "我才不會像上次那麼傻告訴你怎麼打敗我呢";
		    if (i == 2 && playerDead < 3) text = "所以這次我决定飛行了";
		    if (i == 2 && playerDead >= 3) {text = "接著死吧";gameStart1();}
		    if (i == 3 && playerDead < 3) text = "這下你就沒辦法讓我掉下去了吧";
		    if (i == 4 && playerDead < 3) text = "這次你肯定過不到我這關了";
		    if (i == 5 && playerDead < 3) text = "我决定用炸彈炸死你";
		    if (i == 6 && playerDead < 3) text = "開始吧";

		    if (i == 7) gameStart1();
		    if (i == 101 && playerDead < 3) {audiodown();text = "不得了！我居然炸到自己了";}
		    if (i == 101 && playerDead >= 3) {audiodown();text = "糟了！你居然研究出打败我的方法了吗";}
		    if (i == 102 && playerDead < 3) {audiodown();text = "不过下次我就不会那么傻了";}
		    if (i == 102 && playerDead >= 3) {audiodown();text = "不过接下来没有那么容易了";}
		    if (i == 103) {text = "再来！";gameStart2();}
		
		    if (i == 201 && playerDead < 3) {audiodown();text = "你当我是傻子吗，每次都被自己的炸弹炸死";}
		    if (i == 201 && playerDead >= 3){audiodown();text ="你当我是傻子吗，每次都被自己的炸弹炸死";}
		    if (i == 202) {audiodown();text = "接下来我不会那么傻了！";}
		    if (i == 203) {audiodown();text = "准备受死吧！";gameStart3();}
		
		    if (i == 301) {audiodown();text = "好吧，我真的是傻子";}
		    if (i == 302) {audiodown();text = "不过接下来的考验你肯定是无法通过的";}
		    if (i == 303) {audiodown();text = "哈哈哈哈哈";gameStart4();}
		
		    if (i == 500) text = "笑死我了，刚才你是怎么死的，哈哈哈哈";
		    if (i == 501) i = 0;
        }
        else if (gameConfig.language == "English")
        {
            if (i == 0 && playerDead < 3) { text = "hahahah,I'm back again"; }
            if (i == 0 && playerDead >= 3) text = "hahahahah,You can't beat me now!";
            if (i == 1 && playerDead < 3) text = "The last time I accidentally jumped and died";
            if (i == 1 && playerDead >= 3) text = "The same thing won't happen again";
            if (i == 2 && playerDead < 3) text = "I will fly";
            if (i == 2 && playerDead >= 3) { text = "die again!"; gameStart1(); }
            if (i == 3 && playerDead < 3) text = "You can't get me down here";
            if (i == 4 && playerDead < 3) text = "You won't be able to beat me this time";
            if (i == 5 && playerDead < 3) text = "I decided to kill you with a bomb";
            if (i == 6 && playerDead < 3) text = "now start!";

            if (i == 7) gameStart1();
            if (i == 101 && playerDead < 3) { audiodown(); text = "I actually bombed myself"; }
            if (i == 101 && playerDead >= 3) { audiodown(); text = "what?!you konw how to beat me now?"; }
            if (i == 102 && playerDead < 3) { audiodown(); text = "But next time I won't be so stupid"; }
            if (i == 102 && playerDead >= 3) { audiodown(); text = "But next time I won't be so stupid"; }
            if (i == 103) { text = "start again!"; gameStart2(); }

            if (i == 201 && playerDead < 3) { audiodown(); text = "Do you think I'm a fool? "; }
            if (i == 201 && playerDead >= 3) { audiodown(); text = "Do you think I'm a fool? "; }
            if (i == 202) { audiodown(); text = "Every time I'm killed by my own bomb."; }
            if (i == 203) { audiodown(); text = "Be ready to die"; gameStart3(); }

            if (i == 301) { audiodown(); text = "Well, I'm really a fool"; }
            if (i == 302) { audiodown(); text = "But you will not be able to pass the next test."; }
            if (i == 303) { audiodown(); text = "hahahaha"; gameStart4(); }

            if (i == 500) text = "How did you die just now?hahahahahaha";
            if (i == 501) i = 0;
        }
		else
		{
		    if (i == 0 && playerDead < 3){text = "哈哈哈哈，我又回来了";} 
		    if (i == 0 && playerDead >= 3) text = "哈哈哈哈，这下你过不到我这关了吧！";
		    if (i == 1 && playerDead < 3) text = "上次我居然不小心跳坑死掉了";
		    if (i == 1 && playerDead >= 3) text = "我才不会像上次那么傻告诉你怎么打败我呢";
		    if (i == 2 && playerDead < 3) text = "所以这次我决定飞行了";
		    if (i == 2 && playerDead >= 3) {text = "接着死吧";gameStart1();}
		    if (i == 3 && playerDead < 3) text = "这下你就没办法让我掉下去了吧";
		    if (i == 4 && playerDead < 3) text = "这次你肯定过不到我这关了";
		    if (i == 5 && playerDead < 3) text = "我决定用炸弹炸死你";
		    if (i == 6 && playerDead < 3) text = "开始吧";

		    if (i == 7) gameStart1();
		    if (i == 101 && playerDead < 3) {audiodown();text = "不得了！我居然炸到自己了";}
		    if (i == 101 && playerDead >= 3) {audiodown();text = "糟了！你居然研究出打败我的方法了吗";}
		    if (i == 102 && playerDead < 3) {audiodown();text = "不过下次我就不会那么傻了";}
		    if (i == 102 && playerDead >= 3) {audiodown();text = "不过接下来没有那么容易了";}
		    if (i == 103) {text = "再来！";gameStart2();}
		
		    if (i == 201 && playerDead < 3) {audiodown();text = "你当我是傻子吗，每次都被自己的炸弹炸死";}
		    if (i == 201 && playerDead >= 3){audiodown();text ="你当我是傻子吗，每次都被自己的炸弹炸死";}
		    if (i == 202) {audiodown();text = "接下来我不会那么傻了！";}
		    if (i == 203) {audiodown();text = "准备受死吧！";gameStart3();}
		
		    if (i == 301) {audiodown();text = "好吧，我真的是傻子";}
		    if (i == 302) {audiodown();text = "不过接下来的考验你肯定是无法通过的";}
		    if (i == 303) {audiodown();text = "哈哈哈哈哈";gameStart4();}
		
		    if (i == 500) text = "笑死我了，刚才你是怎么死的，哈哈哈哈";
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


function gameStart1()
{
	yield WaitForSeconds(0.5);
	i = 101;
	talkMode= false;
	enemy_boss3.cancontrol = true;
	enemy_boss3.hp = 3;
	GetComponent.<AudioSource>().clip = soundMusic;
	if(j == 0)
	{
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().pitch = 1; 
	    GetComponent.<AudioSource>().volume = 1;
	    audioValue = 1; 
	    j++;
	}

	playerControls.cancontrol = true;
}

function gameStart2()
{
	yield WaitForSeconds(0.5);
	i = 201;
	talkMode= false;
	enemy_boss3.cancontrol = true;
	enemy_boss3.hp = 2;
    //audio.clip = soundMusic;
	if(j == 0)
	{
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().volume = 1;
	    GetComponent.<AudioSource>().pitch = 1; 
	}
	playerControls.cancontrol = true;
	audioValue = 1; 
}

function gameStart3()
{
	yield WaitForSeconds(0.5);
	i = 301;
	talkMode= false;
	enemy_boss3.cancontrol = true;
	enemy_boss3.hp = 1;
    //audio.clip = soundMusic;
	if(j == 0)
	{
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().volume = 1;
	    GetComponent.<AudioSource>().pitch = 1.1; 	
	}
	playerControls.cancontrol = true;
	audioValue = 1; 
}

function gameStart4()
{
    if(gameConfig.worldMostNumber == 3)
        gameConfig.worldMostNumber = 4;
    gameConfig.saveStageDate(); 
    yield WaitForSeconds (2);
    Camera.main.SendMessage("fadeOut");
    //过关在线统计
    if (gameConfig.stages[10 - 1] == 0) {
        gameConfig.stgOverMode = true;
    }
    yield WaitForSeconds (2);
    if(gameConfig.stages[10-1] == 0)
    {
        gameConfig.stages[10-1] = 1;
        gameConfig.allStar +=1;                     //给一个星星
    }
    gameConfig.saveStageDate(); 

    Application.LoadLevel ("world4");


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
    if (gameConfig.stages[10 - 1] == 0) {
        gameConfig.stgOverStart = true;
    }
}