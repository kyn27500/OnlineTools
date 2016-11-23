
exec osascript <<EOF 
       tell application "Terminal"
		reopen
		activate
		do script "cd /Users/koba/Documents/workspace/NodeJs/TestNodejs;supervisor bin/www"
	end tell
EOF

exit 0