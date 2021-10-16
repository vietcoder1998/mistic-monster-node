ssh root@210.86.231.152 -p 22222 '
    echo `Connect to server ...`
    cd /home/services_cms

    chmod 400 ~/.ssh/min-game-cms 
    eval `ssh-agent -s`
    ssh-add ~/.ssh/min-game-cms

    echo `Npm setup`
    npm i

    echo `Fetch git remote`
    git status  
    git fetch  
    git checkout develop 
    git reset --hard
    git pull 

    echo `build`
    npm run build 
    rm -rf /var/www/min-game-cms/build
    cp -a /home/services_cms/build/ -p /var/www/min-game-cms/
'
echo 'Executed'