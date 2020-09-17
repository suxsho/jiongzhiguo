
var target : Transform;
var smooth = 5.0;
function Update () {
	transform.position = Vector3.Lerp (
	transform.position, target.position,
	Time.deltaTime * smooth);
	
	transform.position.z = -1;
}