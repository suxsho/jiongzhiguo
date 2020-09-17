using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
//过关统计UI显示
public class clearListUI : MonoBehaviour {
    public GameObject deadText;
    public GameObject timeText;
    public GameObject tipsText;

    public GameObject eImgEmpty;
    public GameObject eImg;
    public GameObject eImgGold;

    public GameObject starImg;

    static int tipsID = 0;
    // Use this for initialization
    void Start () {
        if (gameConfig.language == "English")
            deadText.GetComponent<Text>().text = "die: " + gameConfig.stageAllDead + "";
        else
            deadText.GetComponent<Text>().text = "死掉" + gameConfig.stageAllDead + "次";
        if (gameConfig.language == "English")
            timeText.GetComponent<Text>().text = "Clear Time: " + gameConfig.stageClearTime.ToString("f2") + "s";
        else
            timeText.GetComponent<Text>().text = "过关时间:" + gameConfig.stageClearTime.ToString("f2") + "秒";
        if (tipsID <= 6)
            tipsID++;
        else
            tipsID = 1;
        if (tipsID == 1)
            if (gameConfig.language == "English")
                tipsText.GetComponent<Text>().text = "Tips:You can get diamond when you clear stage";
            else
                tipsText.GetComponent<Text>().text = "提示:再次进入关卡计时挑战可获得钻石";
        if (tipsID == 2)
            if (gameConfig.language == "English")
                tipsText.GetComponent<Text>().text = "Tips:Enter stage again you can start diamond mission ";
            else
                tipsText.GetComponent<Text>().text = "提示:钻石任务时，即使在对话也要计时哦";
        if (tipsID == 3)
            if (gameConfig.language == "English")
                tipsText.GetComponent<Text>().text = "Tips:In special stages,you can't use easy mode";
            else
                tipsText.GetComponent<Text>().text = "提示:简单模式功能在挑战关卡不会出现";
        if (tipsID == 4)
            if (gameConfig.language == "English")
                tipsText.GetComponent<Text>().text = "Tips:If you gameover You can open easy mode";
            else
                tipsText.GetComponent<Text>().text = "提示:如果觉得关卡很难，可尝试开启简单模式";
        if (tipsID == 5)
            if (gameConfig.language == "English")
                tipsText.GetComponent<Text>().text = "Tips:You can get gold diamond but it's so hard";
            else
                tipsText.GetComponent<Text>().text = "提示:钻石还有有金色的哦，但想得到几乎不可能";
        if (tipsID == 6)
            if (gameConfig.language == "English")
                tipsText.GetComponent<Text>().text = "Tips:We can't tell you the gold diamond's time";
        else
        tipsText.GetComponent<Text>().text = "提示:金色钻石的达成时间并不会告诉你";


        if (gameConfig.stageOverStarCoin == 9)
        {
            Destroy(eImgEmpty);
            Destroy(eImgGold);
        }
        if (gameConfig.stageOverStarCoin == 10)
        {
            Destroy(eImgEmpty);
            Destroy(eImg);
        }

        /**去掉部分没有钻石的关卡中的钻石*/
        if (SceneManager.GetActiveScene().name == "stage3" || SceneManager.GetActiveScene().name == "stage7" || SceneManager.GetActiveScene().name == "stage1_2"
    || SceneManager.GetActiveScene().name == "boss3" || SceneManager.GetActiveScene().name == "boss4" || SceneManager.GetActiveScene().name == "stage1_2" || SceneManager.GetActiveScene().name == "boss5"
    || SceneManager.GetActiveScene().name == "boss5-1" || SceneManager.GetActiveScene().name == "stage20" || SceneManager.GetActiveScene().name == "stage2_2" || SceneManager.GetActiveScene().name == "stage6_2"
    || SceneManager.GetActiveScene().name == "stage10_2")
        {
            Destroy(eImgEmpty);
            Destroy(eImgGold);
            Destroy(eImg);
            starImg.GetComponent<RectTransform>().anchoredPosition = new Vector2(0, 5);
        }


    }
	
	// Update is called once per frame
	void Update () {
		
	}

}
