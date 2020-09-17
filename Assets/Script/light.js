#pragma strict

//在原始范围与原始范围一半处变换灯光范围
var duration : float = 3.0;
private var originalRange : float;
originalRange = GetComponent.<Light>().range;

function Update() {
	var amplitude : float = Mathf.PingPong( Time.time, duration );
	// transform from 0..duration to 0.5..1 range
	//从0..到持续到0.5..1的变化范围
	amplitude = amplitude / duration * 0.4 + 0.4;
	// set light range
	//设置灯光范围
	GetComponent.<Light>().range = originalRange * amplitude;
}

//接下来的需求是再写个角色触碰后会跟着角色走的灯光，建议灯光直接绑定在角色上，角色碰撞地图上的某个点后灯光亮度变亮然后不断变暗最后到黑暗
