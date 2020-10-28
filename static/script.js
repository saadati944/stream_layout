// download commands from server...
function getcommand()
{
    fetch("http://localhost:5000/command").then(function(response){
        response.json().then(function(command){
            if(command['cmd']=='hello')
            {
                alert('hello');
            }
        })
    });
}
setInterval(getcommand, 1000);