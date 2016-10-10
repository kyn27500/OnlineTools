
echo "文件地址：$1"
echo "目标地址：$2"

exec osascript <<EOF 
       tell application "Terminal"
		reopen
		activate
		do script "adb push $1 $2"
	end tell
EOF

exit 0