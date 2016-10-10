
exec osascript <<EOF 
       tell application "Terminal"
		reopen
		activate
		do script "adb shell"
	end tell
EOF

exit 0