
exec osascript <<EOF 
       tell application "Terminal"
		reopen
		activate
		do script "adb logcat|grep LUA"
	end tell
EOF

exit 0