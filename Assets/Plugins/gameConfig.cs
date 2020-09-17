//用于存储游戏数据信息
using System;
using UnityEngine;
using System.Collections;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class gameConfig : MonoBehaviour {

    public static bool debugMode = false;

    public static int region = 1;                               //版本，0是IOS付费，1是IOS免费

    ///临时数据

    public static int jiongBi = 0;                              //这个是当前获得囧币的统计，每次转换都需要清零
    public static int gTime = 0;                                //所需时间统计
    public static int player = 5;								//数量
    public static int hp = 0;

    public static int stageAllDead = 0;                         //总共死掉次数（用于开启easy模式）

    // 已经花费的时间 
    public static float timeSpend = 0.0f;
    public static string allGameTime;                          //用于UI显示

    public static int superTotal = 0;                           //统计挂掉的数量，开启supermode模式

    public static int Tpoint = 5;                              //Tbi

    public static int powerPoint = 20;                              //体力量（每过一关体力会减少一点）

    public static int worldMostNumber = 1;                      //开启了多少个世界

    public static int scores = 0;                               //积分，用于gamecenter排名

    ///状态数据

    public static bool firstGame = true;                        //是否为第一次游戏（用于服务器统计信息）
    public static bool overGame = true;                         //是否通关（用于服务器统计信息）
    public static string plantform = "PC";				    	//发布平台，可填写ipad pc android steam	
    public static string language = "CN";                              //使用语言
    //public static string language = "English";

    public static bool pauseMode = false;                       //暂停

    public static bool continueMode = false;                       //gameover界面需要的功能
    public static bool playerControlFalse = false;                  //解决JS和C#不能控制角色移动的中间参数

    public static bool shopSystem = false;                          //商店开关UI，和worldUI挂钩

    public static int stageOverStarCoin = 1;                    //设置过关的参数


    //关卡信息
    public static int[] stages = new int[60];                   //设置关卡

    public static int allStar = 0;                              //总共获得星星

    public static int emerald = 0;                              //总共获得水晶数量
    public static int Gemerald = 0;                              //总共获得金色水晶数量

    public static int stageID;

    //特殊状态
    public static bool audioDownStart = false;                  //关声音
    float i;
    float audioValue = 1;
	
	    //无敌状态（防止暂停时掉落的冲突）
    public static bool superMode;
    public static bool easyMode;

    //提示消息
    public static string tipsText;

    //关卡服务器反馈消息（用于stageover触发的时候让服务器记录POST信息）
    public static bool stgOverMode = false;
    public static bool stgOverStart = false;            //用于防止玩家过关后再次进入关卡的错误提交

    //截屏DUBUG
    private bool screenMode = false;

    public static bool chestCheck = false;

    //服务器页面
    public static string hosturl = "http://terobi.com";

    //存储进入世界的时候的位置
    public static Vector2 intoGamePos;
    public static bool intoGameSave = false;

    //任务模式（时间挑战模式）
    public static bool missionMode = false;
    public static string missionText;
    public static int missionNum;             //达成任务需要个数
    public static int missionGoldNum;         //达成任务目标个数
    public static int missionMostNum;         //获得黄金成就个数
    public static int missionList = 0;            //任务表
    public static bool missionTimeOver = false;

    //单个关卡时间计算
    public static float stageStartTime = 0.0f;
    public static float stageClearTime = 0.0f;

    // Use this for initialization
    void OnGUI()
    {
        //测试系统语言
        if(debugMode)
        {
            GUI.Label(new Rect(10, 10, 500, 100), Application.systemLanguage.ToString());
            GUI.Label(new Rect(110, 20, 100, 100), "DEBUG模式启动");
            
        }

        //截屏,使用的时候把场景里的摄像机跟随玩家功能勾去掉，否则要报错
        if(screenMode)
        {
            if (GUI.Button(new Rect(350, 20, 100, 100), "截屏"))
            {
                ScreenCapture.CaptureScreenshot(Application.streamingAssetsPath + "/" + transform.position.x + ".png", 0);
            }
            if (GUI.Button(new Rect(500, 20, 100, 100), "下一屏"))
            {
                transform.position = new Vector3(transform.position.x + 31, transform.position.y, transform.position.z);
            }
        }

    }


    //START
    void Start () 
	{
        Application.targetFrameRate = 60;                       //帧数，在ios上需要这个帧数
        if (PlayerPrefs.GetInt("buyGame") == 0)
            powerPoint = 8;

            //DEBUG模式设置
            if (debugMode)
        {
            powerPoint = 9;
            Tpoint = 999;
            //allStar = 25;
            player = 5;
            jiongBi = 0;
        }

        /**积分计算*/
        scores = allStar * 100 + emerald * 300 + Gemerald * 500 + player * 10 + jiongBi;

        /**数据初始化*/
        missionNum = 0;
        missionList = 0;
        missionGoldNum = 0;
        missionMostNum = 0;
        missionTimeOver = false;
        superMode = false;


        //系统语言判断
        //language = Application.systemLanguage.ToString();

    }



    // Update is called once per frame
    void Update () 
	{

        //上限
        if (jiongBi >= 9999)
            jiongBi = 9999;
        if (player >= 999)
            player = 999;
        //print(superTotal);
        if (debugMode && Input.GetKeyDown("p"))
			Application.LoadLevel (5);

        //设置成就
        if (superTotal == 10)
        {
        }

        //关声音
        if(audioDownStart)
        {
            audiodown();
        }

        /**时间统计*/
        gameTimeTotal();

        /**任务模式*/
        if (missionMode)
            stageMission();

    }

    /**任务模式*/
    void stageMission()
    {
        if (SceneManager.GetActiveScene().name == "stage1")
        {
            missionList = 2;
            missionGoldNum = 70;
            missionMostNum = 58;
        }
        if (SceneManager.GetActiveScene().name == "stage2")
        {
            missionList = 2;
            missionGoldNum = 85;
            missionMostNum = 62;
        }
        if (SceneManager.GetActiveScene().name == "stage4")
        {
            missionList = 2;
            missionGoldNum = 100;
            missionMostNum = 67;
        }
        if (SceneManager.GetActiveScene().name == "stage5")
        {
            missionList = 2;
            missionGoldNum = 120;
            missionMostNum = 99;
        }
        if (SceneManager.GetActiveScene().name == "stage6")
        {
            missionList = 2;
            missionGoldNum = 80;
            missionMostNum = 65;
        }

        if (SceneManager.GetActiveScene().name == "stage10")
        {
            missionList = 2;
            missionGoldNum = 85;
            missionMostNum = 61;
        }

        if (SceneManager.GetActiveScene().name == "stage11")
        {
            missionList = 2;
            missionGoldNum = 120;
            missionMostNum = 85;
        }
        if (SceneManager.GetActiveScene().name == "stage12")
        {
            missionList = 2;
            missionGoldNum = 190;
            missionMostNum = 160;
        }
        if (SceneManager.GetActiveScene().name == "stage13")
        {
            missionList = 2;
            missionGoldNum = 105;
            missionMostNum = 90;
        }

        if (SceneManager.GetActiveScene().name == "stage14")
        {
            missionList = 2;
            missionGoldNum = 130;
            missionMostNum = 105;
        }

        if (SceneManager.GetActiveScene().name == "stage16")
        {
            missionList = 2;
            missionGoldNum = 140;
            missionMostNum = 120;
        }
        if (SceneManager.GetActiveScene().name == "stage17")
        {
            missionList = 2;
            missionGoldNum = 140;
            missionMostNum = 125;
        }

        //显示区域
        if (missionList == 1)
        {
            missionText = "在关卡中寻找" + missionNum + "/" + missionGoldNum + "个奖命道具";

        }

        if (missionList == 2)
        {
            if (!missionTimeOver)
                missionNum = (int)(timeSpend - stageStartTime);
            else
                missionNum = (int)stageClearTime;
            missionText = missionNum.ToString();


        }
    }

    //通用功能

    //存档（关卡数组）
    static public void saveStageDate()
    {

        string convert = JsonConvert.SerializeObject(stages);
        Debug.Log(convert);
        PlayerPrefs.SetString("stagesData", convert);

        PlayerPrefs.SetInt("allstar", allStar);
        PlayerPrefs.SetInt("zCoin", allStar);
        PlayerPrefs.SetInt("zC", allStar);
        PlayerPrefs.SetInt("Tc", Tpoint);
        PlayerPrefs.SetInt("Tb", Tpoint);
        PlayerPrefs.SetInt("TCoin", Tpoint);
        PlayerPrefs.SetInt("starCoin", powerPoint);
        PlayerPrefs.SetInt("power", powerPoint);
        PlayerPrefs.SetInt("worldMostNumber", worldMostNumber);
        PlayerPrefs.SetInt("worldCoin", worldMostNumber);
        PlayerPrefs.SetFloat("allGameTime", timeSpend);
        PlayerPrefs.SetInt("emerald", emerald);
        

        print("save data");

    }

    //读档
    static public void loadStageDate()
    {
        string convert = PlayerPrefs.GetString("stagesData"); ;
        stages = JsonConvert.DeserializeObject<int[]>(convert);

        allStar = PlayerPrefs.GetInt("allstar");
        Tpoint = PlayerPrefs.GetInt("Tb");
        powerPoint = PlayerPrefs.GetInt("power");
        worldMostNumber = PlayerPrefs.GetInt("worldMostNumber");
        timeSpend = PlayerPrefs.GetFloat("allGameTime");
        emerald = PlayerPrefs.GetInt("emerald");

        print("data is load");
    }

    //世界跳转   StartCoroutine(gameConfig.changeSence("name"));
    static public IEnumerator changeSence(string stagename)
    {
        Camera.main.SendMessage("fadeOut");
        audioDownStart = true;
        yield return new WaitForSeconds(2);
        audioDownStart = false;
        SceneManager.LoadScene(stagename);                                 //加载对应的场景

    }

    //声音淡出 gameConfig.audioDownStart = true;

    void audiodown()
    {
        if (i >= 0.1f)
        {
            audioValue -= 0.2f;
            AudioSource audio = GetComponent<AudioSource>();
            audio.volume = 1 + audioValue;
            //-----下面的保持不动------
            i = 0;
        }
        i += Time.deltaTime;


        if(audioValue<= -1)
            audioDownStart = false;

    }

    /** 游戏时长统计 **/
    void gameTimeTotal()
    {

        int hour;
        int minute;
        int second;

        timeSpend += Time.deltaTime;

        hour = (int)timeSpend / 3600;
        minute = ((int)timeSpend - hour * 3600) / 60;
        second = (int)timeSpend - hour * 3600 - minute * 60;

        allGameTime = string.Format("{0:D2}:{1:D2}:{2:D2}", hour, minute, second) ;
    }


}
