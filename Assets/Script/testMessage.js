#pragma strict

private var objA : test01;
var n = 0;
function Start () {
	objA = GetComponent(test01);
}

function Update () {

	objA.SendMessage("playTest",n);
}