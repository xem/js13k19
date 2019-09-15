// Initialization (called when switching modes)
// --------------

window.init = (t = {}) => {
  
  if(navigator.userAgent.includes("Fir")){
    document.body.className="fx";
  }
  world=0;
  if(t.w){
    world = t.w;
  }
  
  originaltrack = t;
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
    
    C.camera({x:900,y:1300,z:900,rx:25});
    
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
    
    //console.log(track);
    
    b.className = "editor w"+world;
    
    // UI
    
    // menu
    b.innerHTML += `${track.n=="A1"?"<div id=tuto></div>":""}<div id=menu>Camera<br>
    <div id=gridup>⇑</div> <div id=griddown>⇓</div> <div id=gridrl>↶</div> <div id=gridrr>↷</div><br>⎯<br>Block<br><div id=blockrl>↶</div> <div id=blockrr>↷</div><br>⎯<br><div id=blockc style=width:120px>Clear all</div>${(unlock&&track.n=="editor")?"<div id=exp>Share":''}`;
    b.innerHTML += `<div id=parts>`;
    
    if(track.n=="A1"){
      tuto.innerHTML = `<h2>Welcome!</h2>Complete the track using space and arrow keys (or WASD/ZQSD).<br>Keep space key pressed to link two road parts.<br>The inventory (at the bottom) tells you how many blocks are available.<br>When you are done, press Enter to drive on your track.<br>While driving, press Enter to restart or Esc to quit.<br>You can try to get better times by drawing a shorter track!<br>PS: if you turn a lot on the road, it will slow you down!<div onclick=tuto.remove()>OK</div>`;
    }
    
    // inventory
    inventory = track.inventory || [];
    for(i = 0; i < Math.max(6,inventory.length); i ++){
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
        selected = i[3];
        draw_block(i[3],"scene",i[0],i[1],i[2],0,i[4],i.length == 5 ? 1 : 0); // fixed
        
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
      //[11, 20, 20], // road with hole
      [12, 20, 20], // trees
      [13, 20, 20], // rocks
    ];
    */
    for(i in inventory){
      j = inventory[i];
      C.$(`qty${i}`).innerHTML = `${j[2]}/${j[1]}`;
      //C.plane({g:`visual${i}`,w:20,h:20,b:"#d90",rx:45,rz:45});
      draw_block(j[0],`visual${i}`,((j[0]==6) ? -.7 : -.5),((j[0]==6) ? -.2 : -.4),((j[0]==6) ? -25 : -15),50,30);
    }
    
    // Ice
    ice = track.ice || [
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
    links();
    turns();
    
    equations();
    
    ui();
  }
  
  // Race mode:
  else if(mode == 2){
    
    //console.log(track);
    //carrx = 0;
    //carry = 0;
    carrz = 0;
    carx = start[0]*size+size/2;
    cary = start[1]*size+size/2;
    carz = start[2]*size+size/2;
    
    b.innerHTML = "<div id=viewport><div id=camera><div id=scene></div></div><h1 id=time></h1><h1 id=speed>";
    
    
    // Create the car
    carz += 20;
    C.group({n:"car",w:0,h:0,rz:90,x:carx,y:cary,z:carz});

      // car body
      C.cube({g:"car",b:"#a33",b2:"#922",b3:"#c44",w:9,d:10,h:4,z:2});
      C.cube({g:"car",b:"#a33",b2:"#922",b3:"#c44",w:9,d:5,h:3,z:6});

      // wheel
      //C.plane({g:"car",b:"#555",w:4,h:4,rx:90,x:5,y:5.5,z:2.9,css:"circle"});
      //C.plane({g:"car",b:"#555",w:4,h:4,rx:90,x:5,y:-5.5,z:2.9,css:"circle"});
      //C.plane({g:"car",b:"#555",w:4,h:4,rx:90,x:-5,y:5.5,z:2.9,css:"circle"});
      //C.plane({g:"car",b:"#555",w:4,h:4,rx:90,x:-5,y:-5.5,z:2.9,css:"circle"});

      // wheel depth
      C.plane({g:"car",b:"#555",w:1.2,h:3.9,rx:90,ry:0,x:5.2,y:4,z:3});
      C.plane({g:"car",b:"#555",w:1.2,h:3.9,rx:90,ry:0,x:5.2,y:-4,z:3});
      C.plane({g:"car",b:"#555",w:1.2,h:3.9,rx:90,ry:0,x:-5.2,y:4,z:3});
      C.plane({g:"car",b:"#555",w:1.2,h:3.9,rx:90,ry:0,x:-5.2,y:-4,z:3});
      
    checkpoints = 0;
    
    for(i of roads){
      if(i){
        draw_block(i[3],"scene",i[0],i[1],i[2],0,i[4],0);
      }
    }
    
    for(i of ice){
      C.plane({x:i[0]*size,y:i[1]*size,w:i[2]*size,h:i[3]*size,css:"ice",o:"top left",bp: (-i[0]*size) + C.unit +  " " + (-i[1] * size) + C.unit});
    }
    
    
    links();
    for(i of roads){
      if(i){
        barriers(i)
      }
    }
    links();
    
    turns();
      
    //setTimeout(()=>{
      b.className = "race w"+world
    //}, 2000);
    
    // Compute the equation of every road block
    equations();
    
    
    timer = -1;
    speeder = 0;
    air = 1;
    vspeed = 0;
    carspeed = 0;
    carrz = 0;
    carrzd = 0;
    carangledisplay = 0;
    speedduringcollision = 0;
    collision = 0;
    
  }
  
  else if(mode == 3){
    var html = "<div class=s>Score: "+(timer.toFixed(2).replace(".",":"));
    if(+timer.toFixed(2) <= track.gold){
      html += "<br>🏆 YOU BEAT THE DEV'S TIME!";
      if(track.n){
        localStorage["backontrack"+track.n]="🏆";
      }
    }
    else if(+timer.toFixed(2) <= track.gold+.2){
      html += "<br>🥇 GOLD";
      if(track.n){
        localStorage["backontrack"+track.n]="🥇";
      }
    }
    else if(+timer.toFixed(2) <= track.silver){
      html += "<br>🥈 SILVER<br>(gold: "+((track.gold+.2).toFixed(2).replace(".",":"))+")";
      if(track.n){
        if(localStorage["backontrack"+track.n] != "🥇"){
          localStorage["backontrack"+track.n]="🥈";
        }
      }
    }
    else if(+timer.toFixed(2) <= track.bronze){
      html += "<br>🥉 BRONZE<br>(silver: "+(track.silver.toFixed(2).replace(".",":"))+")";
      if(track.n){
        if(!localStorage["backontrack"+track.n]){
          localStorage["backontrack"+track.n]="🥉";
        }
      }
    }
    else {
      html += "<br>(bronze: "+(track.bronze.toFixed(2).replace(".",":"))+")";
    }
    
    html+="<br><br><sub>enter: retry / esc: quit";
    
    b.innerHTML = html;
  }
  
}

mode = 0;
init(levels.title);
