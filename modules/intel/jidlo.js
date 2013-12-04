(function(){

var x = parseInt(doc.currentScript.getAttr("data-x"));
var y = parseInt(doc.currentScript.getAttr("data-y"));
var s = parseInt(doc.currentScript.getAttr("data-strength"));

var style = doc.mkNode("link");
style.setAttr("rel","stylesheet");
style.setAttr("href","./modules/intel/jidlo.css");
doc.head.addChild(style);

var jidlo = new SingleCellNode("jidlo");
var i=0, l=0, d=6, dir = [], tmp;

jidlo.xy.place(x,y);

while(d-->0){
 dir[d]=jidlo.cell;
}

while(i++<s){
 d=6;
 while(d-->0){
  dir[d] = dir[d].dir(d);
  (new SingleCellNode("smrad",s-i+1)).xy.place(dir[d].xy()[0],dir[d].xy()[1]);
  l=i;
  tmp=dir[d];
  while(--l>0){
   tmp = tmp.dir(d+2);
   (new SingleCellNode("smrad",s-i+1)).xy.place(tmp.xy()[0],tmp.xy()[1]);
  }
 }
}

})();
