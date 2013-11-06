//http://www.redblobgames.com/grids/hexagons/
(function(){
 win.World = {
  "map": [],
  "xy": function(x,y){
   if(!World.map[x]){return false;}
   if(this.map[x][y]){
    return this.map[x][y];
   }else{
    return false;
   }
  },
  "qr": function(q,r){
   if(!World.map[r]){return false;}
   y = q+Math.ceil(r/2);
   if(this.map[r][y]){
    return this.map[r][y];
   }else{
    return false;
   }
  }
 };
 win.Cell = function(x,y){
  if(!this instanceof win.Cell){return new win.Cell(x,y);}
  this.domNode = doc.mkNode("","cell");
  this.domNode.mapNode = this;
  var coord = [x,y];
  
  this.xy = function(x,y){ //Even row system
   if(x === undefined && y === undefined){
    return [coord[0], coord[1]];
   }else{
    if(World.map[coord[0]]){
     if(World.map[coord[0]][coord[1]]){
      World.map[coord[0]][coord[1]] = undefined;
     }
    }
    if(!World.map[x]){World.map[x]=[];}
    World.map[x][y] = this;
    coord = [x,y];
   };
  };
  
  this.qr = function(q,r){ //Axial system
   if(q === undefined && r === undefined){
    return [coord[1] - Math.floor(coord[0]/2), coord[0]];
   }else{
    var y = q+Math.ceil(r/2);
    World.map[coord[0], coord[1]] = undefined;
    if(!World.map[r]){World.map[r]=[];}
    World.map[r][y] = this;
    coord = [r][y];
   };
  };
  
  this.dir = function(a){
   switch(Math.round((a%6+6)%6)){
    case 0:
     if(coord[1]%2){
      return World.xy(coord[0],coord[1]-1);
     }else{
      return World.xy(coord[0]-1,coord[1]-1);
     }
     break;
    case 1:
     if(coord[1]%2){
      return World.xy(coord[0]+1,coord[1]-1);
     }else{
      return World.xy(coord[0],coord[1]-1);
     }
     break;
    case 2:
     return World.xy(coord[0]+1,coord[1]);
     break;
    case 3:
     if(coord[1]%2){
      return World.xy(coord[0]+1,coord[1]+1);
     }else{
      return World.xy(coord[0],coord[1]+1);
     }
     break;
    case 4:
     if(coord[1]%2){
      return World.xy(coord[0],coord[1]+1);
     }else{
      return World.xy(coord[0]-1,coord[1]+1);
     }
     break;
    case 5:
     return World.xy(coord[0]-1,coord[1]);
     break;
    default:
     return false;
     break;
   };
  };
  
  this.elements = [];
  this.on = this.domNode.addEventListener;
  this.xy(x,y);
 };
 
 win.CellNode = function(name){
  if(!this instanceof win.CellNode){return new win.CellNode(x,y);}
  var self = this;
  this.nodeName = name;
  this.cells = [];
  this.remove = function(x,y){
   if(typeof(x) == "number" && typeof(y) == "number"){
    i = self.cells.indexOf(World.xy(x,y));
    if(i+1){
     self.cells[i].domNode.rmAttr("data-cellnode-"+self.nodeName);
     self.cells.splice(i,1);
    }
   }else if(x === undefined && y === undefined){
    i=0;
    while(i<self.cells.length){
     self.cells[i].domNode.rmAttr("data-cellnode-"+self.nodeName);
     i++;
    }
    self.cells = [];
   }
  };
  this.xy = {};
  this.qr = {};
  this.xy.place = function(x,y){
   n = World.xy(x,y);
   if(!n){return false;}
   i = self.cells.indexOf(n);
   if( !(i+1) ){
    self.cells[self.cells.length] = n;
    n.domNode.addAttr("data-cellnode-"+self.nodeName);
   }
  }
 };
})();
