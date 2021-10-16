#!/bin/sh
# Purpose: Lazy command in shell
# Auth: Tran duy viet
#-------

# variable
CHECK_MARK="\033[0;32m\xE2\x9C\x94\033[0m"
RED='\033[0;31m'
NC='\033[0m'
comment_type="fig bug"
op0="fix bug"
op1="feature "
op2="hot-fix"
sw="0"
auth="viettd"
link="http://210.86.231.152:3010/api-docs"

# log first

# scripting
echo -e "✨ Hello, well come to quick lazy deploy ✨" 
echo -e "New see your git log: "

echo -e "\x1b[35m# You can setup new auth by change auth $NC"
read -p "🕵️‍♂️ Author is: [$auth] --> " comment; echo -e " $CHECK_MARK $NC"

echo -e "Chose case option commit: \n"
echo "u -> $op0 (default)" 
echo "i -> $op1"
echo "o -> $op2"

read -p "Press your option: " sw 
case "$sw" in
    "u") 
        comment_type=$op0;;
    "i") 
        comment_type=$op1;;
    "o") 
        comment_type=$op2;;
    *)
        comment_type=$sw;;
esac

echo -e "--> $comment_type $CHECK_MARK "

now=$(date)
echo "Your full comment is: [$auth]-$comment_type-$comment-$now"
echo "𓀌𓀌 Ready for push "

# count down to push
count=3
while [ $count -gt 0 ]
do 
    echo -e "$CHECK_MARK $count..."
    count=`expr $count - 1`
    sleep 1
done
#end_

# deploy
echo "Finished"
git status
git add .
git commit -m "[$auth] - $comment - $comment - $now"
git push

#end
bash script/dev.sh
echo -p 'Executed success, check in: '

#~detroy
unset sw comment_type now op0 op1 op2 next is_next fn