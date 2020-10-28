var id=0;

function getinitcommands(){
    fetch("http://localhost:5000/initcommands").then(function(response){
        response.json().then(function(command){
            id+=1;
            if(command['cmd']=='startlistening')
            {
                setInterval(getcommand, 1000);
            }
            //handle image command
            else if (command['cmd']=="image")
            {
                let img=document.createElement('img');
                img.setAttribute('src',"content/"+command['src']);
                img.setAttribute('style',"width:"+command['width']+"px; height:"+command['height']+"px; top:"+command['y']+"px; left:"+command['x']+"px;")
                let removeid='delete_this_item_with_id:'+id.toString();
                img.setAttribute("id",removeid);

                document.getElementById("body").appendChild(img);

                if (command['duration']!=-1)
                {
                    setTimeout("document.getElementById('"+removeid+"').remove()",command['duration']);
                }
                getinitcommands();
            }
        })
    });
}



// download and process commands from server...
function getcommand()
{
    fetch("http://localhost:5000/getcommand").then(function(response){
        response.json().then(function(command){
            id+=1;
            if(command['cmd']=='hello')
            {
                alert('hello');
            }
            //handle image command
            else if (command['cmd']=="image")
            {
                let img=document.createElement('img');
                img.setAttribute('src',command['src']);
                img.setAttribute('style',"width:"+command['width']+"px; height:"+command['height']+"px; top:"+command['y']+"px; left:"+command['x']+"px;")
                let removeid='delete_this_item_with_id:'+id.toString();
                img.setAttribute("id",removeid);

                document.getElementById("body").appendChild(img);

                if (command['duration']!=-1)
                {
                    setTimeout("document.getElementById('"+removeid+"').remove()",command['duration']);
                }
                getcommand();
            }
            
        })
    });
}

getinitcommands();