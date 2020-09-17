#pragma strict

/**踩动机关*/
//var moveL : Transform;
var player : Transform;	//把角色拖进来
var moveSpeed : float = 0.0; //移动速度
var playerRange : float = 0.0; //记录角色位置


private var moveX : boolean = false;	//移动判断
private var moveY : boolean = false;	//移动判断

var Xside : boolean = false;
var Yside : boolean = false;


var x : float;		//移动的位置
var y : float;		//移动的位置

var playerMove : boolean = false; //是否带着角色一起运动

function Update () 
{

}

/**玩家碰到后的交互*/

function OnTriggerEnter(other:Collider)
{
	if(other.gameObject.tag == "Player")
	{

		//moveL.transform.Translate(50,Time.deltaTime);
	}
}

