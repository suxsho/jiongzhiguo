using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using UnityEngine.Advertisements;
//using Together;

//选择世界
public class gameoverUI : MonoBehaviour
{
    public GameObject pNum;
    public GameObject zNum;
    public GameObject ezTips;
    public GameObject ADTips;           //广告失败提示
    public GameObject easyModeBtn;      //拖入easy按钮

    int easyMoney;          //easy模式扣除的钱


    //YOMOBAD
    string sencesID = "pnlH4S1IBejdQ2ykSom";

    bool updateStart = true;
    // Use this for initialization
    void Start()
    {
        if (gameConfig.plantform == "ipad")
        {
            GetComponent<CanvasScaler>().referenceResolution = new Vector2(1280, 960);
        }

            if (gameConfig.language == "English")
            ADTips.GetComponent<Text>().text = "";
        else
            ADTips.GetComponent<Text>().text = "";
        if (PlayerPrefs.GetInt("buyGame") == 0)
        {
            if (gameConfig.language == "English")
                ADTips.GetComponent<Text>().text = "";
            else
                ADTips.GetComponent<Text>().text = "";
        }
            

        //EASY模式钱设定
        if (SceneManager.GetActiveScene().name == "stage1")
            easyMoney = 10;
        else if (SceneManager.GetActiveScene().name == "stage2")
            easyMoney = 20;
        else if (SceneManager.GetActiveScene().name == "stage3")
            easyMoney = 30;
        else if (SceneManager.GetActiveScene().name == "stage4")
            easyMoney = 40;
        else if (SceneManager.GetActiveScene().name == "stage6")
            easyMoney = 100;
        else
            easyMoney = 200;

        /**部分关卡不能使用简单模式*/
        if (SceneManager.GetActiveScene().name == "stage1_2"
    || SceneManager.GetActiveScene().name == "stage1_2" || SceneManager.GetActiveScene().name == "boss5"
    || SceneManager.GetActiveScene().name == "boss5-1" || SceneManager.GetActiveScene().name == "stage20" || SceneManager.GetActiveScene().name == "stage2_2" || SceneManager.GetActiveScene().name == "stage6_2"
    || SceneManager.GetActiveScene().name == "stage10_2")
        {
            easyModeBtn.GetComponent<RectTransform>().anchoredPosition = new Vector2(-9999, 9999);
        }

            //按钮加载
            List<string> btnsName = new List<string>();

        btnsName.Add("Button");
        btnsName.Add("ButtonX");
        btnsName.Add("easyMode");
        //btnsName.Add("AD");


        foreach (string btnName in btnsName)
        {
            GameObject btnObj = GameObject.Find(btnName);
            print(btnObj);
            Button btn = btnObj.GetComponent<Button>();
            btn.onClick.AddListener(delegate ()
            {
                this.OnClick(btnObj);
            });
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (pNum != null)
            pNum.GetComponent<Text>().text = gameConfig.Tpoint.ToString();
        if (zNum != null)
            zNum.GetComponent<Text>().text = gameConfig.jiongBi.ToString();

    if(gameConfig.Tpoint > 0)
    {
        if (!gameConfig.easyMode)
            if (gameConfig.language == "English")
                ezTips.GetComponent<Text>().text = "Easy Mode " + easyMoney + " [z]";
            else
                ezTips.GetComponent<Text>().text = "开启简单模式" + easyMoney + "币";
        else
    if (gameConfig.language == "English")
            ezTips.GetComponent<Text>().text = "Easy Mode Opening";
        else
            ezTips.GetComponent<Text>().text = "简单模式已开";
    }
    else
    {
        easyModeBtn.GetComponent<RectTransform>().anchoredPosition = new Vector2(-9999, 9999);
    }


        //音乐控制
        if (updateStart)
        {
            Camera.main.GetComponent<AudioSource>().volume = 0;

            updateStart = false;
        }
            
    }
    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "Button":
                if (gameConfig.Tpoint >= 1)
                {
                    gameConfig.Tpoint -= 1;
                    gameConfig.saveStageDate();
                    Camera.main.SendMessage("fadeOut");
                    StartCoroutine(gameContinue());
                }
                break;
            case "ButtonX":
                    Camera.main.SendMessage("fadeOut");
                    StartCoroutine(giveUpContinue());
                break;
            case "easyMode":
                if (!gameConfig.easyMode)
                    easyModeClick();
                break;
            case "AD":
#if UNITY_ANDROID || UNITY_IPHONE
                if(PlayerPrefs.GetInt("ADT") > 0)
                {
                    if (PlayerPrefs.GetInt("buyGame") == 3680)
                    {
                        gameConfig.Tpoint += 1;
                        gameConfig.saveStageDate();
                        GameObject.Find("AD").transform.position = new Vector2(9999, 9999);

                        PlayerPrefs.SetInt("ADT", PlayerPrefs.GetInt("ADT") - 1);

                        if (gameConfig.language == "English")
                            ADTips.GetComponent<Text>().text = "You bought the game,you can get Tcoins no Ads " + PlayerPrefs.GetInt("ADT") + " times today";
                        else
                            ADTips.GetComponent<Text>().text = "你购买了游戏，可免广告领取奖励哦，今天还剩" + PlayerPrefs.GetInt("ADT") + "次机会";

                        gameConfig.saveStageDate();
                    }
                        else
                        ShowRewardedAd();
                }
                else
                {
                    if (gameConfig.language == "English")
                        ADTips.GetComponent<Text>().text = "You can't get today";
                    else
                        ADTips.GetComponent<Text>().text = "今天不能点再领取了哦";
                }




#endif
                break;
            default:
                print("default");
                break;
        }
    }

    //简单模式
    private void easyModeClick()
    {
            if (gameConfig.jiongBi >= easyMoney)
            {
                gameConfig.jiongBi -= easyMoney;
                easyMode.OK = true;
            gameConfig.easyMode = true;
            if (gameConfig.language == "English")
                ezTips.GetComponent<Text>().text = "Easy Mode Opening";
            else
                ezTips.GetComponent<Text>().text = "简单模式已开";
            gameConfig.saveStageDate();
            }
            else
            {
            if (gameConfig.language == "English")
                ADTips.GetComponent<Text>().text = "Your Zcoin not enough";
            else
                ADTips.GetComponent<Text>().text = "你的金币不足";
            }
    }

#if UNITY_IPHONE || UNITY_ANDROID
    //UNITYADS
    public void ShowRewardedAd()
    {
        if (Advertisement.IsReady("rewardedVideo"))
        {
            var options = new ShowOptions { resultCallback = HandleShowResult };
            Advertisement.Show("rewardedVideo", options);
        }
        else
        {
            //showYOMOBAD();
            if (gameConfig.language == "English")
                ADTips.GetComponent<Text>().text = "ad failed:probably no connection to the network";
            else
                ADTips.GetComponent<Text>().text = "获得广告失败，可能的原因：没联网、没框架、广告没加载好";
        }
    }

    private void HandleShowResult(ShowResult result)
    {
        switch (result)
        {
            case ShowResult.Finished:
                Debug.Log("The ad was successfully shown.");
                gameConfig.Tpoint += 1;
                PlayerPrefs.SetInt("ADT", PlayerPrefs.GetInt("ADT") - 1);

                if (gameConfig.language == "English")
                    ADTips.GetComponent<Text>().text = "You can watch AD " + PlayerPrefs.GetInt("ADT") + " times today";
                else
                    ADTips.GetComponent<Text>().text = "今天你还能看" + PlayerPrefs.GetInt("ADT") + "次广告哦";

                gameConfig.saveStageDate();
                GameObject.Find("AD").transform.position = new Vector2(9999,9999);
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

   //UNITYADSEND  

      //YOMOB
   /* void showYOMOBAD()
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
              gameConfig.Tpoint += 1;
              gameConfig.saveStageDate();
              GameObject.Find("AD").transform.position = new Vector2(9999, 9999);
          };
      }
    */
        //YOMOBEND
#endif     

    //gameover选择X
    IEnumerator giveUpContinue()
    {
        //切场景

        yield return new WaitForSeconds (2);
        gameConfig.player = 5;

        Destroy(gameObject);

        //回到相应场景（暂时记录）
        if (SceneManager.GetActiveScene().name == "stage18" || SceneManager.GetActiveScene().name == "stage19" || SceneManager.GetActiveScene().name == "boss5-1")
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        else
            SceneManager.LoadScene(PlayerPrefs.GetString("woridName"));                                 //加载对应的场景
    }

    //gameover选择Y
    IEnumerator gameContinue()
    {
        //切场景
        yield return new WaitForSeconds(2);
        gameConfig.player = 5;
        Destroy(gameObject);
        gameConfig.continueMode = true;
        //音乐控制
        Camera.main.GetComponent<AudioSource>().volume = 1;
        Camera.main.SendMessage("fadeIn");
    }



}

