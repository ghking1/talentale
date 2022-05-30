kill `ps -aux | grep "node talenttech.js" | grep -v "grep" | head -n 1 | tr -s ' ' | cut -d ' ' -f 2` &> /dev/null
cd /var/www/talenttech
node talenttech.js &>>/var/log/talenttech.log & disown -h %1
