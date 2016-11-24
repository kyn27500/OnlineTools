var express = require('express');
var router = express.Router();

/* GET home page. */
var resp;
var gamenum = 5;

router.get('/', function(req, res, next) {

  var id = req.query.id;
  if (req.query.gameNum){
    gamenum = req.query.gameNum;
  }
  
  resp = res;
  // 1-2拷贝文件
  if(id<=2){

    var copyPath = [
      ["/Users/koba/Documents/mobile_client/meishu/ui/GameAllStar_new/res/res/csb","/Users/koba/Documents/Game/game5/res/csb"],
      ["/Users/koba/Documents/meishu/CocosAnimation/GoldGame/quanmingxing_10.8/quanmingxing\\(3\\)/quanmingxing/res/res/an/","/Users/koba/Documents/Game/game5/res/an"]
    ];
  	copy(copyPath[id-1][0],copyPath[id-1][1]);
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
  	var fileDir = "/Users/koba/Documents/Game/game"+gamenum+"/"
  	var phoneDir = "/sdcard/shouyou/apps/game"+gamenum+"/"
  	var copyFileName = ["cocos","res","src"]

  	var scriptPath = process.cwd()+ "/routes/copyToPhone.sh";
  	var cmd = scriptPath + " " + fileDir+copyFileName[id-6]+" " + phoneDir+copyFileName[id-6]
  	execShell(cmd);
  }

  else if(id <=11){
    var fileDir = "/Users/koba/Documents/game7_20160824/"
    var phoneDir = "/sdcard/shouyou/apps/game7/"
    var copyFileName = ["cocos","res","src"]

    var scriptPath = process.cwd()+ "/routes/copyToPhone.sh";
    var cmd = scriptPath + " " + fileDir+copyFileName[id-9]+" " + phoneDir+copyFileName[id-9]
    execShell(cmd);
  } 

  else if (id == 12 ){
    var sourcePath = "/Users/koba/Documents/molisishe_css/res/res/cube/csb"
    var tagetPath = "/Users/koba/Documents/game7_20160824/res/cube/csb"
    copy(sourcePath,tagetPath)
  } 

  else if(id == 13){
    // 一键更新 PopupNetLayer
    var svnPath = [
      "/Users/koba/Documents/Game/common/popup/PopupNetLayer.lua",
      "/Users/koba/Documents/Game/game5/src/app/views/common/popup/PopupNetLayer.lua",
      "/Users/koba/Documents/game7_20160824/src/app/views/common/popup/PopupNetLayer.lua"
    ]

    var py = process.cwd()+"/routes/svnToSvn.py";
    var cmd = py+' '+svnPath
    execPy(cmd)

  }
  else if(id==14){

    var sourcePath = "/Users/koba/Documents/meishu/CocosAnimation/AllStarGame/PatternAction/res/res"
    var tagetPath = "/Users/koba/Documents/Game/game5/res"

    var svnPath = [sourcePath,tagetPath]
    var py = process.cwd()+"/routes/svnToSvn.py";
    var cmd = py+' '+svnPath
    execPy(cmd)

  }
  else{

  	res.render('index', {text:"欢迎使用在线工具！",gameNum:gamenum});
  }

});


// 拷贝文件
function copy(sourcePath,tagetPath){

	var py = process.cwd()+"/routes/A-CopyCsb.py";
	var cmd = py+' '+sourcePath+' '+tagetPath
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
	resp.render('index', {text:ptext,gameNum:gamenum});
}

module.exports = router;
