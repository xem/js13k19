// Game loop
// ---------

setInterval(()=> {
  
  // Editor mode:
  if(mode == 1){
    editor();
  }
  
  // Race mode:
  else if(mode == 2){
    race();
  }
  
  // score
  //else if(mode == 3){
    //console.log(timer);
  //}
  
  // Reset 
  S = _ = U = L = D = R = 0;
  
},16);
