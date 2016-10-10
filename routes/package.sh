
exec osascript <<EOF 
    tell application "Terminal"
		activate
		do script "cd /Users/koba/Documents/Game/game5;cocos run -p android"
	end tell
EOF

exit 0