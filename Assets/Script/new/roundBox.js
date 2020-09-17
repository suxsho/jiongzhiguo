#pragma strict
//旋转的棒子
var speed : float = 5;
function Start () {
	
}

function Update () {
    transform.Rotate(0, 0, speed * Time.deltaTime);
}
