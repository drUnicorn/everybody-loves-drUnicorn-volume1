/* Init engine */
win.engine = {};
engine.canvas = doc.body.mkChild("div","",{"id":"canvas"});

doc.head.mkChild("link","",{
 "rel":"stylesheet",
 "href":"./data/style/basic.css"
});

engine.canvas.menu = {};
win.menu = engine.canvas.menu;

engine.story = {};
win.story = engine.story;

engine.devmode = false;

wait.nd = function(t,f){
 if(!engine.devmode){wait(t,f);}
 else{wait(0,f);}
};

engine.key = {};
win.key = engine.key;
key.press = {};
key.map = [];
key.map[8]  = "back";
key.map[9]  = "tab";
key.map[13] = "enter";
key.map[16] = "shift";
key.map[17] = "ctrl";
key.map[18] = "alt";
key.map[20] = "caps";
key.map[27] = "esc";
key.map[32] = "space";
key.map[33] = "pgup";
key.map[34] = "pgdn";
key.map[35] = "end";
key.map[36] = "home";
key.map[37] = "left";
key.map[38] = "up";
key.map[39] = "right";
key.map[40] = "down";
key.map[45] = "ins";
key.map[46] = "del";
key.map[91] = "meta";
key.map[93] = "opts";
key.map[144]= "num";
key.map[255]= "altgr";

doc.on("keydown",function(e){
 if(key.map[e.keyCode]){e.keyAlias = key.map[e.keyCode];}
 if(!key.press[e.keyCode]){
  if(key.events.down[e.keyCode]){
   var i = key.events.down[e.keyCode].length;
   while(i--){
    if(typeof key.events.down[e.keyCode][i] == "function"){
     key.events.down[e.keyCode][i](e);
    }
   }
  }
 }
 key.press[e.keyCode] = true;
 key.press[key.map[e.keyCode]] = true;
});
doc.on("keyup",function(e){
 if(key.map[e.keyCode]){e.keyAlias = key.map[e.keyCode];}
 if(key.press[e.keyCode]){
  if(key.events.up[e.keyCode]){
   var i = key.events.up[e.keyCode].length;
   while(i--){
    if(typeof key.events.up[e.keyCode][i] == "function"){
     key.events.up[e.keyCode][i](e);
    }
   }
  }
 }
 key.press[e.keyCode] = false;
 key.press[engine.key.map[e.keyCode]] = false;
});

key.events = {
 "up": [],
 "down": []
};
key.on = function(name,keyCode,f){
 if(typeof keyCode == "string"){keyCode = key.map.indexOf(keyCode);}
 if(!(
  name=="up"||
  name=="down"&&
  keyCode&&
  typeof f == "function"
 )){
  return false;
 }
 if(!key.events[name]){key.events[name] = [];}
 if(!key.events[name][keyCode]){key.events[name][keyCode] = [];}
 if(key.events[name][keyCode].indexOf(f)+1){return false;}
 key.events[name][keyCode][key.events[name][keyCode].length] = f;
 return true;
};
key.rmon = function(name,keyCode,f){
 if(typeof keyCode == "string"){keyCode = key.map.indexOf(keyCode);}
 if(!(
  name=="up"||
  name=="down"&&
  keyCode&&
  typeof f == "function"
 )){
  return false;
 }
 if(!key.events[name]){key.events[name] = [];}
 if(!key.events[name][keyCode]){key.events[name][keyCode] = [];}
 if(!(key.events[name][keyCode].indexOf(f)+1)){return false;}
 key.events[name][keyCode][key.events[name][keyCode].indexOf(f)] = undefined;
 return true;
};
key.addEventListener = key.on;
key.removeEventListener = key.rmon;
