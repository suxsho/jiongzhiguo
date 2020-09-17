using System.Collections;
using System.Collections.Generic;
using UnityEngine;
/// <summary>
/// 英文模式下的替换图片
/// </summary>
public class CheckSprite : MonoBehaviour {
    public Sprite pic;
    // Use this for initialization
    void Start () {
        if (gameConfig.language == "English")
            GetComponent<SpriteRenderer>().sprite = pic;

    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
