#pragma strict
import UnityEngine.SceneManagement;
/** 这个脚本的用途是控制角色的基本状态 */
var customSkin : GUISkin;
var pauseSkin : GUISkin;

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

var walkSpeed 				: float			= 1.5;											//走动速度
var runSpeed 				: float 		= 2.0;											//跑动速度
var fallSpeed 				: float 		= 1.0;											//下落速度
var walkJump 				: float			= 9.0;											//走动模式的跳跃高度
var runJump 				: float 		= 9.0;											//跑动模式的跳跃盖度
//var crouchJump 				: float 		= 10.0;										//蹲下模式的跳跃高度

var gravity 				: float 		= 20.0;											//重力
static var cancontrol 		: boolean		= true;											//是否可控制角色
static var canJump	 		: boolean		= true;											//是否可跳
static var deadRecover		: boolean		= false;										//重生数据（用于传递重生状态并且把默认速度全部归零）
static var stop				: boolean		= false;										//让角色停下来

static var startPos 		: float 		= 20.0;											//开始坐标

var moveDirection 			: int  		 	= 1;											//角色面向位置

var soundJump				: AudioClip;													//跳跃的声音

private var soundRate 		: float			= 0.0;											//声音
private var soundDelay 		: float			= 0.0;											//声音延迟
private var velocity 		: Vector3		= Vector3.zero;									//定义初始速度
static var drag 			: Vector3		= Vector3.zero;									//阻力
 var jumpEnable		: boolean		= false; 										//跳跃屏蔽功能
private var runJumpEnable	: boolean		= false;										//跑动跳跃屏蔽功能
private var afterHitForceDown : float		= 2.0;										//跑动跳跃屏蔽功能

var spring 					: boolean 		= false;								//弹簧
var spring_low 					: boolean 		= false;								//弹簧(低跳版）


private var chkmoveLand 			: boolean 		= false;											//检测移动平台功能

//关于触摸的操作

public var sPos : Vector2;
public var direction: Vector2;

private var touchJumpDown	: boolean		= false;                                //模拟触摸跳跃
private var touchJumpUp	: boolean		= false;
private var touching	: boolean		= false;
private var touchMove   : int = 0;


//状态
private var touchMode1	: int = 0;      
private var touchMode2	: int = 0;     

//暂停
var pauseUI : GameObject;
var anim : Animator;                              //预设动画

//特别模式计分
var thisTimeHigh: int;

//跳跃特效
var jumpEffect: GameObject;

//转向
var player2: GameObject;

function Start () 
{
    gameConfig.pauseMode = false;
    anim = GetComponent("Animator");           //载入动画

}

//暂停功能
function OnGUI()
{
    GUI.skin = customSkin;
     GUI.skin.button.fontSize = Mathf.Round(30 * m_fScaleWidth);
     GUI.skin.label.fontSize = Mathf.Round(30 * m_fScaleWidth);  //自适应文字大小
    //暂停
     GUI.skin = pauseSkin;
    if(cancontrol && !gameConfig.pauseMode && SceneManager.GetActiveScene().name != "stage15"  && SceneManager.GetActiveScene().name != "title2"
        && SceneManager.GetActiveScene().name != "world1" && SceneManager.GetActiveScene().name != "world2" && SceneManager.GetActiveScene().name != "world3" && SceneManager.GetActiveScene().name != "world4"
        && SceneManager.GetActiveScene().name != "story1-2" && SceneManager.GetActiveScene().name != "story2-3" && SceneManager.GetActiveScene().name != "story3-4" && SceneManager.GetActiveScene().name != "story4-5"
        && SceneManager.GetActiveScene().name != "story4-5-2" && SceneManager.GetActiveScene().name != "story4-5-3" && SceneManager.GetActiveScene().name != "world5" && SceneManager.GetActiveScene().name != "story5-1"
        && SceneManager.GetActiveScene().name != "story5-2" && SceneManager.GetActiveScene().name != "story5-3" && SceneManager.GetActiveScene().name != "stage8" && SceneManager.GetActiveScene().name != "stageLast")
        if(GUI.Button (Rect (880 * m_fScaleWidth, -100 * m_fScaleHeight, 0 * m_fScaleWidth, 0 * m_fScaleHeight), "" ))
        gamePause();

    //最高分
   /* if (PlayerPrefs.HasKey("highScore") && SceneManager.GetActiveScene().name != "title2"
        && SceneManager.GetActiveScene().name != "world1" && SceneManager.GetActiveScene().name != "world2"&& SceneManager.GetActiveScene().name != "world3")
        GUI.Label (Rect (1 * m_fScaleWidth, 480 * m_fScaleHeight , 500 * m_fScaleWidth, 60 * m_fScaleHeight), "最高记录: "+  PlayerPrefs.GetInt("highScore"));*/
        
        
}

function LateUpdate()
{
    //var controller : CharacterController = GetComponent (CharacterController); 	 //引用CharacterController组件的功能
    //死掉功能
    if (playerconfig.preDead)
    {
        anim.SetBool("dieDisk", playerconfig.preDead);
    }
    //重生后
    if (playerconfig.dead)
    {
        anim.SetBool("dieDisk", false);
    }
    
}

/** 播放声音控制 */

/*function PlaySound (soundName, soundDelay)
{
	
	if(!audio.isPlaying && Time.time > soundRate)
	{
		soundRate = soundDelay;
		audio.clip = Time.time + soundName;  //这段有错这个代码运行不起
		audio.Play();
		yield WaitForSeconds (audio.clip.length);
	}
}*/

function Update () 
{
    //-----------------------------------------------------
    //            自动适应分辨率
    //-----------------------------------------------------
    m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
    m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
    //print("touch1:" + touchMode1);
    //print("touch2:" + touchMode2);
    if(transform.position.z != -0.1)
    transform.position.z = -0.1;
    var controller : CharacterController = GetComponent (CharacterController); 	 //引用CharacterController组件的功能
    //触摸操作
    if(Input.touchCount > 0)
    {
        var touch0: Touch = Input.GetTouch(0);
        if(Input.touchCount > 1)
        var touch1: Touch = Input.GetTouch(1);

        //新的移动代码
        if (touch0.position.x < Screen.width / 2)
            touchMode1 = 1;
        else
            touchMode2 = 1;


        if (touchMode1 == 1)
        {
            if (touch0.position.x < 130 * m_fScaleWidth && touch0.position.y < 250 * m_fScaleHeight) {
                touchMove = -1;
                print("touchMode = 1 and  touch0 = left");
            }

            else if (touch0.position.x > 180 * m_fScaleWidth && touch0.position.x < 400 * m_fScaleWidth && touch0.position.y < 250 * m_fScaleHeight)
            {
                touchMove = 1;
                print("touchMode = 1 and  touch0 = right");
            }
            else if (touch0.position.x > 130 * m_fScaleWidth && touch0.position.x < 180 * m_fScaleWidth)
                touchMove = 0;

            //跳跃
            if (touch1.position.x > Screen.width - 300 * m_fScaleWidth && touch1.position.y < 300 * m_fScaleHeight)
            switch (touch1.phase) {
                case TouchPhase.Began:
                    touchJumpDown = true;
                    touching = true;
                    print("touchMode = 1 and  touch1 = jumpDown");
                    break;

                case TouchPhase.Ended:

                    touchJumpDown = false;
                    touching = false;
                    touchMode1 = 0;
                    touchJumpUp = true;
                    print("touchMode = 1 and  touch1 = jumpUp");
                    break;
            } 
        }


        if (touchMode2 == 1) {
            if (Input.touchCount > 1 && touch1.position.x < 130 * m_fScaleWidth && touch1.position.y < 250 * m_fScaleHeight)
            {
                touchMove = -1;
                print("touchMode = 2 and  touch1 = left");
            }

            else if (Input.touchCount > 1 && touch1.position.x > 180 * m_fScaleWidth && touch1.position.x < 400 * m_fScaleWidth && touch1.position.y < 250 * m_fScaleHeight)
            {
                touchMove = 1;
                print("touchMode = 2 and  touch1 = right");
            }
            else if (Input.touchCount > 1 && touch1.position.x > 130 * m_fScaleWidth && touch1.position.x < 180 * m_fScaleWidth)
                touchMove = 0;  
            //防止玩家按跳后离开键盘角色一直前进问题
            else if (Input.touchCount <= 1 && touch0.position.x > Screen.width - 300 * m_fScaleWidth && touch0.position.y < 300 * m_fScaleHeight)
                touchMove = 0; 

            //跳跃
            if (touch0.position.x > Screen.width - 300 * m_fScaleWidth && touch0.position.y < 300 * m_fScaleHeight)
                switch (touch0.phase) {
                    case TouchPhase.Began:
                        touchJumpDown = true;
                        touching = true;
                        print("touchMode = 2 and  touch0 = jumpDown");
                        break;

                    case TouchPhase.Ended:

                        touchJumpDown = false;
                        touching = false;
                        touchMode1 = 0;
                        touchJumpUp = true;
                        print("touchMode = 2 and  touch0 = jumpUp");
                        break;
                }
        }

        //之前的移动代码
       /* if(touch0.position.x < Screen.width /2)
            touchMode1 = 1;
        else if(touch0.position.x > Screen.width /2 && touch0.position.y < Screen.height - Screen.height/5)
            touchMode1 = 2;

        if(Input.touchCount > 1)
        {
            //print("Input.touchCount:" + Input.touchCount);
            if(touch1.position.x < Screen.width /2)
                touchMode2 = 3;
            else if(touch1.position.x > Screen.width /2 && touch1.position.y < Screen.height - Screen.height/5)
                touchMode2 = 4;
        }

        //touch0 = walk
        if(touchMode1 == 1)
        {
            switch (touch0.phase)
            {
                case TouchPhase.Began:
                    sPos = touch0.position;             //2代表的是左边，移动    
                    print("touch0 = walk");
                    break;
                case TouchPhase.Moved:
                    direction = touch0.position - sPos;
                    //左右移动
                    if(sPos.x < Screen.width/2)
                    {
                        if(direction.x > 5 )
                            touchMove = direction.x/2 - 2.5;
                        else if (direction.x < -5)
                            touchMove = direction.x/2 + 2.5;
                        else
                            touchMove = 0;
                    }
                    if(touchMove >= 1)
                        touchMove = 1;
                    else if(touchMove <= -1)
                        touchMove = -1;
                    break;
                case TouchPhase.Ended:
                    touchMove = 0;
                    touchMode1 = 0;
                    break;
            }           
        }

        else if(touchMode1 == 2)
        {
            switch (touch0.phase)
            {
                case TouchPhase.Began:
                    touchJumpDown = true;
                    touching = true;
                    print("touch0 = jump");
                    break;

                case TouchPhase.Ended:

                    touchJumpDown = false;
                    touching = false;
                    touchMode1 = 0;
                    touchJumpUp = true;
                    break;
            }     
        }

        if(touchMode2 == 3 && touchMode1 != 1)
        {
            switch (touch1.phase)
            {
                case TouchPhase.Began:
                    sPos = touch1.position;             //2代表的是左边，移动    
                    print("touch1 = walk");
                    break;
                case TouchPhase.Moved:
                    direction = touch1.position - sPos;
                    //左右移动
                    if(sPos.x < Screen.width/2)
                    {
                        if(direction.x > 5 )
                            touchMove = direction.x/2 - 2.5;
                        else if (direction.x < -5)
                            touchMove = direction.x/2 + 2.5;
                        else
                            touchMove = 0;
                    }

                    if(touchMove >= 1)
                        touchMove = 1;
                    else if(touchMove <= -1)
                        touchMove = -1;
                    break;
                case TouchPhase.Ended:
                    touchMove = 0;
                    touchMode2 = 0;
                    break;
            }          
        }
        else if(touchMode2 == 4)
        {
            switch (touch1.phase)
            {
                case TouchPhase.Began:
                    touchJumpDown = true;
                    touching = true;
                    print("touch1 = jump");
                    break;

                case TouchPhase.Ended:

                    touchJumpDown = false;
                    touching = false;
                    touchJumpUp = true;
                    touchMode2 = 0;
                    break;
            }          
        }*/
        
    }

    //清除BUG操作（防止错误的滑动导致几个touch同时出现）
    if(Input.touchCount == 0 && touchMode1 != 0 || Input.touchCount == 0 && touchMode2 != 0)
    {
        touchMode1 = 0;
        touchMode2 = 0;
        touchMove = 0;
        touching = false;
    }
    /**转向*/
    if (cancontrol)
    {
        if (Input.GetAxis("Horizontal") > 0 || touchMove == 1) {
            player2.transform.localScale.x = 3;
        }
        else if (Input.GetAxis("Horizontal") < 0 || touchMove == -1) {
            player2.transform.localScale.x = -3;
        }
    }



	/** 角色是否可控 */	
	
	if(cancontrol)
	{


		/** 地面状态 */
		if (controller.isGrounded || chkmoveLand)
        { 
            if (jumpEnable)
            Instantiate(jumpEffect, Vector3(transform.position.x, transform.position.y, -1), Quaternion.Euler(-90, 0, 0));
			 /** 恢复跳跃功能 */
			 jumpEnable 	= false;
			 runJumpEnable  = false;
			 touchJumpUp    = false;
			 startPos = transform.position.y;
			
			 velocity = Vector3(Input.GetAxis("Horizontal"),0,0);					 //允许横向控制
			 if (Input.touchCount > 0)
			 velocity = Vector3(touchMove,0,0);
		    //动画效果
			 anim.SetBool("jump", false);

			 //velocity = Vector3(touchMove,0,0);

		
			/** 走动 */
			if(velocity.x > 0)
			{
				velocity *= walkSpeed;  											//在没有按下加速键位的时候为走动
				//velocity.x += drag.x;
			} 
			if(velocity.x < 0)
			{
				velocity *= walkSpeed;  											//在没有按下加速键位的时候为走动
				//velocity.x += drag.x;
            }


            velocity += drag;  													//阻力



			
			/*if(velocity.x > 0 && Input.GetButton("Fire1"))
			{
				velocity *= runSpeed / walkSpeed; 												//按下加速后是跑动
			} 
			if(velocity.x < 0 && Input.GetButton("Fire1"))
			{	 
				velocity *= runSpeed / walkSpeed; 												//按下加速后是跑动
			}*/
			
			
			/** 方向 */
			
			if(velocity.x > 0)
			{
				moveDirection = 1;  															//右边方向
			} 
			
			if(velocity.x < 0)
			{
				moveDirection = -1;  															//左边方向
			} 
			
			/** 跳跃 */
			
			if (canJump && Input.GetButtonDown ("Jump")  && (!Input.GetButton ("Fire1") || Input.GetButton ("Fire1") && velocity.x == 0) || touchJumpDown && velocity.x == 0) 
            {
                Instantiate(jumpEffect, Vector3(transform.position.x, transform.position.y, -1), Quaternion.Euler(-90, 0, 0));
                drag.y = 0;
				moveLand.chk = false;
				velocity.y 	= walkJump;																//普通跳跃
				//GetComponent.<AudioSource>().clip = soundJump;
				//GetComponent.<AudioSource>().Play();
				GetComponent.<AudioSource>().PlayOneShot(soundJump, 1.0F);
				//PlaySound (soundJump , 0);															//播放跳跃的声音
				jumpEnable 	= true;																	//跳跃屏蔽模式开启
			    //动画效果
				anim.SetBool("jump", true);
			}
			if (canJump && Input.GetButtonDown("Jump") && Input.GetButton("Fire1") && velocity.x != 0 || touchJumpDown && velocity.x != 0)			
            {
                Instantiate(jumpEffect, Vector3(transform.position.x, transform.position.y, -1), Quaternion.Euler(-90, 0, 0));
				drag.y = 0;
				velocity.y 		= runJump;															//加速跳跃 
				moveLand.chk = false;
				//PlaySound (soundJump , 0);															//播放跳跃的声音
				//GetComponent.<AudioSource>().clip = soundJump;
			    //GetComponent.<AudioSource>().Play();
				GetComponent.<AudioSource>().PlayOneShot(soundJump, 1.0F);
				runJumpEnable   = true;																//加速跳跃屏蔽模式开启
			    //动画效果
				anim.SetBool("jump", true);
			}
			
			/**弹簧效果*/
			if (spring)
			{
				drag.y = 0;
				velocity.y 		= runJump * 2;															//加速跳跃 
				moveLand.chk = false;
				runJumpEnable   = true;																//加速跳跃屏蔽模式开启
				spring = false;
			}	
			if (spring_low)
			{
			    drag.y = 0;
			    velocity.y 		= runJump * 1.2;															//加速跳跃 
			    moveLand.chk = false;
			    runJumpEnable   = true;																//加速跳跃屏蔽模式开启
			    spring_low = false;
			}	
			/**关于移动平台的触发效果
			if(chkmoveLand)
			{
				drag.x = moveLand.saveVel.x;
			}
			else 
			{
				moveLand.saveVel.x = 0;
			}	*/	
			
						
			//print(drag.x);
			
		    //drag.x = moveLand.saveVel.x;	

		}
		
			/** 在空中的一些判定 */
		
		if (!controller.isGrounded)
		{
		
			if (Input.GetButton ("Fire1"))
			{
			    velocity.x  = Input.GetAxis("Horizontal"); 
			    if (Input.touchCount > 0)
			        velocity.x  = touchMove; 
				velocity.x *= runSpeed;
				//velocity.x += drag.x;
			}
			
			else
			{
			    velocity.x  = Input.GetAxis("Horizontal"); 
			    if (Input.touchCount > 0)
			        velocity.x  = touchMove; 
				velocity.x *= walkSpeed; 
				//velocity.y += drag.y;
			}
			
			
			/** 在空中松开跳跃键 */
			
			if (Input.GetButtonUp ("Jump") || touchMode1 == 0 && touchJumpUp || touchMode2 == 0 && touchJumpUp)
			{
			    velocity.y = velocity.y - fallSpeed;
			    touchJumpUp = false;
			}
			
			/** 在空中的跳跃惯性 */
			
			if (jumpEnable)
			{
			    velocity.x  = Input.GetAxis("Horizontal"); 
			    if (Input.touchCount > 0)
			        velocity.x  = touchMove; 
				  velocity.x *= walkSpeed;
				  velocity.x += drag.x;
				  //velocity.y += drag.y;
			}
			
			if (runJumpEnable)
			{
			    velocity.x  = Input.GetAxis("Horizontal"); 
			    if (Input.touchCount > 0)
			        velocity.x  = touchMove; 
				  velocity.x *= runSpeed;
				  velocity.x += drag.x;
				 // velocity.y += drag.y;
			}
			

			
		} 
		
		/** 撞墙后掉下来 */
		
		if (controller.collisionFlags == CollisionFlags.Above)
		{
			velocity.y = 0;  //首先将角色再往上升的速度变成0
			velocity.y -= afterHitForceDown; //然后将角色增加往下的重力
		}
	}	
	else
	{
		velocity.x = 0;	//不能控制的时候速度为0防止玩家按住前进键不放
	}
		
		/** 默认的一些设定 */

		if (drag.y == 0)
		{
			//print("GGGGG");
			chkmoveLand = false;
			velocity.y -= gravity * Time.deltaTime;											//重力
			
			//重力最快速度限制
			if (velocity.y < -35)
				velocity.y = -35;
		}
		else
		{
			chkmoveLand = true;
			//drag.y = moveLand.saveVel.y;
			velocity.y =  drag.y;  										//阻力
    }


        /**走动动画*/
        if (cancontrol)
        {
            if (Input.GetAxis("Horizontal") != 0 || touchMove != 0) {

                if (controller.isGrounded)
                    anim.SetBool("walk", true);
                else if (moveLand.chk)
                    anim.SetBool("walk", true);
                else
                    anim.SetBool("jump", true);
            }
            else {
                anim.SetBool("walk", false);
            }
        }
        else
        {
            anim.SetBool("jump", false);
            anim.SetBool("walk", false);
        }
            
            
				

		controller.Move (velocity * Time.deltaTime);												//让角色可移动的默认函数 
		
		//print(velocity.x);
	
	
	/** dead状态数据传递从playerconfig传过来 */
	
	if (deadRecover)
	{
		velocity.x = 0;
		velocity.y = 0;									//让角色彻底停下来防止第二个生命重生时跳跃
		drag = Vector3.zero;				//防止活过来有惯性
	}
	/** 让角色停下比如过关的时候或者剧情 */
	if(stop)
	{
		velocity.x = 0;
		velocity.y = 0;									//让角色彻底停下来防止第二个生命重生时跳跃
		stop = false;
	}

    //触屏操作
	if(touchJumpDown && touchMode1 != 0 || touchJumpDown && touchMode2 != 0)
	    touchJumpDown = false;

    //暂停
	if (Input.GetButtonDown ("Fire3"))
	{
	    if (cancontrol)
	    {
	        gamePause();
	    }

	}

    //强行在不暂停的时候播放音乐（防止和UI解锁暂停冲突）
	if(!Camera.main.GetComponent.<AudioSource>().isPlaying && !gameConfig.pauseMode)
	  Camera.main.GetComponent.<AudioSource>().Play();
}




//暂停功能
function gamePause()
{
		//GetComponent.<AudioSource>().clip = soundPause;
    //GetComponent.<AudioSource>().Play();				//放暂停音乐
    if(!gameConfig.pauseMode)
    {
        gameConfig.pauseMode = true;
        Camera.main.GetComponent.<AudioSource>().Pause();
        Time.timeScale = 0;
    }
        
    else
    {
        gameConfig.pauseMode = false;
        Camera.main.GetComponent.<AudioSource>().Play();
        Time.timeScale = 1;
    }

    if (gameConfig.pauseMode)
    {
        Instantiate(pauseUI,transform.position,transform.rotation);     //加载UI
    }
    else
    {   
        Destroy(GameObject.Find("pause(Clone)"));
    }
        
}

	//让角色跟着移动平台一起动

/*function OnTriggerEnter (other : Collider)
{
	if (other.gameObject.name == "moveLand")
	{
        print("nimanimaniam");
        moveLand.chk = true;
	}
}*/
//离开的时候效果消失
function OnTriggerExit (other : Collider)
{
    if (drag.y != 0)
    drag = Vector3.zero;
}

function OnControllerColliderHit (hit : ControllerColliderHit)
{ 	 
	  if(hit.gameObject.tag != "moveLand")
	 {
          if (drag.y == 0)
	 	drag = Vector3.zero;

	 } 
	if(hit.gameObject.tag == "moveLand")
	 {
	     moveLand.chk = true;
		//velocity = 	moveLand.velocity;
		
	 }	
	 //弹簧效果
	 if(hit.gameObject.tag == "spring")
	 {
		spring = true;

	 }	 
    //弹簧效果
	 if(hit.gameObject.tag == "spring_low")
	 {
	     spring_low = true;

	 }	

}

    //动画结束控制
function dieAniClose()
{
    anim.SetBool("dieDisk", false);
    anim.SetBool("jump", false);
    anim.SetBool("walk", false);
    player2.transform.localScale.x = 3;
    playerconfig.preDead = false;
}

