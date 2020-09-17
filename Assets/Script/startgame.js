//开始游戏功能

var N:int;

function Update () {

	if (Input.GetKey ("h")){
	
		startgame();
	}
}


function startgame(){

	Camera.main.SendMessage("fadeOut");	
	yield WaitForSeconds (2);
	Application.LoadLevel (N);
}