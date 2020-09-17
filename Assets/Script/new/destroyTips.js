#pragma strict
//用于第一关关闭触摸提示
function Start () {
	
}

function Update () {
	
}
function OnTriggerEnter(otherObject:Collider){
	
    if(otherObject.gameObject.tag == "Player")
    {	
        Destroy(GameObject.Find("touchTips(Clone)"));
        Destroy (gameObject);	
    }
}
