using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
/// <summary>
/// 选择语言
/// </summary>
public class seleceLanguage : MonoBehaviour {

	// Use this for initialization
	void Start () {
        //按钮加载
        List<string> btnsName = new List<string>();

        btnsName.Add("Chinese");
        btnsName.Add("English");

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

    public void OnClick(GameObject sender)
    {
        switch (sender.name)
        {
            case "Chinese":
                PlayerPrefs.SetString("language", "Chinese");
                SceneManager.LoadScene("logo");
                break;
            case "English":
                PlayerPrefs.SetString("language", "English");
                SceneManager.LoadScene("logo");
                break;
        }
    }

}
