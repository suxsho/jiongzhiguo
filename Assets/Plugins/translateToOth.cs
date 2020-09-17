using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
/// <summary>
/// 将文字翻译成其他语言
/// </summary>
public class translateToOth : MonoBehaviour {
    public string EngText;
	// Use this for initialization
	void Start () {
        if (gameConfig.language == "English")
            GetComponent<Text>().text = EngText;
    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
