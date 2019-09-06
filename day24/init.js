// Initialization (called when switching modes)
// --------------

var init = (t = {}) => {
  
  track = JSON.parse(JSON.stringify(t));
  
  // Reset the space data
  for(i=0;i<20;i++){
    space[i] = [];
    for(j=0;j<20;j++){
      space[i][j] = [];
    }
  }

  // Reset CSS3D base in the page's body
  b.innerHTML = "<div id=viewport><div id=camera><div id=scene>";
  
  // Menu
  if(mode == 0){
    b.className = "menu";
    
    roads = track.roads || [];
    roadlinks = track.roadlinks ||[];
    for(i of roads){
      if(i){

        // Draw road blocks
        draw_block(i[3],"scene",i[0],i[1],i[2],0,i[4],0);
      }
    }
    
    C.camera({x:900,y:900,z:900,rx:25});
    
    links();
    
    for(i of roads){
      if(i){
        barriers(i)
      }
    }
    
    turns();
    
  }
   
  
  // Editor mode:
  else if(mode == 1){
    
    console.log(track);
    
    b.className = "editor";
    
    // UI
    
    // menu
    b.innerHTML += `<div id=menu>Camera<br>
    <div id=gridup>⇑</div> <div id=griddown>⇓</div> <div id=gridrl>↶</div> <div id=gridrr>↷</div><br>⎯<br>Block<br><div id=blockrl>↶</div> <div id=blockrr>↷</div><br><br><p>Add: <b>space+wasd</b> Remove: <b>Del</b><br>Play: <b>Enter</b></p>⎯<br><div id=blockc style=width:120px>Clear all</div><div id=exp>Export</div> <div id=load>Load</div>⎯<br><div onclick="mode = 0; init(); cl()">Exit`;
    b.innerHTML += `<div id=parts>`;
    
    // inventory
    for(i = 0; i < 6; i ++){
      selected = 0;
      parts.innerHTML += `<div class="part ${i==0?"selected":""}" id=part${i} onclick=select(${i})><div class=visual id=visual${i}></div><div class=remaining id=qty${i}>`;
    }
    
    // Grid
    gridz = 0;
    C.plane({n:"grid",w:size*20,h:size*20,o:"top left"});
    
    // Roads
    /*roads = [ // [x,y,z,type,angle,fixed]
      [5, 10, 0, 1, 0, 1], // start
      [9, 10, 0, 2, 90, 1], // end
      [3, 7, 0, 3, 0, 1], // checkpoint
      [5, 7, 0, 4, 0, 1], // jumper
      [7, 7, 0, 8, 0, 1], // accelerator
      [9, 7, 0, 5, 0, 1], // slope
      [11, 7, 0, 6, 0, 1], // slope up
      [13, 7, 0, 7, 0, 1], // slope down
      [15, 7, 0, 9, 0, 1], // accelerator down
      //[10, 10, 0, 0, 0, 1], // road
    ];*/
    
    roads = track.roads || [];
    
    for(i of roads){
      if(i){
        /*space[i[0]][i[1]][i[2]] = {
          fixed: 1,
          free: 0,
          id: i[3],
          linkable: {},
          links: {},
          flat: {u: 1, r: 1, d: 1, l: 1 },
          barriers: {u: 0, r: 0, d: 0, l: 0},
          surrogate: 0,
          angle: i[4], u: 0, r: 0, d: 0, l: 0,
          equation: "false"
        };*/

        // Draw current road block
        //console.log(i);
        draw_block(i[3],"scene",i[0],i[1],i[2],0,i[4],0);
        
        // Place cursor on start flag
        if(i[3] == 1){ 
          cursorx = cx = i[0];
          carx = cx * size + size / 2;
          cursory = cy = i[1];
          cary = cy * size + size / 2;
          gridz = cz = i[2];
          carz = cz * sizeh;
          C.move({n:"grid", z: gridz * sizeh});
        }
      }
    }
    
    // Road links
    roadlinks = track.roadlinks || [];
    
    // Complete road links not present in the data
    /*for(i of roads){
      if(i[3] == 0){
        
        var other, otherx, othery, otherz;
        
        // top
        other = space[i[0]][i[1]-1][i[2]];
        if(other && other.surrogate_of){
          other = space[otherx = other.surrogate_of[0]][othery = other.surrogate_of[1]][otherz = other.surrogate_of[2]];
        }
        if(other && other.linkable.d){
          roadlinks.push([[i[0],i[1],i[2]],[otherx, othery, otherz]]);
        }
        
        // right
        other = space[i[0]+1][i[1]][i[2]];
        if(other && other.surrogate_of){
          other = space[otherx = other.surrogate_of[0]][othery = other.surrogate_of[1]][otherz = other.surrogate_of[2]];
        }
        if(other && other.linkable.l){
          roadlinks.push([[i[0],i[1],i[2]],[otherx, othery, otherz]]);
        }
        
        
        // bottom
        other = space[i[0]][i[1]+1][i[2]];
        if(other && other.surrogate_of){
          other = space[otherx = other.surrogate_of[0]][othery = other.surrogate_of[1]][otherz = other.surrogate_of[2]];
        }
        if(other && other.linkable.u){
          roadlinks.push([[i[0],i[1],i[2]],[otherx, othery, otherz]]);
        }
        
        
        // left
        other = space[i[0]-1][i[1]][i[2]];
        if(other && other.surrogate_of){
          other = space[otherx = other.surrogate_of[0]][othery = other.surrogate_of[1]][otherz = other.surrogate_of[2]];
        }
        if(other && other.linkable.r){
          roadlinks.push([[i[0],i[1],i[2]],[otherx, othery, otherz]]);
        }
      }
    }*/
    
    /*[
      //[[9,10,0],[10,10,0]],
      //[[10,10,0],[11,10,0]],
    ];*/
    
    // Inventory
    inventory = track.inventory || [];
    
    /*[ // [id, quantity, remaining]
      [0, 60, 60], // road 
      [1, 1, 1], // start
      [2, 1, 1], // end
      [3, 20, 20], // checkpoint 
      [4, 20, 20], // jumper 
      [5, 20, 20], // slope short 
      [6, 20, 20], // slope long "up" 
      [7, 20, 20], // slope long "down" 
      [8, 20, 20], // accelerator 
      [9, 20, 20], // accelerator slope down
      [10, 20, 20], // accelerator slope up
      [11, 20, 20], // road with hole
      [12, 20, 20], // trees
      [13, 20, 20], // rocks
    ];*/
    
    for(i in inventory){
      j = inventory[i];
      C.$(`qty${i}`).innerHTML = `${j[2]}/${j[1]}`;
      //C.plane({g:`visual${i}`,w:20,h:20,b:"#d90",rx:45,rz:45});
      draw_block(j[0],`visual${i}`,((j[0]==6||j[0]==7) ? -.7 : -.5),((j[0]==6||j[0]==7) ? -.2 : -.4),((j[0]==6||j[0]==7) ? -25 : -15),50,30);
    }
    
    // Ice
    ice = [
      //[5,5,8,8], // x,y,w,h
      //[11,11,5,6]
    ];
    
    for(i of ice){
      C.plane({x:i[0]*size,y:i[1]*size,w:i[2]*size,h:i[3]*size,css:"ice",o:"top left",bp: (-i[0]*size) + C.unit +  " " + (-i[1] * size) + C.unit});
    }
    
    //cz = -300;
    //setTimeout(()=>C.camera({rx:.1}),100);
    
    // Cursor
    //cursorx = cursory = 10;
    C.group({n:"cursor",w:size*1.2,h:size*1.2,x:cursorx*size+size/2, y:cursory*size+size/2, z:gridz*sizeh,o:"center"})
    //C.camera({x:cursorx*20+10,y:cursory*20+10,z:-300,rx:20});
    
    
    select(0);
    rerender = 1;
    
    links();
    
    for(i of roads){
      if(i){
        barriers(i)
      }
    }
    
    turns();
    
    equations();
    
    ui();
  }
  
  // Race mode:
  else if(mode == 2){
    
    console.log(track);
    
        
    
    b.innerHTML = "<div id=viewport><div id=camera><div id=scene></div></div><h1 onclick='mode=1;init(track)'>X</h1><h1 id=time></h1><h1 id=speed>0km/h</h1>";
    
    
    // Create the car
    C.group({n:"car",w:0,h:0,rz:90,x:carx,y:cary,z:carz});

      // car body
      C.cube({g:"car",b:"#a33",b2:"#922",b3:"#c44",w:40,d:20,h:7.5,z:4});
      C.cube({g:"car",b:"#a33",b2:"#922",b3:"#c44",w:20,d:20,h:5.5,z:11.5});

      // wheel
      C.plane({g:"car",b:"#555",w:8,h:8,rx:90,x:10,y:11,z:5.8,css:"circle"});
      C.plane({g:"car",b:"#555",w:8,h:8,rx:90,x:10,y:-11,z:5.8,css:"circle"});
      C.plane({g:"car",b:"#555",w:8,h:8,rx:90,x:-10,y:11,z:5.8,css:"circle"});
      C.plane({g:"car",b:"#555",w:8,h:8,rx:90,x:-10,y:-11,z:5.8,css:"circle"});

      // wheel depth
      C.plane({g:"car",b:"#555",w:3,h:7.8,rx:90,ry:90,x:10,y:9.5,z:5.8});
      C.plane({g:"car",b:"#555",w:3,h:7.8,rx:90,ry:90,x:10,y:-9.5,z:5.8});
      C.plane({g:"car",b:"#555",w:3,h:7.8,rx:90,ry:90,x:-10,y:9.5,z:5.8});
      C.plane({g:"car",b:"#555",w:3,h:7.8,rx:90,ry:90,x:-10,y:-9.5,z:5.8});
      
    
    
    for(i of roads){
      if(i){
        draw_block(i[3],"scene",i[0],i[1],i[2],0,i[4],0);
      }
    }
    
    links();
    
    for(i of roads){
      if(i){
        barriers(i)
      }
    }
    
    turns();
      
    setTimeout(()=>{b.className = "race"}, 2000);
    
    // Compute the equation of every road block
    equations();
    
    
    timer = -2.1;
    speeder = 0;
  }
}

mode = 0;
init(levels.TITLE);
