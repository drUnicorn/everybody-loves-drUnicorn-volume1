/* Init Engine */
win.Engine = {};
Engine.devmode = false;

win.wait.nd = function(t,f){
 if(!Engine.devmode){wait(t,f);}
 else{wait(0,f);}
};

Engine.key = {};
win.key = Engine.key; //Change "win.key" to "var key" if needed
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
key.map[96] = "num0";
key.map[97] = "num1";
key.map[98] = "num2";
key.map[99] = "num3";
key.map[100]= "num4";
key.map[101]= "num5";
key.map[102]= "num6";
key.map[103]= "num7";
key.map[104]= "num8";
key.map[105]= "num9";
key.map[144]= "num";
key.map[255]= "altgr";

doc.on("keydown",function(e){
 if(key.map[e.keyCode]){e.keyAlias = key.map[e.keyCode];}
 if(e.keyCode>95&&e.keyCode<106){e.keyNum = e.keyCode-96;}
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
 if(e.keyCode>95&&e.keyCode<106){e.keyNum = e.keyCode-96;}
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
 key.press[Engine.key.map[e.keyCode]] = false;
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
