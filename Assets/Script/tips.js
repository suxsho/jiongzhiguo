#pragma strict

/**tips的加载部分脚本用于节约图片数量*/

	var tilingX : float; 
	var tilingY : float;
	var offsetX : float;
    var offsetY: float;

    var engTure: Texture;
	

function Start () 
{
	GetComponent.<Renderer>().material.mainTextureScale = Vector2 (tilingX,tilingY);
    GetComponent.<Renderer>().material.mainTextureOffset = Vector2(offsetX, offsetY);
    var gameConfig = gameObject.GetComponent("gameConfig");
    engMode();
}

//英文模式
function engMode()
{
    if (gameConfig.language == "English")
    GetComponent.<Renderer>().material.mainTexture = engTure;  	//更改save点颜色
}
