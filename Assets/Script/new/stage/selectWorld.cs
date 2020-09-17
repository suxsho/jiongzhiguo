using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
//选择世界
public class selectWorld : MonoBehaviour
{
    int worldNum = 1;

    //动画
    Animator anim;
    public GameObject worldText;
    // Use this for initialization
    void Start()
    {
        //绑定动画
        anim = GetComponent<Animator>();           //载入动画
        //显示原始参数
        if (gameConfig.language == "English")
            worldText.GetComponent<Text>().text = "World " + worldNum;
        else
            worldText.GetComponent<Text>().text = "世界  " + worldNum;

        List<string> btnsName = new List<string>();

        btnsName.Add("Button");
        btnsName.Add("ButtonX");
        btnsName.Add("left");
        btnsName.Add("right");

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
    void Update()
    {

    }
    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "Button":
                if(worldNum == 1)
                    StartCoroutine(gameConfig.changeSence("world1"));
                if (worldNum == 2)
                    StartCoroutine(gameConfig.changeSence("world2"));
                if (worldNum == 3)
                    StartCoroutine(gameConfig.changeSence("world3"));
                if (worldNum == 4)
                    StartCoroutine(gameConfig.changeSence("world4"));
                if (worldNum == 5)
                    StartCoroutine(gameConfig.changeSence("world5"));
                break;
            case "ButtonX":
                anim.SetBool("UIExit", true);
                gameConfig.continueMode = true;
                break;
            case "left":
                if(worldNum>1)
                worldNum -= 1;
                if (gameConfig.language == "English")
                    worldText.GetComponent<Text>().text = "World " + worldNum;
                else
                    worldText.GetComponent<Text>().text = "世界  " + worldNum;
                break;
            case "right":
                if (worldNum < gameConfig.worldMostNumber)
                    worldNum += 1;
                if (gameConfig.language == "English")
                    worldText.GetComponent<Text>().text = "World " + worldNum;
                else
                    worldText.GetComponent<Text>().text = "世界  " + worldNum;
                break;
            default:
                print("default");
                break;
        }
    }

    //UI消失后删除
    void UIExitOK()
    {
        Destroy(GameObject.Find("worldSelect(Clone)"));
    }

}

