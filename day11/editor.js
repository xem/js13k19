// Editor
editor = () => {
  
 var prevcursorx = cursorx;
 var prevcursory = cursory;
 
  
  // Adjust arrows based on grid angle
  for(i = 0; i < gridrz/90; i++){
    [U,R,D,L] = [R,D,L,U]
  }
  
  // arrow keys (move cursor)
  if(L) cursorx --;
  else if(R) cursorx ++;
  else if(U) cursory --;
  else if(D) cursory ++;
  
  // space (place an item)
  if(s) {
    if(inventory[selected][2] > 0 && !space[cursorx][cursory][gridz]){
      C.plane({n:`road-${cursorx}-${cursory}-${gridz}`,x:cursorx*size+size/2,y:cursory*size+size/2,z:gridz*size,w:size*.8,h:size*.8,b:"#d90", o:"center"});
      space[cursorx][cursory][gridz] = {type: inventory[selected][0], angle: 0, u: 0, r: 0, d: 0, l: 0, barriers: {u: 0, r: 0, d: 0, l: 0}}
      roads.push([cursorx,cursory,gridz, inventory[selected][0], 0, 0, 0]);// x,y,z,type,angle,fixed
      inventory[selected][2]--;
      C.$(`qty${selected}`).innerHTML = inventory[selected][2] + "/" + inventory[selected][1];
    }
  }
  
  // suppr (remove an item)
  else if(_){
    if(space[cursorx][cursory][gridz] && !space[cursorx][cursory][gridz].fixed){
      C.$(`road-${cursorx}-${cursory}-${gridz}`).remove();
      space[cursorx][cursory][gridz] = 0;
    }
    inventory[selected][2]++;
    C.$(`qty${selected}`).innerHTML = inventory[selected][2] + "/" + inventory[selected][1];
    
    // Remove road
    for(i in roads){
      if(roads[i]){ 
        if(roads[i][0] == cursorx && roads[i][1] == cursory && roads[i][2] == gridz){
          roads[i] = 0;
        }
      }
    }
    
    // Remove links attached to this block
    for(i in roadlinks){
      for(j = 0; j < 2; j++){
        if(roadlinks[i]){
          if(roadlinks[i][j][0] == cursorx && roadlinks[i][j][1] == cursory && roadlinks[i][j][2] == gridz){
            
            if(space[roadlinks[i][j][0]-1][roadlinks[i][j][1]][gridz]){
              space[roadlinks[i][j][0]-1][roadlinks[i][j][1]][gridz].r = 0;
            }
            if(space[roadlinks[i][j][0]][roadlinks[i][j][1]-1][gridz]){
              space[roadlinks[i][j][0]][roadlinks[i][j][1]-1][gridz].d = 0;
            }
            if(space[roadlinks[i][j][0]+1][roadlinks[i][j][1]][gridz]){
              space[roadlinks[i][j][0]+1][roadlinks[i][j][1]][gridz].l = 0;
            }
            if(space[roadlinks[i][j][0]][roadlinks[i][j][1]+1][gridz]){
              space[roadlinks[i][j][0]][roadlinks[i][j][1]+1][gridz].u = 0;
            }
            
            
            roadlinks[i] = 0;
          }
        }
      }
    }
    links();
    
    // Reset barriers, curves, equations
    turns();
    for(i of roads){
      if(i){
        barriers(i);
      }
    }
  }
  
  if(rerender||L||R||U||D||S||_){
    C.camera({x:cursorx*size+size/2, y:cursory*size+size/2, z:600+gridz*size, rz:gridrz, rx:30});
    C.move({n:"cursor",x:cursorx*size+size/2,y:cursory*size+size/2,z:gridz*size});
    rerender = 0;
    
    // Cursor color (if there's already something here)
    if(space[cursorx][cursory][gridz] || inventory[selected][2] == 0) cursor.style.background = "#e668"; // red
    else cursor.style.background = "#9f88"; // green
  }
  
  // space down + arrow pressed (create link between two blocks)
  if(s){
    if(U||R||D||L){
      //console.log(1, space[prevcursorx][prevcursory][gridz], space[cursorx][cursory][gridz]);
      if(space[prevcursorx][prevcursory][gridz] && space[prevcursorx][prevcursory][gridz].type == 0 && space[cursorx][cursory][gridz] && space[cursorx][cursory][gridz].type == 0){
        roadlinks.push([[prevcursorx,prevcursory,gridz],[cursorx,cursory,gridz]]);
        //console.log(2);
        links();
        turns();
        for(i of roads){
          if(i){
            barriers(i);
          }
        }
      }
    }
  }
  
}

// Select an inventory item
var select = i => {
  if(inventory[i]){
    document.querySelector(".part.selected").classList.remove("selected");
    C.$("part"+i).classList.add("selected");
    selected = i;
    
    C.$("cursor").innerHTML = "";
    C.plane({g:"cursor",x:size/2+size*.1,y:size/2+size*.1,w:size*.8,h:size*.8,b:"#d90", o:"center"});
    //blockangle = 0;
  }
}