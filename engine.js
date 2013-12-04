//http://www.redblobgames.com/grids/hexagons/
(function(){
 win.World = {
  "map": [],
  "xy": function(x,y){
   try{
    return this.map[x][y];
   }catch(e){
    return false;
   }
  },
  "qr": function(q,r){
   try{
    return this.map[r][q+Math.ceil(r/2)];
   }catch(e){
    return false;
   }
  }
 };
 
 win.Cell = function(x,y){
  if(!this instanceof win.Cell){return new win.Cell(x,y);}
  this.domNode = doc.mkNode("","cell"); //document.createElementNS("cell","")
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
    return [x,y];
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
   return [q,r];
  };
  
  this.dir = function(a){
   switch((Math.round(a)%6+6)%6){
    //Vrátí buňku v daném směru
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
  this.on   = this.domNode.on;
  this.rmon = this.domNode.rmon;
  this.xy(x,y);
 };
 
 win.CellNode = function(name, value){
  if(!this instanceof win.CellNode){return new win.CellNode(x,y);}
  var self = this;
  this.nodeName = name;
  this.cells = [];
  this.defaultValue = value;
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
  this.xy.place = function(x,y,value){
   n = World.xy(x,y);
   if(!n){return false;}
   i = self.cells.indexOf(n);
   if( !(i+1) ){
    self.cells[self.cells.length] = n;
    if(value||this.defaultValue){
     n.domNode.setAttr("data-cellnode-"+self.nodeName);
    }else{
     n.domNode.addAttr("data-cellnode-"+self.nodeName);
    }
   }
  }
 };

 win.SingleCellNode = function(name, value){
  if(!this instanceof win.CellNode){return new win.CellNode(x,y);}
  var self = this;
  this.nodeName = name;
  this.cell = false;
  this.defaultValue = value;
  this.remove = function(){
   self.cell.domNode.rmAttr("data-cellnode-"+self.nodeName);
   self.cell = false;
  };
  this.xy = {};
  this.qr = {};
  this.xy.place = function(x,y,value){
   n = World.xy(x,y);
   if(!n){return false;}
   if(self.cell != n){
    self.cell = n;
    if(value||self.defaultValue){
     if(value){
      self.defaultValue = value;
     }
     n.domNode.setAttr("data-cellnode-"+self.nodeName,self.defaultValue);
    }else{
     n.domNode.addAttr("data-cellnode-"+self.nodeName);
    }
   }
  };
  this.set = function(value){
   self.defaultValue = value;
   if(self.cell){
    self.cell.domNode.setAttr("data-cellnode-"+self.nodeName,self.defaultValue);
   }
  };
  this.rename = function(name){
   if(self.cell){
    self.cell.domNode.rmAttr("data-cellnode-"+self.nodeName);
    if(self.defaultValue){
     self.cell.domNode.setAttr("data-cellnode-"+name,self.defaultValue);
    }else{
     self.cell.domNode.addAttr("data-cellnode-"+name);
    }
   }
   this.nodeName = name;
  };
 };
})();
