#pragma strict
import UnityEngine.SceneManagement;
//关于角色的一些属性设置的脚本

var savePoint 				: Vector2;																	//存档点
var startPoint 				: Transform;																//开始点，注意拖关卡中的START点到脚本里不然要出问题

var soundDead				: AudioClip;																//挂掉的声音
var soundCoin 				: AudioClip;																//获得金币的声音
var sound1UP 				: AudioClip;
var soundHP: AudioClip;
//存档
var soundSave: AudioClip;

static var superTime				: boolean = false;															//无敌模式


static var dead : boolean = false;
static var preDead : boolean = false;                                       //死掉前提示（用于执行一些动画，在controls文件里）

static var timeover : boolean = false;										//时间到


var obj : GameObject;

var gameoverUI: GameObject;

var save_Y: Texture; 

//死掉标记
var deadsign: GameObject;

//吃币特效
var coinEffect: GameObject;

function Start () 
{
    var gameConfig = gameObject.GetComponent("gameConfig");
	superTime = false;      //初始化
    LoadDate();
}

function LoadDate()
{
    if(!gameConfig.firstGame)
    {
        startPoint.position.x = PlayerPrefs.GetInt("startPointX"); 
        startPoint.position.y = PlayerPrefs.GetInt("startPointY");
        gameConfig.firstGame = true;

        transform.position = startPoint.position;
    }
        /** Startpoint功能 */
    else if (startPoint != null)
    {
        transform.position = startPoint.position;
        saveAll();
    }

    //退出游戏后进入世界的坐标
    if (gameConfig.intoGameSave)
    {
        transform.position = Vector2(gameConfig.intoGamePos.x - 3, gameConfig.intoGamePos.y) ;
        gameConfig.intoGameSave = false;
    }


}

//存档功能
function saveAll()
{
    PlayerPrefs.SetInt("startPointX",transform.position.x + 0.5); 
    PlayerPrefs.SetInt("startPointY",transform.position.y);
    PlayerPrefs.SetString("startSences",SceneManager.GetActiveScene().name);  
    PlayerPrefs.SetInt("startPlayer",gameConfig.player); 
    PlayerPrefs.SetInt("startJiong",gameConfig.jiongBi); 

}


function Update () 
{
	    /**无敌传递*/
    if (gameConfig.superMode)
        superTime = true;
/** 挂掉功能 */
	
	if (dead)
	{
	    if(gameConfig.player > 0)
	        createnew();
	    else
	    {
	        gameover();
	    }
	        

	} 

	/** 倒计时结束 */
	
	if (timeover)
	{
		deadAnimation();
		
		timeover = false;							//时间到功能取消
	}

    //强制改变角色行动的一些功能

	if(gameConfig.continueMode)
    {
        bigPlayerControl.cancontrol = true;			//将操控变为允许
	    playerControls.cancontrol = true;			//将操控变为允许

	    gameConfig.continueMode = false;
	}

    if (gameConfig.playerControlFalse)
    {
        bigPlayerControl.cancontrol = false;			//将操控变为允许
	    playerControls.cancontrol = false;			//将操控变为允许

	    gameConfig.playerControlFalse = false;
	}
	
}
/** 存档与角色掉下功能 */
function OnTriggerEnter (other : Collider )
{
	if (other.tag == "startpoint")
	{
		savePoint = other.transform.position; //如果碰到了SP点则存储最新的位置 
		//saveAll();
		/** supermode 还原 */
		gameConfig.superTotal = 0;
		//hp = 0;
	}
	
	if (other.tag == "savepoint")
    {
        GetComponent.<AudioSource>().clip = soundSave;
        GetComponent.<AudioSource>().Play();

        other.GetComponent.<Renderer>().material.mainTexture = save_Y;  	//更改save点颜色
		other.tag =  "oldsave";
		savePoint = other.transform.position; //如果碰到了SP点则存储最新的位置 
		//saveAll();
		
		/** supermode 还原 */
		//gameConfig.superTotal = 0;
		//hp = 0;
	}
	if (other.tag == "killbox")
	{
	    gameConfig.hp = -1;
	    cameraSmooth2D.cameraShake = true;
		if (!superTime)
		deadAnimation();
	}
	
	/**收集囧币的功能*/
	
	if (other.tag == "jiongbi")
	{
        gameConfig.jiongBi++;
        Instantiate(coinEffect, Vector3(transform.position.x, transform.position.y, -1), Quaternion.Euler(-90, 0, 0));
		GetComponent.<AudioSource>().clip = soundCoin;
		GetComponent.<AudioSource>().Play();
		Destroy(other.gameObject);  				//将收集到的物品清楚
	}

	if (other.tag == "HP")
	{
        if (gameConfig.hp < 2)
        {

            gameConfig.hp++;
        }
        Instantiate(coinEffect, Vector3(transform.position.x, transform.position.y, -1), Quaternion.Euler(-90, 0, 0));
	    GetComponent.<AudioSource>().clip = soundHP;
	    GetComponent.<AudioSource>().Play();
	    other.gameObject.transform.position.x = -300;
	    other.gameObject.transform.position.y = -600;	
	}

    /**奖命功能*/
	if (other.tag == "1up")
    {
        Instantiate(coinEffect, Vector3(transform.position.x, transform.position.y, -1), Quaternion.Euler(-90, 0, 0));
	    gameConfig.player ++;
	    GetComponent.<AudioSource>().clip = sound1UP;
	    GetComponent.<AudioSource>().Play();
	    Destroy(other.gameObject);  				//将收集到的物品清除
	}
	
	//碰补补充灯光效果
		if (other.tag == "light")
	{
		lightapper.lightDark = false;
		//把它们移动到看不到的坐标位置去
		other.transform.position.x = 780;
		other.transform.position.y = -30;	
		}

    //BOSS4特殊功能
		if (other.tag == "boss4Light")
		{
		    Camera.main.SendMessage("fadeOut");
		    //把它们移动到看不到的坐标位置去
		    if(storyboss4.hp == 3)
            {
                if (!storyboss4.advMode)
                    other.transform.position.x = 80;
                else
                    other.transform.position.x = 30;
                other.transform.position.y = -2;	
		    }
		    if(storyboss4.hp == 2)
		    {
		        other.transform.position.x = 250;
                other.transform.position.y = -2;	
		    }

		    storyboss4.talkMode = true;
		    yield WaitForSeconds(1);
		    Camera.main.SendMessage("fadeIn");
		}
	
	/*碰怪挂掉功能*/
	
		if (other.tag == "enemy" && !superTime || other.tag == "enemyHit" && !superTime || other.tag == "bomb" && !superTime || other.tag == "boss" && !superTime)
	{	
	    other.transform.position.y += 0.5;
		deadAnimation();
	}
}

function OnTriggerStay (other : Collider )
{
    if (other.tag == "yanjiang" && !superTime)
    {
        gameConfig.hp = -1;
        deadAnimation();
    }
			
}

/**重新生成生命功能*/
function createnew ()
{ 
	/** 正常的重构生命 */  
	gameConfig.hp = 0;											//HP归零
	gameObject.GetComponent.<Renderer>().material.color.g = 1;
	gameObject.GetComponent.<Renderer>().material.color.b = 1;  		//变色，以后是动画
	gameConfig.superTotal ++;						//开启supermode的死亡统计
    gameConfig.player--;							//人数统计增加 

    //修复大方块关卡死掉后一开始跳不起来的问题
    if (SceneManager.GetActiveScene().name == "stage18" || SceneManager.GetActiveScene().name == "stage19")
        transform.position = Vector2(savePoint.x, savePoint.y + 5);
    else
        transform.position = savePoint;

	dead = false;
	preDead = false;
    playerControls.deadRecover = false;				//将速度跳跃全部重置避免第二个声明开始时还会继续上一个声明的跳跃
    bigPlayerControl.deadRecover = false;	
    lightapper.lightDark = false;

    gameConfig.stageAllDead++;                  //开启简单模式统计

    //系统看不下去了会给玩家血
    if (gameConfig.stageAllDead >= 10)
    gameConfig.hp = 1;
    if (gameConfig.stageAllDead >= 20)
        gameConfig.hp = 2;
	
	yield WaitForSeconds(0.3);					//等待时间 黑屏用的
	
	Camera.main.SendMessage("fadeIn");			//开屏
	
    if (gameConfig.player >= 0)
    {
        playerControls.cancontrol = true;			//将操控变为允许
        bigPlayerControl.cancontrol = true;			//将操控变为允许
    }

	superTime = false;							//无敌模式
	
	/** hp增加功能 supermode */ 
	
	if (gameConfig.superTotal > 5) 
	{
		//hp = gameConfig.superTotal - 5;   	//这个是supermode的代码，这次不打算这样设计打算设计成直接购买的所以就屏蔽了
	}
}

/**dead功能*/
function deadAnimation()
{
    gameConfig.hp--;										//HP减少
    //死亡标记
    if (gameConfig.hp < 0)
    {
        if (transform.position.y > -8)
            Instantiate(deadsign, transform.position, Quaternion.Euler(0, 0, 0));
        else
            Instantiate(deadsign, Vector2(transform.position.x, -8), Quaternion.Euler(0, 0, 0));
    }


	superTime = true;							//无敌模式
    gameObject.transform.position.z = -5;		//改变角色坐标让怪都可以传过去（角色看起就像空气一样）

    if (gameConfig.hp < 0)
    {
        playerControls.cancontrol = false;			//将操控变为禁止
        bigPlayerControl.cancontrol = false;			//将操控变为禁止
    }

	gameObject.GetComponent.<Renderer>().material.color.g = 0.5;
	gameObject.GetComponent.<Renderer>().material.color.b = 0.5;  		//变色，以后是动画
	preDead = true;
	GetComponent.<AudioSource>().clip = soundDead;
	GetComponent.<AudioSource>().Play(); 
	yield WaitForSeconds(0.05);
	cameraSmooth2D.cameraShake = false;                                 //停止摄像机抖动
	yield WaitForSeconds(0.5);					//等待时间 演示动画用的
	if (gameConfig.hp < 0)
    {
        PlayerPrefs.SetInt("alldead", PlayerPrefs.GetInt("alldead") + 1);
        playerControls.deadRecover = true;				//将速度跳跃全部重置避免第二个声明开始时还会继续上一个声明的跳跃
        bigPlayerControl.deadRecover = true;
	
        Camera.main.SendMessage("fadeOut");			//黑屏
	
        yield WaitForSeconds(0.2);					//等待时间 黑屏用的


	dead = true;	
	} 
	
	else
	{
			gameObject.GetComponent.<Renderer>().material.color.g = 1;
			gameObject.GetComponent.<Renderer>().material.color.b = 1;  		//变色，以后是动画
			gameObject.transform.position.z = 0; 
            playerControls.cancontrol = true;			//将操控变为允许
            bigPlayerControl.cancontrol = true;			//将操控变为禁止
			superTime = false;							//无敌模式
	}
}

//gameover调出
function gameover ()
{
    if(GameObject.Find("gameover(clone)") == null)
        Instantiate(gameoverUI, transform.position, transform.rotation);     //加载UI
    Camera.main.SendMessage("fadeIn");			//开屏
    createnew ();

}





