function placeTemplate()
{
    var cmd = spawn('cmd',undefined,{cwd:dir.editorHub.root})
        cmd.stdout.on('output',(output) =>
        {
            alert(output);
        });
        cmd.stderr.on('err',(err) =>
        {
            alert(err)
        });
    cmd.stdin.write(`curl -o "myTemplate.aep" "https://brianjosephstudio.github.io/templates/SC_Watermark.aep"\n`);
    cmd.stdin.end();
};
