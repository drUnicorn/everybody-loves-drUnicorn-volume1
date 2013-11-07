(function(){
var script = doc.currentScript;

var
 n       = parseInt(script.getAttr("data-n")),
 angle1  = parseInt(script.getAttr("data-a2")),
 steps   = parseInt(script.getAttr("data-steps")),
 i       = n,
 pos     = [],
 angle   = [];

window.time = parseInt(script.getAttr("data-time"));

while(i--){
 pos[i] = [
  parseInt(script.getAttr("data-x-"+(i+1))),
  parseInt(script.getAttr("data-y-"+(i+1)))
 ];
 angle[i] = parseInt(script.getAttr("data-start-angle-"+(i+1)));
}

i = undefined;

console.log(n, pos, angle);
return;

var style = doc.mkNode("link");
style.setAttr("rel","stylesheet");
style.setAttr("href","./modules/intel/langton.css");
doc.head.addChild(style);

//Vytvoří nové CellNodes
var blk = new CellNode("black");
var ant = new CellNode("blurbsky-vesmirny-kriznik");

var tmp, i=0;

ant.xy.place(x,y); //Umístí mravence na výchozí souřadnice

var f = function(){
 //Pokud existuje buňka v daném směru
 if(tmp=ant.cells[0].dir(angle)){
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
  
  try{[x,y] = tmp;}
  catch(e){x = tmp[0]; y = tmp[1];} //ECMA sucks
  
  if(blk.cells.indexOf(World.xy(x,y))+1){
   //Zatoč na černé
   angle+=angle2;
  }else{
   //Zatoč na bílé
   angle+=angle1;
  }
  setTimeout(f,time); //Spustí funkci znovu za daný čas
 }
 
 angle%=6; //Zabrání zaokrouhlování (integer => float)
}

setTimeout(f,time); //Spustí funkci za daný čas

})();
