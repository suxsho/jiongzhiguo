using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Networking;
using UnityEngine.Events;
//关闭UI
public class noticeUI : MonoBehaviour {
    public GameObject noticeText,title1TextBtn, title2TextBtn, title3TextBtn, title4TextBtn,page1,page2,page3,page4;
    private string page1Text,page2Text,page3Text,page4Text;             //可以任意改变文字的内容
    private string title1Text, title2Text, title3Text, title4Text;
    public Sprite btnClick,btnNormal;

    int page;       //确定页号，防止玩家无尽的刷新
    string url2, setUrl;        //网页次路径，中英文不一样

    Animator anim;

    void Start()
    {
        //英文和中文的路径
        if (gameConfig.language == "English")
        {
            setUrl = "/jzgass/noticeEng/set.txt";
            url2 = "/jzgass/noticeEng/";
#if UNITY_IPHONE
            setUrl = "/jzgass/noticeEngIOS/set.txt";
            url2 = "/jzgass/noticeEngIOS/";
#endif
        }
        else
        {
            setUrl = "/jzgass/notice/set.txt";
            url2 = "/jzgass/notice/";
#if UNITY_IPHONE
            setUrl = "/jzgass/noticeIOS/set.txt";
            url2 = "/jzgass/noticeIOS/";
#endif
        }


        anim = GetComponent<Animator>();
        page1.GetComponent<Image>().sprite = btnClick;
        //按钮功能
        List<string> btnsName = new List<string>();

        btnsName.Add("Button");
        btnsName.Add("page1");
        btnsName.Add("page2");
        btnsName.Add("page3");
        btnsName.Add("page4");


        foreach (string btnName in btnsName)
        {
            GameObject btnObj = GameObject.Find(btnName);
            Button btn = btnObj.GetComponent<Button>();
            btn.onClick.AddListener(delegate ()
            {
                this.OnClick(btnObj);
            });
        }

        //获取初始公告内容与设置
            StartCoroutine(getNoticeData("page1.txt"));
            StartCoroutine(getNoticeSet());

        gameConfig.playerControlFalse = true;
    }

    //按钮功能
    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "Button":
                Destroy(gameObject);
                gameConfig.continueMode = true;
                break;
            case "page1":
                //每次请求数据后，会在本次做缓存，防止玩家一直刷新
                if (page1Text == null)
                    StartCoroutine(getNoticeData("page1.txt"));
                else
                    noticeText.GetComponent<Text>().text = page1Text;

               page1.GetComponent<Image>().sprite = btnClick;
                page2.GetComponent<Image>().sprite = btnNormal;
                page3.GetComponent<Image>().sprite = btnNormal;
                page4.GetComponent<Image>().sprite = btnNormal;
                break;
            case "page2":
                if (page2Text == null)
                    StartCoroutine(getNoticeData("page2.txt"));
                else
                    noticeText.GetComponent<Text>().text = page2Text;

                page1.GetComponent<Image>().sprite = btnNormal;
                page2.GetComponent<Image>().sprite = btnClick;
                page3.GetComponent<Image>().sprite = btnNormal;
                page4.GetComponent<Image>().sprite = btnNormal;
                break;

            case "page3":
                if (page3Text == null)
                    StartCoroutine(getNoticeData("page3.txt"));
                else
                    noticeText.GetComponent<Text>().text = page3Text;

                page1.GetComponent<Image>().sprite = btnNormal;
                page2.GetComponent<Image>().sprite = btnNormal;
                page3.GetComponent<Image>().sprite = btnClick;
                page4.GetComponent<Image>().sprite = btnNormal;
                break;

            case "page4":
                if (page4Text == null)
                    StartCoroutine(getNoticeData("page4.txt"));
                else
                    noticeText.GetComponent<Text>().text = page4Text;

                page1.GetComponent<Image>().sprite = btnNormal;
                page2.GetComponent<Image>().sprite = btnNormal;
                page3.GetComponent<Image>().sprite = btnNormal;
                page4.GetComponent<Image>().sprite = btnClick;
                break;
        }
    }

    //获得公告内容
    IEnumerator getNoticeData(string page)
    {
        WWW noticeUrl = new WWW(gameConfig.hosturl + url2 + page);       

        if (gameConfig.language == "English")
            noticeText.GetComponent<Text>().text = "Loading...";
        else
            noticeText.GetComponent<Text>().text = "正在接收服务器数据...";

        yield return noticeUrl;
        if (noticeUrl.error != null)
        {
            Debug.Log(noticeUrl.error);
            if (gameConfig.language == "English")
                noticeText.GetComponent<Text>().text = "No connection!check your net please!";
            else
                noticeText.GetComponent<Text>().text = "没连上服务器，检查下网络，如果网络正常试试重开游戏，还是不行？请通过邮件suxsho@terobi.com反馈我！";
        }

        if (noticeUrl.text != "﻿0")
        {
            //将文字作临时缓存，防止无限刷新数据
            if (page == "page1.txt")
                page1Text = noticeUrl.text;
            if (page == "page2.txt")
                page2Text = noticeUrl.text;
            if (page == "page3.txt")
                page3Text = noticeUrl.text;
            if (page == "page4.txt")
                page4Text = noticeUrl.text;

            noticeText.GetComponent<Text>().text = noticeUrl.text;
        }
    }

    //获得公告标题与设置
    IEnumerator getNoticeSet()
    {
        WWW noticeUrl = new WWW(gameConfig.hosturl + setUrl);
        
        yield return noticeUrl;
        if (noticeUrl.error != null)
        {
            Debug.Log(noticeUrl.error);
        }

        SplitText(noticeUrl.text);
    }

    //拆分文字
    void SplitText(string dateText)
    {

        string[] acText = dateText.Split('|');

        print("acText[0]=" + acText[0]);
        print("acText[1]=" + acText[1]);
        print("acText[2]=" + acText[2]);
        print("acText[3]=" + acText[3]);
        print("acText[4]=" + acText[4]);

            //print(int.Parse(acText[0]));


        title1TextBtn.GetComponent<Text>().text = acText[1];
        title2TextBtn.GetComponent<Text>().text = acText[2];
        title3TextBtn.GetComponent<Text>().text = acText[3];
        title4TextBtn.GetComponent<Text>().text = acText[4];

        //根据设置来确定公告数量
        if(acText[0] == "1")
        {
            page2.GetComponent<RectTransform>().anchoredPosition = new Vector2(9999, 9999);
            page3.GetComponent<RectTransform>().anchoredPosition = new Vector2(9999, 9999);
            page4.GetComponent<RectTransform>().anchoredPosition = new Vector2(9999, 9999);
        }

        if (acText[0] == "2")
        {
            page3.GetComponent<RectTransform>().anchoredPosition = new Vector2(9999, 9999);
            page4.GetComponent<RectTransform>().anchoredPosition = new Vector2(9999, 9999);
        }

        if (acText[0] == "3")
        {
            page4.GetComponent<RectTransform>().anchoredPosition = new Vector2(9999, 9999);
        }
        anim.SetBool("getNotice", true);

    }


}
