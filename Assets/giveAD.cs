using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Advertisements;
//using Together;
//给玩家弹广告
public class giveAD : MonoBehaviour {
    #if UNITY_IPHONE ||  UNITY_ANDROID
    string sencesID = "P2kocjnJkFaLU7YASje";
    void Start()
    {
        if (PlayerPrefs.GetInt("buyGame") != 3680)
            if (Advertisement.IsReady("rewardedVideo"))
            {
                Advertisement.Show();
            }
            else
            {
                //showYOMOBAD();
            }

           
    }
    /**YOMOB*/
     /*  void showYOMOBAD()
       {
           if (TGSDK.CouldShowAd(sencesID))
           {
               print("play AD OK");
               TGSDK.ShowAd(sencesID);
           }


           // 广告配置数据获取成功
           TGSDK.PreloadAdSuccessCallback = (string ret) =>
           {
               print("play AD OK");
           };
       }*/
    /**YOMOBEND*/
#endif

}
