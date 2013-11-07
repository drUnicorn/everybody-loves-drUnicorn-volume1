(function(){

var angle = [];
var x       = parseInt(doc.currentScript.getAttr("data-x"));
var y       = parseInt(doc.currentScript.getAttr("data-y"));
angle[0]    = parseInt(doc.currentScript.getAttr("data-start-angle"));
angle[1] = angle[0];
var steps   = parseInt(doc.currentScript.getAttr("data-steps"));
var angle1  = parseInt(doc.currentScript.getAttr("data-a1"));
var angle2  = parseInt(doc.currentScript.getAttr("data-a2"));
window.time = parseInt(doc.currentScript.getAttr("data-time"));

var style = doc.mkNode("link");
style.setAttr("rel","stylesheet");
style.setAttr("href","./modules/intel/langton.css");
doc.head.addChild(style);

//Vytvoří nové CellNodes
var blk = new CellNode("black");
var ant = new CellNode("blurbsky-vesmirny-kriznik");
var tmp, i=0;

ant.xy.place(x,y); //Umístí mravence na výchozí souřadnice
ant.xy.place(x+1,y+1); //Mravenec č. 2

var f = function(n){
 //Pokud existuje buňka v daném směru
 if(tmp=ant.cells[n].dir(angle[n])){
  tmp=tmp.xy(); //Získej souřadnice dané buňky
  ant.remove( //Odstraň mravence ze současné pozice
   ant.cells[n].xy()[0],
   ant.cells[n].xy()[1]
  );
  ant.xy.place(tmp[0],tmp[1]); //Přidej mravence na nové souřadnice
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   //Pokud je na černé, odeber černou
   blk.remove(x,y);
  }else{
   //Pokud ne, přidej černou
   blk.xy.place(x,y);
  }
  
  try{[x,y] = tmp;}
  catch(e){x = tmp[0]; y = tmp[1];} //ECMA sucks
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   //Zatoč na černé
   angle[n]+=angle2;
  }else{
   //Zatoč na bílé
   angle[n]+=angle1;
  }
  setTimeout(f,time,n); //Spustí funkci znovu za daný čas
 }
 
 angle[n]%=6; //Zabrání zaokrouhlování (integer => float)
}

setTimeout(function(){f(0);},time);
setTimeout(function(){f(1);},time);

})();
