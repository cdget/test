var x;
var y;

function createBoard(){
  $("body").append("<table></table>");
  for (var r=0; r<8; r++) {
  var col = "";
  for (var c=0; c<8; c++) { 
    col += "<td id='c"+r+""+c+"'><div draggable='true'></div></td>"; 
  }
  $("table").append("<tr>"+col+"</tr>");
  addDragEvents();  
}

  $("#c"+x+""+y).addClass('fromCell');
}

function resetMoveVariants(){
  $(".variants").removeClass("variants");
}

function setHorseCoordinates(xn,yn){
  x = xn; y = yn;
}

function setHorsePlace(x,y){
  var xn=Math.floor(x/80);
  var yn=Math.floor(y/80);
  if($("#c"+xn+""+yn).hasClass("variants")){
    $(".fromCell").removeClass('fromCell');
    $("#c"+0+""+1).addClass('fromCell');
    setHorseCoordinates(xn,yn);
    addDragEvents();
  }
  else{
    $(".fromCell").removeClass('fromCell');
    $("#c"+this.x+""+this.y).addClass('fromCell');
    addDragEvents();
  }
  resetMoveVariants();
}

function addDragEvents(){
  $('.fromCell div').pep({
    initiate: function(ev, obj){
      drawMovementsVariants();
    },
    stop: function(ev, obj){
      setHorsePlace(obj.ev.y,obj.ev.x);
    }
  });
}

function getAllMovesAllowed(x,y){
  return [
		[x+2, y+1],
		[x+2, y-1],
		[x+1, y+2],
		[x-1, y+2],
		[x+1, y-2],
		[x-1, y-2],
		[x-2, y-1],
		[x-2, y+1]
	].filter(function(item){
    return (item[0] > -1 && item[0] < 8 && item[1] > -1 && item[1] < 8);
  });
}

function drawMovementsVariants(){
  var movements = getAllMovesAllowed(x,y);
  for(var i=0;i<movements.length;i++){
    $("#c"+movements[i][0]+""+movements[i][1]).addClass("variants");
  }
}

setHorseCoordinates(0,1);
createBoard();
addDragEvents();