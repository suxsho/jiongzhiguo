using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
//需要多少个星星开启的提示
public class statNeedText : MonoBehaviour {
    public GameObject textObj;
    public int num;     //设置个数
	// Use this for initialization
	void Start ()
    {
        //数量同需求删除文本
        if (gameConfig.allStar >= num)
            Destroy(gameObject);
        else
            textObj.GetComponent<Text>().text = gameConfig.allStar +" / " + num;

    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
