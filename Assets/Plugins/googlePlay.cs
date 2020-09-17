using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/// <summary>
/// google 服务
/// </summary>
public class googlePlay : MonoBehaviour {

    string json;

// Use this for initialization
    void Start () {

    }

    void OnGUI()
    {
        GUI.Label(new Rect(10, 10, 999, 300), "json =" + json);
    }

    // Update is called once per frame
    void Update () {
		
	}


}
