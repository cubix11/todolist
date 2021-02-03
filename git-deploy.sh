read reason
git add .
git commit -m $reason
git rm -r --cached .vercel
git commit -m $reason
git push