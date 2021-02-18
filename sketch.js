
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var survivalTime;
var ground, invisibleGround;
var bananaGroup, obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg, gameOver;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_8.png");
  gameOverImg = loadImage("gameover.png");
}

function setup() {
  
  createCanvas(600,200);
  
  ground = createSprite(300,190,600,20);
  ground.shapeColor = color(50,100,10);
  
  
  invisibleGround = createSprite(300,200,600,20);
  invisibleGround.visible = false;
  
  
  monkey = createSprite(30,160,10,10);
  monkey.addAnimation("runnning", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.11;
  
  gameOver = createSprite(280,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.14;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  survivalTime = 0;
  
  monkey.setCollider("rectangle", 0,0,40,monkey.height);
  
}

function draw() {
  
  background("lightblue");
  
  if(gameState === PLAY){
    
    if(keyDown("space") && monkey.y >= 70){
    monkey.velocityY = -13;
  }
  
  monkey.velocityY = monkey.velocityY + 0.9;
  
  monkey.collide(invisibleGround);
  
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
    gameOver.visible = false;
    
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score+1;
  }
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
      
    createObstacles();
    createBananas();
  }
  
  else if(gameState === END){
    
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    gameOver.visible = true;
    
    monkey.changeAnimation("collided", monkey_collided);
    
    if(keyDown("R")){
      
    }
    
  }
  
  drawSprites();
  
  fill("black");
  textSize(15);
  text("Survival Time:"+ survivalTime,460,20); 
  text("Score:"+ score, 250,20);
  
}

function createObstacles(){
  
  if(frameCount % 140 === 0){
  obstacle = createSprite( 600,160,20,20);
  obstacle.addImage("stone", obstacleImage);
  obstacle.scale = 0.14;
    obstacle.velocityX = -(5 + survivalTime/100);
    obstacle.lifetime = 120;
    obstaclesGroup.add(obstacle);
  }
  
}

function createBananas(){
  
if(frameCount % 120 === 0){
  banana = createSprite(600,Math.round(random(40,100)),20,20);
  banana.addImage("banana", bananaImage);
  banana.scale = 0.14;
  banana.velocityX = -(5 + survivalTime/100);
  banana.lifetime = 120;
  bananaGroup.add(banana);
  
  banana.depth = gameOver.depth;
  gameOver.depth = gameOver.depth + 1;
  
}
}
