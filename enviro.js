//Redefine global vars
window.win = window;
window.doc = window.document;

//Some other stuff
doc.mkNode = function(n1,n2,n3){
 if(!n2||typeof n2 != "string"){
  return document.createElement(n1);
 }else{
  return document.createElementNS(n1,n2);
 }
}

win.on = win.addEventListener;


//Modify the DOM elements
Element.prototype.rm       = Element.prototype.remove;

Element.prototype.setAttr  = Element.prototype.setAttribute;
Element.prototype.getAttr  = Element.prototype.getAttribute;
Element.prototype.hasAttr  = Element.prototype.hasAttribute;
Element.prototype.addAttr  = function(n){this.setAttr(n,"");};

Element.prototype.on       = Element.prototype.addEventListener;
Element.prototype.rmon     = Element.prototype.removeEventListener;

Element.prototype.addChild = Element.prototype.appendChild;
Element.prototype.rmChild  = Element.prototype.removeChild;
Element.prototype.mkChild  = function(ns,tag,attrs){
 var n = doc.mkNode(ns,tag,attrs);
 this.addChild(n);
 return n;
};
