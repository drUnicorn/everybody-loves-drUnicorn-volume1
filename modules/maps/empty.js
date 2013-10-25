(function(){


var width  = parseInt(doc.currentScript.getAttr("data-width" ));
var height = parseInt(doc.currentScript.getAttr("data-height"));

    win.on("load",function(){
     var i = -1, j = -1, row;
     while(i++<height){
      row = doc.body.mkChild("","row");
      j = 0;
      while(j++<width){
       row.addChild(
        (new Node(j,i)).domNode
       );
      }
     }
    });

})();
