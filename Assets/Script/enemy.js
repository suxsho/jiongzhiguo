#pragma strict
//怪物脚本集合

var moveSpeed : float = 20.0;
var attackMoveSpeed : float = 35.0;
var jumpSpeed : float = 3.0;

enum EnemyState {moveLeft = 0,moveRight = 1,moveStop = 2,jumpAir = 3,enemyDie = 4,goHome = 5}
var enemyState = EnemyState.moveLeft;

var attackRange : float = 1.0;
var searchRange : float = 3.0;
var returnHomeRange : float = 4.0;

var changeDirectionDistance : float = 1.0;


var chaseTarget : Transform;
var homePosition : Transform;
var deathForce : float = 3.0;

var gizmoToggle : boolean = true;


private var velocity : Vector3 = Vector3.zero;
private var gravity : float = 20.0;
private var currenState;
private var aniPlay;
private var isRight : boolean = false;
private var myTransform : Vector3;
private var restMoveSpeed : float = 0.0;
private var distanceToHome : float = 0.0;
private var distanceToTarget : float = 0.0;
private var controller : CharacterController;


function Start () 
{
	myTransform = transform.position;
	restMoveSpeed = moveSpeed;
	//linkToPlayerProperties = GetComponent (playerProperties);
	controller = GetComponent (CharacterController);
	//aniPlay = GetComponent (aniSprite);

}

function Update () 
{
	print(velocity.x);

	distanceToTarget = Vector3.Distance(chaseTarget.transform.position,transform.position);
	
	if (distanceToTarget <= searchRange)
	{
		ChasePlayer();
		
		if (distanceToTarget <= attackRange)
		{
			ChasePlayer();
			moveSpeed = attackMoveSpeed;			
		}
		
		else
		{
			ChasePlayer();
			moveSpeed = restMoveSpeed;
		}
		
		
	}
	
	else
	{
		distanceToHome  = Vector3.Distance(homePosition.position,transform.position);
		if (distanceToHome > returnHomeRange)
		{
			GoHome();
		}
	}
	/**设置状态*/
	if (controller.isGrounded)
	{
		velocity.y = 0;
		
		switch(enemyState)
		{
			case EnemyState.moveLeft:
			PatrolLeft();
			break;
			case EnemyState.moveRight:
			PatrolRight();
			break;
			case EnemyState.moveStop:
			if (isRight)
				IdleRight();
			else
				IdleLeft();
			break;
			case EnemyState.jumpAir:
			if (isRight)
				JumpRight();
			else
				JumpLeft();
			break;
			case EnemyState.enemyDie:
			if (isRight)
				DieRight();
			else
				DieLeft();
			break; 
			case EnemyState.goHome:
			GoHome();
			break;
		}
	}
	
	/**移动*/
	
	velocity.y -= gravity * Time.deltaTime;   //重力
	controller.Move(velocity * Time.deltaTime);
	
	//print(velocity);
}

function OnTriggerEnter(other:Collider)
{

}

function PatrolLeft()
{
	velocity.x = -moveSpeed * Time.deltaTime;
}

function PatrolRight()
{
	velocity.x = moveSpeed * Time.deltaTime;
}

function IdleRight()
{
	velocity.x = 0;
}

function IdleLeft()
{
	velocity.x = 0;
}

function JumpRight()
{
	velocity.y = jumpSpeed;
	isRight = true;
}

function JumpLeft()
{
	velocity.y = jumpSpeed;
	isRight = false;
}

function DieRight()
{
	velocity.x = 0;
	Destroy(gameObject);
}

function DieLeft()
{
	velocity.x = 0;
	Destroy(gameObject);
}

function ChasePlayer()
{
	if (transform.position.x <= chaseTarget.position.x - changeDirectionDistance)
	{
		enemyState = EnemyState.moveRight;
	}
	
	if (transform.position.x >= chaseTarget.position.x + changeDirectionDistance)
	{
		enemyState = EnemyState.moveLeft;
	}
}

function GoHome()
{
	if (transform.position.x <= homePosition.position.x)
	{
		enemyState = EnemyState.moveRight;
	}
	
	if (transform.position.x >= homePosition.position.x)
	{
		enemyState = EnemyState.moveLeft;
	}
}

function OnDrawGizmos ()
{
	Gizmos.color = Color.red;
	Gizmos.DrawWireSphere(transform.position,attackRange);
	Gizmos.color = Color.blue;
	Gizmos.DrawWireSphere(transform.position,searchRange);
	Gizmos.color = Color.green;
	Gizmos.DrawWireSphere(homePosition.position,returnHomeRange);
}