
//nos redirecciona a los 15 segundos al index. 



function redireccionarPagina() {
        
         window.location = "./index.html";
         sessionStorage.clear();
        
       }
       setTimeout("redireccionarPagina()", 15000);


  

