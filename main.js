img="";
status="";
object=[];
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    canvas.hide();
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status= Detecting object";
}

function modelLoaded()
{
  console.log("Model Loaded");
  status="true";
  objectDetector.detect(video, gotResults);
}

function gotResults(error, results)
{
   if (error)
   {
     console.log(error);
   }
   console.log(results);
   object=results;
}

function preload()
{}

function draw()
{
    image(video,0,0,380,380);
    if (status=="true")
    {
       for(i=0; i<object.length; i++) 
       {
       document.getElementById("status").innerHTML= "Status= Object Detected";
       document.getElementById("number_of_objects").innerHTML= "Number of objects="+object.length;
       r= random(255);
       g= random(255);
       b= random(255);
       fill(r,g,b);
       percent=floor(object[i].confidence*100);
       text(object[i].label+" "+ percent+ "%", object[i].x+20, object[i].y+20);
       noFill();
       stroke(r,g,b);
       rect(object[i].x, object[i].y, object[i].width, object[i].height);
       }
    }
}