
import sys
import getopt

def getArgs(args):
	mainArgs = []
	opts,args = getopt.getopt(args[1:],'-p:',['params='])
	for opt_name,opt_value in opts:
		if opt_name in ('-p','--params'):
			mainArgs.append(opt_value)
	return mainArgs