using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
/// <summary>
/// 暂停UI的功能
/// </summary>
public class pauseUI : MonoBehaviour {
    int restart = 0;                                //设置restaert次数
    void Start()
    {
        List<string> btnsName = new List<string>();
        btnsName.Add("continue");
        //btnsName.Add("restart");
        btnsName.Add("delete");

        foreach (string btnName in btnsName)
        {
            GameObject btnObj = GameObject.Find(btnName);
            Button btn = btnObj.GetComponent<Button>();
            btn.onClick.AddListener(delegate () {
                this.OnClick(btnObj);
            });
        }


    }

    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "continue":
                btnContinue();
                break;
            /*case "restart":
                btnRestart();
                break;*/
            case "delete":
                btnDelete();
                break;
            default:
                Debug.Log("none");
                break;
        }
    }

    void Update()
    {
        //用键盘或者手柄取消暂停
        if (Input.GetButtonDown("Fire3"))
        {
            Time.timeScale = 1;
            Destroy(GameObject.Find("pause(Clone)"));
            gameConfig.pauseMode = false;
        }
    }

    //------------------------------------------------
    //----------------------------按钮的相关操作
    //------------------------------------------------
    void btnContinue()
    {
        Time.timeScale = 1;
        Destroy(GameObject.Find("pause(Clone)"));
        gameConfig.pauseMode = false;
    }

    void btnRestart()
    {
        if (restart < 1)
        {
            restart++;
            GameObject.Find("tipsText").GetComponent<Text>().text = "再次点击从关卡开头开始，金币会还原，死掉的人数不会";
        }
        else
        {
            gameConfig.jiongBi -= 250;
            Time.timeScale = 1;
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);      //加载对应的场景
        }
        
    }

    void btnDelete()
    {
        gameConfig.intoGameSave = true;
        if (restart < 1)
        {
            restart++;
            GameObject.Find("tipsText").GetComponent<Text>().text = "再次点击回到世界地图";
            if (SceneManager.GetActiveScene().name == "stage18" || SceneManager.GetActiveScene().name == "stage19")
                GameObject.Find("tipsText").GetComponent<Text>().text = "再次点击从关卡开头开始";
        }
        else
        {
            Time.timeScale = 1;
            //PlayerPrefs.DeleteKey("startPointX");
            //PlayerPrefs.DeleteKey("startPointY");
            //PlayerPrefs.DeleteKey("startSences");
            //PlayerPrefs.DeleteKey("startPlayer");
            //PlayerPrefs.DeleteKey("startJiong");
            //PlayerPrefs.DeleteKey("stagesData");
            //PlayerPrefs.DeleteKey("allstar");
            //gameConfig.jiongBi = 0;
            //gameConfig.player = 2;
            //gameConfig.allStar = 0;
            gameConfig.hp = 0;
            gameConfig.stageAllDead = 0;
            gameConfig.superMode = true;
            if(SceneManager.GetActiveScene().name == "stage18" || SceneManager.GetActiveScene().name == "stage19")
                StartCoroutine(gameConfig.changeSence(SceneManager.GetActiveScene().name));
            else
            StartCoroutine(gameConfig.changeSence(PlayerPrefs.GetString("woridName")));

            //for (int i = 0; i <= gameConfig.stages.Length - 1; i++)
            //{
            //   gameConfig.stages[i] = 0;
            //}
        }
    }
}
