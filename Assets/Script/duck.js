#pragma strict
var controller : CharacterController;
controller = GetComponent(CharacterController);
function Start () {

}

function Update () {

	if(Input.GetKeyDown(KeyCode.LeftShift)){
		controller.height = 0.5;
		controller.center.y = 0.5;
	}
	
	if(Input.GetKeyUp(KeyCode.LeftShift)){
		controller.height = 1;
		controller.center.y = 0;
	}

}