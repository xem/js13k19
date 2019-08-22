// Editor
editor = () => {
  
  // arrow keys
  if(L) cursorx --;
  else if(R) cursorx ++;
  else if(U) cursory --;
  else if(D) cursory ++;
  
  // space
  else if(S) {
    if(inventory[selected][2]){
      C.plane({n:"",x:cursorx*size,y:cursory*size,z:gridz*size,w:size,h:size,b:"#d90", o:"top left"});
      space[cursorx][cursory][cursorz] = {type: i[3], angle: i[4], u: 0, r: 0, d: 0, l: 0, barriers: {u: 0, r: 0, d: 0, l: 0}}
    }
    inventory[selected][2]--;
  }
  if(rerender||L||R||U||D||S){
    C.camera({x:cursorx*size+size/2, y:cursory*size+size/2, z:600+gridz*size, rz:gridrz, rx:30});
    C.move({n:"cursor",x:cursorx*size+size/2,y:cursory*size+size/2,z:gridz*size});
    rerender = 0;
  }
}

// Select an inventory item
select = i => {
  if(inventory[i]){
    document.querySelector(".part.selected").classList.remove("selected");
    C.$("part"+i).classList.add("selected");
    selected = i;
    //blockangle = 0;
  }
}