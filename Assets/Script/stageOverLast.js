#pragma strict
//最后一关的判定
var N : int;			//你准备跳转场景的编号
static var stageO : boolean = false;

//音乐音量处理
var audioValue : float;
var nextFire : float = 0.0;
var fireRate : float = 0.05;

var claerUI : GameObject;						//拖入囧币，怪把其他撞挂的时候就会出现
/**过关后可移动场景的脚本*/

function OnTriggerEnter(otherObject:Collider){
	
	if(otherObject.gameObject.tag == "Player"){
		
		//碰撞代码
		moveScene();
		stageO = true;							//时间模式暂停
	
	}
}

    function Update()
    {
        //声音淡出
        if (stageO)
        {
            if (Time.time > nextFire) {

                nextFire = Time.time + fireRate;
                audioValue -= 0.03;
                GetComponent.<Camera>().main.GetComponent.<AudioSource>().volume = 1 + audioValue;
            }
        }

    }

/**移动场景的代码*/

function moveScene()
{
	//先让角色停下来
	playerControls.cancontrol = false;	
	playerControls.stop = true;
	playerconfig.superTime = true;				//让角色无敌
	
	Instantiate(claerUI,transform.position,transform.rotation);     //加载UI

	//切场景
	
	yield WaitForSeconds (2);
	
	Camera.main.SendMessage("fadeOut");
	
	yield WaitForSeconds (2);
	playerconfig.superTime = false;				//让角色无敌
	stageO = false;								//时间模式暂停

	    playerControls.cancontrol = true;
	    Application.LoadLevel (N);
	   
}