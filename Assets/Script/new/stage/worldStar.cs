using System.Collections;
using System.Collections.Generic;
using UnityEngine;
//在世界地图显示获得了多少星星

public class worldStar : MonoBehaviour {
    [Tooltip("填写对应的关卡数字")]
    public int stage;                       //关卡数字
    public bool bossStage = false;                  //挑战关卡或者BOSS不包含时间模式的关卡打上勾
    [Tooltip("拖入各元素")]
    public GameObject starGet;
    public GameObject starNull;
    public GameObject emeGOLD;
    public GameObject emeGet;
    public GameObject emeNull;
    //判断是否获得星星
    void Awake ()
    {
        if (gameConfig.stages[stage-1] == 1)
        {
            Destroy(starNull);
        }
        if(!bossStage)
        {
            if (gameConfig.stages[stage - 1] == 9)
            {
                Destroy(starNull);
                Destroy(emeNull);
                Destroy(emeGOLD);
            }
            if (gameConfig.stages[stage - 1] == 10)
            {
                Destroy(starNull);
                Destroy(emeNull);
                Destroy(emeGet);
            }
        }

    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
