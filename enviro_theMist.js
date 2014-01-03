/* Modify teh enviro */
win = window;
win.doc = document;
doc.mkNode = function(tag, ns, attrs) {
 var n;
 if(ns && typeof ns == "string") {
  n = doc.createElementNS(tag,ns);
 } else {
  if(ns){attrs = ns;}
  n = doc.createElement(tag);
 }
 if(attrs){
  for(attr in attrs){
   n.setAttribute(attr,attrs[attr]);
  }
 }
 return n;
}
win.on = win.addEventListener;
doc.on = doc.addEventListener;
win.rmon = win.removeEventListener;
doc.rmon = doc.removeEventListener;
HTMLElement.prototype.rm       = HTMLElement.prototype.remove;
HTMLElement.prototype.on       = HTMLElement.prototype.addEventListener;
HTMLElement.prototype.rmon     = HTMLElement.prototype.removeEventListener;
HTMLElement.prototype.setAttr  = HTMLElement.prototype.setAttribute;
HTMLElement.prototype.getAttr  = HTMLElement.prototype.getAttribute;
HTMLElement.prototype.hasAttr  = HTMLElement.prototype.hasAttribute;
HTMLElement.prototype.addAttr  = function(n){this.setAttr(n,"");};
HTMLElement.prototype.rmAttr   = HTMLElement.prototype.removeAttribute;
HTMLElement.prototype.addChild = HTMLElement.prototype.appendChild;
HTMLElement.prototype.rmChild  = HTMLElement.prototype.removeChild;
HTMLElement.prototype.mkChild  = function(tag,ns,attrs){
 var n = doc.mkNode(tag,ns,attrs);
 this.addChild(n);
 return n;
}
HTMLElement.prototype.clean = function(){
 this.textContent = "";
}
HTMLElement.prototype.parent = function(){
 if(this.parentNode){return this.parentNode;}
 else{return doc;}
}
HTMLElement.prototype.txt = function(str){
 if(str!==undefined){
  this.textContent = str;
 }
 return this.textContent;
}
HTMLElement.prototype.addTxt = function(str){
 if(!this.lastChild){
  this.textContent = str;
 }else if(this.lastChild instanceof Text){
  this.lastChild.textContent += str;
 }else{
  this.addChild(doc.createTextNode(str));
 }
 return this.textContent;
}
HTMLElement.prototype.reqFS = function(){
 doc.FSNode = this;
 this.on("fullscreenchange",/**/function(){}/*TODO*/);
 this.on("mozfullscreenchange",/**/function(){}/*TODO*/);
 this.on("webkitfullscreenchange",/**/function(){}/*TODO*/);
 if(doc.fullScreen||doc.mozfullScreen||doc.webkitIsFullScreen){return true;}
 
 if(this.requestFullScreen){this.requestFullScreen();}
 else if(this.mozRequestFullScreen){this.mozRequestFullScreen();}
 else if(this.webkitRequestFullScreen){this.webkitRequestFullScreen();}
 
 if(doc.fullScreen||doc.mozfullScreen||doc.webkitIsFullScreen){return true;}else{return false;}
}
doc.endFS = function(){
 doc.FSNode.unlisten("fullscreenchange",/**/function(){}/*TODO*/);
 doc.FSNode.unlisten("mozfullscreenchange",/**/function(){}/*TODO*/);
 doc.FSNode.unlisten("webkitfullscreenchange",/**/function(){}/*TODO*/);
 doc.FSNode = {};
 if(!(doc.fullScreen||doc.mozfullScreen||doc.webkitIsFullScreen)){return true;}
 
 if(this.cancelFullScreen){this.cancelFullScreen();}
 else if(this.mozCancelFullScreen){this.mozCancelFullScreen();}
 else if(this.webkitCancelFullScreen){this.webkitCancelFullScreen();}
}
if(!doc.body){doc.body=doc.getElementsByTagName("body")[0];}
if(!doc.head){doc.head=doc.getElementsByTagName("head")[0];}

doc.exe = function(path){
 return doc.body.mkChild("script",'',{"src":path});
};

win.wait = function(t,f){return setTimeout(f,t*1000);};
win.$ = function(s) {
 switch(s[0]){
  default:
   return doc.getElementsByTagName(s);
   break;
  case ".":
   return doc.getElementsByClassName(s.substr(1));
   break;
  case "#":
   return doc.getElementById(s.substr(1));
   break;
 }
};

//TODO missing: addClass, rmClass
