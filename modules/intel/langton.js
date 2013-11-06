(function(){

var x       = parseInt(doc.currentScript.getAttr("data-x"));
var y       = parseInt(doc.currentScript.getAttr("data-y"));
var angle   = parseInt(doc.currentScript.getAttr("data-start-angle"));
var steps   = parseInt(doc.currentScript.getAttr("data-steps"));
var angle1  = parseInt(doc.currentScript.getAttr("data-a1"));
var angle2  = parseInt(doc.currentScript.getAttr("data-a2"));
window.time = parseInt(doc.currentScript.getAttr("data-time"));

var style = doc.mkNode("link");
style.setAttr("rel","stylesheet");
style.setAttr("href","./modules/intel/langton.css");
doc.head.addChild(style);

var blk = new CellNode("black");
var ant = new CellNode("blurbsky-vesmirny-kriznik");
var tmp, i=0;
ant.xy.place(x,y);

var f = function(){
 if(tmp=ant.cells[0].dir(angle)){
  tmp=tmp.xy();
  ant.remove();
  ant.xy.place(tmp[0],tmp[1]);
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   blk.remove(x,y);
  }else{
   blk.xy.place(x,y);
  }
  
  try{[x,y] = tmp;}
  catch(e){x = tmp[0]; y = tmp[1];}//ECMA sucks
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   angle+=angle1;
  }else{
   angle+=angle2;
  }
  setTimeout(f,time);
 }
 
 angle%=6; //Zabrání zaokrouhlování (integer => float)
}

setTimeout(f,time);

})();
