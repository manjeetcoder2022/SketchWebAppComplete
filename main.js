quick_draw=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog","frying pan","garden","garden hose","giraffe","goatee","golf club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon","hot dog","hot tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can","palm tree","panda","pants","paper clip","parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup truck","picture frame","pig","pillow","pineapple","pizza","pliers","police car","pond","pool","popsicle","postcard","potato","power outlet","purse","rabbit","raccoon","radio","rain","rainbow","rake","remote control","rhinoceros","rifle","river","roller coaster","rollerskates","sailboat","sandwich","saw","saxophone","school bus","scissors","scorpion","screwdriver","sea turtle","see saw","shark","sheep","shoe","shorts","shovel","sink","skateboard","skull","skyscraper","sleeping bag","smiley face","snail","snake","snorkel","snowflake","snowman","soccer ball","sock","speedboat","spider","spoon","spreadsheet","square","squiggle","squirrel","stairs","star","steak","stereo","stethoscope","stitches","stop sign","stove","strawberry","streetlight","string bean","submarine","suitcase","sun","swan","sweater","swingset","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis racquet","tent","The Eiffel Tower","The Great Wall of China","The Mona Lisa","tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado","tractor","traffic light","train","tree","triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase","violin","washing machine","watermelon","waterslide","whale","wheel","windmill","wine bottle","wine glass","wristwatch","yoga","zebra","zigzag"]

random_no = Math.floor((Math.random()*quick_draw.length)+1)
var sec = 20;
console.log(random_no)
document.getElementById("random_sketch").innerHTML= quick_draw[random_no]
function preload(){
classifier= ml5.imageClassifier('DoodleNet')
}

function setup(){
  
    canvas= createCanvas(350,300)
    canvas.center()
    background('white')
   canvas.mouseReleased(classifyCanvas)
   synth= window.speechSynthesis;
}
function draw(){
    // if(mouseIsPressed){
      
    //     mouse_x= pmouseX
    //     mouse_y= pmouseY
    //     fill(0,0,47)
    //     stroke(0,0,47)
    //     rect(mouse_x,mouse_y,50,50)
    // }

    if(mouseIsPressed){
        fill(0)
     stroke(0)
     strokeWeight(13)
        line(pmouseX,pmouseY,mouseX,mouseY)
    }
}

timer()
function timer(){
    
    
    var timer = setInterval(function(){
        document.getElementById('timer').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
          
        }
    }, 1000);
}


function classifyCanvas(){
classifier.classify(canvas,gotResult)
}
    
function gotResult(error,results){
    if(error){
        console.log(error)
    }else{
        console.log(results)
document.getElementById("user_sketch").innerHTML=results[0].label
document.getElementById("confidence").innerHTML=Math.floor(results[0].confidence*100)+" %"
label1= results[0].label
sec = 0
if(label1==document.getElementById("random_sketch").innerHTML){
    score=0
    a= score-1
    document.getElementById("score").innerHTML= "Score : " + a
    document.getElementById("random_sketch").innerHTML=quick_draw[random_no]
    Clear2()
}else{
    score=document.getElementById("score").innerHTML
 
    document.getElementById("score").innerHTML=  score-1
    
    console.log("Wrong")
    document.getElementById("random_sketch").innerHTML=quick_draw[random_no]
}
    }
}

function Clear2(){
    console.log("hh")
    background('white')
    timer()
         sec = 20
         random_no = Math.floor((Math.random()*quick_draw.length)+1)
         document.getElementById("random_sketch").innerHTML=quick_draw[random_no]
         document.getElementById("user_sketch").innerHTML=""
         document.getElementById("confidence").innerHTML=""
}

