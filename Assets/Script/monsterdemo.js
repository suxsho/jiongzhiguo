#pragma strict
//这是测试怪物进屏幕的脚本

var target : Transform;
var speed : float;

var start : Transform;
var end : Transform;

function Update () {


	if (transform.position.x < target.position.x +2)
		move();

	
}

function move(){
	transform.position = Vector3.Lerp(start.position, end.position,Time.deltaTime);
}