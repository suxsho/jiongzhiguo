#pragma strict
//这是测试怪物进屏幕的脚本

var target : Transform;
var speed : float;

function Update () {

	//距离主角10距离的时候启动ATK
	if (transform.position.x < target.position.x +15)
	{SendMessage("atk",true);}
	
	//怪消失脚本
	if (transform.position.x < target.position.x - 25)
	{
		SendMessage("death");
	}
		
	
}


//角色笔直冲过来
function atk(start : boolean){
	
	if(start){
		transform.position.x -= speed * Time.deltaTime;
	}
	
}

//挂掉脚本

function death(){

	Destroy(gameObject);

}

//碰撞

function OnTriggerEnter(otherObject:Collider){

	
	if(otherObject.gameObject.tag == "Player"){
		
		death();
	
	}
	
	if(otherObject.gameObject.tag == "ci"){
		
		death();
	
	}
}