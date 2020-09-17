#pragma strict
import UnityEngine.SceneManagement;
//进入故事模式
var customSkin : GUISkin;		//加载皮肤
var i : int;
var text : String;				//显示的文字
var soundMusic : AudioClip;		//加载音乐
var talkMode : boolean = false; //对话模式（判断对话框出现

var obj : GameObject;
var objTips : GameObject;
var target : Transform;

var touchTips : boolean = false; //触摸提示，玩家在对话操作进行了触摸才会给这个提示

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
    var gameConfig = gameObject.GetComponent("gameConfig");
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
	if(talkMode)
	{
		
		if(Input.GetButtonDown ("Jump"))
			i ++;
		if(Input.GetButton ("Fire1"))
		    i ++;

		if(Input.GetMouseButtonDown(0) && Input.touchCount > 0)
		{
		    touchTips = true;
		    i ++;
		}
		    
		
	    /**说话内容合集*/
        //简体
        if (SceneManager.GetActiveScene().name == "op0")
        {
            if (gameConfig.language == "English")
            {
                if (i == 0) text = "Ha ha ha ha ha!";
                if (i == 1) text = "I've turned all those heroes into cubes!";
                if (i == 2) text = "They can't attack us";
                if (i == 3) text = "In this case they lost their fighting power, hahaha";
                if (i >= 3) { text = "oh yeah!!!!"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }
            else
            {
                if (i == 0) text = "哈哈哈哈成功啦！";
                if (i == 1) text = "我把囧之国的那些英雄们全部变成方块啦！";
                if (i == 2) text = "别说用武器了，他们现在就算想从在我们头上踩死我们都不可能！";
                if (i == 3) text = "这下他们彻底丧失战斗力了，哈哈哈哈哈";
                if (i >= 3) { text = "干杯！！！！"; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }

		}

        if (SceneManager.GetActiveScene().name == "story5-6") {

            if (gameConfig.language == "English")
            {
                if (i == 0) text = "Now,the main story is over";
                if (i == 1) text = "But the game has not all ended";
                if (i == 2) text = "The game opens new elements";
                if (i == 3) text = "Please find 24 stars!";
            }
            else
            {
                if (i == 0) text = "到这里，游戏所有的主线故事已结束";
                if (i == 1) text = "但是游戏还没有全部结束";
                if (i == 2) text = "游戏开启了新的内容";
                if (i == 3) text = "请收集满24个星星吧";
            }



            //各种条件判断说话
            if (gameConfig.powerPoint > 500 || gameConfig.player >= 8999 || gameConfig.jiongBi >= 89999)
            {
                if (i == 6) text = "说起来你的游戏数据有些异常";
                if (i == 7) text = "其实我们将游戏里所有的数据都做过一些验证处理";
                if (i == 8) text = "你的数据和我们的验证密文不一致";
                if (i == 9) text = "所以你是修改了数据吧？嗯哼！？";
                if (i == 10) text = "或许错怪你了，如果是这样的话，请立即来向我反馈BUG";
                if (i >= 11) { obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }
            else
            if (i >= 4) { obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }


        }

        if (SceneManager.GetActiveScene().name == "story5-5") {
            if (gameConfig.language == "English")
            {
                if (i == 0) text = "So our Cube Chan also began to desperately escape the castle";
                if (i == 1) text = "However, half way, he encountered such difficulties";
                if (i >= 2) { text = "...."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }
            else
            {
                if (i == 0) text = "于是我们的方块酱也开始拼命的逃离城堡";
                if (i == 1) text = "然而，在半路上，他遇到了这样的困难";
                if (i >= 2) { text = "...."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }


        }

        if (SceneManager.GetActiveScene().name == "end1") {
            if (gameConfig.language == "English")
            {
                if (i == 0) text = "what! I am back to my room!";
                if (i == 1) text = "oh!yeah yeah yeah";
                if (i == 2) text = "but they return original now?";
                if (i == 3) text = "I decided to see the game guide";
                if (i == 4) text = "Um... if you find 12 diamonds, then enter the door of the first world";
                if (i == 5) text = "Can see the true end,but I just find " + gameConfig.emerald + " diamonds";
                if (i == 6) text = "emmmm,Let me go back and have a look";
                if (i >= 7) { text = "...."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }
            else
            {
                if (i == 0) text = "啊！我这是回到自己房间了吗！";
                if (i == 1) text = "虽然不太明白，不过至少我现在总算回来了";
                if (i == 2) text = "至于那些方块一样的家伙，他们能变回原来的样子吗";
                if (i == 3) text = "我决定去翻阅下攻略看看吧.....";
                if (i == 4) text = "嗯...如果收集齐12个钻石，再进入第一世界的大门";
                if (i == 5) text = "可以看到隐藏结局，然而我才收集了" + gameConfig.emerald + "个";
                if (i == 6) text = "至于他们可变回原来的形象吗，答案是不能";
                if (i == 7) text = "哇！这么无聊的隐藏结局....我有必要回去看看吗...";
                if (i == 8) text = "不过这作者挺耿直的，居然提前剧透，我还是支持下好了";
                if (i >= 9) { text = "...."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }


        }

        if (SceneManager.GetActiveScene().name == "end2") {
            if (gameConfig.language == "English") {
                if (i == 0) text = "what! I am back to my room!";
                if (i == 1) text = "This time the story is really over";
                if (i == 2) text = "I haven't played enough yet";
                if (i == 3) text = "I really want to know what happened to them later";
                if (i == 4) text = "what! Have a new message";
                if (i == 5) text = "Thank you wuu,with your help,I have made many friends wuu";
                if (i == 6) text = "And we built the world into a park wuu";
                if (i == 7) text = "Many people really like it wuu";
                if (i == 8) text = "And,Probably we know how to get back to the original wuu";
                if (i == 9) text = "Everything is OK wuu";
                if (i == 10) text = "So thank you very much wuu ,do you think that I am a ghost wuu?";
                if (i == 11) text = "Hahahaha, I am the king wuu,I pretend to be a ghost wuu";
                if (i == 12) text = "Ghost will not say this wuu";
                if (i == 13) text = "Well, this time it’s over";
                if (i == 14) text = "......... yes ah, this is end";
                if (i == 15) text = "I heard that there have gold diamonds,that is too difficult";
                if (i == 16) text = "If you have confidence,You can try it!";
                if (i >= 17) { text = "...."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }
            else
            {
                if (i == 0) text = "啊！我这是回到自己房间了吗！";
                if (i == 1) text = "这一次的冒险就这样结束了呢";
                if (i == 2) text = "一种欲犹未尽的感觉";
                if (i == 3) text = "很想知道囧之国之后发生了什么";
                if (i == 4) text = "咦！有一条未读信息";
                if (i == 5) text = "感谢你呜，在你的帮助下，我顺利的交到朋友了呜";
                if (i == 6) text = "而且我们把囧之国打造成了一座公园呜";
                if (i == 7) text = "吸引了很多游客呜，他们非常喜欢这里呜";
                if (i == 8) text = "另外就是，我们变回原样的方法也有些眉目了呜";
                if (i == 9) text = "一切都是非常的顺利呜";
                if (i == 10) text = "所以很感谢你呜，你是不是觉得我是幽灵呜";
                if (i == 11) text = "哈哈哈哈，我是国王呜，我是冒充幽灵发给你的信息呜";
                if (i == 12) text = "幽灵才不会说这样的话呜";
                if (i == 13) text = "那么，这次就这样结束了呜";
                if (i == 14) text = ".........是啊，就这样结束了";
                if (i == 15) text = "听说还有金色钻石可以挑战什么的，那个也太难了";
                if (i == 16) text = "如果真有那么闲我就去试试吧";
                if (i >= 17) { text = "...."; obj.transform.position = Vector3.Lerp(obj.transform.position, target.position, Time.deltaTime * 5); }
            }


        }
		
		//开始游戏
		
		if (obj.transform.position.y - target.position.y > -0.5)
            gameStart();


	}

}

function gameStart()
{
    talkMode = false;
    if (SceneManager.GetActiveScene().name == "story5-5") 
        Application.LoadLevel("stage20");
    else if (SceneManager.GetActiveScene().name == "end2")
        Application.LoadLevel("testover");
    else
        Application.LoadLevel("world1");
	
}

