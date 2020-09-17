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

//GUI按比例缩放功能
// original screen size
var m_fScreenWidth : float = 960;
var m_fScreenHeight : float = 540;
// scale factor
var m_fScaleWidth : float;
var m_fScaleHeight : float;

function Start () 
{
	playerControls.cancontrol = false;		//先让角色不能移动
	talkMode= true;				//开启说话
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
        if(gameConfig.language == "ChineseTraditional")
        {
            if (i == 0) text = "你是？";
            if (i == 1) text = "為了讓你無法見到我，我還讓夥伴們專門設計了勸退關";
            if (i == 2) text = "還是自我介紹下吧，我是囧之國的創造者之一QS君";
            if (i == 3) text = "大家都叫我酷炫與城府";
            if (i == 4) text = "所以，你想問我國王在哪裡對嗎";
            if (i == 5) text = "國王還在另一座城堡裡呢";
            if (i == 6) text = "國王的考驗暫時結束了";
            if (i == 7) text = "但是國王仍然在讓我們創建新的世界";
            if (i == 8) text = "或許囧之國給你的感覺是破破爛爛的";
            if (i == 9) text = "不過正因為有你們觀光者，所以我才在努力創建啊";
            if (i == 10) text = "希望有一天國王可以看見繁榮的王國";
            if (i == 11) text = "啊.....自說自話了很久";
            if (i == 12) text = "你能來到這裡，當然會讓你留下一些紀念的";
            if (i == 13) text = "如果喜歡這個王國，記得給我們好評哦";
            if (i == 13) text = "接下來就留下你的紀念吧";
            if (i >= 14) {text = "我們下次見！";obj.transform.position = Vector3.Lerp (obj.transform.position, target.position,Time.deltaTime * 5);}
        }
        else
        {
            if (i == 0) text = "你是？";
            if (i == 1) text = "为了让你无法见到我，我还让伙伴们专门设计了劝退关";
            if (i == 2) text = "还是自我介绍下吧，我是囧之国的创造者之一QS君";
            if (i == 3) text = "大家都叫我酷炫与城府";
            if (i == 4) text = "所以，你想问我国王在哪里对吗";
            if (i == 5) text = "国王还在另一座城堡里呢";
            if (i == 6) text = "国王的考验暂时结束了";
            if (i == 7) text = "但是国王仍然在让我们创建新的世界";
            if (i == 8) text = "或许囧之国给你的感觉是破破烂烂的";
            if (i == 9) text = "不过正因为有你们观光者，所以我才在努力创建啊";
            if (i == 10) text = "希望有一天国王可以看见繁荣的王国";
            if (i == 11) text = "啊.....自说自话了很久";
            if (i == 12) text = "你能来到这里，当然会让你留下一些纪念的";
            if (i == 13) text = "如果喜欢这个王国，记得给我们好评哦";
            if (i == 13) text = "接下来就留下你的纪念吧";
            if (i >= 14) {text = "我们下次见！";obj.transform.position = Vector3.Lerp (obj.transform.position, target.position,Time.deltaTime * 5);
            }
            //talkSave = false;			//让对话不再出现了，测试阶段屏蔽这个功能
					
		
            //开始游戏
		
            if (obj.transform.position.x - target.position.x > -0.5)
                gameStart();
		
            /**如果已经对话过了*/
		
            if(!talkSave)
            {
                gameStart();
                Destroy(target);
            }
        }
    }

}

function gameStart()
{
    talkMode= false;
    Camera.main.SendMessage("fadeOut");
	
    yield WaitForSeconds (2);
	Application.LoadLevel (25);
	
}

