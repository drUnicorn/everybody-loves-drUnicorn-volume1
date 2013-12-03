win.on("load",function(){

var thisScript = doc.query("script[src$\"=empty.js\"]");

var width  = parseInt(thisScript.attr.get("data-width" ));
var height = parseInt(thisScript.attr.get("data-height"));

var i = -1, j = -1, row;
while(i++<height-1){
 row = doc.body.child.mk("","row");
 j = -1;
 while(j++<width-1){
  row.child.add(
   (new Cell(j,i)).domNode
  );
 }
}

console.log("Fünisched");
});
