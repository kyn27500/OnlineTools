var express = require('express');
var router = express.Router();

/* GET home page. */
var resp;

router.get('/', function(req, res, next) {

  var id = req.query.id;
  resp = res;
  // 1-2拷贝文件
  if(id<=2){
  	copy(id);
  }
  // 4.打印LUA日志，5.打Android包
  else if(id<=4){
  	var scriptPath = [
  		"/routes/logcat.sh",
  		"/routes/package.sh"
  	];

  	var fullPath = process.cwd()+scriptPath[id-3];
  	execShell(fullPath);
  }
  // 打开 adb shell
  else if (id==5){
  	var fullPath = process.cwd()+ "/routes/openAdbShell.sh";
  	execShell(fullPath);
  }
  // 拷贝东西
  else if (id <=8){
  	var fileDir = "/Users/koba/Documents/Game/game5/"
  	var phoneDir = "/sdcard/shouyou/apps/game5/"
  	var copyFileName = ["cocos","res","src"]

  	var scriptPath = process.cwd()+ "/routes/copyToPhone.sh";
  	var cmd = scriptPath + " " + fileDir+copyFileName[id-6]+" " + phoneDir+copyFileName[id-6]
  	execShell(cmd);
  }

  else{
  	res.render('index', {text:"欢迎使用在线工具！"});
  }

});


// 拷贝文件
function copy(id){

	var copyPath = [
		["/Users/koba/Documents/mobile_client/meishu/ui/GameAllStar_new/res/res/csb","/Users/koba/Documents/Game/game5/res/csb",".csb"],
		["/Users/koba/Documents/quanmingxing/res/res/an","/Users/koba/Documents/Game/game5/res/an",".csb"]
	];

	var py = process.cwd()+"/routes/A-CopyCsb.py";
	var cmd = py+' '+copyPath[id-1][0]+' '+copyPath[id-1][1]+' '+copyPath[id-1][2]
	execPy(cmd);
}

// 执行python 文件
function execPy(pCmd,pCallback){

	var exec = require('child_process').exec;

	exec('python '+pCmd,function(error,stdout,stderr){
	    if(stdout.length >1){
	        printToHtml(stdout);
	    } else {
	        console.log('you don\'t offer args');
	    }
	    if(error) {
	        printToHtml("\nerror:"+stderr);
	    }
	});
}

// 执行shell文件
function execShell(pCmd,pCallback){

	var exec = require('child_process').exec;

	exec('sh '+pCmd,function(error,stdout,stderr){
	    if(stdout.length >1){
	        printToHtml("程序已启动！");
	    } else {
	        console.log('you don\'t offer args');
	    }
	    if(error) {
	        printToHtml("\nerror:"+stderr);
	    }
	}); 
}


// print html
function printToHtml(ptext){
	console.log(ptext);
	resp.render('index', {text:ptext});
}

module.exports = router;
