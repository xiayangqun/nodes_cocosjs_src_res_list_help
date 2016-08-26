/**
 * Created by xiayangqun on 16/8/26.
 */


/*这个脚本的作用是把cocos-js下目录下的src和res文件夹里的东西输出出来
*然后把这些文件列表写入到 project.json 和 src/resource.js文件里
*基于nodeJs的fs模块,针对cocos-js 3.12来编写
*把这个项目文件夹放入到cocos-js的工程的根目录下边(这个文件夹和src,res文件夹应该是平级的)
* */

var fs=require("fs");



process.chdir("../");
var dir=process.cwd();
console.log("\n\033[36m当前项目目录是:\033[39m")
console.log(dir);



var JSFileArray=[];
var listJsFile=function (path) {

    var fileList=fs.readdirSync(path);

    for(var i=0;i<fileList.length;i++)
    {
        var fileName= fileList[i];
        if(fileName.charAt(0)=='.')
            continue;


        var state=fs.statSync(path+'/'+fileName);
        if(state.isDirectory())
            listJsFile(path+'/'+fileName);
        else if( fileName.indexOf('.js')!=-1)
            JSFileArray.push(path + '/' + fileName);

    }

}

listJsFile('src');
console.log('\n\033[36m找到js文件列表如下: :\033[39m');

for(var i=0;i<JSFileArray.length;i++)
    console.log(JSFileArray[i]);


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
        else if(fileName.indexOf('.js')!=-1)
            console.log('\033[31m在res下有个js文件??!! :'+path+'/'+fileName+'\033[39m');
        else
            resArray.push(path + '/' + fileName);

    }
}



listResFile('res');
console.log('\n');

console.log('\033[36m找到res文件列表如下:/\033[39m');
for(var i=0; i<resArray.length;i++)
    console.log(resArray[i]);



//将JS文件写入到project.json中
var projectStr=fs.readFileSync('project.json','utf-8');
var projectObj=JSON.parse(projectStr);

projectObj['jsList']=JSFileArray;
var wirteString=JSON.stringify(projectObj,null,2);
fs.writeFileSync('project.json',wirteString,'utf-8');
console.log("\n\033[36mjs文件列表已经写入到 project.json文件里了");



//将res列表写入到src/resource.js中
var str=resArray.join(',\n\t');
str='var g_resources=[\n\t'+str+"\n];";
fs.writeFileSync('src/resource.js',str,'utf-8');
console.log("\nres文件列表已经写入到src/resource.js文件里了");

































