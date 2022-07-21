var stars, rocket, meteorites, starrynight;
var starsImg, rocketImg, starryNightImg, meteoritesImg;
var starCollection = 0;
var scoreCollection = 0;
var starGroup, meteoriteGroup;
var gameState = "play"
function preload(){

    starsImg = loadImage("mod-star.png");
    rocketImg = loadImage("new-rocket.png");
    meteoritesImg = loadImage("new-meteorite.png");
    starryNightImg = loadImage("starry-night-mod.jpg");
}

function setup() {
 
    createCanvas(400,400);

    //Moving Background
    starrynight=createSprite(200,200);
    starrynight.addImage("starryNight",starryNightImg);
    starrynight.velocityY = 4;

    starGroup = new Group();
    meteoriteGroup = new Group();

    rocket = createSprite(200,200,50,50);
    rocket.scale = 0.3;
    rocket.addImage("rocket", rocketImg);

}

function draw() {
    background(0);
    if (gameState === "play") {
        if(keyDown("left_arrow")){
            rocket.x = rocket.x - 3;
          }
          
          if(keyDown("right_arrow")){
            rocket.x = rocket.x + 3;
          }
          
          if(keyDown("space")){
            rocket.velocityY = -10;
          }
          
          rocket.velocityY = rocket.velocityY + 0.8;

        // background(0);
        // rocket.x = World.mouseX;
        
        // edges= createEdgeSprites();
        // rocket.collide(edges);
        
        //code to reset the background
        if(starrynight.y > 400 ){
            starrynight.y = height/2;
        }

      createStars();
      createMeteorites();
      if (starGroup.isTouching(rocket)) {
        starGroup.destroyEach();
        starCollection=starCollection+1;
        scoreCollection=scoreCollection+50;
      }


      if(meteoriteGroup.isTouching(rocket) || rocket.y > 400){
        rocket.velocityY = 0;
        rocket.destroy();
        gameState = "end";
      }
      
      drawSprites();
      stroke("yellow");
      fill("yellow");
      textSize(20);
      scoreCollection = scoreCollection+1;
      text("Stars: "+ starCollection,10,30);
      text("Score: "+ scoreCollection,10,60);
    }
    
    if (gameState === "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over", 100,200);
      textSize(20);
      text("The rocket has been crashed!", 50,240);
    }
  

}

function createStars() {
    if (World.frameCount % 410 == 0) {
    var stars = createSprite(Math.round(random(50, 350),40, 10, 10));
    stars.addImage(starsImg);
    stars.scale=0.2;
    stars.velocityY = 3;
    stars.lifetime = 400;
    starGroup.add(stars);
    }
  }
  
  function createMeteorites() {
    if (World.frameCount % 530 == 0) {
    var meteorites = createSprite(Math.round(random(50, 350),40, 10, 10));
    meteorites.addImage(meteoritesImg);
    meteorites.scale=0.25;
    meteorites.velocityY = 5;
    meteorites.lifetime = 100;
    meteoriteGroup.add(meteorites);
    }
  }