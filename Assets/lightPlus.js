#pragma strict

var homePoint : Vector3;				//初始位置存储

function Start () 
{
	homePoint = transform.position;	//先存储个初始位置
}

function LateUpdate () 
{
	//如果角色挂了就让他们回到初始点
	if (playerconfig.dead)
	{
		transform.position  =  homePoint;
	}
}