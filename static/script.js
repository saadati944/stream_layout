var id=0;
var animationTime=1000;

function getinitcommands(){
    fetch("http://localhost:5000/initcommands").then(function(response){
        response.json().then(function(command){
            id+=1;
            if(command['cmd']=='startlistening')
            {
                setInterval(getcommand, 1000);
                getinitcommands();
            }
            else if (command['cmd']=='end')
            {
                return;
            }
            //handle image command
            else if (command['cmd']=="image")
            {
                addimage(command);
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
                addimage(command);
                getcommand();
            }
            
        })
    });
}

function addimage(command)
{
    let img=document.createElement('img');
    img.setAttribute('src','content/'+command['src']);
    img.setAttribute('style',"width:"+command['width']+"px; height:"+command['height']+"px; top:"+command['y']+"px; left:"+command['x']+"px; ,visibility=hidden;")
    let elementid='added_element_id_is:'+id.toString();
    img.setAttribute("id",elementid);
    
    document.getElementById("body").appendChild(img);
    showelement(elementid,command['mode']);

    if (command['duration']!=-1)
    {
        removeelement(elementid,command['duration'],command['mode']);
        //setTimeout("document.getElementById('"+elementid+"').remove()",command['duration']);
    }
}

function removeelement(idtoremove,timeout,mode=0)
{
    setTimeout("hideelement('"+idtoremove+"',"+mode+")",timeout);
    setTimeout("document.getElementById('"+idtoremove+"').remove()",timeout+animationTime);
}

//0:show without any effects
//1:fade in element
function showelement(idtoshow,mode=0)
{
    console.log('showing '+idtoshow+' with mode:'+mode.toString());
    if (mode==0)
        document.getElementById(idtoshow).style.visibility="visible;";
    else if (mode == 1 )
        document.getElementById(idtoshow).style.animation="fadein "+animationTime.toString()+"ms";
    else if (mode==2)
        document.getElementById(idtoshow).style.animation="topin "+animationTime.toString()+"ms";
    else if (mode==3)
        document.getElementById(idtoshow).style.animation="leftin "+animationTime.toString()+"ms";
    else if (mode==4)
        document.getElementById(idtoshow).style.animation="bottomin "+animationTime.toString()+"ms";
    else if (mode==5)
        document.getElementById(idtoshow).style.animation="rightin "+animationTime.toString()+"ms";
    else if (mode==6)
        document.getElementById(idtoshow).style.animation="zoomin "+animationTime.toString()+"ms";
}
function hideelement(idtohide,mode=0)
{
    console.log('hiding '+idtohide+' with mode:'+mode.toString());
    if (mode==0)
        document.getElementById(idtohide).style.visibility="hidden;";
    else if (mode == 1 )
        document.getElementById(idtohide).style.animation="fadeout "+animationTime.toString()+"ms";
    else if (mode==2)
        document.getElementById(idtohide).style.animation="topout "+animationTime.toString()+"ms";
    else if (mode==3)
        document.getElementById(idtohide).style.animation="leftout "+animationTime.toString()+"ms";
    else if (mode==4)
        document.getElementById(idtohide).style.animation="bottomout "+animationTime.toString()+"ms";
    else if (mode==5)
        document.getElementById(idtohide).style.animation="rightout "+animationTime.toString()+"ms";
    else if (mode==6)
        document.getElementById(idtohide).style.animation="zoomout "+animationTime.toString()+"ms";
}


getinitcommands();