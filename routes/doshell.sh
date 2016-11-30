
echo "$1"

exec osascript <<EOF 
       tell application "Terminal"
		reopen
		activate
		do script "$1 $2 $3"
	end tell
EOF

exit 0