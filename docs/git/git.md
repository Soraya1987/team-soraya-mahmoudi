git init
git remote add origin https://github.com/saeedhei/team-soraya-mahmoudi.git
git branch -M main

git add .
git commit -m "eslint rules updated"
git push origin main

git remote add origin https://github.com/saeedhei/team-soraya-mahmoudi.git
git remote -v

error: src refspec main does not match any
error: failed to push some refs to 'https://github.com/saeedhei/devops-github-actions.git'
git checkout -b main
git push origin main
git pull origin main
rm .git/index.lock

…or create a new repository on the command line
echo "# devops-github-actions" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/saeedhei/devops-github-actions.git
git push -u origin main


…or push an existing repository from the command line
git remote add origin https://github.com/saeedhei/devops-github-actions.git
git branch -M main
git push -u origin main



git add .
git commit -m "Save local changes before pull"
git pull origin main




