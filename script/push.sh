echo `Connect to server ...`
chmod 400 ~/.ssh/id_rsa_github
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa_github
npm publish
echo 'Executed'