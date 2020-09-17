using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;//使用 该引用，才能获得 Text 组件。
using UnityEngine.SceneManagement;

public class rankUI : MonoBehaviour
{
    public GameObject inputtext;

    // Use this for initialization
    void Start()
    {
        List<string> btnsName = new List<string>();
        btnsName.Add("Button");

        foreach (string btnName in btnsName)
        {
            GameObject btnObj = GameObject.Find(btnName);
            Button btn = btnObj.GetComponent<Button>();
            btn.onClick.AddListener(delegate () {
                this.OnClick(btnObj);
            });
        }
    }

    void Update()
    {
        //print(inputtext.GetComponent<InputField>().text);
    }

    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "Button":
                choseOK();
                break;
            default:
                Debug.Log("none");
                break;
        }
    }

    void choseOK()
    {
        PlayerPrefs.SetString("rankName", inputtext.GetComponent<InputField>().text);
        PlayerPrefs.DeleteKey("startPointX");
        PlayerPrefs.DeleteKey("startPointY");
        PlayerPrefs.DeleteKey("startSences");
        PlayerPrefs.DeleteKey("startPlayer");
        PlayerPrefs.DeleteKey("startJiong");
        gameConfig.jiongBi = 0;
        gameConfig.player = 2;
        SceneManager.LoadScene(0);
    }
  }