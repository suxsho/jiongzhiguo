#pragma strict
//用于删除一些一次性特效
var waitTime : float = 3;
function Start () {
	
}

function Update () {
    des();
}
function des(){
        yield WaitForSeconds(waitTime);
        Destroy (gameObject);	
}
