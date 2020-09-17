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

static public var advMode = false;

var tips500: int = 0;

function Start () 
{
    tips500 = 0;
    talkMode= true;		
    var gameConfig = gameObject.GetComponent("gameConfig");	
    //advMode = false;
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
            if (talkMode)
            {
                i = 500;
                tips500++;
            }
				else
				    i = 0;

				talkMode = true;
				hp = 3;
                GetComponent.<AudioSource>().clip = null;	
				playerDead += 1;
                GetComponent.<AudioSource>().volume = 0;
			}
}

function Update () 
{

    if(talkMode && talkSave  && gameConfig.player >= 0)
	{
		bigPlayerControl.cancontrol = false;			
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
            if (i == 0 && playerDead < 3) { text = "嘿，方块酱，我来了！"; }
            if (i == 0 && playerDead >= 3) text = "好像我已经失败了" + playerDead + "次了";
            if (i == 1 && playerDead < 3) text = "被关在笼子里真是辛苦你了";
            if (i == 1 && playerDead >= 3) text = "这应该是史上最简单的关卡了吧";
            if (i == 2 && playerDead < 3) text = "嘿嘿嘿，你肯定没有想过我会来救你吧";
            if (i == 2 && playerDead >= 3) { text = "为什么我不到呢，难道是我的墨镜太黑了"; gameStart1(); }
            if (i == 3 && playerDead < 3) text = "什么！你居然知道！是谁告诉你的！";
            if (i == 4 && playerDead < 3) text = "难道有人在监视我救你的全过程吗！";
            if (i == 5 && playerDead < 3) text = "好了，先长话短说，让我跳起来把你撞下来";
            if (i == 6 && playerDead < 3) text = "不过我得小心点呢";

            if (i == 7) gameStart1();
            if (i == 101 && playerDead < 3) { audiodown(); text = "好勒，就是这样！"; }
            if (i == 101 && playerDead >= 3) { audiodown(); text = "好勒，顺利的第一次"; }
            if (i == 102 && playerDead < 3) { audiodown(); text = "应该再撞几次就可以了"; }
            if (i == 102 && playerDead >= 3) { audiodown(); text = "这一次也肯定没问题！"; }
            if (i == 103 && playerDead < 3) { text = "不过好像它要动起来了，给我3秒时间做好思想准备！"; gameStart2(); }
            if (i == 103 && playerDead >= 3) { text = "为什么我觉得我在给自己树旗？"; gameStart2(); }

            if (i == 201 && playerDead < 3) { audiodown(); text = "好勒，大概是最后一下了，为什么我会知道呢"; }
            if (i == 201 && playerDead >= 3) { audiodown(); text = "离成功越来越近了，毕竟一切都是3次定律！"; }
            if (i == 202) { audiodown(); text = "不过好像接下来会变得更困难呢"; }
            if (i == 203) { audiodown(); text = "不过这并不是问题！小白块！，我...."; }
            if (i == 204) { audiodown(); text = "再让我休息3秒，我怕我还没有站在地上_(:зゝ∠)_"; gameStart3(); }

            if (i == 301) { audiodown(); text = "终于！"; hp = 0;}
            if (i == 302 && playerDead < 3) { audiodown(); text = "其实这应该是这么久以来最简单的一个挑战吧"; }
            if (i == 302 && playerDead >= 3) { audiodown(); text = "这个挑战都失败那么多次那之前我是怎么顺利过来的呢"; }
            if (i == 303) { audiodown(); text = "接下来就靠你了，方块酱"; gameStart4(); }

            if (i == 500 && tips500 < 2) { text = "居然撞歪了还可以飞出去，这是谁做的垃圾设定"; }
            else if (i == 500 && tips500 < 5) { text = "我个天啊，我连续撞歪是什么鬼"; }
            else if (i == 500 && tips500 < 8) { text = "那个啥，我感觉我有点故意这样玩下去了呢"; }
            else if (i == 500 && tips500 < 10) { text = "为什么我会一直这样撞歪呢，难道我是一个游戏测试员吗"; }
            else if (i == 500 && tips500 < 15) { text = "那啥！我居然会觉得这样很好玩，相信没谁有我这么蠢了吧"; }
            else if (i == 500 && tips500 < 25) { text = "突然脑海中有一句话，感谢屏幕前面的你这么认真的测试这个小彩蛋"; }
            else if (i == 500 && tips500 >= 25) { text = "后面真的没新内容了，只有次数更新：" + tips500 + "次"; }
            if (i == 501) i = 0;
        }
        else if (gameConfig.language == "English")
        {
            if (i == 0 && playerDead < 3) { text = "Cube Chan,I'm coming"; }
            if (i == 0 && playerDead >= 3) text = "I have failed" + playerDead + "times";
            if (i == 1 && playerDead < 3) text = "Are you locked in a cage?";
            if (i == 1 && playerDead >= 3) text = "This should be the easiest stage!";
            if (i == 2 && playerDead < 3) text = "Hey, you definitely haven't thought that I will save you";
            if (i == 2 && playerDead >= 3) { text = "Why am I not?Probably my glasses are too dark?"; gameStart1(); }
            if (i == 3 && playerDead < 3) text = "what! you know! Who told you!";
            if (i == 4 && playerDead < 3) text = "Who is monitoring me?";
            if (i == 5 && playerDead < 3) text = "Ok, let me jump and knock you down.";
            if (i == 6 && playerDead < 3) text = "But I have to be careful";

            if (i == 7) gameStart1();
            if (i == 101 && playerDead < 3) { audiodown(); text = "Yeah, that's it!"; }
            if (i == 101 && playerDead >= 3) { audiodown(); text = "Yeah, the first time so smoothly"; }
            if (i == 102 && playerDead < 3) { audiodown(); text = "Let me continue!"; }
            if (i == 102 && playerDead >= 3) { audiodown(); text = "This time is definitely no problem!"; }
            if (i == 103 && playerDead < 3) { text = "it seems that it has to move, give me 3s to prepare!"; gameStart2(); }
            if (i == 103 && playerDead >= 3) { text = "I hope so"; gameStart2(); }

            if (i == 201 && playerDead < 3) { audiodown(); text = "Yeah, probably the last time, why I know?"; }
            if (i == 201 && playerDead >= 3) { audiodown(); text = "Oh Yeah!"; }
            if (i == 202) { audiodown(); text = "But it seems that the next time will become more difficult";}
            if (i == 203) { audiodown(); text = "But this is not a problem!Cube Chan!I!!"; }
            if (i == 204) { audiodown(); text = "Let me rest for 3s, I am afraid I have not stood on the ground"; gameStart3(); }

            if (i == 301) { audiodown(); text = "finally!!"; hp = 0; }
            if (i == 302 && playerDead < 3) { audiodown(); text = "In fact, this should be the simplest challenge"; }
            if (i == 302 && playerDead >= 3) { audiodown(); text = "This challenge has failed so many times before, how did I get through?"; }
            if (i == 303) { audiodown(); text = "Next, it depends on you,Cube Chan"; gameStart4(); }

            if (i == 500 && tips500 < 2) { text = "What?!I'm fly out?"; }
            else if (i == 500 && tips500 < 5) { text = "My God,What Ghost!?"; }
            else if (i == 500 && tips500 < 8) { text = "NyaNyaNyaNya?"; }
            else if (i == 500 && tips500 < 10) { text = "NyaNyaNyaNya?Maybe I'm a game tester?"; }
            else if (i == 500 && tips500 < 15) { text = "NyaNyaNyaNyaNya?I think it's very funny!"; }
            else if (i == 500 && tips500 < 25) { text = "NyaNyaNyaNyaNya??This is an eggs?"; }
            else if (i == 500 && tips500 >= 25) { text = "I dead" + tips500 + "times"; }
            if (i == 501) i = 0;
        }
		else
        {
            if (i == 0 && playerDead < 3) { text = "嘿，方块酱，我来了！";} 
            if (i == 0 && playerDead >= 3) text = "好像我已经失败了" + playerDead+"次了";
            if (i == 1 && playerDead < 3) text = "被关在笼子里真是辛苦你了";
		    if (i == 1 && playerDead >= 3) text = "这应该是史上最简单的关卡了吧";
		    if (i == 2 && playerDead < 3) text = "嘿嘿嘿，你肯定没有想过我会来救你吧";
		    if (i == 2 && playerDead >= 3) {text = "为什么我过不到呢，难道是我的墨镜太黑了";gameStart1();}
            if (i == 3 && playerDead < 3) text = "什么！你居然知道！是谁告诉你的！";
		    if (i == 4 && playerDead < 3) text = "难道有人在监视我救你的全过程吗！";
		    if (i == 5 && playerDead < 3) text = "好了，先长话短说，让我跳起来把你撞下来";
		    if (i == 6 && playerDead < 3) text = "不过我得小心点呢";

		    if (i == 7) gameStart1();
		    if (i == 101 && playerDead < 3) {audiodown();text = "好勒，就是这样！";}
		    if (i == 101 && playerDead >= 3) {audiodown();text = "好勒，顺利的第一次";}
		    if (i == 102 && playerDead < 3) {audiodown();text = "应该再撞几次就可以了";}
		    if (i == 102 && playerDead >= 3) {audiodown();text = "这一次也肯定没问题！";}
            if (i == 103 && playerDead < 3) { text = "不过好像它要动起来了，给我3秒时间做好思想准备！"; gameStart2(); }
            if (i == 103 && playerDead >= 3) { text = "为什么我觉得我在给自己树旗？"; gameStart2(); }
		
		    if (i == 201 && playerDead < 3) {audiodown();text = "好勒，大概是最后一下了，为什么我会知道呢";}
		    if (i == 201 && playerDead >= 3){audiodown();text ="离成功越来越近了，毕竟一切都是3次定律！";}
		    if (i == 202) {audiodown();text = "不过好像接下来会变得更困难呢";}
            if (i == 203) { audiodown(); text = "不过这并不是问题！方块酱！，我...."; }
            if (i == 204) { audiodown(); text = "再让我休息3秒，我怕我还没有站在地上_(:зゝ∠)_"; gameStart3(); }
		
            if (i == 301) { audiodown(); text = "终于！"; hp = 0;}
            if (i == 302 && playerDead < 3) { audiodown(); text = "其实这应该是这么久以来最简单的一个挑战吧"; }
            if (i == 302 && playerDead >= 3) { audiodown(); text = "这个挑战都失败那么多次那之前我是怎么顺利过来的呢"; }
		    if (i == 303) {audiodown();text = "接下来就靠你了，方块酱";gameStart4();}
		
            if (i == 500 && tips500 < 2) { text = "居然撞歪了还可以飞出去，这是谁做的垃圾设定"; }
            else if (i == 500 && tips500 < 5) { text = "我个天啊，我连续撞歪是什么鬼"; }
            else if (i == 500 && tips500 < 8) { text = "那个啥，我感觉我有点故意这样玩下去了呢"; }
            else if (i == 500 && tips500 < 10) { text = "为什么我会一直这样撞歪呢，难道我是一个游戏测试员吗";  }
            else if (i == 500 && tips500 < 15) { text = "那啥！我居然会觉得这样很好玩，相信没谁有我这么蠢了吧";  }
            else if (i == 500 && tips500 < 25) { text = "突然脑海中有一句话，感谢屏幕前面的你这么认真的测试这个小彩蛋";  }
            else if (i == 500 && tips500 >= 25) { text = "后面真的没新内容了，只有次数更新：" + tips500+"次";}
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

    bigPlayerControl.cancontrol = true;
}

function gameStart2()
{
	yield WaitForSeconds(3.5);
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
    bigPlayerControl.cancontrol = true;
	audioValue = 1; 
}

function gameStart3()
{
	yield WaitForSeconds(3.5);
    i = 301;
    advMode = true;                 //进阶模式开启（在第三阶段死掉后开启这个模式加快前期节奏）
	talkMode= false;
	enemy_boss3.cancontrol = true;
	hp = 1;
    GetComponent.<AudioSource>().clip = soundMusic3;
	if(j == 0)
    {
	    GetComponent.<AudioSource>().Play(); 		
	    GetComponent.<AudioSource>().volume = 1;
	    GetComponent.<AudioSource>().pitch = 1.0; 	
	    j++;
	}
    bigPlayerControl.cancontrol = true;
    audioValue = 1; 
}

function gameStart4()
{
    if(gameConfig.worldMostNumber == 4)
        gameConfig.worldMostNumber = 5;
    yield WaitForSeconds (2);
    Camera.main.SendMessage("fadeOut");
    yield WaitForSeconds (2);
    /*if(gameConfig.stages[16-1] == 0)
    {
        gameConfig.stages[16-1] = 1;
        gameConfig.allStar +=1;                     //给一个星星
        gameConfig.powerPoint -= 1;                 //扣一点体力
    }*/
    hp = 3;
    gameConfig.saveStageDate(); 
    Application.LoadLevel ("world5");


}


function audiodown()
{



	if(Time.time > nextFire){

	nextFire = Time.time + fireRate;
	audioValue -= 0.2 ;
	GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = audioValue;
	}
	
}

