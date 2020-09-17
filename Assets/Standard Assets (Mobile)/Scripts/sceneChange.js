#pragma strict

//脚本用途场景转换

var N : int;

function OnTriggerEnter (otherObject:Collider) {
	
	if(otherObject.gameObject.tag == "Player")
	changeAnimation ();
}

function changeAnimation(){
	Camera.main.SendMessage("fadeOut");
	yield WaitForSeconds (2);
	Application.LoadLevel (N);
}