ssh root@210.86.231.152 -p 22222 '
    echo `Connect to server ...`
    chmod 400 ~/.ssh/id_rsa_github
    eval `ssh-agent -s`
    ssh-add ~/.ssh/id_rsa_github
    npm publish
'
echo 'Executed'