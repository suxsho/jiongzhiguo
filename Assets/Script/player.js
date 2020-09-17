#pragma strict
//这个代码是用于控制角色的

var rollSpeed = 6.0; //普通行走速度
var fastRollSpeed = 2.0; //加速
var jumpSpeed = 8.0; //跳跃高度
var gravity = 20.0; //重力
var rotateSpeed = 4.0; //旋转速度
var duckSpeed = 0.5; //下顿速度

//私有定义
private var moveDirection = Vector3.zero;
private var grounded : boolean = false;
private var moveHorz = 0.0;
private var normalHeight = 2.0;
private var duckHeight = 1.0;
private var rotateDirection = Vector3.zero;

var isControllable : boolean = true;



//为主角添加缓存优化
	var controller : CharacterController;
	controller = GetComponent(CharacterController);


function FixedUpdate(){
//移动脚本
	if(controller.isGrounded){
		moveDirection = new Vector3(Input.GetAxis("Horizontal"),0,0);
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= rollSpeed;
			if (Input.GetButton ("Jump")) {
			moveDirection.y = jumpSpeed;
		}
			}
		//移动
		
			
			moveDirection.y -= gravity * Time.deltaTime; //重力 
			
			controller.Move(moveDirection * Time.deltaTime);
			
		
	}

@script AddComponentMenu("Player/Move");