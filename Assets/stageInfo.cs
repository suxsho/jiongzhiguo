#if UNITY_ANDROID
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using LitJson;
using UnityEngine.UI;
using UnityEngine.Advertisements;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;
/// <summary>
/// 安全验证实体类
/// </summary>
[Serializable]
public class AuthModel
{
    /// <summary>
    /// 设备号
    /// </summary>
    public string DeviceNumber { get; set; }
    /// <summary>
    /// 时间戳
    /// </summary>
    public long Time { get; set; }
}
/// <summary>
/// 时间戳和日期的转化
/// </summary>
public class TimeHelper
{
    /// <summary>
    /// 日期转换为时间戳（时间戳单位秒）
    /// </summary>
    /// <param name="TimeStamp"></param>
    /// <returns></returns>
    public static long ConvertToTimeStamp(DateTime time)
    {
        DateTime Jan1st1970 = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        return (long)(time.AddHours(-8) - Jan1st1970).TotalSeconds;
    }

    /// <summary>
    /// 时间戳转换为日期（时间戳单位秒）
    /// </summary>
    /// <param name="TimeStamp"></param>
    /// <returns></returns>
    public static DateTime ConvertToDateTime(long timeStamp)
    {
        var start = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        return start.AddSeconds(timeStamp).AddHours(8);
    }
}

public class stageInfo : MonoBehaviour
{
    //通关玩家统计
    //private static string hosturl = "http://api.terobi.com";
    private static string hosturl = "http://testapi.terobi.com";

    public string stageID = "1-1";

    string jsonText;

    public GameObject text;

    //用于判断是关卡开始还是过关
    public enum stageMode { start, end,clear };      //start是在UI里显示的 END是在关卡过关的地方执行的
    public stageMode stgMode;

    //分解数据
    string msg;
    // Use this for initialization
    void Start()
    {
        if (stgMode == stageMode.start)
        {
            StartCoroutine(SendGet(hosturl + "/api/player/PlayerStageClearRateGet"));
            gameConfig.stgOverMode = false;     //防止误判，让过关信息变成false
            gameConfig.stgOverStart = false;
        }

        if (stgMode == stageMode.clear)
        {
            StartCoroutine(SendClear(hosturl + "/api/player/PlayerStageClearRateGet"));
            gameConfig.stgOverMode = false;     //防止误判，让过关信息变成false
            gameConfig.stgOverStart = false;
        }
    }

    void Update()
    {
        if (stgMode == stageMode.end && gameConfig.stgOverMode)
        {
            StartCoroutine(SendPost(1));
            print("POST END1");
        }
        if (stgMode == stageMode.end && gameConfig.stgOverStart)
        {
            StartCoroutine(SendPost(0));
            print("POST END0");
        }
    }


    //加密时间类
    static string GetAuth()
    {
        AuthModel m = new AuthModel()
        {
            DeviceNumber = SystemInfo.deviceUniqueIdentifier,
            Time = TimeHelper.ConvertToTimeStamp(DateTime.Now)
        };
        return Encrypt(JsonConvert.SerializeObject(m));
    }

    //获得数据
    IEnumerator SendGet(string _url)
    {
        Dictionary<string, string> headers = new Dictionary<string, string>();
        headers.Add("auth", GetAuth());
        JsonData data = new JsonData();
        data["Stage"] = stageID;
        byte[] postBytes = System.Text.Encoding.Default.GetBytes(data.ToJson());
        headers.Add("Content-Type", "application/json; charset=utf-8");
        WWW www = new WWW(_url, postBytes, headers);
        //防止再次提交
        gameConfig.stgOverMode = false;
        gameConfig.stgOverStart = false;
        yield return www;
        if (www.error == null || www.error == "")
        {
            Debug.Log(www.text);
            jsonText = www.text;
            jsonNetGet();

        }
        else
        {

            Debug.Log(www.error.ToString());
        }
    }

    //获得通关玩家数据
    IEnumerator SendClear(string _url)
    {
        Dictionary<string, string> headers = new Dictionary<string, string>();
        headers.Add("auth", GetAuth());
        JsonData data = new JsonData();
        data["Stage"] = "1-20";
        byte[] postBytes = System.Text.Encoding.Default.GetBytes(data.ToJson());
        headers.Add("Content-Type", "application/json; charset=utf-8");
        WWW www = new WWW(_url, postBytes, headers);
        //防止再次提交
        gameConfig.stgOverMode = false;
        gameConfig.stgOverStart = false;
        yield return www;
        if (www.error == null || www.error == "")
        {
            Debug.Log(www.text);
            jsonText = www.text;
            jsonNetGetClear();

        }
        else
        {

            Debug.Log(www.error.ToString());
        }
    }

    //提交数据(过关后)
    IEnumerator SendPost(int isClear)
    {
        Dictionary<string, string> headers = new Dictionary<string, string>();
        headers.Add("auth", GetAuth());
        JsonData data = new JsonData();
        data["Stage"] = stageID;
        data["IsClear"] = isClear;
        byte[] postBytes = System.Text.Encoding.Default.GetBytes(data.ToJson());
        headers.Add("Content-Type", "application/json; charset=utf-8");
        WWW www = new WWW(hosturl + "/api/player/PlayerStage", postBytes, headers);
        print(headers);
        //防止再次提交
        gameConfig.stgOverMode = false;
        gameConfig.stgOverStart = false;
        yield return www;
        if (www.error == null || www.error =="")
        {
            Debug.Log(www.text);

        }
        else
        {

            Debug.Log(www.error.ToString());
        }

    }

    //利用json.net来解析内容
    void jsonNetGet()
    {
        string json = jsonText;
        JObject obj = JObject.Parse(json);

        //dailyBack = int.Parse(obj["state"].ToString());

        Debug.Log("MSG =" + obj["msg"].ToString());
        msg = obj["msg"].ToString();
        print(msg);
        string[] passRate = msg.Split('|');
        if (float.Parse(passRate[2]) >= 40)
        {
            if (gameConfig.language == "English")
                text.GetComponent<Text>().text = "" + passRate[2] + "% player clear this stage";
            else
                text.GetComponent<Text>().text = "有" + passRate[2] + "%的玩家通过了这关";
        }
            
        else if (float.Parse(passRate[2]) >= 10)
        {
            if (gameConfig.language == "English")
                text.GetComponent<Text>().text = "Just " + passRate[2] + "% player clear this stage";
            else
                text.GetComponent<Text>().text = "居然只有" + passRate[2] + "%玩家过关了";
        }
            
        else
        {
            if (gameConfig.language == "English")
                text.GetComponent<Text>().text = "Just " + passRate[2] + "%player clear?Are you kidding me?";
            else
                text.GetComponent<Text>().text = "" + passRate[2] + "%的玩家过关了，有这么难的吗";
        }
            

        //  Debug.Log("msg =" + obj["msg"].ToString());

    }

    //利用json.net来解析内容
    void jsonNetGetClear()
    {
        string json = jsonText;
        JObject obj = JObject.Parse(json);

        //dailyBack = int.Parse(obj["state"].ToString());

        Debug.Log("MSG =" + obj["msg"].ToString());
        msg = obj["msg"].ToString();
        print(msg);
        string[] passRate = msg.Split('|');
        if (gameConfig.language == "English")
            text.GetComponent<Text>().text = "Now " + passRate[1] + " player clear this game,can you be the next one?";
        else
            text.GetComponent<Text>().text = "目前有" + passRate[1] + "个玩家通关了这个游戏,下一个会是你吗";

        if (SceneManager.GetActiveScene().name == "stageLast")
        {
            float clearRam = 100 - float.Parse(passRate[2]);
            if (gameConfig.language == "English")
                text.GetComponent<Text>().text = "RANK" + passRate[1] + "!You are over " + clearRam + "% of users";
            else
                text.GetComponent<Text>().text = "你是第" + passRate[1] + "个通关这个游戏的,打败了"+ clearRam +"%的玩家";

        }  


        //  Debug.Log("msg =" + obj["msg"].ToString());

    }

    private static readonly string key = "X6ntZlDQ1KeE7BP7";

#region NET的Aes256加密解密
    public static string Encrypt(string input)
    {

        byte[] bytesToBeEncrypted = Encoding.UTF8.GetBytes(input);
        byte[] passwordBytes = Encoding.UTF8.GetBytes(key);

        passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

        byte[] bytesEncrypted = AESEncryptBytes(bytesToBeEncrypted, passwordBytes);

        string result = System.Convert.ToBase64String(bytesEncrypted);

        return result;
    }

    private static byte[] AESEncryptBytes(byte[] bytesToBeEncrypted, byte[] passwordBytes)
    {
        byte[] encryptedBytes = null;

        var saltBytes = new byte[9] { 13, 34, 27, 67, 189, 255, 104, 219, 122 };

        using (var ms = new MemoryStream())
        {
            using (var AES = new RijndaelManaged())
            {
                AES.KeySize = 256;
                AES.BlockSize = 128;

                var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
                AES.Key = key.GetBytes(32);
                AES.IV = key.GetBytes(16);

                AES.Mode = CipherMode.CBC;

                using (var cs = new CryptoStream(ms, AES.CreateEncryptor(),
                    CryptoStreamMode.Write))
                {
                    cs.Write(bytesToBeEncrypted, 0, bytesToBeEncrypted.Length);
                    cs.Close();
                }

                encryptedBytes = ms.ToArray();
            }
        }

        return encryptedBytes;
    }

    public static string Decrypt(string input)
    {
        byte[] bytesToBeDecrypted = System.Convert.FromBase64String(input);

        byte[] passwordBytes = Encoding.UTF8.GetBytes(key);

        passwordBytes = SHA256.Create().ComputeHash(passwordBytes);

        byte[] bytesDecrypted = AESDecryptBytes(bytesToBeDecrypted, passwordBytes);

        string result = Encoding.UTF8.GetString(bytesDecrypted);

        return result;
    }

    private static byte[] AESDecryptBytes(byte[] bytesToBeDecrypted, byte[] passwordBytes)
    {
        byte[] decryptedBytes = null;

        var saltBytes = new byte[9] { 13, 34, 27, 67, 189, 255, 104, 219, 122 };

        using (var ms = new MemoryStream())
        {
            using (var AES = new RijndaelManaged())
            {
                AES.KeySize = 256;
                AES.BlockSize = 128;

                var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
                AES.Key = key.GetBytes(32);
                AES.IV = key.GetBytes(16);

                AES.Mode = CipherMode.CBC;

                using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(bytesToBeDecrypted, 0, bytesToBeDecrypted.Length);
                    cs.Close();
                }

                decryptedBytes = ms.ToArray();
            }
        }

        return decryptedBytes;
    }
#endregion
}

#endif