//Shortands for global variables
window.win = window;
window.doc = win.document;
window.on  = win.addEventListener;


//Shortand for doc.createElement and doc.createElementNS
doc.mkNode = function(n1,n2,n3){
 if(!n2||typeof n2 != "string"){
  return document.createElement(n1);
 }else{
  return document.createElementNS(n1,n2);
 }
}


//Modify the DOM elements
Element.prototype.rm        = Element.prototype.remove;

Element.prototype.attr      = {};
Element.prototype.attr.set  = Element.prototype.setAttribute;
Element.prototype.attr.get  = Element.prototype.getAttribute;
Element.prototype.attr.has  = Element.prototype.hasAttribute;
Element.prototype.attr.add  = function(n){this.setAttr(n,"");};
Element.prototype.attr.rm   = Element.prototype.removeAttribute;

Element.prototype.on        = Element.prototype.addEventListener;
Element.prototype.on.rm     = Element.prototype.removeEventListener;

Element.prototype.child     = {};
Element.prototype.child.add = Element.prototype.appendChild;
Element.prototype.child.rm  = Element.prototype.removeChild;
Element.prototype.child.mk  = function(ns,tag,attrs){
 //Combination of doc.createElement and node.appendChild
 var n = doc.mkNode(ns,tag,attrs);
 this.addChild(n);
 return n;
};

Element.prototype.class     = {};
Element.prototype.class.has = function(str){
 var attr = this.attr.get('class');
 try{
  attr = attr.split(' ');
  if(attr.indexOf(str)+1){
   return true;
  }
 }catch(e){}
 return false;
};
Element.prototype.class.add = function(str){
 var attr = this.attr.get('class');
 try{
  attr = attr.split(' ');
  if(attr.indexOf(str)+1){
   return str;
  }else{
   attr[attr.length] = str;
   attr = attr.join(' ');
   this.attr.set('class',attr);
   return str;
  }
 }catch(e){
  this.attr.set('class',str);
  return str;
 }
};
Element.prototype.class.rm = function(str){
 var attr = this.attr.get('class');
 try{
  var i;
  attr = attr.split(' ');
  if((i=attr.indexOf(str))+1){
   attr.splice(i,1);
   attr = attr.join(' ');
   this.attr.set('class',attr);
  }
 }catch(e){}
 return str;
};
Element.prototype.class.set = function(str){
 try{
  str = str.join(' ');
 }catch(e){}
 this.attr.set('class',str);
};
Element.prototype.class.get = function(){
 var attr = this.attr.get('class');
 try{
  return attr.split(' ');
 }catch(e){
  return [];
 }
};
Elements.prototype.class.splice = function(){
 var attr = this.class.get();
 var result = attr.splice.apply(attr,arguments);
 this.class.set(attr);
 return result;
}
