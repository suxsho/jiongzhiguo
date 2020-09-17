using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
//显示HP
public class hpValue : MonoBehaviour {
    [Header("在HP2图层上打钩，HP1不打")]
    public bool HP2 = false;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update ()
    {
        if (gameConfig.hp <= 0)
            GetComponent<Image>().color = new Color(1, 1, 1, 0);
        if(!HP2)
        if (gameConfig.hp == 1)
            GetComponent<Image>().color = new Color(1, 1, 1, 1);
        else
            if (gameConfig.hp == 2)
                GetComponent<Image>().color = new Color(1, 1, 1, 0);

        if (HP2)
            if (gameConfig.hp == 1)
                GetComponent<Image>().color = new Color(1, 1, 1, 0);
            else
                if (gameConfig.hp == 2)
                GetComponent<Image>().color = new Color(1, 1, 1, 1);
    }
}
