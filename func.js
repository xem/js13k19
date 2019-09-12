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
        if(block.links.u || block.links.r || block.links.d || block.links.l){
        
          // if a side has no link and opposite side has no link: barrier on both
          if(!block.links[uu] && !block.links[dd]){
            block.barriers[uu] = 1;
            block.barriers[dd] = 1;
          }
          else if(!block.links[ll] && !block.links[rr]){
            block.barriers[ll] = 1;
            block.barriers[rr] = 1;
          }
          
          // if 2 consecutive sides have a link and the two other don't, put barriers on the two others
          else if(block.links[uu] && block.links[ll] && !block.links[rr] && !block.links[dd]){
            block.barriers[rr] = 1;
            block.barriers[dd] = 1;
          }
          else if(block.links[uu] && !block.links[ll] && block.links[rr] && !block.links[dd]){
            block.barriers[ll] = 1;
            block.barriers[dd] = 1;
          }
          else if(!block.links[uu] && block.links[ll] && !block.links[rr] && block.links[dd]){
            block.barriers[rr] = 1;
            block.barriers[uu] = 1;
          }
          if(!block.links[uu] && !block.links[ll] && block.links[rr] && block.links[dd]){
            block.barriers[uu] = 1;
            block.barriers[ll] = 1;
          }
          
          // If three sides have a link, put barriers on the 4th
          else {
            if(block.links[uu] && block.links[rr] && block.links[dd] && !block.links[ll]){
             block.barriers[ll] = 1;
            }
            else if(block.links[uu] && block.links[rr] && !block.links[dd] && block.links[ll]){
             block.barriers[dd] = 1;
            }
            else if(block.links[uu] && !block.links[rr] && block.links[dd] && block.links[ll]){
             block.barriers[rr] = 1;
            }
            else if(!block.links[uu] && block.links[rr] && block.links[dd] && block.links[ll]){
             block.barriers[uu] = 1;
            }
          }
          
          // RING: If the block is the top right side of a circle, close it 
          block.ring = 0;
          if(block.links.d && block.links.l){
            var [xx,yy,zz] = block.links.l;
            if(space[xx][yy][zz].id == 0 && space[xx][yy][zz].links.d){
              [xx,yy,zz] = block.links.d;
              if(space[xx][yy][zz].id == 0 && space[xx][yy][zz].links.l){
                //console.log("ring detected");
                block.ring = 1;
              }
            }
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
        
        // Remove forward/back barrier if link
        if(block.links.u){
          block.barriers.u = 0;
        }
        if(block.links.d){
          block.barriers.d = 0;
        }

        if(block.links.r){
          block.barriers.r = 0;
        }
        if(block.links.l){
          block.barriers.l = 0;
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
      else if(block.id == 6 || block.id == 7){
 
        // Reset barriers
        //console.log(x,y,z,C.$(`road-${x}-${y}-${z}`));
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
      /*else if(block.id == 7){
 
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
      }*/
      
      // #8: accelerator
      else if(block.id == 8){
 
        // Reset barriers
      
        C.$(`road-${x}-${y}-${z}`).children[0].style.border = "0";
      
        //console.log(block, x, y, z);

        block.barriers = {u: 1, r: 1, d: 1, l: 1};
        
        // Remove forward/back barrier if link
        if(block.links.u){
          block.barriers.u = 0;
        }
        if(block.links.d){
          block.barriers.d = 0;
        }

        if(block.links.r){
          block.barriers.r = 0;
        }
        if(block.links.l){
          block.barriers.l = 0;
        }
        
        //console.log(block);
      }
      
      // #9: accelerator slope down/up
      else if(block.id == 9 || block.id == 10){
        
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
       C.$(`road-${x}-${y}-${z}`).children[0].style.borderTop = "6px solid #000";
      }
      if(block.barriers[dd]){
       C.$(`road-${x}-${y}-${z}`).children[0].style.borderBottom = "6px solid #000";
      }
      if(block.barriers[ll]){
       C.$(`road-${x}-${y}-${z}`).children[0].style.borderLeft = "6px solid #000";
      }
      if(block.barriers[rr]){
       C.$(`road-${x}-${y}-${z}`).children[0].style.borderRight = "6px solid #000";
      }

    }
  }
}

// TODO: factorize #5 and #9, #2 and #4, #3 and #8 (and/or) #6 and #7? 

// Compute and draw links between road blocks
var links = () => {
  
  // Reset all links (HTML)
  for(j of document.querySelectorAll(".barrierleftright,.barriertopbottom,.ring")){
    j.remove();
  }
  
  for(i of roads){
    if(i[0]){
      var block1 = space[i[0]][i[1]][i[2]];
      if(block1.ring){
        C.plane({w:size*.5,h:size*.5,x:i[0]*size-size*.25,y:i[1]*size+size*.75,z:sizeh*i[2]+1.2,b:"#d90",o:"top left",css:`ring`});
      }
    }
  }

  // Redraw all links, but:
  // - Make them shorter between a slope and a flat block
  // - Don't draw them between two slopes 
  for(i of roadlinks){

    //console.log(i);
    
    if(i[0]){
      
      var block1 = space[i[0][0]][i[0][1]][i[0][2]];
      var block2 = space[i[1][0]][i[1][1]][i[1][2]];
      //console.log(block1,block2);
      
      //console.log(block1, block2);
      
      // link from front ^ to back v 
      if(i[0][0] == i[1][0] /*&& i[0][2] == i[1][2]*/ && i[0][1] < i[1][1]){
        
        //console.log("front to back");
        
        if(!block1.slope && !block2.slope){
          C.plane({w:size*.8,h:size*.2,x:i[0][0]*size+size*.1,y:i[0][1]*size+size*.9,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[0][2] == 0 ? "z0":""}`});
        }
        else if(block1.slope && !block2.slope){
          C.plane({w:size*.8,h:size*.1,x:i[1][0]*size+size*.1,y:i[1][1]*size+size*1-size,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(!block1.slope && block2.slope){
          C.plane({w:size*.8,h:size*.1,x:i[0][0]*size+size*.1,y:i[0][1]*size+size*.9,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[0][2] == 0 ? "z0":""}`});
        }
        
        block1.links.d = [i[1][0],i[1][1],i[1][2]];
        block2.links.u = [i[0][0],i[0][1],i[0][2]];
      }
      
      // link from back v to front ^
      if(i[0][0] == i[1][0] /*&& i[0][2] == i[1][2]*/ && i[0][1] > i[1][1]){
        
        if(!block1.slope && !block2.slope){
          C.plane({w:size*.8,h:size*.2,x:i[1][0]*size+size*.1,y:i[1][1]*size+size*.9,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(block1.slope && !block2.slope){
          C.plane({w:size*.8,h:size*.1,x:i[1][0]*size+size*.1,y:i[1][1]*size+size*.9,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(!block1.slope && block2.slope){
          C.plane({w:size*.8,h:size*.1,x:i[1][0]*size+size*.1,y:i[1][1]*size+size,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barrierleftright ${i[1][2] == 0 ? "z0":""}`});
        }

        block1.links.u = [i[1][0],i[1][1],i[1][2]];
        block2.links.d = [i[0][0],i[0][1],i[0][2]];
      }
      
      // link from left < to right >
      if(i[0][0] < i[1][0] /*&& i[0][2] == i[1][2]*/ && i[0][1] == i[1][1]){

        if(!block1.slope && !block2.slope){
          C.plane({w:size*.2,h:size*.8,x:i[0][0]*size+size*.9,y:i[1][1]*size+size*.1,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[0][2] == 0 ? "z0":""}`});
        }
        else if(block1.slope && !block2.slope){
          C.plane({w:size*.1,h:size*.8,x:i[1][0]*size,y:i[1][1]*size+size*.1,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(!block1.slope && block2.slope){
          C.plane({w:size*.1,h:size*.8,x:i[0][0]*size+size*.9,y:i[0][1]*size+size*.1,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[0][2] == 0 ? "z0":""}`});
        }

        block1.links.r = [i[1][0],i[1][1],i[1][2]];
        block2.links.l = [i[0][0],i[0][1],i[0][2]];
      }
      
      // link from right > to left <
      if(i[0][0] > i[1][0] /*&& i[0][2] == i[1][2]*/ && i[0][1] == i[1][1]){
        
        if(!block1.slope && !block2.slope){
          C.plane({w:size*.2,h:size*.8,x:i[1][0]*size+size*.9,y:i[1][1]*size+size*.1,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(block1.slope && !block2.slope){
          C.plane({w:size*.1,h:size*.8,x:i[1][0]*size+size*.9,y:i[1][1]*size+size*.1,z:sizeh*i[1][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[1][2] == 0 ? "z0":""}`});
        }
        else if(!block1.slope && block2.slope){
          C.plane({w:size*.1,h:size*.8,x:i[0][0]*size,y:i[0][1]*size+size*.1,z:sizeh*i[0][2]+1,b:"#d90",o:"top left",css:`barriertopbottom ${i[0][2] == 0 ? "z0":""}`});
        }
        
        block1.links.l = [i[1][0],i[1][1],i[1][2]];
        block2.links.r = [i[0][0],i[0][1],i[0][2]];
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
        
        //console.log(block);
      
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
            block.flat = {u: 1, r: 1, d: 1, l: 1};
          }
        }
      }
    }
  }
}

// Generate the equations for every road block 
var equations = () => {
  for(i of roads){
    if(i){
      [x,y,z] = i;
      block = space[x][y][z];
      
      if(block){
        
        // #0: basic road block
        if(block.id == 0){
      
          // Turns
          
          // down left
          if(block.links.u && block.links.r && !block.links.d && !block.links.l){
            block.inbounds = `dist2([carx,cary],[${x*size+size},${y*size}])<80**2`;
            block.fall = `dist2([carx,cary],[${x*size+size},${y*size}])<80**2?${z*sizeh}:0`;
          }
          
          // up left
          else if(!block.links.u && block.links.r && block.links.d && !block.links.l){
            block.inbounds = `dist2([carx,cary],[${x*size+size},${y*size+size}])<80**2`;
            block.fall = `dist2([carx,cary],[${x*size+size},${y*size+size}])<80**2?${z*sizeh}:0`;
          }
          
          // up right
          else if(!block.links.u && !block.links.r && block.links.d && block.links.l){
            block.inbounds = `dist2([carx,cary],[${x*size},${y*size+size}])<80**2`;
            block.fall = `dist2([carx,cary],[${x*size},${y*size+size}])<80**2?${z*sizeh}:0`;
          }
          
          // down right
          else if(block.links.u && !block.links.r && !block.links.d && block.links.l){
            block.inbounds = `dist2([carx,cary],[${x*size},${y*size}])<80**2`;
            block.fall = `dist2([carx,cary],[${x*size},${y*size}])<80**2?${z*sizeh}:0`;
          }
          else {
            block.inbounds = "true";
          }
        }
        
        // Flags, accelerator
        else if(block.id == 1 || block.id == 2 || block.id == 3 || block.id == 8){
          //block.inbounds = `x > ${x*size+(block.links.l?0:20)} && x < ${x*size+(block.links.r?100:80)} && y > ${y*size+(block.links.u?0:20)} && y < ${y*size+(block.links.d?100:80)}`;  
        }
        
        
        
        
      }
    }
  }
}
