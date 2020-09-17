using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/// <summary>
/// 可实现某个关卡过关后才开启该物体的功能
/// </summary>
/// 

public class openStage : MonoBehaviour {
    public int stageID;
	// Use this for initialization
	void Awake () {
		if(gameConfig.stages[stageID - 1] == 0)
        {
            Destroy(gameObject);
        }
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
