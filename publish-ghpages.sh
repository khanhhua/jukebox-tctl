echo "Building..."
# npm run build

echo "Git operation..."
git add dist
git commit -m 'Publish gh-pages'

git push origin :gh-pages
git subtree push --prefix dist origin gh-pages
