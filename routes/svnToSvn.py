# -*- coding: UTF-8 -*-
'''
一键更新，更新最新的源文件，然后复制到指定目录，上传svn (本文件功能只限单个文件使用)
作者：kongyanan
时间：2016-11-23
'''

# 导入svn 包
import svn
import sys
import os

source_file = "/Users/koba/Documents/Game/common/popup/PopupNetLayer.lua"
target_file = "/Users/koba/Documents/workspace/testsvn/src/PopupNetLayer.lua"


# 拷贝 文件夹下的东西到指定文件夹
def copyDir(pPath,newPath):

	if (pPath.find(".svn") > 0 or pPath.find(".DS_Store") > 0):
		return

	if os.path.isfile(pPath):
		open(newPath, "wb").write(open(pPath, "rb").read())
	else:
		for file in os.listdir(pPath):
			sourceFile = os.path.join(pPath,file)
			targetFile = os.path.join(newPath,file)
			if os.path.isdir(sourceFile):
				if not os.path.exists(targetFile):
					os.makedirs(targetFile)
			copyDir(sourceFile,targetFile)


# 获取最后一个版本号
def getLastChangeVersion(pSvnPath):
	cmd_svninfo = "svn info " + pSvnPath + " | grep 'Last Changed Rev'"
	svninfo = svn.execSys(cmd_svninfo)
	return svninfo[1][18:-1]

# 获取提交日志
def getLogMessage(pSvnPath,pverison):
	cmd_svnlog = "svn log " + pSvnPath + " -r " + pverison
	svninfo = svn.execSys(cmd_svnlog)
	return svninfo[1]

if __name__ == '__main__':

	# 外部传参数
	if len(sys.argv)==2:
		svnPath = sys.argv[1].split(',')
		source_file = svnPath[0]
		# svn更新版本
		svn.svnupdate(source_file)
		lastversion = getLastChangeVersion(source_file)
		svnlog = "rebot commit,log information --> %s version" % lastversion

		print("最新版本号："+lastversion)

		for target_file in svnPath:
			if target_file != source_file:
				copyDir(source_file,target_file)
				
				isSuccess = svn.svncommit(target_file,svnlog)
				if isSuccess:
					print("已更新: "+target_file)
				else:
					print("未更新："+target_file)
	else:
		# svn更新版本,本地测试
		svn.svnupdate(source_file)
		lastversion = getLastChangeVersion(source_file)
		svnlog = "rebot commit,log information --> %s version" % lastversion

		copyDir(target_file,source_file)
		isSuccess = svn.svncommit(target_file,svnlog)
		if isSuccess:
			print("已更新: "+target_file)


