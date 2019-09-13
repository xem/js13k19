// Game loop
// ---------

setInterval(()=> {
  
  // Menu
  //if(mode == 0){
    
  //}
  
  // Editor mode:
  if(mode == 1){
    editor();
  }
  
  // Race mode:
  else if(mode == 2){
    race();
  }
  
  // score
  else if(mode == 3){
    //console.log(timer);
    if($){
      mode = 2;
      init(track);
    }
  }
  
  // Reset 
  S = _ = U = L = D = R = 0;
  
},16);
