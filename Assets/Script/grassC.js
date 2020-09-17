#pragma strict
//可穿过的草地

var target 	: Transform;		//把玩家拖进来


function Update () 
{
	//如果玩家Y坐标比障碍低
	if (transform.position.y >= target.position.y - 0.5)
		GetComponent.<Collider>().isTrigger = true;
	//否则你懂的
	else
		GetComponent.<Collider>().isTrigger = false;
}
