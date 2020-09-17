//横板摄像机控制代码
#pragma strict
var N:int;  // 切换的场景名称
var rightOver:float;  //右边的最终部分

var target : Transform;
var smoothTime = 0.3;
private var thisTransform : Transform;
private var velocity : Vector2;

var Rmode : boolean = true; //右方向模式 
var Lmode : boolean = true; //左方向模式  
var UD : boolean = false; //上下模式，开启后才有



function Start()
{
	thisTransform = transform;
}

function Update() 
{



	//左右模式
	
	if(target.position.x > 0){
	
		if(target.position.x - thisTransform.position.x < -3){Lmode = true;}
		if(target.position.x - thisTransform.position.x >= 0){Rmode = true;}
	
		if(target.position.x - thisTransform.position.x >= 0 && Rmode){
			Lmode = false;
			
			thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, 
			target.position.x, velocity.x, smoothTime);
			}
		
		if(target.position.x - thisTransform.position.x < -3 && Lmode){
			Rmode = false;
			thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, 
			target.position.x+3, velocity.x, smoothTime);
			}
		
	}
	
	//右侧模式
	
	if(target.position.x> rightOver){
		thisTransform.position.x = rightOver;
	}
	
	//上下模式
if(UD){	

		thisTransform.position.y = Mathf.SmoothDamp( thisTransform.position.y, 
		target.position.y, velocity.y, smoothTime);}

		
	//主角死亡保护
	
	if(target.position.y < -10){
		
		Application.LoadLevel (N);

	
}
	

}

