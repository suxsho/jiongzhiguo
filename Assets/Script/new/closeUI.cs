using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
//关闭UI
public class closeUI : MonoBehaviour {
    public GameObject text;             //可以任意改变文字的内容
    void Start()
    {
        //获取按钮游戏对象
        GameObject btnObj = GameObject.Find("Button");
        //获取按钮脚本组件
        Button btn = (Button)btnObj.GetComponent<Button>();
        //添加点击侦听
        btn.onClick.AddListener(onClick);

        //定义文字内容
        if(gameConfig.tipsText != "" && gameConfig.tipsText != null)
        text.GetComponent<Text>().text = gameConfig.tipsText;

        gameConfig.playerControlFalse = true;
    }

    void onClick()
    {
        gameConfig.continueMode = true;
        gameConfig.tipsText = "";
        Destroy(gameObject);
    }
}
