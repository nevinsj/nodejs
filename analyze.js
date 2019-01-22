/**
 * Created by hardy on 2019/1/21.
 */
var cheerio=require("cheerio");
var config=require("./config");

function findImg(dom,callback){
    var $=cheerio.load(dom);
    $("link").each(function(i,o){
    var imgsrc=config.url+$(this).attr("href");
        callback(imgsrc,i);
    });
}
module.exports.findImg=findImg;