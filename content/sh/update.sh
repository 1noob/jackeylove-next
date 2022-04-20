filename=../feed/`date +"%Y-%m-%d-%H-%M"`
echo --- > $filename.mdx
echo date: \"`date +"%Y-%m-%dT%TZ"`\" >> $filename.mdx
echo tags: '["update"]' >> $filename.mdx
echo --- >> $filename.mdx
