(function(){

var x       = parseInt(doc.currentScript.getAttr("data-x"));
var y       = parseInt(doc.currentScript.getAttr("data-y"));
var angle   = parseInt(doc.currentScript.getAttr("data-start-angle"));
var steps   = parseInt(doc.currentScript.getAttr("data-steps"));
var angle1  = parseInt(doc.currentScript.getAttr("data-a1"));
var angle2  = parseInt(doc.currentScript.getAttr("data-a2"));
window.time = parseInt(doc.currentScript.getAttr("data-time"));
var name    = doc.currentScript.getAttr("data-name");
window.sn   = 0; //Number of steps

if(isNaN(angle)){angle=0;}
if(isNaN(time)){time=1000;}
if(isNaN(steps)){steps=-1;}
if(name ==undefined){name="m1";}

var style = doc.mkNode("link");
style.setAttr("rel","stylesheet");
style.setAttr("href","./modules/intel/langton.css");
doc.head.addChild(style);

//Vytvoří nové CellNodes
var blk = new CellNode("black");
var ant = new SingleCellNode(name);

var tmp, i=0;

ant.xy.place(x,y); //Umístí mravence na výchozí souřadnice

var f = function(){
 sn++;
 //Pokud existuje buňka v daném směru
 if(tmp=ant.cell.dir(angle)){
  tmp=tmp.xy(); //Získej souřadnice dané buňky
  ant.remove(); //Odstraň mravence ze současné pozice
  ant.xy.place(tmp[0],tmp[1]); //Přidej mravence na nové souřadnice
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   //Pokud je na černé, odeber černou
   blk.remove(x,y);
  }else{
   //Pokud ne, přidej černou
   blk.xy.place(x,y);
  }
  
  //[x,y] = tmp;
  x = tmp[0]; y = tmp[1]; //ECMA sucks
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   //Zatoč na černé
   angle+=angle2;
  }else{
   //Zatoč na bílé
   angle+=angle1;
  }
  
  if(sn!=steps){ //Pokud nebyl proveden zadaný počet kroků
   setTimeout(f,time); //Spustí funkci znovu za daný čas
  }
 }
 
 angle%=6; //Zabrání "přetečení" (integer => float)
}

setTimeout(f,time); //Spustí funkci za daný čas

})();
