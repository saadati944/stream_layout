import os

commands=[]
initcommands=[]
#loading initcommands if avaliable...

def loadinit():
    if os.path.exists('initcommands.txt'):
        global initcommands
        with open('initcommands.txt' ,'r', encoding='utf-8') as f:
            initcommands=f.read().split('}')
        for i in range(len(initcommands)):
            if initcommands[i]=='' or initcommands[i][0]=='}':
                initcommands[i]='{"cmd":"null"}'
            else:
                initcommands[i]+='}'
