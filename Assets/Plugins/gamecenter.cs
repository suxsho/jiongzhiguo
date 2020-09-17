#if UNITY_IPHONE
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SocialPlatforms;
using UnityEngine.SocialPlatforms.GameCenter;
/// <summary>
/// IOS版本的gamecenter功能
/// </summary>
public class gamecenter : MonoBehaviour {
    public bool GameCenterState;
    public string userInfo;

    static public bool setHighScore = false;

    // 初始化 GameCenter 登陆 
    void Start ()
    {
        Social.localUser.Authenticate(HandleAuthenticated);
    }
    // 初始化 GameCenter 结果回调函数  
    private void HandleAuthenticated(bool success)
    {
        GameCenterState = success;
        Debug.Log("*** HandleAuthenticated: success = " + success);
        ///初始化成功  
        if (success)
        {
            userInfo = "Username: " + Social.localUser.userName +
                "\nUser ID: " + Social.localUser.id +
                "\nIsUnderage: " + Social.localUser.underage;
            Debug.Log(userInfo);
        }
        else
        {
            ///初始化失败  

        }
    }

    void OnGUI()
    {
        /*
        GUI.TextArea(new Rect(Screen.width - 200, 0, 200, 100), "GameCenter:" + GameCenterState);
        GUI.TextArea(new Rect(Screen.width - 200, 100, 200, 100), "userInfo:" + userInfo);

        if (GUI.Button(new Rect(0, 0, 110, 75), "打开成就"))
        {

            if (Social.localUser.authenticated)
            {
                Social.ShowAchievementsUI();
            }
        }

        if (GUI.Button(new Rect(0, 150, 110, 75), "打开排行榜"))
        {

            if (Social.localUser.authenticated)
            {
                Social.ShowLeaderboardUI();
            }
        }

        if (GUI.Button(new Rect(0, 300, 110, 75), "排行榜设置分数"))
        {

            if (Social.localUser.authenticated)
            {
                Social.ReportScore(1000, "highScore", HandleScoreReported);
            }
        }

        if (GUI.Button(new Rect(0, 450, 110, 75), "设置成就"))
        {

            if (Social.localUser.authenticated)
            {
                Social.ReportProgress("die_10", 100, HandleProgressReported);
            }
        }
        */
    }

   void LateUpdate()
    {
        /* //死10次获得成就
        if(gameConfig.debugMode)
        {
            if (gameConfig.superTotal == 3)
            {
                setAchievement("die_10");
                gameConfig.superTotal++;
            }
        }*/
        //更新最高分
        if (setHighScore)
        {
            upHighscore(gameConfig.scores);
            setHighScore = false;
        }
    }


    /// <summary>
    /// 设置成就区域
    /// </summary>
    public void setAchievement(string name)
    {
        if (Social.localUser.authenticated)
        {
            Social.ReportProgress(name, 100.0, HandleProgressReported);
        }
    }

    //设置最高分
    public void upHighscore(int score)
    {
        if (Social.localUser.authenticated)
        {
            Social.ReportScore(score, "highScore", HandleScoreReported);
        }
    }



    /// <param name="success"></param>

    //上传排行榜分数  
    public void HandleScoreReported(bool success)
    {
        Debug.Log("*** HandleScoreReported: success = " + success);
    }
    //设置 成就  
    private void HandleProgressReported(bool success)
    {
        Debug.Log("*** HandleProgressReported: success = " + success);
    }

    /// <summary>  
    /// 加载好友回调  
    /// </summary>  
    /// <param name="success">If set to <c>true</c> success.</param>  
    private void HandleFriendsLoaded(bool success)
    {
        Debug.Log("*** HandleFriendsLoaded: success = " + success);
        foreach (IUserProfile friend in Social.localUser.friends)
        {
            Debug.Log("* friend = " + friend.ToString());
        }
    }

    /// <summary>  
    /// 加载成就回调  
    /// </summary>  
    /// <param name="achievements">Achievements.</param>  
    private void HandleAchievementsLoaded(IAchievement[] achievements)
    {
        Debug.Log("* HandleAchievementsLoaded");
        foreach (IAchievement achievement in achievements)
        {
            Debug.Log("* achievement = " + achievement.ToString());
        }
    }

    /// <summary>  
    ///   
    /// 成就回调描述  
    /// </summary>  
    /// <param name="achievementDescriptions">Achievement descriptions.</param>  
    private void HandleAchievementDescriptionsLoaded(IAchievementDescription[] achievementDescriptions)
    {
        Debug.Log("*** HandleAchievementDescriptionsLoaded");
        foreach (IAchievementDescription achievementDescription in achievementDescriptions)
        {
            Debug.Log("* achievementDescription = " + achievementDescription.ToString());
        }
    }

}
#endif