//http://www.redblobgames.com/grids/hexagons/
win.World = {
 "map": [],
 "xy": function(x,y){
  if(map[x,y]){
   return map[x,y];
  }else{
   return false;
  }
 },
 "qr": function(q,r){
  y = q+Math.ceil(r/2);
  if(map[r,y]){
   return map[r,y];
  }else{
   return false;
  }
 }
};
win.Node = function(x,y){
 if(!this instanceof Node){return new Node(x,y);}
 this.domNode = doc.mkNode("","cell");
 this.domNode.mapNode = this;
 var coord = [x,y];
 
 this.xy = function(x,y){ //Even row system
  if(typeof x == "undefined" && typeof y == "undefined"){
   return [coord[0], coord[1]];
  }else{
   World.map[coord[0], coord[1]] = undefined;
   if(!World.map[x]){World.map[x]=[];}
   World.map[x,y] = this;
   coord = [x,y];
  }
 }
 
 this.qr = function(q,r){ //Axial system
  if(typeof q == "undefined" && typeof r == "undefined"){
   return [coord[1] - Math.floor(coord[0]/2), coord[0]];
  }else{
   var y = q+Math.ceil(r/2);
   World.map[coord[0], coord[1]] = undefined;
   if(!World.map[r]){World.map[r]=[];}
   World.map[r,y] = this;
   coord = [r,y];
  }
 }
 
 this.on = this.domNode.addEventListener;
 this.xy(x,y);
}
