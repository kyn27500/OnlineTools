 #coding=utf-8
'''
一键更新，更新最新的源文件，然后复制到指定目录，上传svn (本文件功能只限单个文件使用)
作者：kongyanan
时间：2016-11-23
'''

# 导入svn 包
import svn
import sys


source_file = "/Users/koba/Documents/Game/common/popup/PopupNetLayer.lua"
target_file = "/Users/koba/Documents/Game/common/popup/PopupNetLayer1.lua"

# 拷贝 文件夹下的东西到指定文件夹
def copyDir(pPath,newPath):
	for file in os.listdir(pPath):
		sourceFile = os.path.join(pPath,file)
		targetFile = os.path.join(newPath,file)
		if os.path.isfile(sourceFile):
			if not (sourceFile.find(".svn") > 0 or sourceFile.find(".DS_Store") > 0):
				open(targetFile, "wb").write(open(sourceFile, "rb").read()) 
				copyFile(targetFile,sourceFile)
		else:
			if not (sourceFile.find(".svn") > 0 or sourceFile.find(".DS_Store") > 0):
				# print(targetFile)
				if not os.path.exists(targetFile):
					# print(targetFile)
					os.makedirs(targetFile)
				copyDir(sourceFile,targetFile)

# 拷贝文件
def copyFile(pTargetFile,pSourceFile):
	open(pTargetFile, "wb").write(open(pSourceFile, "rb").read())

# 获取最后一个版本号
def getLastChangeVersion(pSvnPath):
	cmd_svninfo = "svn info " + pSvnPath + " | grep 'Last Changed Rev'"
	svninfo = svn.execSys(cmd_svninfo)
	
	return svninfo[1][18:]


if __name__ == '__main__':

	# version = svn.svnupdate(source_file)
	# version = svn.getVesionCode(source_file)
	# print(version)
	lastversion = getLastChangeVersion(source_file)
	print(lastversion)


