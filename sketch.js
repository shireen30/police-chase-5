var thief
var thiefAnimation
var cityBG
var bg
var ground;
var diamondImg,diamondGroup;
var spikeImg,spikeGroup;
var police,policeAnimation
var score 
var arrested
var spikeCount=0
const PLAY=0;
const END=1;
var gameState=PLAY;


function preload(){
  thiefAnimation=loadAnimation("assets/theif1.png","assets/theif2.png")
  cityBG=loadImage("assets/citybg.jpg")
  diamondImg=loadImage("assets/diamond.png")
  spikeImg=loadImage("assets/spike.png")
  policeAnimation=loadAnimation("assets/policeman1.png","assets/policeman2.png")
  arrested=loadAnimation("assets/arrested.png","assets/arrested.png","assets/arrested.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 
 bg=createSprite(windowWidth/2,windowHeight/7,windowWidth,windowHeight)
 bg.addImage(cityBG)
 bg.velocityX=-7
bg.scale=1.6

score=0

thief=createSprite(380,600,50,30)
 thief.addAnimation("running",thiefAnimation)
 thief.scale=0.6
 thief.debug=false

 thief.setCollider("rectangle",0,40,200,350)
 
 police=createSprite(thief.x-250,700,50,30)
 police.addAnimation("policerunning",policeAnimation);
 police.addAnimation("arrested",arrested);
 police.visible=false;

 ground=createSprite(0,windowHeight-10,windowWidth*2,5);
 ground.visible=false;

 diamondGroup=createGroup()
 spikeGroup=createGroup()
}

function draw() {
  background(0);
  if(gameState===PLAY){

  if(bg.x<0){
    bg.x=bg.width/4
  }

  if(keyDown("space")&& thief.y>=670){
    thief.velocityY=-25;
  }

  thief.velocityY=thief.velocityY+0.8
  console.log(thief.y)


  thief.collide(ground)
  spawnSpike()
  spawnDiamond()

  if(spikeGroup.isTouching(thief)){
    police.visible=true
    thief.y=thief.y-500
    spikeCount+=1
   // console.log(spikeCount)
  }
if(spikeCount==2){
 gameState=END
}
  if(thief.isTouching(diamondGroup)){
    score+=5
    diamondGroup.destroyEach()
  }


}//PLAY State ENDs
if(gameState===END){
  thief.destroy()
  police.changeAnimation("arrested");
  bg.velocityX=0
  spikeGroup.destroyEach()
  diamondGroup.destroyEach()
  police.x=width/2;
  police.y=height-200
}

drawSprites()
fill("white")
textSize(30)
text("Score: "+score,windowWidth-200,40)


}

function spawnSpike(){
  if(frameCount %150 ===0){
    var spike=createSprite(600,windowHeight-40,20,20)
    spike.addImage(spikeImg)
    spike.velocityX=-7
    spike.scale=0.20
    spike.debug=false
    spikeGroup.add(spike)
  }
}

function spawnDiamond(){
  if(frameCount %400 ===0){
    var diamond=createSprite(600,windowHeight-50,20,20)
    diamond.x= Math.round(random(500,windowWidth-200))
    diamond.addImage(diamondImg)
    diamond.velocityX=-4
    diamond.scale=0.2
    diamondGroup.add(diamond)
  }
}
