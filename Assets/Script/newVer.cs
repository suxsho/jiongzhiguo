using UnityEngine;
using System.Collections;
using UnityEngine.SceneManagement;
//-----------------------------------------------------------------
//                      通过网络获取版本
//-----------------------------------------------------------------
public class newVer : MonoBehaviour {
    public string url = "";             //连接到游戏版本路径
    public string platform = "PC";
    int nVcheck = 0;                        //检测是否有新版本
    //-----------------------------------------------------------------
    //                      显示新版本功能按钮
    //-----------------------------------------------------------------

    //-----------------------------------------------------------------
    //                      联网参数
    //-----------------------------------------------------------------
    IEnumerator Start()
    {
        if(platform == "PC")
        {
            //联网并返回数值
            WWW www = new WWW(url);
            yield return www;
            nVcheck = int.Parse(www.text);
            //对比版本并给出公告
        }


    }
    //-----------------------------------------------------------------
    //                     场景切换
    //-----------------------------------------------------------------
    void Update()
    {
        print(nVcheck);
        //切换场景功能
        if (platform == "PC")
        {
                StartCoroutine(changeSence());
        }
        else
            StartCoroutine(changeSence());

    }
    //-----------------------------------------------------------------
    //                      切换新场景
    //-----------------------------------------------------------------
    IEnumerator changeSence()
    {
        if (platform == "PC")
        {
            yield return new WaitForSeconds(3);                             //等待
            Camera.main.SendMessage("fadeOut");                             //黑屏
            if (nVcheck == 1)
                SceneManager.LoadScene("op");
            else
                SceneManager.LoadScene("notice");
        }

        if (platform == "WIN10")
        {
            yield return new WaitForSeconds(4);                             //等待
            Camera.main.SendMessage("fadeOut");                             //黑屏
            yield return new WaitForSeconds(0.5f);                             //等待
            SceneManager.LoadSceneAsync("newtitle");                                 //加载对应的场景
        }

    }
}