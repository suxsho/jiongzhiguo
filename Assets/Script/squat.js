//JS版本：
var rollSpeed=6.0;
var fastRollSpeed=2.0;
var jumpSpeed=8.0;
var gravity=20.0;
var rotateSpeed=4.0;
var duckSpeed=0.5;
var isControllable:boolean=true;
private var moveDirection=Vector3.zero;
private var grounded:boolean=false;
private var moveHorz=0.0;
private var normalHeight=2.0;
private var duckHeight=1.0;
private var rotateDirection=Vector3.zero;
private var isDucking:boolean=false;
private var isBoosting:boolean=false;
 
var controller:CharacterController;
controller=GetComponent(CharacterController);//指向角色控制器的引用
 
 
function FixedUpdate(){
    if(!isControllable){//检查玩家是否可控+
       Input.ResetInputAxes();//重置输入
        }
    else{
        if(grounded){//判断玩家是否在地上
           moveDirection=new Vector3(Input.GetAxis("Horizontal"),0,Input.GetAxis("Vertical"));//获得xz轴的值。y轴保持0
           moveDirection=transform.TransformDirection(moveDirection);//局部坐标系转换为世界坐标系
           moveDirection*=rollSpeed;//计算给定速度
            
           moveHorz=Input.GetAxis("Horizontal");//横向输入【Vertical表示纵向】
            if(moveHorz>0){//表示横向正运动
               rotateDirection=new Vector3(0,1,0);
            }else if(moveHorz<0){//表示横向负运动
               rotateDirection=new Vector3(0,-1,0);
            }else{//表示不动
               rotateDirection=new Vector3(0,0,0);
            }
            
            if(Input.GetKey(KeyCode.Space)){//跳
               moveDirection.y=jumpSpeed;
            }
            
            if(Input.GetKey(KeyCode.LeftAlt)){//加速键
               
               moveDirection *=fastRollSpeed;//修改速度
               
            }
            if(Input.GetKey(KeyCode.LeftShift)){//趴下
               controller.height=duckHeight;
               controller.center.y=controller.height/2+.25;
                moveDirection*=duckSpeed;
            }
        }
       moveDirection.y-=gravity*Time.deltaTime;//确保角色永远在地上；
        var flags=controller.Move(moveDirection*Time.deltaTime);//执行Move。Move函数返回移动中碰到的任何物体
       controller.transform.Rotate(rotateDirection*Time.deltaTime,rotateSpeed);//在场景中执行玩家的输入
       grounded=((flags&&CollisionFlags.CollidedBelow)!=0);//根据flags判断是否还可以移动
    }
    
}
 
 
@script AddComponentMenu("MSQScript/HeroControllerJS");