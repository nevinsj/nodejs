/**
 * Created by hardy on 2019/1/23.
 */
const fs=require('fs');
const path=require('path');

const rootPath=path.normalize("");

fs.stat(rootPath,function(err,stats){
    console.log(stats);
});
let drlFiles=[];
function findDrl(fdPath){
    fs.readdir(fdPath,function (err,files) {
        if(files){
            files.forEach(function(val){
                let fpath=path.join(fdPath,val);
                fs.stat(fpath,function(err,stats){
                    if(stats){
                        if(stats.isDirectory()){
                            if(val!=="target" && val!=="WEB-INF")
                            findDrl(fpath)
                        }else{
                            drlFiles.push(val);
                            if(val.endsWith(".drl")){
                                console.log(fpath);
                            }
                        }
                    }
                });
            })
        }
    })
}
findDrl(rootPath);
