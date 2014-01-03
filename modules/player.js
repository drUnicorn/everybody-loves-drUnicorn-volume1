(function(){

var x = parseInt(doc.currentScript.getAttr("data-x"));
var y = parseInt(doc.currentScript.getAttr("data-y"));

var style = doc.mkNode("link");
style.setAttr("rel","stylesheet");
style.setAttr("href","./modules/player.css");
doc.head.addChild(style);

var player = new SingleCellNode("player");
player.xy.place(x,y);

key.on("down","num7",function(){player.dir(0);});
key.on("down","num9",function(){player.dir(1);});
key.on("down","num6",function(){player.dir(2);});
key.on("down","num3",function(){player.dir(3);});
key.on("down","num1",function(){player.dir(4);});
key.on("down","num4",function(){player.dir(5);});

})();
