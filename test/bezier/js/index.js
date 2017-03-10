var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var stage = new createjs.Stage(canvas);
var line = new createjs.Shape();
var pointA = new createjs.Shape();
var pointB = new createjs.Shape();
var path = new createjs.Shape();
var pointTxt = new createjs.Text();
var txt = new createjs.Text();
var colorData = 'black';
var abStatus = true;

createjs.Touch.enable(stage);
stage.preventSelection = false;

var abs = {
  a:{x:80,y:500},
  b:{x:630,y:300}
};

stage.addChild(line,path,pointTxt,pointA,pointB,txt);

dw(abs.a.x,abs.a.y,abs.b.x,abs.b.y);
dpA(abs.a.x,abs.a.y);



pointA.addEventListener('mousedown',bezierCurve);

function bezierCurve(event){
  dpA(stage.mouseX,stage.mouseY);
  stage.addEventListener('stagemousemove',function (event){
       abs.a.x = stage.mouseX;
       abs.a.y = stage.mouseY;
    dpA(stage.mouseX,stage.mouseY);
    dpt(stage.mouseX,stage.mouseY);
    dw(abs.a.x,abs.a.y,abs.b.x,abs.b.y);
  });
  stage.addEventListener('stagemouseup',function(event){
    pointTxt.isVisible();
    stage.update();
    event.target.removeAllEventListeners();
  });
};

  function dw(ax,ay,bx,by){
  line.graphics.clear();
  line.graphics.setStrokeStyle(4).setStrokeDash([0,0],0).beginStroke('black').moveTo(10,300).bezierCurveTo(ax,ay,bx,by,630,300);
  stage.update();
  };

  function dpA(px,py){
    pointA.graphics.clear();
    path.graphics.clear();
  path.graphics.setStrokeStyle(1).beginStroke('red').setStrokeDash([3,3],0).moveTo(10,300).lineTo(px,py).lineTo(630,300);
    pointA.graphics.beginFill('red').drawCircle(px,py,15);
    stage.update();
  }

  function dpt(px,py){
    pointTxt.text = 'x:' + px + ' y:' + py;
    pointTxt.font = '16px Arial';
    pointTxt.color = 'black';
    pointTxt.x = px;
    pointTxt.y = py;
    pointTxt.textAlign = 'center';
    stage.update();
  };

  (function notic(){
    txt.text = '点击红点，拖拽绘制成曲线';
    txt.font = '32px arial';
    txt.textAlign = 'center';
    txt.x = stage.canvas.width / 2;
    txt.y = stage.canvas.height / 2;
    stage.update();
  })();
