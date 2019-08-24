// Inputs (source: https://xem.github.io/articles/jsgamesinputs.html)
// ------ 

onkeydown=onkeyup=z=>top['lurdl*d*l_ur*u*s$***'[(z.which+3)%20]]=top['LURDL*D*L_UR*U*S$***'[(z.which+3)%20]]=z.type[5]

// Editor
gridup.onclick = () => {
  if(gridz < 10) gridz++;
  C.move({n:"grid", z: gridz * size})
  C.move({n:"cursor", z: gridz * size})
  C.camera({z:500+gridz*size})
  
}

griddown.onclick = () => {
  if(gridz) gridz--;
  C.move({n:"grid", z: gridz * size})
  C.move({n:"cursor", z: gridz * size})
  C.camera({z:500+gridz*size})
}

gridrl.onclick = () => {
  if(gridrz == 0) gridrz = 360;
  gridrz -= 90;
  C.camera({rz:gridrz})
}

gridrr.onclick = () => {
  if(gridrz == 360) gridrz = 0;
  gridrz += 90;
  C.camera({rz:gridrz})
}

/*blocku.onclick = () => {
  cursory -= 1;
  //C.camera({y:cursory * 20 + 10});
  //C.move({n:"cursor",y:cursory*20});
}
blockd.onclick = () => {
  cursory += 1;
  //C.camera({y:cursory * 20 + 10});
  //C.move({n:"cursor",y:cursory*20});
}
blockl.onclick = () => {
  cursorx -= 1;
  //C.camera({x:cursorx * 20 + 10});
  //C.move({n:"cursor",x:cursorx*20});
}
blockr.onclick = () => {
  cursorx += 1;
  //C.camera({x:cursorx * 20 + 10});
  //C.move({n:"cursor",x:cursorx*20});
}*/