// Inputs (source: https://xem.github.io/articles/jsgamesinputs.html)
// ------ 

onkeydown=onkeyup=z=>top['lurdl*d*l_ur*u*s$***'[(z.which+3)%20]]=top['LURDL*D*L_UR*U*S$***'[(z.which+3)%20]]=z.type[5]

ui = () => {
  
  // Editor
  gridup.onclick = () => {
    if(gridz < 10) gridz++;
    C.move({n:"grid", z: gridz * sizeh})
    C.move({n:"cursor", z: gridz * sizeh})
    //C.camera({z:500+gridz*sizeh})
    rerender = 1;
  }

  griddown.onclick = () => {
    if(gridz) gridz--;
    C.move({n:"grid", z: gridz * sizeh})
    C.move({n:"cursor", z: gridz * sizeh})
    //C.camera({z:500+gridz*sizeh})
    rerender = 1;
  }

  gridrl.onclick = () => {
    if(gridrz == 0) gridrz = 360;
    gridrz -= 90;
    gridrzreal -= 90;
    C.camera({rz:gridrzreal})
  }

  gridrr.onclick = () => {
    if(gridrz == 360) gridrz = 0;
    gridrz += 90;
    gridrzreal += 90;
    C.camera({rz:gridrzreal})
  }

  blockrl.onclick = () => {
    cursorrz -= 90;
    cursorrzreal -= 90;
    if(cursorrz == -90) cursorrz = 270;
    C.move({n:"cursor",rz:cursorrzreal})
    //console.log(cursorrz);
  }

  blockrr.onclick = () => {
    //if(inventory[selected][0] > 0){
      cursorrz += 90;
      cursorrzreal += 90;
      if(cursorrz == 360) cursorrz = 0;
      C.move({n:"cursor",rz:cursorrzreal})
    //console.log(cursorrz);
    /*}
    else {
      cursorz = 0;
      cursorzreal = 0;
    }*/
  }

  // Clear
  blockc.onclick = () => {
    //console.log(1);
    //roads = [];
    //roadlinks = [];
    b.innerHTML = "";
    init(originaltrack);
  }
  
  // Export
  exp.onclick = () => {
    var roadsmin = JSON.parse(JSON.stringify(roads));
    roadsmin = roadsmin.filter(a=>a!=0);
    for(i of roadsmin){
      if(i){
        //i.pop();
      }
    }
    var roadlinksmin = JSON.parse(JSON.stringify(roadlinks));
    roadlinksmin = roadlinksmin.filter(a=>a!=0);
    /*for(i in roadlinksmin){
      if(
        space[roadlinksmin[i][0][0]][roadlinksmin[i][0][1]][roadlinksmin[i][0][2]].id != 0
        ||
        space[roadlinksmin[i][1][0]][roadlinksmin[i][1][1]][roadlinksmin[i][1][2]].id != 0
      ){
        roadlinksmin[i] = 0;
      }
    }*/
    prompt("export:",JSON.stringify({roads:roadsmin,roadlinks:roadlinksmin,inventory:[]}))
  }
  
  // load
  load.onclick = () => {
    var json = JSON.parse(prompt("import:",""));
    b.innerHTML = "";
    //console.log(json);
    if(json){
      init(json);
    }
  }
}

var cl = onclick = () => {
  if(mode == 0){
    var html = "<div class=m><h1>Snow</h1>";
    for(i = 1; i < 9; i++){
      html += "<div onclick='mode = 1; init(levels.A"+i+")'>" + i + "</div>";
    }
    
    html += "<br><br><h1>Desert</h1>";
    for(i = 1; i < 9; i++){
      html += "<div onclick='mode = 1; init(levels.B"+i+")'>" + i + "</div>";
    }
    b.innerHTML = html;
    mode = 99;
  }
}