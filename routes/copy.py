# -*- coding: utf-8 -*-
import os
import sys
import shutil



def copy(pPath,newPath,isPrint):
	if (pPath.find(".svn") > 0 or pPath.find(".DS_Store") > 0):
		return

	if os.path.isfile(pPath):
		open(newPath, "wb").write(open(pPath, "rb").read())
		if isPrint:
			print(newPath)
	else:
		for file in os.listdir(pPath):
			sourceFile = os.path.join(pPath,file)
			targetFile = os.path.join(newPath,file)
			if os.path.isdir(sourceFile):
				if not os.path.exists(targetFile):
					os.makedirs(targetFile)
			copy(sourceFile,targetFile,isPrint)

def main():

	oldPath = sys.argv[1]
	newPath = sys.argv[2]

	if not os.path.exists(newPath):
		os.makedirs(newPath)
	
	print("\n开始拷贝...")
	copy(oldPath,newPath,True)
	print("\n拷贝结束...")

if __name__ == '__main__':
	main()