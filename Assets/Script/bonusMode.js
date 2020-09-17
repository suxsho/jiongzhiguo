#pragma strict

var bonusPoint 				: Transform;	//奖励点，把奖励点拖进来
var player 					: GameObject;	//调用player数据所需要的字段，把player拉过来就可以了
static var start			: boolean;		//用于给怪物调用的模式，调用后怪还原

var changeMoveCheck = true;                 //是否改变摄像机视角
/**奖励模式脚本*/

function OnTriggerEnter(otherObject:Collider){
	
	if(otherObject.gameObject.tag == "Player"){
		
		//碰撞代码
		moveScene();
	
	}
}

/**移动场景的代码*/

function moveScene()
{
	//先让角色停下来
	playerControls.cancontrol = false;	
	playerControls.stop = true;
	
	//切场景
	
	yield WaitForSeconds (2);
	
	Camera.main.SendMessage("fadeOut");
	
	yield WaitForSeconds (1);
	player.transform.position = bonusPoint.position;


	    
	start = true;						//让怪物重置
	
	yield WaitForSeconds (0.2);
    //otherscript
	cameraSmooth2D.camaracheckY = changeMoveCheck;	//切换一次摄像机改变方式
	bonusMode.start = false;			//让怪物可移动
	playerControls.cancontrol = true;	//允许操作角色	
	Camera.main.SendMessage("fadeIn");
}