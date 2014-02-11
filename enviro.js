(function(){

//Shortands for global variables
window.win  = window;
window.doc  = win.document;
window.on   = win.addEventListener;
window.rmon = win.removeEventListener;


//Shortand for doc.createElement and doc.createElementNS
doc.mkNode = function(n1,n2,n3){
 var node, attrs;
 if(typeof n2 == "string"){
  node = document.createElementNS(n1,n2);
  if(typeof n3 == "object"){
   attrs=n3;
  }
 }else{
  node = document.createElement(n1);
  if(typeof n2 == "object"){
   attrs=n2;
  }
 }
 if(attrs){
  for(attr in attrs){
   n.setAttribute(attr,attrs[attr]);
  }
 }
 return node;
}

//Document shortands
doc.on   = doc.addEventListener;
doc.rmon = doc.removeEventListener;

doc.query = doc.querySelector;
doc.query.all = function(){return doc.querySelectorAll.apply(doc,arguments);};

doc.exe = function(path){
 return doc.body.mkChild("script",{"src":path});
};

//Modify the DOM elements
Element.prototype.rm       = Element.prototype.remove;
Element.prototype.clear    = function(){this.textContent="";};

Element.prototype.setAttr  = Element.prototype.setAttribute;
Element.prototype.getAttr  = Element.prototype.getAttribute;
Element.prototype.hasAttr  = Element.prototype.hasAttribute;
Element.prototype.addAttr  = function(n){this.setAttr(n,"");};
Element.prototype.rmAttr   = Element.prototype.removeAttribute;

Element.prototype.on       = Element.prototype.addEventListener;
Element.prototype.rmon     = Element.prototype.removeEventListener;

Element.prototype.addChild = Element.prototype.appendChild;
Element.prototype.rmChild  = Element.prototype.removeChild;
Element.prototype.mkChild  = function(ns,tag,attrs){
 //Combination of doc.createElement and node.appendChild
 var n = doc.mkNode(ns,tag,attrs);
 this.addChild(n);
 return n;
};

HTMLElement.prototype.addTxt = function(str){
 //this.textContent += str without loosing child elements
 if(!this.lastChild){
  this.textContent = str;
 }else if(this.lastChild instanceof Text){
  this.lastChild.textContent += str;
 }else{
  this.addChild(doc.createTextNode(str));
 }
 return this.textContent;
}


Element.prototype.hasClass = function(str){
 var attr = this.attr.get('class');
 try{
  attr = attr.split(' ');
  if(attr.indexOf(str)+1){
   return true;
  }
 }catch(e){}
 return false;
};
Element.prototype.addClass = function(str){
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
Element.prototype.rmClass = function(str){
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
Element.prototype.setClass = function(str){
 try{
  str = str.join(' ');
 }catch(e){}
 this.attr.set('class',str);
};
Element.prototype.getClass = function(){
 var attr = this.attr.get('class');
 try{
  return attr.split(' ');
 }catch(e){
  return [];
 }
};
Element.prototype.spliceClass = function(){
 var attr = this.getClass();
 var result = attr.splice.apply(attr,arguments);
 this.setClass(attr);
 return result;
}


//The rest
win.wait = function(t,f){return setTimeout(f,t*1000);};

})();
