#pragma strict

//灯光消失的功能
var smooth : float = 3.0;
static var lightDark : boolean = true;
private var lightRange : float;

function Start()
{
	//存储初始的range数值
	lightRange = GetComponent.<Light>().range;
}

function Update() 
{
//利用lightNUM切换分类  0是黑 1是亮
	if (lightDark)
	{
		GetComponent.<Light>().range =  Mathf.Lerp(GetComponent.<Light>().range,0,Time.deltaTime * smooth);
	}
	else
	{
		GetComponent.<Light>().range =  Mathf.Lerp(GetComponent.<Light>().range,lightRange,Time.deltaTime * smooth);
	}
	
//当light.range 大于初始数值的时候开始变小
	if (GetComponent.<Light>().range > lightRange - 10)
	lightDark = true;
//角色挂了灯黑
		if (playerconfig.dead)
	{
		GetComponent.<Light>().range = 0;
	}
	
}

