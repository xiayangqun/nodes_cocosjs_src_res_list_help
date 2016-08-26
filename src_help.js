/**
 * Created by xiayangqun on 16/8/26.
 */

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
console.log('\n\033[36m找到js文件列表如下\033[39m');

for(var i=0;i<JSFileArray.length;i++)
    console.log(JSFileArray[i]);


//将JS文件写入到project.json中
var projectStr=fs.readFileSync('project.json','utf-8');
var projectObj=JSON.parse(projectStr);
projectObj['jsList']=JSFileArray;
var wirteString=JSON.stringify(projectObj,null,2);
fs.writeFileSync('project.json',wirteString,'utf-8');
console.log("\n\033[36mjs文件列表已经写入到 project.json文件里了\033[39m");