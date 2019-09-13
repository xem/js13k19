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
    if(track.n){
      init(levels[track.n]);
    }
    else {
      init({roads:[],roadlinks:[],inventory:track.inventory,ice:track.ice});
    }
  }
  
  // Export
  if(top.exp) exp.onclick = () => {
    var roadsmin = JSON.parse(JSON.stringify(roads));
    roadsmin = roadsmin.filter(a=>a!=0);
    var roadlinksmin = JSON.parse(JSON.stringify(roadlinks));
    roadlinksmin = roadlinksmin.filter(a=>a!=0);
    //window.open("//xem.github.io/js13k19/share/#"+btoa(JSON.stringify({roads:roadsmin,roadlinks:roadlinksmin,inventory:[]})));
    console.log(JSON.stringify({roads:roadsmin,roadlinks:roadlinksmin,inventory:[]}));
  }
  
  // load
  if(top.load) load.onclick = () => {
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
    var html = "<div class=m><h1>Puzzles</h1>";
    for(i = 1; i < 7; i++){
      html += "<div onclick='mode=1;init(levels.A"+i+"); play(musics.editor[0],musics.editor[1],1100,16600)'>" + (localStorage["backontrackA"+i] || i) + "</div>";
    }
    
    /*html += "<br><br><h1>Desert</h1>";
    for(i = 1; i < 6; i++){
      html += "<div onclick='mode=1;world=1;init(levels.B"+i+"); play(musics.editor[0],musics.editor[1],1100,16600)'>" + (localStorage["backontrackB"+i] || i) + "</div>";
    }*/
    
    html += "<br><br><h1>More puzzles</h1><a href='//xem.github.iom/js13k19/more'>here!</a><br><br><h1>Coil bonus</h1>" +
    
    (
      (document.monetization || true)
      ? "<div onclick='mode=1;world=1;init(levels.editor);play(musics.editor[0],musics.editor[1],1100,16600)'>Track editor</div>"
      :"<a href='//coil.com/signup'>Join!"
    );
    
    b.innerHTML = html;
    mode = 99;
    
    play(musics.menu[0],musics.menu[0],7100,7100)
    
  }
}