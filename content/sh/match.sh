filename=../feed/`date +"%Y-%m-%d-%H-%M"`
echo --- > $filename.mdx
echo date: \"`date +"%Y-%m-%dT%TZ"`\" >> $filename.mdx
echo tags: '["match"]' >> $filename.mdx
echo --- >> $filename.mdx

echo '<Badge variant="emerald" href="https://www.bilibili.com/video/"></Badge>' >> $filename.mdx
