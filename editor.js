// Editor
// ------

editor = () => {
  
  var prevcursorx = cursorx;
  var prevcursory = cursory;
  var prevcursorz = gridz;
  var newcursorx, newcursory, newcursorz;
  
  // Adjust arrows based on grid angle
  for(i = 0; i < gridrz/90; i++){
    [U,R,D,L] = [R,D,L,U]
  }
  
  // arrow keys (move cursor)
  if(L && cursorx > 1) cursorx --;
  else if(R && cursorx < 18) cursorx ++;
  else if(U && cursory > 1) cursory --;
  else if(D && cursory < 18) cursory ++;
  
  document.title = [cursorx,cursory,gridz];
  
  if($){
    //console.log("enter");
    mode = 2;
    init(track);
    play(musics.race[0],musics.race[0],38600,38600);
    return;
  }
  
  // space (place an item)
  if(s) {
    
    // Check that the cell is free and the quantity is sufficient
    if(inventory[selected][2] > 0 && !space[cursorx][cursory][gridz]){
      
      // Not on ice
      onice = 0;
      for(i of track.ice){
        if(gridz > 0 || (cursorx >= i[0] && cursorx < (i[0]+ i[2]) && cursory >= i[1] && cursory < (i[1] + i[3]))){
          onice = 1;
        }
      }
     
      
      if(!onice){
        
        //console.log(space[cursorx][cursory][gridz+1]) 

        // Prevent building a slope under any other block 
        if(
          !space[cursorx][cursory][gridz+1]
          ||
          (
            space[cursorx][cursory][gridz+1]
            &&
            (
              inventory[selected][0] != 5
              && inventory[selected][0] != 6
              && inventory[selected][0] != 7
              && inventory[selected][0] != 9
            )
          )
        ){
          roads.push([cursorx, cursory, gridz, inventory[selected][0], (inventory[selected][0] == 0 ? 0 : cursorrz), 0]);// x,y,z,id,angle,fixed
          inventory[selected][2]--;
          C.$(`qty${selected}`).innerHTML = inventory[selected][2] + "/" + inventory[selected][1];
          
          // id, container, x, y, z, x angle, z angle, fixed
          draw_block(
            inventory[selected][0],
            "scene",
            cursorx, cursory, gridz,
            0,
            ((inventory[selected][0] == 0 || inventory[selected][0] == 11) ? 0 : cursorrz),
            0
          )
        }
      }
    }
    
    // Automatic link with neighbours if at least one of the two block is not basic and if both are linkable

    var current = space[cursorx][cursory][gridz];
    var neighbour, neighbourx, neighboury, neighbourz;
    
    // up
    if(current && current.linkable.u){
      neighbour = space[neighbourx = current.linkable.u[0]][neighboury = current.linkable.u[1]][neighbourz = current.linkable.u[2]];
      if(neighbour && neighbour.surrogate_of){
        neighbour = space[neighbourx = neighbour.surrogate_of[0]][neighboury = neighbour.surrogate_of[1]][neighbourz = neighbour.surrogate_of[2]];
      }
      if(neighbour && neighbour.linkable.d && !current.links.u && !neighbour.links.d && (current.id != 0 || neighbour.id != 0)){
        roadlinks.push([[cursorx,cursory,gridz],[neighbourx,neighboury,neighbourz]]);
      }
    }
    
    // right
    if(current && current.linkable.r){
      neighbour = space[neighbourx = current.linkable.r[0]][neighboury = current.linkable.r[1]][neighbourz = current.linkable.r[2]];
      if(neighbour && neighbour.surrogate_of){
        neighbour = space[neighbourx = neighbour.surrogate_of[0]][neighboury = neighbour.surrogate_of[1]][neighbourz = neighbour.surrogate_of[2]];
      }
      if(neighbour && neighbour.linkable.l && !current.links.r && !neighbour.links.l && (current.id != 0 || neighbour.id != 0)){
        roadlinks.push([[cursorx,cursory,gridz],[neighbourx,neighboury,neighbourz]]);
      }
    }
    
    // down
    if(current && current.linkable.d){
      neighbour = space[neighbourx = current.linkable.d[0]][neighboury = current.linkable.d[1]][neighbourz = current.linkable.d[2]];
      if(neighbour && neighbour.surrogate_of){
        neighbour = space[neighbourx = neighbour.surrogate_of[0]][neighboury = neighbour.surrogate_of[1]][neighbourz = neighbour.surrogate_of[2]];
      }
      if(neighbour && neighbour.linkable.u && !current.links.d && !neighbour.links.u && (current.id != 0 || neighbour.id != 0)){
        roadlinks.push([[cursorx,cursory,gridz],[neighbourx,neighboury,neighbourz]]);
      }
    }
    
    // left
    if(current && current.linkable.l){
      neighbour = space[neighbourx = current.linkable.l[0]][neighboury = current.linkable.l[1]][neighbourz = current.linkable.l[2]];
      if(neighbour && neighbour.surrogate_of){
        neighbour = space[neighbourx = neighbour.surrogate_of[0]][neighboury = neighbour.surrogate_of[1]][neighbourz = neighbour.surrogate_of[2]];
      }
      if(neighbour && neighbour.linkable.r && !current.links.l && !neighbour.links.r && (current.id != 0 || neighbour.id != 0)){
        roadlinks.push([[cursorx,cursory,gridz],[neighbourx,neighboury,neighbourz]]);
      }
    }
    
    links();
    turns();
    for(i of roads){
      if(i){
        barriers(i);
      }
    }
    
    
  }
  
  // suppr/del (remove an item)
  else if(_){
    
    // Check existence and removability
    console.log(0);
    if(space[cursorx][cursory][gridz] && !space[cursorx][cursory][gridz].fixed){
      
      var X = cursorx;
      var Y = cursory;
      var Z = gridz;
      
      console.log(1);
      
      // Delete space cell and surrogates
      if(space[X][Y][Z].surrogate_of){
        [X,Y,Z] = space[X][Y][Z].surrogate_of;
      }
      if(space[X][Y][Z].surrogates){
        for(i of space[X][Y][Z].surrogates){
          space[i[0]][i[1]][i[2]] = 0;
        }
      }
      
      // Increment inventory
      var inventoryid = space[X][Y][Z].inventoryid;
      inventory[inventoryid][2]++;
      C.$(`qty${inventoryid}`).innerHTML = inventory[inventoryid][2] + "/" + inventory[inventoryid][1];
      
      // Delete neighbours links
      if(space[X][Y][Z].links.u){
        //console.log(space[X][Y][Z].links.u);
        space[space[X][Y][Z].links.u[0]][space[X][Y][Z].links.u[1]][space[X][Y][Z].links.u[2]].links.d = 0;
      }
      if(space[X][Y][Z].links.r){
        space[space[X][Y][Z].links.r[0]][space[X][Y][Z].links.r[1]][space[X][Y][Z].links.r[2]].links.l = 0;
      }
      if(space[X][Y][Z].links.d){
        space[space[X][Y][Z].links.d[0]][space[X][Y][Z].links.d[1]][space[X][Y][Z].links.d[2]].links.u = 0;
      }
      if(space[X][Y][Z].links.l){
        space[space[X][Y][Z].links.l[0]][space[X][Y][Z].links.l[1]][space[X][Y][Z].links.l[2]].links.r = 0;
      }
      
      // Delete space slot
      space[X][Y][Z] = 0;
      
      // Delete HTML container
      C.$(`road-${X}-${Y}-${Z}`).remove();
      
      // Remove road
      for(i in roads){
        if(roads[i]){ 
          if(roads[i][0] == X && roads[i][1] == Y && roads[i][2] == Z){
            roads[i] = 0;
          }
        }
      }
    
      // Remove links attached to this block
      for(i in roadlinks){
        for(j = 0; j < 2; j++){
          if(roadlinks[i]){
            if(roadlinks[i][j][0] == X && roadlinks[i][j][1] == Y && roadlinks[i][j][2] == Z){
              
              /*if(space[roadlinks[i][j][0]-1][roadlinks[i][j][1]][Z]){
                space[roadlinks[i][j][0]-1][roadlinks[i][j][1]][Z].links.r = 0;
              }
              if(space[roadlinks[i][j][0]][roadlinks[i][j][1]-1][Z]){
                space[roadlinks[i][j][0]][roadlinks[i][j][1]-1][Z].links.d = 0;
              }
              if(space[roadlinks[i][j][0]+1][roadlinks[i][j][1]][Z]){
                space[roadlinks[i][j][0]+1][roadlinks[i][j][1]][Z].links.l = 0;
              }
              if(space[roadlinks[i][j][0]][roadlinks[i][j][1]+1][Z]){
                space[roadlinks[i][j][0]][roadlinks[i][j][1]+1][Z].links.u = 0;
              }*/
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
  }
  
  // Update view after an action
  if(rerender||L||R||U||D||S||_){
    C.camera({x:cursorx*size+size/2, y:cursory*size+size/2, z:gridz*sizeh, rz:gridrzreal, rx:40, el:400});
    C.move({n:"cursor",x:cursorx*size+size/2,y:cursory*size+size/2,z:gridz*sizeh});
    rerender = 0;
    
    // Cursor color (if there's already something here or on top of the slope or no more quantity)
    if(
      space[cursorx][cursory][gridz] 
      || inventory[selected][2] == 0
      || 
      (
        space[cursorx][cursory][gridz+1]
        &&
        (
          inventory[selected][0] == 5
          || inventory[selected][0] == 6
          || inventory[selected][0] == 7
          || inventory[selected][0] == 9
        )
      )
    ){
      cursor.style.background = "#e668"; // red
    }
    else {
      cursor.style.background = "#9f88"; // green
    }
  }
  
  // space down + arrow pressed (create link between two blocks if both are linkable)
  if(s){
    
    var prevcursor = space[prevcursorx][prevcursory][gridz];
    if(prevcursor && prevcursor.surrogate_of){
      [prevcursorx,prevcursory,prevcursorz] = prevcursor.surrogate_of;
      prevcursor = space[prevcursorx][prevcursory][prevcursorz];
    }
    
    newcursorx = cursorx;
    newcursory = cursory;
    newcursorz = gridz;
    var newcursor = space[newcursorx][newcursory][newcursorz];
    if(newcursor && newcursor.surrogate_of){
      [newcursorx,newcursory,newcursorz] = newcursor.surrogate_of;
      newcursor = space[newcursorx][newcursory][newcursorz];
    }
    
    if(U){
      if(
        prevcursor && newcursor && (
          prevcursor.linkable.u
          /*||
          (
            prevcursor.surrogate_of 
            && space[prevcursor.surrogate_of[0]][prevcursor.surrogate_of[1]][prevcursor.surrogate_of[2]].linkable.u
          )*/
        )
        && (
          newcursor.linkable.d
          /*||
          (
            newcursor.surrogate_of 
            && space[newcursor.surrogate_of[0]][newcursor.surrogate_of[1]][newcursor.surrogate_of[2]].linkable.d
          )*/
        )
      ){
        roadlinks.push([[prevcursorx,prevcursory,prevcursorz],[newcursorx,newcursory,newcursorz]]);
        links();
        turns();
        for(i of roads){
          if(i){
            barriers(i);
          }
        }
        equations();
      }
    }
    else if(R){
      if(
        prevcursor && newcursor && (
          prevcursor.linkable.r
          /*||
          (
            prevcursor.surrogate_of 
            && space[prevcursor.surrogate_of[0]][prevcursor.surrogate_of[1]][prevcursor.surrogate_of[2]].linkable.r
          )*/
        )
        && (
          newcursor.linkable.l
          /*||
          (
            newcursor.surrogate_of 
            && space[newcursor.surrogate_of[0]][newcursor.surrogate_of[1]][newcursor.surrogate_of[2]].linkable.l
          )*/
        )
      ){
        roadlinks.push([[prevcursorx,prevcursory,prevcursorz],[newcursorx,newcursory,newcursorz]]);
        links();
        turns();
        for(i of roads){
          if(i){
            barriers(i);
          }
        }
        equations();
      }
    }
    else if(D){
      if(
        prevcursor && newcursor && (
          prevcursor.linkable.d
          /*||
          (
            prevcursor.surrogate_of 
            && space[prevcursor.surrogate_of[0]][prevcursor.surrogate_of[1]][prevcursor.surrogate_of[2]].linkable.d
          )*/
        )
        && (
          newcursor.linkable.u
          /*||
          (
            newcursor.surrogate_of 
            && space[newcursor.surrogate_of[0]][newcursor.surrogate_of[1]][newcursor.surrogate_of[2]].linkable.u
          )*/
        )
      ){
        roadlinks.push([[prevcursorx,prevcursory,prevcursorz],[newcursorx,newcursory,newcursorz]]);
        links();
        turns();
        for(i of roads){
          if(i){
            barriers(i);
          }
        }
        equations();
      }
    }
    else if(L){
      if(
        prevcursor && newcursor && (
          prevcursor.linkable.l
          /*||
          (
            prevcursor.surrogate_of 
            && space[prevcursor.surrogate_of[0]][prevcursor.surrogate_of[1]][prevcursor.surrogate_of[2]].linkable.l
          )*/
        )
        && (
          newcursor.linkable.r
          /*||
          (
            newcursor.surrogate_of 
            && space[newcursor.surrogate_of[0]][newcursor.surrogate_of[1]][newcursor.surrogate_of[2]].linkable.r
          )*/
        )
      ){
        roadlinks.push([[prevcursorx,prevcursory,prevcursorz],[newcursorx,newcursory,newcursorz]]);
        links();
        turns();
        for(i of roads){
          if(i){
            barriers(i);
          }
        }
        equations();
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
    draw_block(inventory[i][0], "cursor",.1,.1);
    
    //cursorrz = 0;
    //cursorrzreal = 0;
    rerender = 1;
  }
}
