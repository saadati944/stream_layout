import os

commands=[]
initcommands=[]
#loading initcommands if avaliable...

def loadinit():
    if os.path.exists('initcommands.txt'):
        global initcommands
        with open('initcommands.txt' ,'r', encoding='utf-8') as f:
            lines=f.readlines()
            lines.append("end")
            for ln in lines:
                if ln[-1]=='\n':
                    ln=ln[0:-1]
                if ln.startswith('#'):
                    continue;
                elif ln=='':
                    continue;
                initcommands.append(converttojson(ln))

def converttojson(line):
    if line.startswith('image:') and line.count('/')==6:
        params=line[6:].split('/')
        return '{ "cmd":"image" , "src":"'+params[0]+'" , "x":'+params[1]+' , "y":'+params[2]+' , "width":'+params[3]+' , "height":'+params[4]+' , "duration":'+params[5]+' , "mode":'+params[6]+' }'
    elif line=='end':
        return '{ "cmd":"end" }'
    elif line=='listen':
        return '{ "cmd":"startlistening" }'
    elif line.startswith('custome:'):
        return '{"cmd":"custome","el":"'+line[8:].replace('"','\\"')+'"}'
