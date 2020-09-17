/*using UnityEngine;
using System.Collections;

public class playerAmination : MonoBehaviour {
	tk2dAnimatedSprite anim;
	// Use this for initialization
	void Start () {
		anim = GetComponent<tk2dAnimatedSprite>();
	}
	
	bool walking = false;
	bool unwalking = false;
	bool jumping = false;
	bool unjumping =false;
	int status = 0; //0 stand 1 unstand 2 walk 3 unwalk


	// Update is called once per frame
	void Update () {

    	//判定走动
		if (Input.GetAxis("Horizontal") > 0 && !walking)
		{
			anim.Play("walk");
			walking = true;
			status = 2;
		}
		
		if (Input.GetAxis("Horizontal") == 0 && walking)
		{
			anim.Play("stand");
			walking = false;
			status = 0;
		}
		
		if (Input.GetAxis("Horizontal") < 0 && !unwalking)
		{
			anim.Play("unwalk");
			unwalking = true;
			status = 3;
		}
		
		if (Input.GetAxis("Horizontal") == 0 && unwalking)
		{
			anim.Play("unstand");
			unwalking = false;
			status = 1;
		}
		
		if(jumping){
			if (Input.GetAxis("Horizontal") == 0 && status == 2)
			{
				anim.Play("stand");
				status = 0;
				jumping = false;
			}
		
			if (Input.GetAxis("Horizontal") == 0 && status == 3)
			{
				anim.Play("unstand");
				status = 1;
				jumping = false;
			}
		}
		
		//判断跳跃
		
		if ( CharacterMotor.jumpMessage && status == 2)
		{
			anim.Play("jump");
			walking = false;
			jumping = true;
		}
		
		if ( CharacterMotor.jumpMessage && status == 3)
		{
			anim.Play("unjump");
			unwalking = false;
			jumping = true;
		}
		
		if ( CharacterMotor.jumpMessage  && status == 0)
		{
			anim.Play("jump");
			walking = false;
			jumping = true;
		}
		
		if ( CharacterMotor.jumpMessage  && status == 1)
		{
			anim.Play("unjump");
			unwalking = false;
			jumping = true;
		}
		
		if ( !CharacterMotor.jumpMessage  && status == 1)
		{
			anim.Play("unstand");
			unwalking = false;
		}
		if ( !CharacterMotor.jumpMessage  && status == 0)
		{
			anim.Play("stand");
			walking = false;
		}
		
		
		
	}
	
	
}*/
