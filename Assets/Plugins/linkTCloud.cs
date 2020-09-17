using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;



public class linkTCloud : MonoBehaviour {
    private static string hosturl = "http://api.terobi.com";
    string jsonText;

    static public bool dailyFunction = false;           //签到方法，在其他地方调用 linkTCloud.dailyFunction = true;
    static public int dailyBack = -1;                   //返回结果，在其他地方调用，-1默认，0未签到，1已签到

    // Use this for initialization
    void Start () {
        //TestHttpSend();
        //dailySystem();
        //moreDemo();
        //mapDemo();
    }
	
	// Update is called once per frame
	void Update () {

        //签到方法调用
		if(dailyFunction)
        {
            dailySystem();
            dailyFunction = false;
        }
	}

    public void dailySystem()
    {
        // 
        //GET  签到数据
         StartCoroutine(SendGet(hosturl + "/api/player/PlayerSgin?deviceNumber=" + SystemInfo.deviceUniqueIdentifier));
        //获取手机串号
        // StartCoroutine(SendGet(hosturl + "/api/player/PlayerBakGet?deviceNumber=" + SystemInfo.deviceUniqueIdentifier));
        //测试POST方法  
       /* WWWForm form = new WWWForm();
        form.AddField("deviceNumber", SystemInfo.deviceUniqueIdentifier);
        form.AddField("playerData", "TerobiCloudSYSTEMLinkStart");
        StartCoroutine(SendPost(hosturl + "/api/player/PlayerBak", form));*/
    }

    IEnumerator SendGet(string _url)
    {
        WWW getData = new WWW(_url);
        yield return getData;
        if (getData.error != "")
        {
            Debug.Log(getData.error);
        }
        else
        {
            print(getData.text);
            jsonText = getData.text;
            jsonNetGet();
        }
    }

    IEnumerator SendPost(string _url, WWWForm _wForm)
    {
        WWW postData = new WWW(_url, _wForm);
        yield return postData;
        if (postData.error != "")
        {
            Debug.Log(postData.error);
        }
        else
        {
            Debug.Log(postData.text);
        }
    }

    //利用json.net来解析内容
    void jsonNetGet()
    {
        string json = jsonText;
        //JsonData obj = JsonMapper.ToObject(jsonText);
        //print("state ="+ obj["state"].ToString());
        JObject obj = JObject.Parse(json);

        //dailyBack = int.Parse(obj["state"].ToString());

         Debug.Log("state =" + obj["state"].ToString());
     //  Debug.Log("msg =" + obj["msg"].ToString());

    }

    //利用数组存储数据并序列化成JSON
    void mapDemo()
    {
        var stages = new byte[10];
        string convert = JsonConvert.SerializeObject(stages);
        Debug.Log(convert);
        var unConvert = JsonConvert.DeserializeObject<byte[]>(convert);

         for(int i = 0; i <= unConvert.Length -1; i++)
         {

             print(unConvert[i]);
         }

    }
}
