(function(){

  var x     = parseInt(doc.currentScript.getAttr("data-x"));
  var y     = parseInt(doc.currentScript.getAttr("data-y"));
  var smer  = parseInt(doc.currentScript.getAttr("data-start-smer"));
  win.karel = {}
 
  var style = doc.mkNode("link");
  style.setAttr("rel","stylesheet");
  style.setAttr("href","./modules/intel/karel.css");
  doc.head.addChild(style);
 
  var red = new CellNode("red");
  var blk = new CellNode("black");
  var krl = new CellNode("karel");
 
  krl.xy.place(x,y);

  win.karel.krok = function(){
      if(tmp=krl.cells[0].dir(smer)){
        tmp=tmp.xy();
        krl.remove(); 
        krl.xy.place(tmp[0],tmp[1]);
      }else{
        alert("Narazil jsem! Au!");
      }
    }  
  
  win.karel.vlevo_vbok = function(){
    smer--;       
  }
  
  win.karel.poloz = function(){
    xy = krl.cells[0].xy();
    if(blk.cells.indexOf(World.xy(xy[0],xy[1]))+1){
      alert("Není kam položit!");
    }else{
      blk.xy.place(xy[0],xy[1]);
    }        
  }
  
  win.karel.zvedni = function(){
    xy = krl.cells[0].xy();
    if(blk.cells.indexOf(World.xy(xy[0],xy[1]))+1){
      blk.remove(xy[0],xy[1]);
    }else{
      alert("Není co zvednout!");
    }
  } 
  
  smer%=6;
  
  cells = doc.getElementsByTagName("cell");
  i = cells.length;
  element = cells
  while(i-->0)  {
    cells[i].on("click",function(e){                     
      cell = e.target.mapNode;
      if(red.cells.indexOf(World.xy(cell.xy()[0],cell.xy()[1]))+1){
        red.remove(cell.xy()[0],cell.xy()[1]);
      }else{
        red.xy.place(cell.xy()[0],cell.xy()[1]);
      }
    });
  }
})();