using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
//在LOGO显示文字
public class logoTEXT : MonoBehaviour {
    public GameObject logoUI4_3;
    public bool useIpadMode;
	// Use this for initialization
	void Awake () {
        /*if (PlayerPrefs.HasKey("rankName"))
            GameObject.Find("tipsText").GetComponent<Text>().text = PlayerPrefs.GetString("rankName");*/

        gameConfig.language = PlayerPrefs.GetString("language");

        //设备判断
#if UNITY_IPHONE
       if ((UnityEngine.iOS.Device.generation.ToString()).IndexOf("iPad") > -1)
        {
            gameConfig.plantform = "ipad";
        }
        else
             gameConfig.plantform = "other";
#endif

        //1920X1200适配
        if(Screen.width >= 1600 && Screen.height == 1200 )
        {
            gameConfig.plantform = "ipad";
        }
            

        //IPAD适配
        if (gameConfig.plantform == "ipad" && useIpadMode)
        {
            Instantiate(logoUI4_3, transform.position, transform.rotation);
            Destroy(gameObject);
        }
    }
	
	// Update is called once per frame
	void Update () {
		
	}

    public void selectLanguage()
    {
        SceneManager.LoadScene("selectlanguage");
    }
}
