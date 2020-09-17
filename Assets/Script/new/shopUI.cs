using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;
//商店UI数值
public class shopUI : MonoBehaviour {
    int select = 0;             //记录选择的数字，用来判断买的时候扣钱

    //拖入内容
    public GameObject zBiNum;               //Z币数字
    public GameObject descriptionText;      //描述数字
    public GameObject buyText;              //买买买数字

    //动画
    Animator anim;

    // Use this for initialization
    void Start () {
        anim = GetComponent<Animator>();           //载入动画
        reButtonColor();
        /**按钮功能**/
        List<string> btnsName = new List<string>();

        btnsName.Add("btn1");
        btnsName.Add("btn2");
        btnsName.Add("btn3");
        btnsName.Add("btn4");
        btnsName.Add("btn5");
        btnsName.Add("btn6");
        btnsName.Add("close");
        btnsName.Add("buy");

        foreach (string btnName in btnsName)
        {
            GameObject btnObj = GameObject.Find(btnName);
            Button btn = btnObj.GetComponent<Button>();
            btn.onClick.AddListener(delegate ()
            {
                this.OnClick(btnObj);
            });
        }

        /**移除付费与不付费的内容*/
        if (PlayerPrefs.GetInt("buyGame") == 0)
        {
            GameObject.Find("btn4").GetComponent<RectTransform>().anchoredPosition = new Vector2(-9999, 9999);
            GameObject.Find("btn5").GetComponent<RectTransform>().anchoredPosition = new Vector2(-9999, 9999);
        }
        else
            GameObject.Find("btn6").GetComponent<RectTransform>().anchoredPosition = new Vector2(-9999, 9999);
    }

    void Update()
    {

        //显示币数量
        if (zBiNum != null)
            zBiNum.GetComponent<Text>().text = gameConfig.jiongBi.ToString();

        //显示提示语句以及按钮颜色变化
        if(select == 0)
        {
            if (descriptionText != null)
                if (gameConfig.language == "English")
                    descriptionText.GetComponent<Text>().text = "Choose the item you want to buy";
                else
                    descriptionText.GetComponent<Text>().text = "欢迎选用自动售货机，选择想买的商品";
        }
        else if (select == 1)
        {
           
            if (descriptionText != null)
                if (gameConfig.language == "English")
                    descriptionText.GetComponent<Text>().text = "500 Zcoins,The maximum is 9999";
                else
                    descriptionText.GetComponent<Text>().text = "500个金币，注意上限是9999";

            //钱不够提示
            if (gameConfig.Tpoint < 1)
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(0.4f, 0.4f, 0.4f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "No coins";
                else
                    buyText.GetComponent<Text>().text = "币不够";
            }
            else
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "buy";
                else
                    buyText.GetComponent<Text>().text = "买买买";
            }
        }
        else if (select == 2)
        {
            if (descriptionText != null)
                if (gameConfig.language == "English")
                    descriptionText.GetComponent<Text>().text = "HP,you get" + gameConfig.hp + "/2,exit game will disappear!";
                else
                    descriptionText.GetComponent<Text>().text = "心，你带了" + gameConfig.hp + "/2个，注意带着关闭游戏会消失";

            //钱不够提示
            if (gameConfig.jiongBi < 50)
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(0.4f, 0.4f, 0.4f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "No coins";
                else
                    buyText.GetComponent<Text>().text = "币不够";
            }
            else
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "buy";
                else
                    buyText.GetComponent<Text>().text = "买买买";
            }
        }
        else if (select == 3)
        {
            if (descriptionText != null)
                if (gameConfig.language == "English")
                    descriptionText.GetComponent<Text>().text = "1UP,Cheaper than continue game";
                else
                    descriptionText.GetComponent<Text>().text = "可以买到生命，当然比你续关时花费划算一些";

            //钱不够提示
            if (gameConfig.jiongBi < 80)
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(0.4f, 0.4f, 0.4f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "No coins";
                else
                    buyText.GetComponent<Text>().text = "币不够";
            }
            else
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "buy";
                else
                    buyText.GetComponent<Text>().text = "买买买";
            }
        }
        else if (select == 4)
        {
            if (descriptionText != null)
                if (gameConfig.language == "English")
                    descriptionText.GetComponent<Text>().text = "Bring it can enter the level";
                else
                    descriptionText.GetComponent<Text>().text = "进入关卡需要的体力哦";

            //钱不够提示
            if (gameConfig.jiongBi < 1000)
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(0.4f, 0.4f, 0.4f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "No coins";
                else
                    buyText.GetComponent<Text>().text = "币不够";
            }
            else
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "buy";
                else
                    buyText.GetComponent<Text>().text = "买买买";
            }
        }
        else if (select == 5)
        {
            if (descriptionText != null)
                if (gameConfig.language == "English")
                    descriptionText.GetComponent<Text>().text = "Bring it can enter the level";
                else
                    descriptionText.GetComponent<Text>().text = "进入关卡需要的体力哦";

            //钱不够提示
            if (gameConfig.Tpoint < 2)
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(0.4f, 0.4f, 0.4f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "No coins";
                else
                    buyText.GetComponent<Text>().text = "币不够";
            }
            else
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "buy";
                else
                    buyText.GetComponent<Text>().text = "买买买";
            }
        }
        else if (select == 6)
        {
            if (descriptionText != null)
                if (gameConfig.language == "English")
                    descriptionText.GetComponent<Text>().text = "Can continue game if you game over";
                else
                    descriptionText.GetComponent<Text>().text = "生命0后让你从存档点复活的币";

            //钱不够提示
            if (gameConfig.jiongBi < 500)
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(0.4f, 0.4f, 0.4f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "No coins";
                else
                    buyText.GetComponent<Text>().text = "币不够";
            }
            else
            {
                GameObject.Find("buy").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.000f);
                if (gameConfig.language == "English")
                    buyText.GetComponent<Text>().text = "buy";
                else
                    buyText.GetComponent<Text>().text = "买买买";
            }
        }

    }


    /**按钮功能**/
    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "btn1":
                reButtonColor();
                GameObject.Find("shop1").GetComponent<Image>().color = new Color(1.000f, 0.866f, 0.581f, 1.000f);
                select = 1;
                print("select btn1");
                break;
            case "btn2":
                reButtonColor();
                GameObject.Find("shop2").GetComponent<Image>().color = new Color(1.000f, 0.866f, 0.581f, 1.000f);
                select = 2;
                print("select btn2");
                break;
            case "btn3":
                reButtonColor();
                GameObject.Find("shop3").GetComponent<Image>().color = new Color(1.000f, 0.866f, 0.581f, 1.000f);
                select = 3;
                print("select btn3");
                break;
            case "btn4":
                reButtonColor();
                GameObject.Find("shop4").GetComponent<Image>().color = new Color(1.000f, 0.866f, 0.581f, 1.000f);
                select = 4;
                print("select btn4");
                break;
            case "btn5":
                reButtonColor();
                GameObject.Find("shop5").GetComponent<Image>().color = new Color(1.000f, 0.866f, 0.581f, 1.000f);
                select = 5;
                print("select btn5");
                break;
            case "btn6":
                reButtonColor();
                GameObject.Find("shop6").GetComponent<Image>().color = new Color(1.000f, 0.866f, 0.581f, 1.000f);
                select = 6;
                print("select btn6");
                break;
            case "close":
                gameConfig.continueMode = true;
                anim.SetBool("UIExit", true);
                break;
            case "buy":
                buybuybuy();
                break;
        }
    }

    /**还原颜色（用于改变颜色前的复位**/
    void reButtonColor()
    {
        GameObject.Find("shop1").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.0f);
        GameObject.Find("shop2").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.0f);
        GameObject.Find("shop3").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.0f);
        GameObject.Find("shop4").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.0f);
        GameObject.Find("shop5").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.0f);
        GameObject.Find("shop6").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.0f);
    }

    /**买买买的代码**/
    void buybuybuy()
    {
        //买生命
        if (select == 1)
        {
            if(gameConfig.Tpoint >= 1)
            {
                gameConfig.Tpoint -= 1;
                gameConfig.jiongBi += 500;
                gameConfig.saveStageDate();
            }
        }
        else if (select == 2)
        {
            if (gameConfig.jiongBi >= 100 && gameConfig.hp < 2)
            {
                gameConfig.jiongBi -= 100;
                gameConfig.hp += 1;
                gameConfig.saveStageDate();
            }
        }
        else if (select == 3)
        {
            if (gameConfig.jiongBi >= 80)
            {
                gameConfig.jiongBi -= 80;
                gameConfig.player += 1;
                gameConfig.saveStageDate();
            }
        }
        else if (select == 4)
        {
            if (gameConfig.jiongBi >= 1000)
            {
                gameConfig.jiongBi -= 1000;
                gameConfig.powerPoint += 1;
                gameConfig.saveStageDate();
            }
        }
        else if (select == 5)
        {
            if (gameConfig.Tpoint >= 2)
            {
                gameConfig.Tpoint -= 2;
                gameConfig.powerPoint += 1;
                gameConfig.saveStageDate();
            }
        }
        else if (select == 6)
        {
            if (gameConfig.jiongBi >= 500)
            {
                gameConfig.jiongBi -= 500;
                gameConfig.Tpoint += 1;
                gameConfig.saveStageDate();
            }
        }
    }

    //UI消失后删除
    void UIExitOK()
    {
        Destroy(GameObject.Find("shopUI(Clone)"));
    }
}
