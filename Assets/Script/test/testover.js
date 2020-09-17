#pragma strict
//这个是测试版测试结束显示的内容

var text : String; 				//定义文本

/**显示内容*/

function Update() 
{	
	//GetComponent.<GUIText>().text = text;
}



//text = "游戏即将关闭，期待下次归来";
yield WaitForSeconds (3);
Application.LoadLevel("world1");