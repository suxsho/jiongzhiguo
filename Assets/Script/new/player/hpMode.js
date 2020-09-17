#pragma strict
//药水
var homePoint : Vector3;				//存档点
private var myTransform : Vector3;				//记录位置
function Start () 
{
    myTransform = transform.position;							
    //linkToPlayerProperties = GetComponent (playerProperties);
    //controller = GetComponent (CharacterController);			//加载角色控制器
    //aniPlay = GetComponent (aniSprite);

    homePoint = transform.position;	
}
function LateUpdate () 
{
    /*角色死亡返回*/
    if (playerconfig.dead)
    {
        transform.position  =  homePoint;
    }
}
