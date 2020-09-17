#pragma strict
//------------------------------------------
//世界地图中进入关卡的功能
//------------------------------------------
var canIntro : boolean = false;
var Glight : GameObject;     //进入关卡特效
var stageName:String;       //输入关卡名字

private var shieldMode : boolean = false;       //被屏蔽的关卡，暂时手动点击
var shieldGUI : GameObject;       //屏蔽关卡显示屏障

private var GlightNum = 0;

public var getStarNum : int;        //获得多少星星解锁关卡

//音乐音量处理
private var audioValue : float;
private var nextFire : float = 0.0;
private var fireRate : float = 0.05;
private var closeMusic : boolean = false;


function Awake () 
{
    var gameConfig = gameObject.GetComponent("gameConfig");
    

}
function Start () 
{

    //判断星星不够开启屏蔽模式
    if(gameConfig.allStar < getStarNum)
    {
        shieldMode = true;
    }
    //如果关卡开启了屏蔽模式，会有前端显示内容
    if(shieldMode)
    {
        Instantiate(shieldGUI,Vector2(transform.position.x, transform.position.y),transform.rotation); 
        Destroy(gameObject);
    }
        
}

function Update () 
{

    //可进入关卡时的操作
    if(canIntro && playerControls.cancontrol)
    {
        if(Input.GetButton("Fire1"))
        {
            intoStage(stageName);
            gameConfig.powerPoint -= 1;                 //扣一点体力
        }

        if (Input.touchCount > 0) {
            var touch0: Touch = Input.GetTouch(0);
            if (canIntro) {
                if (touch0.position.x > Screen.width / 2) {
                    intoStage(stageName);
                    gameConfig.powerPoint -= 1;                 //扣一点体力
                }
            }
        }
    }

    //关声音操作
    if(closeMusic)
    {
        //关声音
        if(Time.time > nextFire){

        nextFire = Time.time + fireRate;
        audioValue -= 0.03 ;
        GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = 1 + audioValue;
        }
    }
	
}

//碰撞检测(判断玩家是否可进入关卡）
function OnTriggerEnter(otherObject:Collider){
	
    if(otherObject.gameObject.tag == "Player"){
		
        if(!shieldMode &&  gameConfig.powerPoint > 0)
        canIntro = true;
	
    }
}

function OnTriggerExit(otherObject:Collider){
	
        if(otherObject.gameObject.tag == "Player"){
		
            canIntro = false;
	
        }
}

    //进入关卡
    function intoStage(stagename:String)
    {
        //存储角色之前的位置，离开关卡后还在那里
        gameConfig.intoGamePos = Vector2(GameObject.Find("player").transform.position.x, GameObject.Find("player").transform.position.y);
        gameConfig.saveStageDate();

            if(GameObject.Find("worldUI/worldSelect"))
                Destroy(GameObject.Find("worldUI/worldSelect"));
            PlayerPrefs.SetString("woridName",SceneManager.GetActiveScene().name);
            if(GlightNum == 0)
            {
                Instantiate(Glight,Vector3(GameObject.Find("player").transform.position.x, GameObject.Find("player").transform.position.y,-2),transform.rotation); 
                GlightNum++;
            }

            //GameObject.Find("player").GetComponent.<Renderer>().material.color.a = 0;
            //GameObject.Find("player2").GetComponent.<SpriteRenderer>().material.color.a = 0;

            GameObject.Find("player").transform.rotation = Quaternion.Euler(0.0f, 0.0f, 0.0f);;

            playerControls.cancontrol = false;
        yield WaitForSeconds (3);
	
        Camera.main.SendMessage("fadeOut");
        closeMusic = true;


        yield WaitForSeconds(3);


        Application.LoadLevel (stagename);
    }