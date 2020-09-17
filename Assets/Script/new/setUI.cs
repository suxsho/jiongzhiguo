using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using UnityEngine.Advertisements;
//世界地图UI功能

public class setUI : MonoBehaviour {
    //拖入要素
    public GameObject gameTimeText;
    public GameObject gameStarText;
    public GameObject gameDieText;
    public GameObject gameEmeText;

    //动画
    Animator anim;

    void Start ()
    {
        anim = GetComponent<Animator>();           //载入动画
        /**按钮功能**/
        List<string> btnsName = new List<string>();

        btnsName.Add("close");
        //btnsName.Add("weibo");
        //btnsName.Add("talk");
        btnsName.Add("exit");

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
	
	void Update () {

        if (gameTimeText != null)
            if (gameConfig.language == "English")
                gameTimeText.GetComponent<Text>().text = "GameTime: " + gameConfig.allGameTime;
            else
                gameTimeText.GetComponent<Text>().text = "游戏时长:" + gameConfig.allGameTime;
        if (gameStarText != null)
            if (gameConfig.language == "English")
                gameStarText.GetComponent<Text>().text = "GetStar: " + gameConfig.allStar.ToString();
            else
                gameStarText.GetComponent<Text>().text ="获得星星:" + gameConfig.allStar.ToString();
        if (gameEmeText != null)
            if (gameConfig.language == "English")
                gameEmeText.GetComponent<Text>().text = "GetDiamond: " + gameConfig.emerald.ToString();
            else
                gameEmeText.GetComponent<Text>().text = "获得钻石:" + gameConfig.emerald.ToString();
        if (gameDieText != null)
            if (gameConfig.language == "English")
                gameDieText.GetComponent<Text>().text = "AllDead: " + PlayerPrefs.GetInt("alldead");
            else
                gameDieText.GetComponent<Text>().text = "累计失败:" + PlayerPrefs.GetInt("alldead");


    }

    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "talk":
#if UNITY_IPHONE
                Application.OpenURL("https://itunes.apple.com/cn/app/%E5%9B%A7%E4%B9%8B%E5%9B%BD/id1263791784");
#else
                const string APP_ID = "com.terobi.jzg";
                var url = string.Format(
                    "market://details?id={0}",
                    APP_ID);
                Application.OpenURL(url);
#endif
                break;
            case "weibo":
                if (gameConfig.language == "English")
                    Application.OpenURL("https://twitter.com/terobiGames");
                    else
                    Application.OpenURL("http://weibo.com/terobi");
                break;

            case "close":
                gameConfig.continueMode = true;
                anim.SetBool("UIExit", true);
                break;
            case "exit":
                Application.Quit();
                break;
            default:
                print("default");
                break;
        }
    }

    //UI消失后删除
    void UIExitOK()
    {
        Destroy(GameObject.Find("setUI(Clone)"));
    }
}
