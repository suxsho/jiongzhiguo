#pragma strict


var customSkin : GUISkin;		
var i : int;
var text : String;				
var soundMusic: AudioClip;	
var soundMusic3: AudioClip;	
static var talkMode : boolean = false; 
var talkSave : boolean = true;	

var tarCamera1 : Transform;		
var tarCamera2 : Transform;		

var smoothTime : float = 0.01;	

var playerDead : int;			

static var hp : int = 3;

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

var tips3: GameObject;

static public var advMode = false;

function Start () 
{
    talkMode= true;		
    var gameConfig = gameObject.GetComponent("gameConfig");	
    //advMode = false;

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

				talkMode = true;
				hp = 3;
                GetComponent.<AudioSource>().clip = null;	
				playerDead += 1;
				GetComponent.<AudioSource>().volume = 0;

				if(GameObject.Find("boss4(Clone)")!= null)
				    Destroy(GameObject.Find("boss4(Clone)"));
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
            if (i == 0 && playerDead < 3) { text = "你居然来到这里了呜"; }
            if (i == 0 && playerDead >= 3) text = "我说过你过不到这关的呜！";
            if (i == 1 && playerDead < 3) text = "你以为你可以战胜我并把国王带走呜";
            if (i == 1 && playerDead >= 3) text = "因为我就没有想让你过呜";
            if (i == 2 && playerDead < 3) text = "那是不可能的！";
            if (i == 2 && playerDead >= 3) { text = "你为什么不明白呜"; gameStart1(); }
            if (i == 3 && playerDead < 3) text = "因为我就是不！可！打！败！最·终·幽灵呜";
            if (i == 4 && playerDead < 3) text = "你真的不可能赢到我！";
            if (i == 5 && playerDead < 3) text = "不过先陪你这个小家伙玩玩呜";
            if (i == 6 && playerDead < 3) text = "别掉下去呜";

            if (i == 7) gameStart1();
            if (i == 101 && playerDead < 3) { audiodown(); text = "呜！哪里来的灯泡呜"; }
            if (i == 101 && playerDead >= 3) { audiodown(); text = "呜！反正这关是过不了呜！"; }
            if (i == 102 && playerDead < 3) { audiodown(); text = "看来我要搞死你了呜"; }
            if (i == 102 && playerDead >= 3) { audiodown(); text = "你再怎么挣扎也过不了呜"; }
            if (i == 103) { text = "死呜呜呜呜！"; gameStart2(); }

            if (i == 201 && playerDead < 3) { audiodown(); text = "呜呜呜呜呜呜呜灯光好可怕呜"; storyboss4.hp = 1; }
            if (i == 201 && playerDead >= 3) { audiodown(); text = "呜呜呜呜呜呜呜灯光好可怕呜"; storyboss4.hp = 1; }
            if (i == 202) { audiodown(); text = "你以为你赢了呜"; }
            if (i == 203) { audiodown(); text = "我说过你是不可能战胜我的呜呜呜！"; }
            if (i == 204) { audiodown(); text = "让我用华丽的BGM消灭掉你吧！"; gameStart3(); }

            if (i == 301) { audiodown(); text = "呜呜呜呜，灯泡并没有被你得到呜"; }
            if (i == 302) { audiodown(); text = "你以为你胜利了？我说过我是不可战胜的！"; }
            if (i == 303) { audiodown(); text = "闪光吧！世界！"; gameStart4(); }

            if (i == 500) text = "难道你获得灯泡的同时也顺带死掉了呜，如此萌的呜！";
            if (i == 501) i = 0;
        }
        else if (gameConfig.language == "English")
        {
            if (i == 0 && playerDead < 3) { text = "Hello, welcome to my world wuu"; }
            if (i == 0 && playerDead >= 3) text = "I don't think you can pass this stage wuu";
            if (i == 1 && playerDead < 3) text = "You think you can beat me and take the king away wuu?";
            if (i == 1 && playerDead >= 3) text = "Because I didn't want you to pass wuu";
            if (i == 2 && playerDead < 3) text = "That's impossible wuu";
            if (i == 2 && playerDead >= 3) { text = "Why don't you understand that wuu"; gameStart1(); }
            if (i == 3 && playerDead < 3) text = "Because I'm the final BOSS, you! can't! beat! me!";
            if (i == 4 && playerDead < 3) text = "You can't win me wuu";
            if (i == 5 && playerDead < 3) text = "But first I'll play with you wuu";
            if (i == 6 && playerDead < 3) text = "Don't fall down wuu";

            if (i == 7) gameStart1();
            if (i == 101 && playerDead < 3) { audiodown(); text = "wuu!Where's the light!?"; }
            if (i == 101 && playerDead >= 3) { audiodown(); text = "wuu!You can't pass it anyway wuu!!"; }
            if (i == 102 && playerDead < 3) { audiodown(); text = "NO!You're dead wuu!"; }
            if (i == 102 && playerDead >= 3) { audiodown(); text = "Death is your end wuu!"; }
            if (i == 103) { text = "die wuuuuuu!"; gameStart2(); }

            if (i == 201 && playerDead < 3) { audiodown(); text = "wuwuwuwu The lights are awful"; storyboss4.hp = 1; }
            if (i == 201 && playerDead >= 3) { audiodown(); text = "wuwuwuw The lights are awful"; storyboss4.hp = 1; }
            if (i == 202) { audiodown(); text = "You think you win wuu?"; }
            if (i == 203) { audiodown(); text = "I said you can't beat me!wuwuwu!"; }
            if (i == 204) { audiodown(); text = "Let me kill you!"; gameStart3(); }

            if (i == 301) { audiodown(); text = "wuwuwu!You konw?You don't get the light"; }
            if (i == 302) { audiodown(); text = "You think you won?NO!"; }
            if (i == 303) { audiodown(); text = "shake!"; gameStart4(); }

            if (i == 500) text = "Did you get the bulb and die?hahahaha wuwuuwu";
            if (i == 501) i = 0;
        }
		else
		{
		    if (i == 0 && playerDead < 3){text = "你居然来到这里了呜";} 
		    if (i == 0 && playerDead >= 3) text = "我说过你过不到这关的呜！";
		    if (i == 1 && playerDead < 3) text = "你以为你可以战胜我并把国王带走呜";
		    if (i == 1 && playerDead >= 3) text = "因为我就没有想让你过呜";
		    if (i == 2 && playerDead < 3) text = "那是不可能的！";
		    if (i == 2 && playerDead >= 3) {text = "你为什么不明白呜";gameStart1();}
            if (i == 3 && playerDead < 3) text = "因为我就是不！可！打！败！最·终·幽灵呜";
		    if (i == 4 && playerDead < 3) text = "你真的不可能赢到我！";
		    if (i == 5 && playerDead < 3) text = "不过先陪你这个小家伙玩玩呜";
		    if (i == 6 && playerDead < 3) text = "别掉下去呜";

		    if (i == 7) gameStart1();
		    if (i == 101 && playerDead < 3) {audiodown();text = "呜！哪里来的灯泡呜";}
		    if (i == 101 && playerDead >= 3) {audiodown();text = "呜！反正这关是过不了呜！";}
		    if (i == 102 && playerDead < 3) {audiodown();text = "看来我要搞死你了呜";}
		    if (i == 102 && playerDead >= 3) {audiodown();text = "你再怎么挣扎也过不了呜";}
		    if (i == 103) {text = "死呜呜呜呜！";gameStart2();}
		
		    if (i == 201 && playerDead < 3) {audiodown();text = "呜呜呜呜呜呜呜灯光好可怕呜";storyboss4.hp =1;}
		    if (i == 201 && playerDead >= 3){audiodown();text ="呜呜呜呜呜呜呜灯光好可怕呜";storyboss4.hp = 1;}
		    if (i == 202) {audiodown();text = "你以为你赢了呜";}
            if (i == 203) { audiodown(); text = "我说过你是不可能战胜我的呜呜呜！"; }
            if (i == 204) { audiodown(); text = "让我用华丽的BGM消灭掉你吧！"; gameStart3(); }
		
		    if (i == 301) {audiodown();text = "呜呜呜呜，灯泡并没有被你得到呜";}
		    if (i == 302) {audiodown();text = "你以为你胜利了？我说过我是不可战胜的！";}
		    if (i == 303) {audiodown();text = "闪光吧！世界！";gameStart4();}
		
		    if (i == 500) text = "难道你获得灯泡的同时也顺带死掉了呜，如此萌的呜！";
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
	hp = 2;
    //audio.clip = soundMusic;
	if(j == 0)
	{
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().volume = 1;
	    GetComponent.<AudioSource>().pitch = 1.1; 
	    j++;
	}
	playerControls.cancontrol = true;
	audioValue = 1; 
}

function gameStart3()
{
	yield WaitForSeconds(0.5);
    i = 301;
    advMode = true;                 //进阶模式开启（在第三阶段死掉后开启这个模式加快前期节奏）
	talkMode= false;
	enemy_boss3.cancontrol = true;
	enemy_boss3.hp = 1;
    GetComponent.<AudioSource>().clip = soundMusic3;
	if(j == 0)
    {
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().volume = 1;
	    GetComponent.<AudioSource>().pitch = 1.0; 	
	    Instantiate(tips3,Vector3 (30,-2,0),transform.rotation); 
	    j++;
	}
	playerControls.cancontrol = true;
    audioValue = 1; 
    print(storyboss4.advMode);
}

function gameStart4()
{
    if(gameConfig.worldMostNumber == 4)
        gameConfig.worldMostNumber = 5;
    yield WaitForSeconds (2);
    Camera.main.SendMessage("fadeOut");
    //过关在线统计
    if (gameConfig.stages[16 - 1] == 0) {
        gameConfig.stgOverMode = true;
    }
    yield WaitForSeconds (2);
    if(gameConfig.stages[16-1] == 0)
    {
        gameConfig.stages[16-1] = 1;
        gameConfig.allStar +=1;                     //给一个星星
    }
    hp = 3;
    gameConfig.saveStageDate(); 
    Application.LoadLevel ("story4-5");


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
    if (gameConfig.stages[16 - 1] == 0) {
        gameConfig.stgOverStart = true;
    }
}

