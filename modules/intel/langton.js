(function(){

var x = parseInt(doc.currentScript.getAttr("data-x"));
var y = parseInt(doc.currentScript.getAttr("data-y"));
var a = parseInt(doc.currentScript.getAttr("data-a"));
var s = parseInt(doc.currentScript.getAttr("data-s"));

var style = doc.mkNode("link");
style.setAttr("rel","stylesheet");
style.setAttr("href","./modules/intel/langton.css");
doc.head.addChild(style);

var blk = new CellNode("black");
var ant = new CellNode("blurbsky-vesmirny-kriznik");
var tmp, i=0;
ant.xy.place(x,y);

while(i++<s){
 if(tmp=ant.cells[0].dir(a)){
  tmp=tmp.xy();
  ant.remove();
  ant.xy.place(tmp[0],tmp[1]);
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   blk.remove(x,y);
  }else{
   blk.xy.place(x,y);
  }
  
  [x,y] = tmp;
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   a++;
  }else{
   a--;
  }
 }else{
  break;
 }
 
 a%=6; //Zabrání zaokrouhlování (integer => float)
}

})();
