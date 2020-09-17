#pragma strict


//怪碰到刺就会消失

function OnTriggerEnter(otherObject:Collider){
	
	if(otherObject.gameObject.tag == "Player"){
		
		print("testOKOKK");
	
	}
}