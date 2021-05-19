var ball, ballImg;
var database;
var position;
var bg, bgImg;

function preload(){
    bg= loadImage("cityImage.png");
    ballImg = loadImage("hotairballoon1.png");
}
function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ball.addImage("Img", ballImg);
    ball.scale = 0.2;
    var ballPos = database.ref('ball/position');
    ballPos.on("value", readPosition, showError);
}
function draw(){
    background(bg);
    if (position !== undefined){
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        ball.scale = ball.scale + 0.001;
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
        ball.scale = ball.scale - 0.001;
    }
    drawSprites();
  }
}
function readPosition(data)
{
position = data.val();
ball.x = position.x;
ball.y = position.y;
}

function writePosition(x,y)
{
    database.ref('ball/position').set({
        'x':position.x + x,
        'y':position.y + y });
}
function showError()
{
    console.log("Error in database");
}
