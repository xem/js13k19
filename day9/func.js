// Functions used frequently
// -------------------------

// Compute and draw barriers on a [x,y,z] block.
var barriers = i => {
  
  var [x,y,z] = i;
  
  if(z == 0){
  
    var block = space[x][y][z];
    
    //console.log(block, x, y, z);

    // Reset barriers
    block.barriers = {u: 0, r: 0, d: 0, l: 0};
    
    // Block with no link: no barrier
    // Block with at least 1 link
    if(block.u + block.r + block.d + block.l > 0 ){
    
      // if a side has no link and opposite side has no link: barrier on both
      if(!block.u && !block.d){
        block.barriers.u = 1;
        block.barriers.d = 1;
      }
      else if(!block.l && !block.r){
        block.barriers.l = 1;
        block.barriers.r = 1;
      }
      
      // if 2 consecutive sides have a link and the two other don't, put barriers on the two others
      else if(block.u && block.l && !block.r && !block.d){
        block.barriers.r = 1;
        block.barriers.d = 1;
      }
      else if(block.u && !block.l && block.r && !block.d){
        block.barriers.l = 1;
        block.barriers.d = 1;
      }
      else if(!block.u && block.l && !block.r && block.d){
        block.barriers.r = 1;
        block.barriers.u = 1;
      }
      if(!block.u && !block.l && block.r && block.d){
        block.barriers.u = 1;
        block.barriers.l = 1;
      }
      
      // If three sides have a link, put barriers on the 4th
      else if(block.u + block.r + block.d + block.l == 3){
        if(!block.u) block.barriers.u = 1;
        if(!block.r) block.barriers.r = 1;
        if(!block.d) block.barriers.d = 1;
        if(!block.l) block.barriers.l = 1;
      }
    }
    // Draw barriers
    
    
    if(block.barriers.u){
     C.$(`road-${x}-${y}-${z}`).style.borderTop = ".5in solid #000";
     //C.$(`barrier1-${x}-${y}-${z}`).style.borderTop = ".5in solid #000";
     //C.$(`barrier2-${x}-${y}-${z}`).style.borderTop = "1in solid #000";
     //C.$(`barrier3-${x}-${y}-${z}`).style.borderTop = "1in solid #000";
    }
    if(block.barriers.d){
     C.$(`road-${x}-${y}-${z}`).style.borderBottom = ".5in solid #000";
     //C.$(`barrier1-${x}-${y}-${z}`).style.borderBottom = ".5in solid #000";
     //C.$(`barrier2-${x}-${y}-${z}`).style.borderBottom = "1in solid #000";
     //C.$(`barrier3-${x}-${y}-${z}`).style.borderBottom = "1in solid #000";
    }
    if(block.barriers.l){
     C.$(`road-${x}-${y}-${z}`).style.borderLeft = ".5in solid #000";
     //C.$(`barrier1-${x}-${y}-${z}`).style.borderLeft = ".5in solid #000";
     //C.$(`barrier2-${x}-${y}-${z}`).style.borderLeft = "1in solid #000";
     //C.$(`barrier3-${x}-${y}-${z}`).style.borderLeft = "1in solid #000";
    }
    if(block.barriers.r){
     C.$(`road-${x}-${y}-${z}`).style.borderRight = ".5in solid #000";
     //C.$(`barrier1-${x}-${y}-${z}`).style.borderRight = ".5in solid #000";
     //C.$(`barrier2-${x}-${y}-${z}`).style.borderRight = "1in solid #000";
     //C.$(`barrier3-${x}-${y}-${z}`).style.borderRight = "1in solid #000";
    }
  }
}

// Compute and draw links between road blocks
var links = () => {
  for(i of roadlinks){

    // link from front ^ to back v 
    if(i[0][0] == i[1][0] && i[0][2] == i[1][2] && i[0][1] == i[1][1] - 1){
      C.plane({w:20,h:1,x:i[0][0]*20,y:i[0][1]*20+19.5,z:.2,b:"#d90",o:"top left",css:"barrierleftright"});
      space[i[0][0]][i[0][1]][i[0][2]].d = 1;
      space[i[1][0]][i[1][1]][i[1][2]].u = 1;
    }
    
    // link from back v to front ^
    if(i[0][0] == i[1][0] && i[0][2] == i[1][2] && i[0][1] == i[1][1] + 1){
      C.plane({w:20,h:1,x:i[1][0]*20,y:i[1][1]*20+19.5,z:.2,b:"#d90",o:"top left",css:"barrierleftright"});
      space[i[0][0]][i[0][1]][i[0][2]].u = 1;
      space[i[1][0]][i[1][1]][i[1][2]].d = 1;
    }
    
    // link from left < to right >
    if(i[0][0] == i[1][0] - 1 && i[0][2] == i[1][2] && i[0][1] == i[1][1]){
      C.plane({w:1,h:20,x:i[0][0]*20+19.5,y:i[1][1]*20,z:.2,b:"#d90",o:"top left",css:"barriertopbottom"});
      space[i[0][0]][i[0][1]][i[0][2]].r = 1;
      space[i[1][0]][i[1][1]][i[1][2]].l = 1;
    }
    
    // link from right > to left <
    if(i[0][0] == i[1][0] + 1 && i[0][2] == i[1][2] && i[0][1] == i[1][1]){
      C.plane({w:1,h:20,x:i[1][0]*20+19.5,y:i[1][1]*20,z:.2,b:"#d90",o:"top left",css:"barriertopbottom"});
      space[i[0][0]][i[0][1]][i[0][2]].l = 1;
      space[i[1][0]][i[1][1]][i[1][2]].r = 1;
    }
  }
}

// Make road turns rounded on the outside
var turns = () => {
  for(i of roads){
    [x,y,z] = i;
    var block = space[x][y][z];
    
    // Reset indicators of which sides are not rounded
    block.flat = {u: 1, r: 1, d: 1, l: 1};
    
    if(block.u && block.r && !block.d && !block.l){
      C.$(`road-${x}-${y}-${z}`).style.borderRadius = "0 0 0 100%";
      //C.$(`barrier1-${x}-${y}-${z}`).style.borderRadius = "0 0 0 100%";
      //C.$(`barrier2-${x}-${y}-${z}`).style.borderRadius = "0 0 0 100%";
      //C.$(`barrier3-${x}-${y}-${z}`).style.borderRadius = "0 0 0 100%";
      block.flat.d = 0;
      block.flat.l = 0;
    }
    else if(!block.u && block.r && block.d && !block.l){
      C.$(`road-${x}-${y}-${z}`).style.borderRadius = "100% 0 0 0";
      //C.$(`barrier1-${x}-${y}-${z}`).style.borderRadius = "100% 0 0 0";
      //C.$(`barrier2-${x}-${y}-${z}`).style.borderRadius = "100% 0 0 0";
      //C.$(`barrier3-${x}-${y}-${z}`).style.borderRadius = "100% 0 0 0";
      block.flat.u = 0;
      block.flat.l = 0;
    }
    else if(!block.u && !block.r && block.d && block.l){
      C.$(`road-${x}-${y}-${z}`).style.borderRadius = "0 100% 0 0";
      //C.$(`barrier1-${x}-${y}-${z}`).style.borderRadius = "0 100% 0 0";
      //C.$(`barrier2-${x}-${y}-${z}`).style.borderRadius = "0 100% 0 0";
      //C.$(`barrier3-${x}-${y}-${z}`).style.borderRadius = "0 100% 0 0";
      block.flat.u = 0;
      block.flat.r = 0;
    }
    else if(block.u && !block.r && !block.d && block.l){
      C.$(`road-${x}-${y}-${z}`).style.borderRadius = "0 0 100% 0";
      //C.$(`barrier1-${x}-${y}-${z}`).style.borderRadius = "0 0 100% 0";
      //C.$(`barrier2-${x}-${y}-${z}`).style.borderRadius = "0 0 100% 0";
      //C.$(`barrier3-${x}-${y}-${z}`).style.borderRadius = "0 0 100% 0";
      block.flat.d = 0;
      block.flat.r = 0;
    }
    //else {
    //}
  }
}

// Generate the oob equations for every road block 
var equations = () => {
  for(i of roads){
    [x,y,z] = i;
    var block = space[x][y][z];
    if(block.u && block.r && !block.d && !block.l){
      block.equation = `dist2([x,y],[${x*20+20},${y*20}])>19**2`;
    }
    else if(!block.u && block.r && block.d && !block.l){
      block.equation = `dist2([x,y],[${x*20+20},${y*20+20}])>19*19`;
    }
    else if(!block.u && !block.r && block.d && block.l){
      block.equation = `dist2([x,y],[${x*20},${y*20+20}])>19*19`;
    }
    else if(block.u && !block.r && !block.d && block.l){
      block.equation = `dist2([x,y],[${x*20},${y*20}])>19*19`;
    }
    else {
      block.equation = "false";
    }
  }
}