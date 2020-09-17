#pragma strict
//脚本用于显示故事剧本的
	
	GetComponent.<GUIText>().text = "欢迎您来到猫里奥版囧之国";
	
	yield WaitForSeconds (3);
	
	GetComponent.<GUIText>().text = "现在还是游戏的测试版";
	
	yield WaitForSeconds (3);
	
	GetComponent.<GUIText>().text = "所以是没有剧本的";
	
	yield WaitForSeconds (3);
	
	GetComponent.<GUIText>().text = "最后告诉你一件事，其实按H键是可以跳过这段对话的哈哈哈";
	
	yield WaitForSeconds (3);
	
	Application.LoadLevel (2);
	
function Update(){

	if (Input.GetKey ("h"))
	Application.LoadLevel (2);
}