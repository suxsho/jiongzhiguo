#pragma strict

var N : int;			//你准备跳转场景的编号
static var stageO: boolean = false;
var clearList: GameObject;  //结算内容

//音乐音量处理
var audioValue : float;
var nextFire : float = 0.0;
var fireRate: float = 0.05;
@Header("勾上后不显示clear")
var NOClear: boolean = false;


var claerUI : GameObject;						//拖入囧币，怪把其他撞挂的时候就会出现

@Header ("填写关卡ID，这个会跟word地图获得星星显示互通")
var stageID : int;                              //标注stageID，用于过关存档
/**过关后可移动场景的脚本*/

function Awake()
{
    var gameConfig = gameObject.GetComponent("gameConfig");
    firstStage();
}

function Start()
{

}

function OnTriggerEnter(otherObject:Collider){
	
	if(otherObject.gameObject.tag == "Player"){
		
        //碰撞代码
            playerClear();
        stageO = true;							//时间模式暂停
        //向服务器传递过关消息
        if (stageID > 0) {
            if (gameConfig.stages[stageID - 1] == 0) {
                gameConfig.stgOverMode = true;
            }
        }

	}
}

    function Update()
    {
        //声音淡出
        if (stageO)
        {
            if (Time.time > nextFire)
            {

                nextFire = Time.time + fireRate;
                audioValue -= 0.03;
                GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = 1 + audioValue;
            }
        }

        /**离开关卡*/
        if (Input.GetButtonDown("Jump") && GameObject.Find("clearList(Clone)") != null || Input.touchCount > 0 && GameObject.Find("clearList(Clone)") != null)
            moveScene();
    }

    /**stgOverStart 初次进入关卡判断是不是要向服务器POST没有过关的信息*/
    function firstStage()
    {
        if (stageID > 0)
        {
            if (gameConfig.stages[stageID - 1] == 0) 
            {
                gameConfig.stgOverStart = true;
            }            
        }
        gameConfig.stageID = stageID;
        gameConfig.stageStartTime = gameConfig.timeSpend;
    }

/**移动场景的代码*/

    function playerClear() {
        //判断任务模式是否完成
        if (gameConfig.missionNum >= gameConfig.missionGoldNum && gameConfig.missionList == 1 && gameConfig.missionMode) {
            if (gameConfig.stages[stageID - 1] < 9)
                gameConfig.emerald += 1;
            gameConfig.stageOverStarCoin = 9;
        }
        if (gameConfig.missionNum >= gameConfig.missionMostNum && gameConfig.missionList == 1 && gameConfig.missionMode) {
            if (gameConfig.stages[stageID - 1] < 9)
            gameConfig.stageOverStarCoin = 10;
        }

        if (gameConfig.missionNum <= gameConfig.missionGoldNum && gameConfig.missionList == 2 && gameConfig.missionMode) {
            if (gameConfig.stages[stageID - 1] < 9)
                gameConfig.emerald += 1;
            gameConfig.stageOverStarCoin = 9;
        }
        if (gameConfig.missionNum <= gameConfig.missionMostNum && gameConfig.missionList == 2 && gameConfig.missionMode) {
            if (gameConfig.stageOverStarCoin != 9)
                gameConfig.emerald += 1;
            gameConfig.stageOverStarCoin = 10;
            gameConfig.Gemerald += 1;
        }
        //计算过关时间
        gameConfig.missionTimeOver = true;
        gameConfig.stageClearTime = gameConfig.timeSpend - gameConfig.stageStartTime;
        //先让角色停下来
        playerControls.cancontrol = false;
        bigPlayerControl.cancontrol = false;
        playerControls.stop = true;
        playerconfig.superTime = true;				//让角色无敌

        if (GameObject.Find("player") != null)
        GameObject.Find("player").transform.rotation = Quaternion.Euler(0.0f, 0.0f, 0.0f);

        if (GameObject.Find("stageClear(Clone)") == null)
            Instantiate(claerUI, Vector3(transform.position.x, transform.position.y,-1), transform.rotation);     //加载UI

        yield WaitForSeconds(3);

        if (NOClear)
        {
            gameConfig.intoGameSave = false; 
            moveScene();
        }
        else
        {
            if (GameObject.Find("clearList(Clone)") == null && stageID > 0)
                Instantiate(clearList, transform.position, transform.rotation);     //加载UI     
            gameConfig.intoGameSave = true;             //记住之前进入关卡的位置
        }
 

    }

function moveScene()
    {

	//切场景	
    Camera.main.SendMessage("fadeOut");

	
	yield WaitForSeconds (2);
	playerconfig.superTime = false;				//让角色无敌
	stageO = false;								//时间模式暂停
	gameConfig.hp = 0;

    //判断关卡是否玩过
    if (stageID > 0) {
        if (gameConfig.stages[stageID - 1] == 0) {
            if (gameConfig.stageOverStarCoin != 0)
                gameConfig.stages[stageID - 1] = gameConfig.stageOverStarCoin;
            else
                gameConfig.stages[stageID - 1] = 1;
            gameConfig.allStar += 1;                     //给一个星星
            //兔子关特殊程序
            if (SceneManager.GetActiveScene().name == "stage7") {
                if (gameConfig.worldMostNumber == 2)
                    gameConfig.worldMostNumber = 3;
                gameConfig.intoGameSave = false;             //记住之前进入关卡的位置
            }

            if (SceneManager.GetActiveScene().name == "stage20") {
                gameConfig.intoGameSave = false;             //记住之前进入关卡的位置
            }
            gameConfig.saveStageDate();                 //savedata
        }

        else {
            if (gameConfig.stageOverStarCoin != 0)
                gameConfig.stages[stageID - 1] = gameConfig.stageOverStarCoin;

            gameConfig.saveStageDate();                 //savedata
        }

    }

    //还原数据
    gameConfig.stageOverStarCoin = 1;
    gameConfig.stageAllDead = 0;

    gameConfig.easyMode = false;

	Application.LoadLevel (N);
}