#pragma strict

//最终BOSS的代码
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

static var hp: int;	

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
            talkMode = true;
				if(talkMode)
				i = 500;
				else
                i = 0;

                hp = 3;

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

       // this.GetComponent.<Camera>().Transform.rotation.z = 1;

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
            if (i == 0 && playerDead < 3) { text = "你你你是什么人！"; gameStart0(); }
            if (i == 0 && playerDead >= 3) text = "你你你不是已经被我打败了吗";
            if (i == 1 && playerDead < 3) text = "来人护驾！你为什么闯入王宫！";
            if (i == 1 && playerDead >= 3) text = "怎么还在这里啊，你是不死的小强吗！";
            if (i == 2 && playerDead < 3) text = "什么！你是来救我的？";
            if (i == 2 && playerDead >= 3) { text = "那让我再消灭你一次！"; gameStart1(); }
            if (i == 3 && playerDead < 3) text = "我可没明白呢，我好好的在王宫里怎么就要救我";
            if (i == 4) text = "来人啊！抓住这个入侵者！";
            if (i == 5) text = "怎么没人来，看来只能我亲自收拾你了";
            if (i == 6) gameStart1();
            if (i == 101 && playerDead < 3) { audiodown(); text = "哇哦！这个闪电球是什么东西，什么时候在这里的"; }
            if (i == 101 && playerDead >= 3) { audiodown(); text = "啊啊啊，这个该死的家伙"; }
            if (i == 102 && playerDead < 3) { audiodown(); text = "是你带来的吗，你你你，你给我去死吧！"; }
            if (i == 102 && playerDead >= 3) { audiodown(); text = "我不会放过你的！"; }
            if (i == 103) { text = "再来！"; gameStart2(); }

            if (i == 201 && playerDead < 3) { audiodown(); text = "啊啊啊啊！怎么还没有人来救我啊！"; }
            if (i == 202) { audiodown(); text = "来人啊！这个自称救我的人要把我捉走啦！"; gameStart3(); }

            if (i == 301) text = "啊啊啊啊！";
            if (i == 302) { audiodown(); cameraSmooth2D.cameraShake = true; text = "救命！我已经动不了了"; gameStart4(); }

            if (i == 500) text = "啊哈哈哈哈，你死的那熊样真好笑，啊哈哈哈哈";
            if (i == 501) i = 0;
        }
        else if (gameConfig.language == "English")
        {
            if (i == 0 && playerDead < 3) { text = "WWWWWhat are you!?"; gameStart0(); }
            if (i == 0 && playerDead >= 3) text = "HHHHave you already been defeated by me?";
            if (i == 1 && playerDead < 3) text = "Come and protect! Why did you break into the palace!";
            if (i == 1 && playerDead >= 3) text = "Why are you here, you are a NotDeadMan?!";
            if (i == 2 && playerDead < 3) text = "what! Are you coming to save me?";
            if (i == 2 && playerDead >= 3) { text = "Then let me destroy you again!"; gameStart1(); }
            if (i == 3 && playerDead < 3) text = "I don't understand, do I need to be saved?";
            if (i == 4) text = "Come on! Grab this intruder";
            if (i == 5) text = "No one came, it seems that I can only do it myself";
            if (i == 6) gameStart1();
            if (i == 101 && playerDead < 3) { audiodown(); text = "Wow! What is this shake ball, when is it here?"; }
            if (i == 101 && playerDead >= 3) { audiodown(); text = "Ahhhhhhhhhhhhh, this damn guy"; }
            if (i == 102 && playerDead < 3) { audiodown(); text = "Did you bring it, yyyyyyyyou, you give me to die!"; }
            if (i == 102 && playerDead >= 3) { audiodown(); text = "I will not let you go"; }
            if (i == 103) { text = "die!"; gameStart2(); }

            if (i == 201 && playerDead < 3) { audiodown(); text = "Ahhhhhh,Help meHelp meHelp meHelp me"; }
            if (i == 202) { audiodown(); text = "This person who claimed to save me wants to kill me"; gameStart3(); }

            if (i == 301) text = "Ahhhhhhh";
            if (i == 302) { audiodown(); cameraSmooth2D.cameraShake = true; text = "Help! The castle is going to collapse!"; gameStart4(); }

            if (i == 500) text = "Ahhhhh hahahaha, you are dead, ahhhhhh haaaaa";
            if (i == 501) i = 0;
        }
		else
		{
		    if (i == 0 && playerDead < 3){text = "你你你是什么人！";gameStart0();} 
		    if (i == 0 && playerDead >= 3) text = "你你你不是已经被我打败了吗";
            if (i == 1 && playerDead < 3) text = "来人护驾！你为什么闯入王宫！";
            if (i == 1 && playerDead >= 3) text = "怎么还在这里啊，你是不死的小强吗！";
		    if (i == 2 && playerDead < 3) text = "什么！你是来救我的？";
		    if (i == 2 && playerDead >= 3) {text = "那让我再消灭你一次！";gameStart1();}
		    if (i == 3 && playerDead < 3) text = "我可没明白呢，我好好的在王宫里怎么就要救我";
            if (i == 4) text = "来人啊！抓住这个入侵者！";
            if (i == 5) text = "怎么没人来，看来只能我亲自收拾你了";
		    if (i == 6) gameStart1();
		    if (i == 101 && playerDead < 3) {audiodown();text = "哇哦！这个闪电球是什么东西，什么时候在这里的";}
		    if (i == 101 && playerDead >= 3) {audiodown();text = "啊啊啊，这个该死的家伙";}
		    if (i == 102 && playerDead < 3) {audiodown();text = "是你带来的吗，你你你，你给我去死吧！";}
		    if (i == 102 && playerDead >= 3) {audiodown();text = "我不会放过你的！";}
		    if (i == 103) {text = "再来！";gameStart2();}
		
		    if (i == 201 && playerDead < 3) {audiodown();text = "啊啊啊啊！怎么还没有人来救我啊！";}
		    if (i == 202) {audiodown();text = "来人啊！这个自称救我的人要把我捉走啦！";gameStart3();}
		
            if (i == 301) text = "啊啊啊啊！";
            if (i == 302) { audiodown(); cameraSmooth2D.cameraShake = true;text = "救命！城堡要塌掉了啊！"; gameStart4(); }
		
		    if (i == 500) text = "啊哈哈哈哈，你死的那熊样真好笑，啊哈哈哈哈";
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
        if (gameConfig.language == "English")
            text = "Tell meeeeeee!";
            else
    text ="这玩意可是会自动放电的！";
}


function gameStart1()
{
	yield WaitForSeconds(0.5);
	i = 101;
	talkMode= false;
	enemy_boss5.cancontrol = true;
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
	enemy_boss5.cancontrol = true;
    //audio.clip = soundMusic;
	if(j == 0)
	{
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().volume = 1;
	    GetComponent.<AudioSource>().pitch = 1.2; 	
	    j++;
	}

    playerControls.cancontrol = true;
    hp = 2;
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
    hp = 1;
	audioValue = 1; 
}

function gameStart4()
{
    if(gameConfig.stages[19-1] == 0)
    {
        gameConfig.stages[19-1] = 1;
        gameConfig.allStar +=1;                     //给一个星星
        gameConfig.stgOverMode = true;
    }

    gameConfig.saveStageDate(); 
    yield WaitForSeconds (2);
    Camera.main.SendMessage("fadeOut");
    yield WaitForSeconds (2);

	Application.LoadLevel ("story5-3");

}



function audiodown()
{

	if(Time.time > nextFire){

	nextFire = Time.time + fireRate;
	audioValue -= 0.2 ;
	GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = audioValue;
	}
	
}