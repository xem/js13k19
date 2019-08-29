// Inputs (source: https://xem.github.io/articles/jsgamesinputs.html)
// ------ 

onkeydown=onkeyup=z=>top['lurdl*d*l_ur*u*s$***'[(z.which+3)%20]]=top['LURDL*D*L_UR*U*S$***'[(z.which+3)%20]]=z.type[5]

// Editor
gridup.onclick = () => {
  if(gridz < 10) gridz++;
  C.move({n:"grid", z: gridz * sizeh})
  C.move({n:"cursor", z: gridz * sizeh})
  C.camera({z:500+gridz*sizeh})
}

griddown.onclick = () => {
  if(gridz) gridz--;
  C.move({n:"grid", z: gridz * sizeh})
  C.move({n:"cursor", z: gridz * sizeh})
  C.camera({z:500+gridz*sizeh})
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
  //if(inventory[selected][0] > 0){
    if(cursorrz == 0) cursorrz = 360;
    cursorrz -= 90;
    cursorrzreal -= 90;
    C.move({n:"cursor",rz:cursorrzreal})
  /*}
  else {
    cursorz = 0;
    cursorzreal = 0;
  }*/
}

blockrr.onclick = () => {
  //if(inventory[selected][0] > 0){
    if(cursorrz == 360) cursorrz = 0;
    cursorrz += 90;
    cursorrzreal += 90;
    C.move({n:"cursor",rz:cursorrzreal})
  /*}
  else {
    cursorz = 0;
    cursorzreal = 0;
  }*/
}
