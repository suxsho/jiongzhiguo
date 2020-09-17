// Get the latest webcam shot from outside "Friday's" in Times Square
//从时代广场外部"Friday"的web摄像头获取最新的图片
var url = "";
//定义url为字符变量并赋予值为(赋值为图片)
function Start () {
	// Start a download of the given URL
	//开始下载被指定的路径
	var www : WWW = new WWW (url);
	//定义www为WWW类型并且等于被下载的内容。
	// Wait for download to complete
	//等待www全部下载完毕
	yield www;
	//等待www完全下载。
	// 指定texture
	GetComponent.<Renderer>().material.mainTexture = www.texture; 
	//将下载下来的WWW中的图片赋予到默认物体的材质上进行渲染出来
}

