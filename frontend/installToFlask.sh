cd build
cp index.html ../../steamlog/templates/profile.html
rm -rf ../../steamlog/static/css
rm -rf ../../steamlog/static/js
cp -r static ../../steamlog/
echo 'Installed to Flask app'
