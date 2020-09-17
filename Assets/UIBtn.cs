using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
//UI按钮响应，对应的是虚拟键
public class UIBtn : MonoBehaviour {
    Touch touch0;

    //GUI按比例缩放功能
    // original screen size
    float m_fScreenWidth  = 960;
    float m_fScreenHeight = 540;
    // scale factor
    float m_fScaleWidth;
    float m_fScaleHeight;
    // Use this for initialization
    public bool checkIpad;
    public GameObject IpadUI;               //IPAD专用UI

    public GameObject text;
    public GameObject leftBtn;
    public GameObject rightBtn;
    public GameObject Jumpbtn;
    void Start () {
        //替换UI
        if (gameConfig.plantform == "ipad")
        {
            if(checkIpad)
            {
                Instantiate(IpadUI, transform.position, transform.rotation);
                Destroy(gameObject);
                //改成IPADUI
                m_fScreenWidth = 1024;
             m_fScreenHeight = 768;
            }
        }

        //如果分辨率是1920 1200的话特殊处理
        if(Screen.width == 1920 && Screen.height == 1200)
        {
            if(leftBtn != null)
            leftBtn.GetComponent<RectTransform>().anchoredPosition = new Vector2(-407, -240);
            if (rightBtn != null)
                rightBtn.GetComponent<RectTransform>().anchoredPosition = new Vector2(-267, -240);
            if (Jumpbtn != null)
                Jumpbtn.GetComponent<RectTransform>().anchoredPosition = new Vector2(420, -240);
        }

    }
	
	// Update is called once per frame
	void Update () {
        //-----------------------------------------------------
        //            自动适应分辨率
        //-----------------------------------------------------
        m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
        m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight;

        if (Input.touchCount > 0 && !gameConfig.playerControlFalse)
        {
            touch0 = Input.GetTouch(0);

                if (touch0.position.x < 140 * m_fScaleWidth && touch0.position.y < 250 * m_fScaleHeight)
                {
          //          GameObject.Find("leftBtn").GetComponent<Image>().color = new Color(0.7f, 0.7f, 0.7f, 1.000f);
            //        GameObject.Find("rightBtn").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.000f);
                }

                if (touch0.position.x > 180 * m_fScaleWidth && touch0.position.x < 400 * m_fScaleWidth && touch0.position.y < 250 * m_fScaleHeight)
                {
        //            GameObject.Find("rightBtn").GetComponent<Image>().color = new Color(0.7f, 0.7f, 0.7f, 1.000f);
          //          GameObject.Find("leftBtn").GetComponent<Image>().color = new Color(1.0f, 1.0f, 1.0f, 1.000f);
                }
            else if (touch0.position.x > 140 * m_fScaleWidth && touch0.position.x < 180 * m_fScaleWidth)
            {
     //           GameObject.Find("jumpBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
       //         GameObject.Find("leftBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
         //       GameObject.Find("rightBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
            }

            else if (Input.touchCount <= 1 && touch0.position.x > Screen.width - 200 * m_fScaleWidth && touch0.position.y < 250 * m_fScaleHeight)
            {
   //             GameObject.Find("jumpBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
     //           GameObject.Find("leftBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
       //         GameObject.Find("rightBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
            }

        }
        else 
        {
//            GameObject.Find("jumpBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
  //          GameObject.Find("leftBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
    //        GameObject.Find("rightBtn").GetComponent<Image>().color = new Color(1f, 1f, 1f, 1.000f);
        }
    }
}
