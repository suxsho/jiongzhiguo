using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using UnityEngine.Advertisements;
#if UNITY_IPHONE
using UnityEngine.SocialPlatforms;
using UnityEngine.SocialPlatforms.GameCenter;
#endif
//using Together;
//世界地图UI功能

public class worldUI : MonoBehaviour {
    //拖入要素
    public GameObject pNum;
    public GameObject dNum;
    public GameObject tNum;
    public GameObject zNum;
    public GameObject playerNum;

    public GameObject otherWorld;           //拖入跳转世界按钮
    public GameObject powerTips;                //拖入星星能量提示
    public GameObject setUI;                //拖入设置UI
    public GameObject shopUI;                //拖入商店UI
    public GameObject starUI;                //拖入内购UI
    public GameObject newVer;

    public GameObject dailyItem;            //签到奖励
    public GameObject dailyTips;            //签到提示
    public GameObject dailyFail;            //签到失败

    public GameObject adBtn;                //买游戏
    public GameObject shopBtn;              //
    public GameObject WadBtn;                //广告

    public GameObject IpadUI;               //IPAD专用UI
    public bool checkIpad = true;                         //是否检测IPAD


    //获取时间类
    public string timeURL = "http://worldtimeapi.org/api/timezone/Asia/Shanghai";
    public int year, mouth, day, hour, min, sec;
    public int intelTime;               //网络时间
    public bool dailyBack = false;

    bool openStart = false;

    //YOMOBAD
    string sencesID = "iS92KO4FtqjTDCBmDw0";

    //更新提示功能
    int currentVerCode;//当前版本号数字
    private string currentVersion;      //本地的版本
    private string webVersion;          //服务器的版本

    public string verURL = "http://terobi.com/ver.txt";


    //公告功能
    static public bool openNotice = false;        //打开公告
    
    public GameObject noticeUI;

    void Awake()
    {
        checkifIpad();
        timeURL = System.DateTime.Now.ToString("yyyy-MM-dd");

        print(timeURL);
    }

        // Use this for initialization
        void Start () {
        //StartCoroutine(gameUpdateCheck());


        shopBtn.transform.position = new Vector2(-9999, -9999);
        if(gameConfig.powerPoint >5 || PlayerPrefs.GetInt("buyGame") == 3680)
            WadBtn.transform.position = new Vector2(9999, 9999);

        if (gameConfig.chestCheck)
        {
            gameConfig.tipsText = "因为一些问题导致你的游戏没有正确存档，难道是用修改器了吗？";
            Instantiate(dailyFail, transform.position, transform.rotation);
        }

    }
	
	// Update is called once per frame
	void Update () {
        if(!openStart)
        {
            //检测是否有签到记录，如果没有则设置成0
            if (!PlayerPrefs.HasKey("dailyItem"))
                PlayerPrefs.SetInt("dailyItem", 0);
            if(gameConfig.debugMode)
                PlayerPrefs.SetInt("dailyItem", 0);
            if (int.Parse(System.DateTime.Now.ToString("yyyyMMdd")) <= PlayerPrefs.GetInt("dailyItem"))
            {

                Destroy(dailyItem);
            }
            //yyyyMMddHHmm
            //检测星星能量
            if (gameConfig.powerPoint > 0)
            {
                Destroy(powerTips);
            }
            else
            {
                Instantiate(starUI, transform.position, transform.rotation);
            }
            //按钮功能
            List<string> btnsName = new List<string>();

            btnsName.Add("worldSelect");
            //btnsName.Add("dayItems");
            //btnsName.Add("buyGame");
            btnsName.Add("shop");
            btnsName.Add("Setting");
            //btnsName.Add("newVer");
            //btnsName.Add("rank");
            //btnsName.Add("Wad");


            foreach (string btnName in btnsName)
            {
                GameObject btnObj = GameObject.Find(btnName);
                Button btn = btnObj.GetComponent<Button>();
                btn.onClick.AddListener(delegate ()
                {
                    this.OnClick(btnObj);
                });
            }

            //付费版无限隐藏广告按钮
            if (PlayerPrefs.GetInt("buyGame") == 3680)
                adBtn.transform.position = new Vector2(-9999, -9999);

            openStart = true;
        }
        if (pNum != null)
            pNum.GetComponent<Text>().text = gameConfig.Tpoint.ToString();
        if (dNum != null)
            dNum.GetComponent<Text>().text = gameConfig.allStar.ToString();
        if (tNum != null)
        {
#if UNITY_IPHONE
            if (PlayerPrefs.GetInt("buyGame") == 3680)
                tNum.GetComponent<Text>().text = "∞";
            else
                tNum.GetComponent<Text>().text = gameConfig.powerPoint.ToString();
#else
            if (PlayerPrefs.GetInt("buyGame") == 3680)
                tNum.GetComponent<Text>().text = "∞";
            else
                tNum.GetComponent<Text>().text = gameConfig.powerPoint.ToString();
#endif
        }
        if (zNum != null)
            zNum.GetComponent<Text>().text = gameConfig.jiongBi.ToString();
        if (playerNum != null)
            playerNum.GetComponent<Text>().text = gameConfig.player.ToString();


        //签到奖励获取
        if (intelTime > PlayerPrefs.GetInt("dailyItem") && dailyBack)
        {
            if(gameConfig.powerPoint < 9)
            {
                gameConfig.Tpoint += 2;
                gameConfig.powerPoint += 3;
                PlayerPrefs.SetInt("ADT", 10);      //设置广告次数
                Instantiate(dailyTips, transform.position, transform.rotation);
                gameConfig.saveStageDate();
                PlayerPrefs.SetInt("dailyItem", intelTime);

            }
            else
            {
                gameConfig.tipsText = "超过9点体力就不能领取了，去刷点关卡吧，下次你回到这里时领取奖励的提示就会再次出现了哦";
                Instantiate(dailyFail, transform.position, transform.rotation);
            }
            dailyBack = false;
        }
        if (intelTime <= PlayerPrefs.GetInt("dailyItem") && dailyBack)
        {
            Instantiate(dailyFail, transform.position, transform.rotation);
            dailyBack = false;
        }

        //商店按钮出现和消失
        if (gameConfig.shopSystem)
            if (gameConfig.plantform == "ipad")
                shopBtn.GetComponent<RectTransform>().anchoredPosition = new Vector2(417, -79);
            else
                shopBtn.GetComponent<RectTransform>().anchoredPosition = new Vector2(578,117);
        else
            shopBtn.transform.position = new Vector2(-9999, -9999);

    }

    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "worldSelect":
                if(GameObject.Find("worldSelect(Clone)") == null)
                {
                    gameConfig.playerControlFalse = true;
                    Instantiate(otherWorld, transform.position, transform.rotation);
                }
               
                break;
            case "dayItems":
                //进行签到
                GetTime();
                Destroy(dailyItem);
                break;
            case "buyGame":
                //内购
                gameConfig.playerControlFalse = true;
                Instantiate(starUI, transform.position, transform.rotation);
                break;
                //设置
            case "Setting":
                if (GameObject.Find("setUI(Clone)") == null)
                {
                    gameConfig.playerControlFalse = true;
                    Instantiate(setUI, transform.position, transform.rotation);
                }
                break;
            //商店
            case "shop":
                if (GameObject.Find("shopUI(Clone)") == null)
                {
                    gameConfig.playerControlFalse = true;
                    Instantiate(shopUI, transform.position, transform.rotation);
                }
                break;
            case "Wad":
                 #if UNITY_IPHONE || UNITY_ANDROID
                ShowRewardedAd();
#endif
                break;
            case "newVer":
#if UNITY_IPHONE
                const string APP_ID = "1263791784";
                var url = string.Format(
                    "itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id={0}",
                    APP_ID);
                Application.OpenURL(url);
#else
                const string APP_ID = "com.terobi.jzg";
                var url = string.Format(
                    "market://details?id={0}",
                    APP_ID);
                Application.OpenURL(url);
#endif
                break;
#if UNITY_IPHONE
            case "rank":
                if (Social.localUser.authenticated)
                {
                    Social.ShowLeaderboardUI();
                }
                break;
#endif
            default:
                print("default");
                break;
        }
    }

    //获取腾讯提供的时间
    void GetTime()
    {

        SplitTime(timeURL);
    }
    void SplitTime(string dateTime)
    {
        dateTime = dateTime.Replace("-", "|");
        dateTime = dateTime.Replace(" ", "|");
        dateTime = dateTime.Replace(":", "|");
        string[] Times = dateTime.Split('|');
        year = int.Parse(Times[0]);
        mouth = int.Parse(Times[1]);
        day = int.Parse(Times[2]);
        //hour = int.Parse(Times[3]);
        //min = int.Parse(Times[4]);
        //sec = int.Parse(Times[5]);

        intelTime = year * 10000 + mouth * 100 + day;

        Destroy(powerTips); //修复星星用光了马上领取了一波，但是依然不能进入关卡
        dailyBack = true;
    }

    //UNITYADS
#if UNITY_IPHONE || UNITY_ANDROID
    public void ShowRewardedAd()
    {
        if (Advertisement.IsReady("rewardedVideo"))
        {
            print("已经看广告了");
            var options = new ShowOptions { resultCallback = HandleShowResult };
            Advertisement.Show("rewardedVideo", options);
        }
        else
        {
            //showYOMOBAD();
        }

    }

    private void HandleShowResult(ShowResult result)
    {
        switch (result)
        {
            case ShowResult.Finished:
                Debug.Log("The ad was successfully shown.");
                gameConfig.powerPoint += 1;
                gameConfig.saveStageDate();
                WadBtn.transform.position = new Vector2(9999, 9999);
                //
                // YOUR CODE TO REWARD THE GAMER
                // Give coins etc.
                break;
            case ShowResult.Skipped:
                Debug.Log("The ad was skipped before reaching the end.");
                break;
            case ShowResult.Failed:
                Debug.LogError("The ad failed to be shown.");
                break;
        }
    }
#endif

    /**更新提示*/
    IEnumerator gameUpdateCheck()
    {

        //获得本地版本并转换成数字
        currentVersion = Application.version;
        currentVersion = currentVersion.Replace(".", "");
        currentVerCode = int.Parse(currentVersion);

        //获得服务器版本并转化成数字
        WWW verData = new WWW(verURL);
        yield return verData;
        if (verData.error != null)
        {
            Debug.Log(verData.error);
        }
        webVersion = verData.text;

        //对比
        if (int.Parse(webVersion) > currentVerCode)
        {
            //提示更新
            print("要更新了");
            newVer.GetComponent<RectTransform>().anchoredPosition = new Vector2(-410, 193);
            if (gameConfig.plantform == "ipad")
                newVer.GetComponent<RectTransform>().anchoredPosition = new Vector2(-435,275);

            //老版本更新UI公告
            if (openNotice)
            {

#if UNITY_IPHONE
                WWW noticeOldUrl = new WWW("http://terobi.com/IOSnoticeOld.txt");
#else
                WWW noticeOldUrl = new WWW("http://terobi.com/noticeOld.txt");
#endif
                yield return noticeOldUrl;
                if (verData.error != "")
                {
                    Debug.Log(verData.error);

                }
                if (noticeOldUrl.text != "﻿0")
                {
                    gameConfig.tipsText = noticeOldUrl.text;
                    Instantiate(noticeUI, transform.position, transform.rotation);
                    gameConfig.playerControlFalse = true;
                    openNotice = false;
                }
                else
                    openNotice = true;
            }
        }

        //公告UI是否看起的判断
        if(openNotice)
        {
            //第一页
            WWW noticeUrl = new WWW(gameConfig.hosturl + "/jzgass/notice/page1.txt");

            yield return noticeUrl;
            if (verData.error != null)
            {
                Debug.Log(verData.error);
            }
            if (noticeUrl.text != "﻿0")
            {
                Instantiate(noticeUI, transform.position, transform.rotation);
                gameConfig.playerControlFalse = true;
            }

            openNotice = false;
        }
    }




    //UNITYADSEND

    //检查IPAD
    void checkifIpad()
    {
#if UNITY_IPHONE
        gamecenter.setHighScore = true;
#endif
        //替换RANK按钮
#if UNITY_ANDROID
       // GameObject.Find("rank").GetComponent<RectTransform>().anchoredPosition = new Vector2(9999, 9999);
#endif
        //替换UI
        if (gameConfig.plantform == "ipad")
         {
            GetComponent<CanvasScaler>().referenceResolution = new Vector2(1280, 960);
            GameObject.Find("pannel").GetComponent<RectTransform>().anchoredPosition = new Vector2(0, 129);

        }

    }



    //YOMOB
    /*  void showYOMOBAD()
      {


          if (TGSDK.CouldShowAd(sencesID))
          {
              TGSDK.ShowAd(sencesID);
          }


          // 广告配置数据获取成功
          TGSDK.PreloadAdSuccessCallback = (string ret) =>
          {
              print("play AD OK");
          };

          // 奖励类广告达成领奖条件可以发放奖励的回调
          TGSDK.AdRewardSuccessCallback = (string ret) =>
          {
              gameConfig.powerPoint += 1;
              gameConfig.saveStageDate();
              GameObject.Find("AD").transform.position = new Vector2(9999, 9999);
          };
      }
      */
    //YOMOBEND  

}
