// Functions used frequently
// -------------------------

// Compute and draw barriers on a [x,y,z] block.
var barriers = i => {
  
  [x,y,z] = i;
  
  if(z == 0){
  
    block = space[x][y][z];
    
    if(block){
      
      // Reassign u/r/d/l based on the angle
      var uu="u",rr="r",dd="d",ll="l";
      for(var a = 0; a < block.angle; a+= 90){
        [uu,rr,dd,ll] = [rr,dd,ll,uu];
      }
      
      // #0: basic block
      if(block.id == 0){
        
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 0, r: 0, d: 0, l: 0};
        
        // Block with no link: no barrier
        // Block with at least 1 link
        if(block.links.u + block.links.r + block.links.d + block.links.l > 0 ){
        
          // if a side has no link and opposite side has no link: barrier on both
          if(!block.links.u && !block.links.d){
            block.barriers[uu] = 1;
            block.barriers[dd] = 1;
          }
          else if(!block.links.l && !block.links.r){
            block.barriers[ll] = 1;
            block.barriers[rr] = 1;
          }
          
          // if 2 consecutive sides have a link and the two other don't, put barriers on the two others
          else if(block.links.u && block.links.l && !block.links.r && !block.links.d){
            block.barriers[rr] = 1;
            block.barriers[dd] = 1;
          }
          else if(block.links.u && !block.links.l && block.links.r && !block.links.d){
            block.barriers[ll] = 1;
            block.barriers[dd] = 1;
          }
          else if(!block.links.u && block.links.l && !block.links.r && block.links.d){
            block.barriers[rr] = 1;
            block.barriers[uu] = 1;
          }
          if(!block.links.u && !block.links.l && block.links.r && block.links.d){
            block.barriers[uu] = 1;
            block.barriers[ll] = 1;
          }
          
          // If three sides have a link, put barriers on the 4th
          else if(block.links.u + block.links.r + block.links.d + block.links.l == 3){
            if(!block.links.u) block.barriers[uu] = 1;
            if(!block.links.r) block.barriers[rr] = 1;
            if(!block.links.d) block.barriers[dd] = 1;
            if(!block.links.l) block.barriers[ll] = 1;
          }
        }
      }
      
      // #1: start
      else if(block.id == 1){
        //console.log(x,y-1,z,U,block.angle,space[x][y-1][z]);
        
                
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 1, r: 1, d: 1, l: 1};
        
        // Add forward barrier if no link
        if(block.angle == 0 && block.links.u){
          block.barriers.u = 0;
        }
        if(block.angle == 90 && block.links.r){
          block.barriers.r = 0;
        }
        if(block.angle == 180 && block.links.d){
          block.barriers.d = 0;
        }
        if(block.angle == 270 && block.links.l){
          block.barriers.l = 0;
        }
      }
      
      // #2: end
      else if(block.id == 2){
 
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 1, r: 1, d: 1, l: 1};
        
        // Add back barrier if no link
        if(block.angle == 0 && block.links.d){
          block.barriers.d = 0;
        }
        if(block.angle == 90 && block.links.l){
          block.barriers.l = 0;
        }
        if(block.angle == 180 && block.links.u){
          block.barriers.u = 0;
        }
        if(block.angle == 270 && block.links.r){
          block.barriers.r = 0;
        }
      }
      
      // #3: checkpoint
      else if(block.id == 3){
 
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 1, r: 1, d: 1, l: 1};
        
        // Add forward/back barrier if no link
        if(block.angle == 0 && block.links.d){
          block.barriers.u = 0;
          block.barriers.d = 0;
        }
        if(block.angle == 90 && block.links.l){
          block.barriers.l = 0;
          block.barriers.r = 0;
        }
        if(block.angle == 180 && block.links.u){
          block.barriers.u = 0;
          block.barriers.d = 0;
        }
        if(block.angle == 270 && block.links.r){
          block.barriers.l = 0;
          block.barriers.r = 0;
        }
      }
      
      // #4: jumper
      else if(block.id == 4){
 
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 0, r: 0, d: 0, l: 0};
        
        // Add back barrier if no link
        if(block.angle == 0 && !block.links.d){
          block.barriers.d = 1;
        }
        if(block.angle == 90 && !block.links.l){
          block.barriers.l = 1;
        }
        if(block.angle == 180 && !block.links.u){
          block.barriers.u = 1;
        }
        if(block.angle == 270 && !block.links.r){
          block.barriers.r = 1;
        }
      }
      
      // #5: slope short
      else if(block.id == 5){
        
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 0, r: 0, d: 0, l: 0};
        
        // Add back barrier if no link
        if(block.angle == 0 && !block.links.d){
          block.barriers.d = 1;
        }
        if(block.angle == 90 && !block.links.l){
          block.barriers.l = 1;
        }
        if(block.angle == 180 && !block.links.u){
          block.barriers.u = 1;
        }
        if(block.angle == 270 && !block.links.r){
          block.barriers.r = 1;
        }
      }
      
      // #6: slope long "up"
      else if(block.id == 6){
 
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 0, r: 0, d: 0, l: 0};
        
        // Add back barrier if no link
        if(block.angle == 0 && !block.links.d){
          block.barriers.d = 1;
        }
        if(block.angle == 90 && !block.links.l){
          block.barriers.l = 1;
        }
        if(block.angle == 180 && !block.links.u){
          block.barriers.u = 1;
        }
        if(block.angle == 270 && !block.links.r){
          block.barriers.r = 1;
        }
      }
      
      // #7: slope long "down"
      else if(block.id == 7){
 
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 0, r: 0, d: 0, l: 0};
        
        // Add back barrier if no link
        if(block.angle == 0 && !block.links.d){
          block.barriers.d = 1;
        }
        if(block.angle == 90 && !block.links.l){
          block.barriers.l = 1;
        }
        if(block.angle == 180 && !block.links.u){
          block.barriers.u = 1;
        }
        if(block.angle == 270 && !block.links.r){
          block.barriers.r = 1;
        }
      }
      
      // #8: accelerator
      else if(block.id == 8){
 
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 1, r: 1, d: 1, l: 1};
        
        // Add forward and back barriers if no link
        if(block.angle == 0 && block.links.d){
          block.barriers.u = 0;
          block.barriers.d = 0;
        }
        if(block.angle == 90 && block.links.l){
          block.barriers.l = 0;
          block.barriers.r = 0;
        }
        if(block.angle == 180 && block.links.u){
          block.barriers.u = 0;
          block.barriers.d = 0;
        }
        if(block.angle == 270 && block.links.r){
          block.barriers.l = 0;
          block.barriers.r = 0;
        }
      }
      
      // #9: accelerator slope down
      else if(block.id == 9){
        
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 0, r: 0, d: 0, l: 0};
        
        // Add back barrier if no link
        if(block.angle == 0 && !block.links.d){
          block.barriers.d = 1;
        }
        if(block.angle == 90 && !block.links.l){
          block.barriers.l = 1;
        }
        if(block.angle == 180 && !block.links.u){
          block.barriers.u = 1;
        }
        if(block.angle == 270 && !block.links.r){
          block.barriers.r = 1;
        }
      }
      
      // Draw barriers
      
      if(block.barriers[uu]){
       C.$(`road-${x}-${y}-${z}`).children[0].style.borderTop = "5px solid #000";
      }
      if(block.barriers[dd]){
       C.$(`road-${x}-${y}-${z}`).children[0].style.borderBottom = "5px solid #000";
      }
      if(block.barriers[ll]){
       C.$(`road-${x}-${y}-${z}`).children[0].style.borderLeft = "5px solid #000";
      }
      if(block.barriers[rr]){
       C.$(`road-${x}-${y}-${z}`).children[0].style.borderRight = "5px solid #000";
      }
    }
  }
}

// TODO: factorize #5 and #9, #2 and #4, #3 and #8 (and/or) #6 and #7? 

// Compute and draw links between road blocks
var links = () => {
  
  // Reset all links (HTML)
  for(j of document.querySelectorAll(".barrierleftright,.barriertopbottom")){
    j.remove();
  }

  // Redraw all links, but:
  // - Make them shorter between a slope and a flat block
  // - Don't draw them between two slopes 
  for(i of roadlinks){

    if(i){
      
      var block1 = space[i[0][0]][i[0][1]][i[0][2]];
      var block2 = space[i[1][0]][i[1][1]][i[1][2]];
      
      // link from front ^ to back v 
      if(i[0][0] == i[1][0] && i[0][2] == i[1][2] && i[0][1] == i[1][1] - 1){
        
        if(!block1.slope && !block2.slope){
          C.plane({n:"zer0",w:size*.8,h:size*.2,x:i[0][0]*size+size*.1,y:i[0][1]*size+size*.9,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[0][2] == 0 ? "z0":""}`});
        }
        else if(block1.slope && !block2.slope){
          C.plane({n:1,w:size*.8,h:size*.1,x:i[0][0]*size+size*.1,y:i[0][1]*size+size*1,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[0][2] == 0 ? "z0":""}`});
        }
        else if(!block1.slope && block2.slope){
          C.plane({n:2,w:size*.8,h:size*.1,x:i[0][0]*size+size*.1,y:i[0][1]*size+size*.9,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[0][2] == 0 ? "z0":""}`});
        }
        
        block1.links.d = 1;
        block2.links.u = 1;
      }
      
      // link from back v to front ^
      if(i[0][0] == i[1][0] && i[0][2] == i[1][2] && i[0][1] == i[1][1] + 1){
        
        
        if(!block1.slope && !block2.slope){
          C.plane({n:10,w:size*.8,h:size*.2,x:i[1][0]*size+size*.1,y:i[1][1]*size+size*.9,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(block1.slope && !block2.slope){
          C.plane({n:11,w:size*.8,h:size*.1,x:i[1][0]*size+size*.1,y:i[1][1]*size+size*.9,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(!block1.slope && block2.slope){
          C.plane({n:12,w:size*.8,h:size*.1,x:i[1][0]*size+size*.1,y:i[1][1]*size+size,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[1][2] == 0 ? "z0":""}`});
        }

        block1.links.u = 1;
        block2.links.d = 1;
      }
      
      // link from left < to right >
      if(i[0][0] == i[1][0] - 1 && i[0][2] == i[1][2] && i[0][1] == i[1][1]){

        if(!block1.slope && !block2.slope){
          C.plane({n:20,w:size*.2,h:size*.8,x:i[0][0]*size+size*.9,y:i[1][1]*size+size*.1,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[0][2] == 0 ? "z0":""}`});
        }
        else if(block1.slope && !block2.slope){
          C.plane({n:21,w:size*.1,h:size*.8,x:i[0][0]*size+size,y:i[1][1]*size+size*.1,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[0][2] == 0 ? "z0":""}`});
        }
        else if(!block1.slope && block2.slope){
          C.plane({n:22,w:size*.1,h:size*.8,x:i[0][0]*size+size*.9,y:i[1][1]*size+size*.1,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[0][2] == 0 ? "z0":""}`});
        }
        
        
        block1.links.r = 1;
        block2.links.l = 1;
      }
      
      // link from right > to left <
      if(i[0][0] == i[1][0] + 1 && i[0][2] == i[1][2] && i[0][1] == i[1][1]){
        
        
        
        if(!block1.slope && !block2.slope){
          C.plane({n:30,w:size*.2,h:size*.8,x:i[1][0]*size+size*.9,y:i[1][1]*size+size*.1,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(block1.slope && !block2.slope){
          C.plane({n:31,w:size*.1,h:size*.8,x:i[1][0]*size+size*.9,y:i[1][1]*size+size*.1,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(!block1.slope && block2.slope){
          C.plane({n:32,w:size*.1,h:size*.8,x:i[1][0]*size+size,y:i[1][1]*size+size*.1,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[1][2] == 0 ? "z0":""}`});
        }
        
        
        
        
        block1.links.l = 1;
        block2.links.r = 1;
      }
    }
  }
}

// Make basic road turns rounded
var turns = () => {
  for(i of roads){
    if(i){
      [x,y,z] = i;
      block = space[x][y][z];
      
      // #0: basic block
      if(block && block.id == 0){
      
        // Reset indicators of which sides are not rounded
        block.flat = {u: 1, r: 1, d: 1, l: 1};
        
        if(block.links.u && block.links.r && !block.links.d && !block.links.l){
          C.$(`road-${x}-${y}-${z}`).children[0].style.borderRadius = "0 0 0 100%";
          block.flat.d = 0;
          block.flat.l = 0;
        }
        else if(!block.links.u && block.links.r && block.links.d && !block.links.l){
          C.$(`road-${x}-${y}-${z}`).children[0].style.borderRadius = "100% 0 0 0";
          block.flat.u = 0;
          block.flat.l = 0;
        }
        else if(!block.links.u && !block.links.r && block.links.d && block.links.l){
          C.$(`road-${x}-${y}-${z}`).children[0].style.borderRadius = "0 100% 0 0";
          block.flat.u = 0;
          block.flat.r = 0;
        }
        else if(block.links.u && !block.links.r && !block.links.d && block.links.l){
          C.$(`road-${x}-${y}-${z}`).children[0].style.borderRadius = "0 0 100% 0";
          block.flat.d = 0;
          block.flat.r = 0;
        }
        else {
          if(C.$(`road-${x}-${y}-${z}`)){
            C.$(`road-${x}-${y}-${z}`).children[0].style.borderRadius = "0";
            block.flat.u = 0;
            block.flat.r = 0;
            block.flat.d = 0;
            block.flat.l = 0;
          }
        }
      }
    }
  }
}

// Generate the oob equations for every road block 
var equations = () => {
  for(i of roads){
    if(i){
      [x,y,z] = i;
      block = space[x][y][z];
      
      if(block){
        
        // #0: basic road block
        if(block.id == 0){
      
          if(block.links.u && block.links.r && !block.links.d && !block.links.l){
            block.equation = `dist2([x,y],[${x*size+size},${y*size}])>(size*.8)**2`;
          }
          else if(!block.links.u && block.links.r && block.links.d && !block.links.l){
            block.equation = `dist2([x,y],[${x*size+size},${y*size+size}])>(size*.8)**2`;
          }
          else if(!block.links.u && !block.links.r && block.links.d && block.links.l){
            block.equation = `dist2([x,y],[${x*size},${y*size+size}])>(size*.8)**2`;
          }
          else if(block.links.u && !block.links.r && !block.links.d && block.links.l){
            block.equation = `dist2([x,y],[${x*size},${y*size}])>(size*.8)**2`;
          }
          else {
            block.equation = "false";
          }
        }
      }
    }
  }
}
