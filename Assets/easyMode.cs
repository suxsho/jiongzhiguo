using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class easyMode : MonoBehaviour {
    //简单模式
    static public bool OK = false;
    static public bool easyModeOpen = false;
    public GameObject easyMod;

	// Use this for initialization
	void Start () {
        easyModeOpen = false;

    }
	
	// Update is called once per frame
	void Update () {
		if(OK)
        {
            Instantiate(easyMod);
            easyModeOpen = true;
            OK = false;
        }
	}
}
