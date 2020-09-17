using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Events;
//公告
public class Info : MonoBehaviour {
    public GameObject text;             //可以任意改变文字的内容
    public string verURL = "http://terobi.com/notice.txt";
    // Use this for initialization
    void Start () {

        StartCoroutine(checkWWW());
    }
	
	// Update is called once per frame
	void Update () {
		
	}

    IEnumerator checkWWW()
    {
        WWW verData = new WWW(verURL);
        yield return verData;
        if (verData.error != "")
        {
            Debug.Log(verData.error);
            Destroy(gameObject);
        }
        text.GetComponent<Text>().text = verData.text;
    }
}
