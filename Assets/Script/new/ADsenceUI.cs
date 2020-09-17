using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
//using Together;
//推广评价界面
public class ADsenceUI : MonoBehaviour {
    public GameObject text;
    public GameObject text2;

    string sencesID = "pnlH4S1IBejdQ2ykSom";
    // Use this for initialization
    void Start () {
        
        //防止玩家连续刷分
        PlayerPrefs.SetString("startSences", "world2");
        /**按钮功能**/
        List<string> btnsName = new List<string>();

        btnsName.Add("AD");
        btnsName.Add("exit");
        btnsName.Add("con");
        

        foreach (string btnName in btnsName)
        {
            GameObject btnObj = GameObject.Find(btnName);
            Button btn = btnObj.GetComponent<Button>();
            btn.onClick.AddListener(delegate ()
            {
                this.OnClick(btnObj);
            });
        }
    }

    // Update is called once per frame
    public void OnClick(GameObject sender)
    { 

        switch (sender.name)
        {
            case "AD":
                btnAfter();
                //TGSDK.ShowAdScene(sencesID);


#if UNITY_IPHONE
                var url = "https://itunes.apple.com/cn/app/jumpkingdom/id1263791784";
                Application.OpenURL(url);
#else
                const string APP_ID = "com.terobi.jzg";
                var url = string.Format(
                    "market://details?id={0}",
                    APP_ID);
                Application.OpenURL(url);
#endif

                if (PlayerPrefs.GetInt("AD") == 0)
                {
                    if (gameConfig.language == "English")
                        text.GetComponent<Text>().text = "Thank you for your support (>▽<), your support makes us more motivated.";
                    else
                        text.GetComponent<Text>().text = "感谢您的支持啦(>▽<)，我们会勤奋努力的维护这款游戏的，你的支持让我们更有动力了呢";

                }
                    
                if (PlayerPrefs.GetInt("AD") == 1)
                {
                    PlayerPrefs.SetInt("AD", 0);
                    text.GetComponent<Text>().text = "感谢您的支持啦(>▽<)，顺带一说，我们还为您去掉了之后所有关卡的过关弹窗广告，因为您很善良的支持我们，我们也要更善意的对待您，这个小秘密不要告诉别人哦";
                }
                gameConfig.powerPoint += 3;
                gameConfig.saveStageDate();
                break;


            case "exit":
                //TGSDK.ReportAdRejected(sencesID);
                if (gameConfig.language == "English")
                    text.GetComponent<Text>().text = "Well, it doesn't matter. If you want to evaluate later, you can always look for feedback in the Settings button.";
                else
                    text.GetComponent<Text>().text = "嘛，也没关系啦，如果之后想评价可以随时在“设置”按钮中寻找评价功能哦";
                btnAfter();
                break;

            case "con":
                StartCoroutine(gameConfig.changeSence("world2"));
                break;
        }
    } 


    //点击按钮后操作
    void btnAfter()
    {
        GameObject.Find("AD").transform.position = new Vector2(-9999, -9999);
        GameObject.Find("exit").transform.position = new Vector2(-9999, -9999);
        GameObject.Find("con").GetComponent<RectTransform>().anchoredPosition = new Vector2(0, -100);
    }


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
            GameObject.Find("AD").transform.position = new Vector2(9999, 9999);
        };
    }*/

    //YOMOBEND  
}
