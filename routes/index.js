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
  else if(id<=4){
  	var scriptPath = [
  		"/routes/logcat.sh",
  		"/routes/package.sh"
  	];

  	var fullPath = process.cwd()+scriptPath[id-3];
  	execShell(fullPath);
  }
  else{
  	res.render('index', {text:"欢迎使用在线工具！"});
  }

});



function copy(id){

	var copyPath = [
		["/Users/koba/Documents/mobile_client/meishu/ui/GameAllStar_new/res/res/csb","/Users/koba/Documents/Game/game5/res/csb",".csb"],
		["/Users/koba/Documents/quanmingxing/res/res/an","/Users/koba/Documents/Game/game5/res/an",".csb"]
	];

	var py = process.cwd()+"/routes/A-CopyCsb.py";
	var cmd = py+' '+copyPath[id-1][0]+' '+copyPath[id-1][1]+' '+copyPath[id-1][2]
	execPy(cmd);
}


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
