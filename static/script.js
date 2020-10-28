// download commands from server...
function getcommand()
{
    fetch("http://localhost:5000/getcommand").then(function(response){
        response.json().then(function(command){
            if(command['cmd']=='hello')
            {
                alert('hello');
            }
            else if (command['cmd']=="image")
            {
                
            }
        })
    });
}
setInterval(getcommand, 1000);