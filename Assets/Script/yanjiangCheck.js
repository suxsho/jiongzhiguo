#pragma strict
/**判断岩浆的点*/

var speed: float;
var mode2: boolean = false;

function OnTriggerEnter (other : Collider )
{
	if (other.tag == "Player")
    {


        if (mode2)
        {
            fire2.start = true;
            fire2.speed = speed;
        }
        else
        {
            yanjiang.start = true;
            yanjiang.speed = speed;
        }
	}
	
}