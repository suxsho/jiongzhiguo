using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class UItext : MonoBehaviour {

    //拖入要素
    public GameObject Pnum;
    public GameObject Znum;

    public GameObject ZImg;
    public GameObject PImg;
    public GameObject EImg;     //钻石任务
    public GameObject EText;

    public GameObject GoldText; //钻石任务达成时间


    public GameObject star1;
    public GameObject star2;
    public GameObject star3;

    //钻石
    public GameObject Emerald;
    public Sprite EmeImgNor;
    public Sprite EmeImgGold;
    public Sprite superImage;
    public Sprite pImage;

    public Sprite starNone;
    public Sprite starImage;

    //easy模式的提示
    public GameObject easyFailTips;

    int easyMoney;          //easy模式扣除的钱

    //存储功能(为了实现金币动画跳动小细节）
    float savePointZ;       //存储Z图片默认坐标（抖动动画使用）
    float i =0 ;

    int checkZnum;          //检测Z个数

    public GameObject IpadUI;               //IPAD专用UI
    public bool checkIpad = true;                         //是否检测IPAD

    private bool easyModeOpen = false;

    public GameObject uibtn;

    void Awake()
    {
        ipadScreenCheck();
        if(uibtn != null)
        Instantiate(uibtn, transform.position, transform.rotation);
    }

    void Start()
    {

        savePointZ = ZImg.transform.position.y;

        /**检测是否开启任务模式*/
        if (gameConfig.stages[gameConfig.stageID - 1] < 1)
        {
            gameConfig.missionMode = false;
            Destroy(EImg);
        }
        else
        {
            gameConfig.missionMode = true;
        }

        //某些关卡不提供任务模式
        if(SceneManager.GetActiveScene().name == "stage3" || SceneManager.GetActiveScene().name == "stage7" || SceneManager.GetActiveScene().name == "stage1_2"
            || SceneManager.GetActiveScene().name == "boss3" || SceneManager.GetActiveScene().name == "boss4" || SceneManager.GetActiveScene().name == "stage1_2" || SceneManager.GetActiveScene().name == "boss5"
            || SceneManager.GetActiveScene().name == "boss5-1" || SceneManager.GetActiveScene().name == "stage20" || SceneManager.GetActiveScene().name == "stage2_2" || SceneManager.GetActiveScene().name == "stage6_2"
            || SceneManager.GetActiveScene().name == "stage10_2")
        {
            gameConfig.missionMode = false;
            Destroy(EImg);
        }

    }
    // Update is called once per frame
    void Update ()
    {
        if (Pnum != null)
        {
            if(gameConfig.player<10)
            Pnum.GetComponent<Text>().text ="00"+ gameConfig.player.ToString();
            else if (gameConfig.player < 100)
                Pnum.GetComponent<Text>().text = "0" + gameConfig.player.ToString();
            else
                Pnum.GetComponent<Text>().text = gameConfig.player.ToString();
        }
            
        if (Znum != null)
        {
            if (gameConfig.jiongBi < 10)
                Znum.GetComponent<Text>().text ="000"+ gameConfig.jiongBi.ToString();
            else if (gameConfig.jiongBi < 100)
                Znum.GetComponent<Text>().text = "00" + gameConfig.jiongBi.ToString();
            else if (gameConfig.jiongBi < 1000)
                Znum.GetComponent<Text>().text = "0" + gameConfig.jiongBi.ToString();
            else 
                Znum.GetComponent<Text>().text = gameConfig.jiongBi.ToString();
        }

        //计时模块显示
        if (EText != null)
            EText.GetComponent<Text>().text = gameConfig.missionText;
        if (GoldText != null)
            GoldText.GetComponent<Text>().text = gameConfig.missionGoldNum.ToString();


        //金币跳动
        if (checkZnum < gameConfig.jiongBi)
        {
            i = 1;
            gameContinue();
        }




        /* //UI透明
         if (GameObject.Find("player").transform.position.y > 0)
         {
             ZImg.GetComponent<Image>().color =new Color(1,1, 1, 0.2f);
         }
         else
         {

         }*/

    }

    //金币跳动
    void gameContinue()
    {
        //每秒执行一次操作
        if (i >= 0.1f)
        {
            if (ZImg.transform.position.y == savePointZ)
                ZImg.transform.position = new Vector2(ZImg.transform.position.x, ZImg.transform.position.y + 5);

            else
            {
                ZImg.transform.position = new Vector2(ZImg.transform.position.x, savePointZ);
                checkZnum = gameConfig.jiongBi;
            }
            //-----下面的保持不动------
            i = 0;
        }
        i += Time.deltaTime;
    }

    //IPADUI
    void ipadScreenCheck()
    {
        //替换UI
        if (gameConfig.plantform == "ipad")
        {
            if (checkIpad)
            {
                Destroy(gameObject);
                print("清理了老UI");
                Instantiate(IpadUI, transform.position, transform.rotation);
            }

        }
    }


}
