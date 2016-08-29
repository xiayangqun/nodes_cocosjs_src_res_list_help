/**
 * Created by xiayangqun on 16/8/26.
 */


var fs=require("fs");


process.chdir("../");
var dir=process.cwd();
console.log("\n\033[36m当前项目目录是:\033[39m")
console.log(dir);

var resArray=[];
var listResFile=function (path) {

    var fileList=fs.readdirSync(path);

    for(var i=0;i<fileList.length;i++)
    {
        var fileName= fileList[i];
        if(fileName.charAt(0)=='.')
            continue;

        var state=fs.statSync(path+'/'+fileName);
        if(state.isDirectory())
            listResFile(path+'/'+fileName);
        else if(fileName.indexOf('.js')!=-1 && fileName.indexOf('.json')==-1)
            console.log('\033[31m在res下有个js文件??!! :'+path+'/'+fileName+'\033[39m');
        else
            resArray.push(path + '/' + fileName);

    }
}


listResFile('res');
console.log('\n');

console.log('\033[36m找到res文件列表如下:\033[39m');
for(var i=0; i<resArray.length;i++)
    console.log(resArray[i]);


//将res列表写入到src/resource.js中
var str=resArray.join('",\n\t"');
str='var g_resources=[\n\t"'+str+'"\n];';
fs.writeFileSync('src/resource.js',str,'utf-8');
console.log("\n\033[36mres文件列表已经写入到src/resource.js文件里了\033[39m");