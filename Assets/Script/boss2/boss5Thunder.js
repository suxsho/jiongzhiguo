#pragma strict

var speedX: float;
var speedY: float;

var velocity: Vector3 = Vector3.zero;
private var homePoint: Vector3 = Vector3.zero;
// Use this for initialization
function Start() {
    homePoint = transform.position;


}



// Update is called once per frame
function FixedUpdate() {

    if (playerconfig.dead || bonusMode.start)
        gohomePoint();

    var controller: CharacterController = GetComponent(CharacterController);
    velocity = Vector3(speedX, speedY, 0);
    if (!storyboss52.talkMode)
    controller.Move(velocity * Time.deltaTime);

    //反弹功能
    if (transform.position.x >= 15.5f)
    {
        gameObject.transform.position =  Vector3(15.4f, gameObject.transform.position.y, 0);
        speedX *= -1;
    }

    if (gameObject.transform.position.y >= 8.6f)
    {
        gameObject.transform.position =  Vector3(gameObject.transform.position.x, 8.5f, 0);

        speedY *= -1;
    }

    if (gameObject.transform.position.x <= -15.5f)
    {
        gameObject.transform.position =  Vector2(-15.4f, gameObject.transform.position.y);
        speedX *= -1;
    }

    if (gameObject.transform.position.y <= -8.6f)
    {
        gameObject.transform.position =  Vector2(gameObject.transform.position.x, -8.5f);

        speedY *= -1;
    }

    if (controller.isGrounded)
    {
        speedY *= -1;
    }

}


function gohomePoint()
{
    transform.position = homePoint;
    velocity.x = 0;
    velocity.y = 0;
    speedX = -3;
    speedY = -3;
}
