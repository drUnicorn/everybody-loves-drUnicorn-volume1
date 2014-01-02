(function(){

var x = parseInt(doc.currentScript.getAttr("data-x"));
var y = parseInt(doc.currentScript.getAttr("data-y"));

var style = doc.mkNode("link");
style.setAttr("rel","stylesheet");
style.setAttr("href","./modules/player.css");
doc.head.addChild(style);

var player = new SingleCellNode("player");

})();
