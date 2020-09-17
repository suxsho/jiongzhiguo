#pragma strict
private var moveChk: boolean = false; 	//moveland自检
var moveSpeedX : float;
var moveSpeedY : float;
var canJump : boolean = false;

function Start () {

}

function Update () 
{
	/**区域模式*/
	if (moveChk)
	{	
		 playerControls.drag.x = moveSpeedX;
		 playerControls.drag.y = moveSpeedY;
		
	}

}

/**判断角色碰撞更改速度*/
function OnTriggerEnter (other : Collider)
{
	if (other.tag == "Player")
	{
		moveChk = true;
		if (canJump)
			playerControls.canJump = true;
		else
			playerControls.canJump = false;
	}
}
function OnTriggerExit (other : Collider)
{
	if (other.tag == "Player")
	{
		moveChk = false;
		playerControls.drag = Vector3.zero;
		playerControls.canJump = true;

	}
}