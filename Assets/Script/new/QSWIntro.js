#pragma strict
//------------------------------------------
//世界地图中进入关卡的功能
//------------------------------------------
var canIntro : boolean = false;









function Awake () 
{
    var gameConfig = gameObject.GetComponent("gameConfig");
    

}


//碰撞检测(判断玩家是否可进入关卡）
function OnTriggerEnter(otherObject:Collider){
	
    if(otherObject.gameObject.tag == "Player"){
		
        gameConfig.shopSystem = true;
	
    }
}

function OnTriggerExit(otherObject:Collider){
	
        if(otherObject.gameObject.tag == "Player"){
		
            gameConfig.shopSystem = false;
	
        }
}