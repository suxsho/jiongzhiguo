#pragma strict

//进入故事模式
var customSkin : GUISkin;		//加载皮肤
var i : int;
var text : String;				//显示的文字
var soundMusic : AudioClip;		//加载音乐
var talkMode : boolean = false; //对话模式（判断对话框出现
var talkSave : boolean = true;	//存储对话状态，如果聊天过了一次后再进入这个场景角色就不见了
var obj : GameObject;
var target : Transform;
var logo : Transform;

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

var touchTips : boolean = false; //触摸提示，玩家在对话操作进行了触摸才会给这个提示
var objTips: GameObject;
var objTips2: GameObject;

function Start () 
{
	playerControls.cancontrol = false;		//先让角色不能移动
    talkMode = true;				//开启说话

    
}

/**会话显示*/

function OnGUI () 
{
	GUI.skin = customSkin;		
	GUI.skin.label.fontSize = Mathf.Round(30 * m_fScaleWidth);  //自适应文字大小
	GUI.skin.button.fontSize = Mathf.Round(30 * m_fScaleWidth);    //自适应文字大小
	if(talkMode)
	GUI.Label (Rect (20 * m_fScaleWidth, 25 * m_fScaleHeight, 930 * m_fScaleWidth, 60 * m_fScaleHeight), text);										

	 //-----------------------------------------------------
     //            自动适应分辨率
     //-----------------------------------------------------
    m_fScaleWidth = Mathf.Round(Screen.width) / m_fScreenWidth;
    m_fScaleHeight = Mathf.Round(Screen.height) / m_fScreenHeight; 
}

function Update () 
{
    if(Input.GetMouseButtonDown(0) && Input.touchCount > 0)
    {
        touchTips = true;
    }
	/**按JUMP键说话跳跃的功能*/
	if(talkMode && talkSave)
	{
		
		if(Input.GetButtonDown ("Jump"))
			i ++;
		if(Input.GetButton ("Fire1"))
		    i ++;

		if(Input.GetMouseButtonDown(0))
		    i ++;
		
	    /**说话内容合集*/
	    //繁体
        if (gameConfig.language == "English") {
            if (i == 0) text = "Let us save the king![K or A(X1) ctn]";
            if (i == 1) text = "Eh...???? Why is it suddenly??";
            if (i == 2) text = "Why did you sususuddenly become a cube?";
            if (i == 3) text = "Oh no! I found that I was... A cube face! why??";
            if (i == 4) text = "(it doesn't seem to remember what happened before)";
            if (i == 5) text = "Is this the magic of the enemy!?";
            if (i == 6) text = "But even so, I can still use the sword...";
            if (i == 7) text = "No, where is my hand?how to hold the sword!";
            if (i == 8) text = "I can move, I'll have to save the king!";
            if (i >= 8) {
                text = "Let me jump!!!! Ah ah ah..."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5);
            }
        }
        else {
            if (i == 0) text = "让我们再次举起这把勇者之剑拯救国王吧！【K键继续】";
            if (i == 1) text = "诶....？？？怎么突然？？";
            if (i == 2) text = "你怎么突突突突然变成白色方块了？";
            if (i == 3) text = "哦不！我发现我也...变成方块脸了！这是为什么啊！";
            if (i == 4) text = "（所以这是什么展开啊 刚才我不是正在玩游戏吗）";
            if (i == 5) text = "难道这是敌人的魔法！？";
            if (i == 6) text = "不过就算是这样，我依然也可以用这把剑...";
            if (i == 7) text = "不对，我的手呢?我连手都没有了该怎么举剑啊！";
            if (i == 8) text = "不过这也没问题，只要我还可以移动，我就一定会去拯救国王！";
            if (i == 9) text = "（我很想吐槽点什么，但是好像我不能说话了）";
            if (i == 10) text = "（所以这是莫名其妙穿越到异世界变成无口主角的故事吗！）";
            if (i == 11) text = "喂！你说点什么啊！难道！你不仅变成方块还顺带变成哑巴了！？";
            if (i == 12) text = "（是啊，虽然不太明白，不过我就看看接下来到底怎么回事吧）";
            if (i == 13) text = "好吧，我明白了，你先调整一下自己吧，我先救国王去了！";
            if (i >= 14) {
                text = "看我跳跃！！！！啊啊啊啊啊"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5);
            }
        }



          

		
		//开始游戏
		
		if (obj.transform.position.y - target.position.y > -0.5)
			gameStart();
		
		/**如果已经对话过了*/
		
		if(!talkSave)
		{
			gameStart();
			Destroy(target);
		}
	}

}

function gameStart()
{
	talkMode= false;
	GetComponent.<AudioSource>().clip = soundMusic;
	GetComponent.<AudioSource>().Play(); 		//放音乐
	playerControls.cancontrol = true;
	logo.GetComponent.<Animator>().SetBool("start", true);

    //玩家是触摸模式启动的就给触摸提示
	if(touchTips)
        Instantiate(objTips, transform.position, transform.rotation);
    else
        Instantiate(objTips2, transform.position, transform.rotation);
	
}

