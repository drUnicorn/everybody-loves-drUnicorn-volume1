(function(){

var width  = parseInt(doc.currentScript.getAttr("data-width" ));
var height = parseInt(doc.currentScript.getAttr("data-height"));

var i = -1, j = -1, row;
while(i++<height-1){
 row = doc.body.mkChild("","row");
 j = -1;
 while(j++<width-1){
  row.addChild(
   (new Cell(j,i)).domNode
  );
 }
}

World.zoom(0.5);

})();
