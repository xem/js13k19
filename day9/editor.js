// Editor
editor = () => {
  if(L) cursorx --;
  else if(R) cursorx ++;
  else if(U) cursory --;
  else if(D) cursory ++;
  else if(S) {
    console.log("space");
    C.plane({n:"",x:cursorx*20,y:cursory*20,z:gridz*20,w:20,h:20,b:"#d90", o:"top left"});
  }
  C.camera({x:cursorx*20+10, y:cursory*20+10, z:-300+gridz*20, rz:gridrz, rx:20});
  C.move({n:"cursor",x:cursorx*20-2,y:cursory*20-2,z:gridz*20});
}