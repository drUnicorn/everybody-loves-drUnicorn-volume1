(function(){

  var x     = parseInt(doc.currentScript.getAttr("data-x"));
  var y     = parseInt(doc.currentScript.getAttr("data-y"));
  var smer  = parseInt(doc.currentScript.getAttr("data-start-smer"));
  win.karel = {}
  
  var style = doc.mkNode("link");
  style.setAttr("rel","stylesheet");
  style.setAttr("href","./modules/intel/karel.css");
  doc.head.addChild(style);
  
  var blk = new CellNode("black");
  var krl = new CellNode("karel");
  
  krl.xy.place(x,y);
  
  win.karel.krok = function(){
    if(tmp=krl.cells[0].dir(smer)){
      tmp=tmp.xy();
      krl.remove(); 
      krl.xy.place(tmp[0],tmp[1]);
    }
    else {
      alert("Narazil jsem! Au!")
    }
  }  
  win.karel.vlevo_vbok = function(){
    smer --        
  }
  
  win.karel.poloz = function(){
    if(blk.cells.indexOf(World.xy(x,y))+1){
      alert("Není kam položit!");
    }else{
      blk.xy.place(x,y);
    }        
  }
  
  win.karel.zvedni = function(){
    if(blk.cells.indexOf(World.xy(x,y))+1){
      blk.remove(x,y);
    }else{
      alert("Není co zvednout!")
    }
  } 
  
  smer%=6
  
})()