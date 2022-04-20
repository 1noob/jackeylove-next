filename=../video/`date +"%Y-%m-%d-%H-%M"`
echo --- > $filename.mdx
echo title: "">> $filename.mdx
echo date: \"`date +"%Y-%m-%dT%TZ"`\" >> $filename.mdx
echo tags: '[]' >> $filename.mdx
echo --- >> $filename.mdx

echo '<BilibiliVideo bv=""/>' >> $filename.mdx
