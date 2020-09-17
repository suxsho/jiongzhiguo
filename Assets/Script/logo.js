#pragma strict
import UnityEngine.SceneManagement;
//LOGO相关代码
var N : int;
var S : int;


function Awake()
{
        //PlayerPrefs.DeleteAll(); 
    if (!PlayerPrefs.HasKey("language"))
    {
        PlayerPrefs.SetString("language", "CN");
        Application.LoadLevel("selectlanguage");
    }
}


function Start()
{

    //IOS清档方案
 /*   if(!PlayerPrefs.HasKey ("ver"))
    {
        PlayerPrefs.DeleteAll(); 
        PlayerPrefs.SetInt("ver", 152);
    }*/
    var gameConfig = gameObject.GetComponent("gameConfig");
    if(SceneManager.GetActiveScene().name == "logo")
        DataIns();

    if (!PlayerPrefs.HasKey("AD"))
    PlayerPrefs.SetInt("AD", 0);

    if (!PlayerPrefs.HasKey("buyGame"))
        PlayerPrefs.SetInt("buyGame", 0);

    if (!PlayerPrefs.HasKey("info"))
    PlayerPrefs.SetString("info", "0000O00O0O00OO00");

}
function Update () {
	if (Input.GetKey ("h")){
	Application.LoadLevel (N);}
	
	loadlogo ();
	
    //初始启动游戏跳转场景
	if(SceneManager.GetActiveScene().name == "logo")
	{


	      if(PlayerPrefs.HasKey ("startSences"))
	          loadDate();
	     /* else 	 if(PlayerPrefs.GetInt ("clearGame") == 12)
	          Application.LoadLevel (34);*/
            else
	         loadlogo();
	}
}

//存档初始化
function DataIns()
{
    if(PlayerPrefs.HasKey ("startSences"))
        gameConfig.loadStageDate();
    else
        gameConfig.saveStageDate();
}

function loadlogo (){

//等待3秒消失
	yield WaitForSeconds (S);
    Camera.main.SendMessage("fadeOut");
	
	yield WaitForSeconds (2);
	Application.LoadLevel (N);
	
	
	
}

//读档
function loadDate ()
{

    starCheck();
    yield WaitForSeconds(3);
        gameConfig.player  = PlayerPrefs.GetInt("startPlayer"); 
        gameConfig.jiongBi = PlayerPrefs.GetInt("startJiong"); 
        gameConfig.firstGame = false;          //记录是否第一次游戏，读档的时候用于跳转到相应的场景
        SceneManager.LoadScene(PlayerPrefs.GetString("startSences"));  

}

function starCheck()
{
    //防止修改星星作弊
    #if UNITY_IPHONE
            //过多的星星
            if (PlayerPrefs.GetInt("power") > 999)
            gameConfig.powerPoint = 14;
    #endif

    #if UNITY_ANDROID
        if (PlayerPrefs.GetInt("power") > 899 || PlayerPrefs.GetInt("startJiong") >= 10001 || PlayerPrefs.GetInt("startPlayer") >= 1001 || PlayerPrefs.GetString("info") != "0000O00O0O00OO00")
        {
            PlayerPrefs.SetString("info", "0O00O00O0O0OOO00");

                gameConfig.powerPoint = -1;


            PlayerPrefs.SetInt("startJiong", -1);
        }
    #endif
}