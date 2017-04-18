cd build
cp index.html ../../steamlog/templates/
rm -rf ../../steamlog/static
cp -r static ../../steamlog/
echo 'Installed to Flask app'
