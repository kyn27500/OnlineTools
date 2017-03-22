# -*- coding: utf-8 -*- 
# 检测出差异文件， 
# author: kongyanan
# date : 2015 - 07 - 30

import sys
import os
import hashlib
import shutil

m_old_path = "/Users/koba/Documents/Game/game5/res"
m_new_path = "/Users/koba/Documents/mobile_client/meishu/ui/GameAllStar_new/cocosstudio/res"

m_config_name = "config.kongyanan" 

class FileObj(object):
	"""文件处理"""
	def __init__(self, path ):
		super(FileObj, self).__init__()
		self.path = path

	def getPath(self):
		return self.path

	def getMd5(self):
		if os.path.isfile(self.path):
			f = open(self.path,'rb')
			fileStr = f.read()
			m = hashlib.md5(fileStr)
			self.md5 = m.hexdigest()
			f.close()
			return self.md5



class  FileTool(object):
	"""docstring for  FileTool"""
	def __init__(self, dirPath):
		super( FileTool, self).__init__()
		self.dirPath = dirPath
		self.configPath = os.path.join(dirPath,m_config_name)

	def getFileMap(self):
		tempMap = {}
		if os.path.exists(self.configPath):
			configfile = open(self.configPath)
			tempMap = eval(configfile.read())
			configfile.close()
			return tempMap
		else:
			self.findAllFile(self.dirPath,tempMap)
			self.saveConfigFile(tempMap)
			return tempMap

	def findAllFile(self,dirPath,tempMap):
		fileslist = os.listdir(dirPath)
		for f in fileslist:
			if f == m_config_name:
				pass
			fpath = os.path.join(dirPath,f)
			if os.path.isdir(fpath):
				if f[0] == '.' or f=="csb":
					pass
				else:
					self.findAllFile(fpath,tempMap)
			else:
				if f == ".DS_Store":
					pass
				else:
					fb = FileObj(fpath)
					tempMap[fpath] = fb.getMd5()

	def saveConfigFile( self ,configMap ):

		f = open(self.configPath,"w")
		f.write(str(configMap))
		f.close()


def dealFile(newPath , count):
	oldPath = newPath.replace(m_new_path,m_old_path)

	if os.path.exists(oldPath):
		os.remove(oldPath)

	if not os.path.exists(os.path.dirname(oldPath)):
		os.makedirs(os.path.dirname(oldPath))

	# shutil.copyfile(newPath,oldPath)

	count = count + 1
	print(count)
	print("Update File: %s" % oldPath)
	return count

if  __name__ ==  "__main__":

	# 清理old文件夹下的config文件
	new_config_path = os.path.join(m_new_path,m_config_name)
	old_config_path = os.path.join(m_old_path,m_config_name)
	if os.path.exists(new_config_path):
		print("-- clean up :" + new_config_path)
		os.remove(new_config_path)
		os.remove(old_config_path)

	if not os.path.exists(m_old_path):
		os.mkdir(m_old_path)
	if not os.path.exists(m_new_path):
		os.mkdir(m_new_path)

	# 旧版本 文件
	oldFileTool = FileTool(m_old_path)
	oldmap = oldFileTool.getFileMap()
	# 新版本文件
	newFileTool = FileTool(m_new_path)
	newmap = newFileTool.getFileMap()

	# 对比
	count = 0
	for key in newmap:
		oldkey = key.replace(m_new_path,m_old_path)

		if oldmap.has_key(oldkey):
			if newmap.get(key) != oldmap.get(oldkey):
				oldmap[oldkey] = newmap.get(key)
				count = dealFile(key,count)

		else:
			oldmap[oldkey] = newmap.get(key)
			count = dealFile(key,count)

	
	if count ==0:
		print("no new file !")
	else:	
		oldFileTool.saveConfigFile(oldmap)
		print("\ncopy diff file success!")
		print(time.strftime("%Y-%m-%d %H:%M:%S",time.localtime()))
		dozip()
		
	# raw_input()
