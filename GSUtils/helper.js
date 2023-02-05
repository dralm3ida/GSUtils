function exists(value){
   var res = false;
   if ( (undefined != value) && (null != value) ){ res = true; }
   return res;
 }
 
 function isEmpty(value) {
   return !(exists(value) && value != "");
 }
 