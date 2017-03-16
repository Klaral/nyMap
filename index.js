window.onload = function(){
    var outButten = document.getElementById("output");
/*HTMLAnchorElement rekeyBtn = document.getElementsByClassName("getkeybtn");*/

var error = document.getElementById("error");    
var inputTitle = document.getElementById("inputTitle");
var inputAuthor = document.getElementById("inputAuthor");
var addbtn = document.getElementById("addbtn");
var viewbooks = document.getElementById("viewbooks");    
var key = document.getElementById("getkeyButton");
var op = document.getElementById("output");    
var apiKey = "0ovko";  
var resultat = document.getElementById("resultat");

    
    
    key.addEventListener("click", function(event) {
        fetch("https://www.forverkliga.se/JavaScript/api/crud.php?requestKey").then(function(response){
            return response.json();
        }).then(function(object){
            console.log(object);
            apiKey = object.key;
            op.innerHTML = apiKey;
        })
});
    
 
   
    /****viewbooks****/
    
    viewbooks.addEventListener("click", function(event) {
        getBooks();
        function getBooks(){
var url = `https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=${apiKey}`;
   var req = new XMLHttpRequest();
    req.onreadystatechange = function(event){
            
            if(req.status == 200 && req.readyState == 4){
            var svar = JSON.parse(req.responseText);
                if(svar.data){
            console.log(svar);
                lista.innerHTML = "";    
                for( i=0; i < svar.data.length; i++ ){
                      
        var li = document.createElement("li");
            li.innerHTML = svar.data[i].title + ", " + svar.data[i].author;
            lista.appendChild(li);        
                }
                }
                else { getBooks();
                    
                    
                }
            
        }
    
        };
        req.open('GET', url);
        req.send();    
    };
    
    })
    
    /****addbooks****/
     
    addbooks.addEventListener("click", function(event) {
var url = `https://www.forverkliga.se/JavaScript/api/crud.php?op=insert&key=${apiKey}&title=${inputTitle.value}&author=${inputAuthor.value}`;    
   var req = new XMLHttpRequest();
    req.onreadystatechange = function(event){
            
            if(req.status == 200 && req.readyState == 4){
            var data = JSON.parse(req.responseText);
            if(data.status==="error"){error.innerHTML=data.message}
                else{error.innerHTML="Din bok har blivit tillagd"}
                console.log(req.responseText);
            outButten.innerHTML = data.key; 
        }
    
        };
        req.open('GET', url);
        req.send();   
        
        
 });
}