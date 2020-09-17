using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class checkOP : MonoBehaviour {

    void Start()
    {
        Button btn = this.GetComponent<Button>();
        btn.onClick.AddListener(OnClick);
    }

    private void OnClick()
    {
        PlayerPrefs.SetInt("AD", 1);
        StartCoroutine(gameConfig.changeSence("stage15"));
            print("ad = " + PlayerPrefs.GetInt("AD"));
    }
}
