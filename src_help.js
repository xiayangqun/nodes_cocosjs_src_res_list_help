/**
 * Created by xiayangqun on 16/8/26.
 */

var fs=require("fs");


process.chdir("../");
var dir=process.cwd();
console.log("\n\033[36m当前项目目录是:\033[39m")
console.log(dir);


/*
*   遍历文件列表时候的写入优先级.如下实例最后写入的结果是这个样子的
*
*
*
*
 src/resource.js
 src/Model/Tool/NoticeCenter.js
 src/Model/Tool/Tools.js
 src/Model/Tool/Display.js
 src/Model/Net/HttpBridge.js
 src/View/BaseGUI/BaseScene.js
 src/View/BaseGUI/BaseLayer.js
 src/View/TestScene/TestLayerA.js
 src/View/TestScene/TestLayerB.js
 src/View/TestScene/TestScene.js
 src/View/TestScene/StateLayer.js
 src/app.js
*
* */
var dirPriority=[

    'resource.js',
    'Model/Tool',
    'Model',
    'View/BaseGUI',
    'View',
];



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


var defiendIndex=99999;

if(dirPriority.length>0)
{

    JSFileArray.sort(function (element1,element2) {

        var element1Index=defiendIndex;
        var element2Index=defiendIndex;


        dirPriority.forEach(function (value,pos,array) {

            if(element1Index==defiendIndex&&element1.indexOf(value)!=-1)
                element1Index=pos;

            if(element2Index==defiendIndex&& element2.indexOf(value)!=-1)
                element2Index=pos;

        });

        return element1Index-element2Index;

    });

}

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