cd build
cp index.html ../../steamlog/templates/profile.html
rm -rf ../../steamlog/static
cp -r static ../../steamlog/
echo 'Installed to Flask app'
