/**
 * Created by hardy on 2019/1/23.
 */
var arr=[]
    ,arrF=[]//变量提升的问题
    ,arrB=[]//共享一个变量i
    ,arrClosure=[]//是用闭包隔离变量
    ;
for(var i=0;i<6;i++){
    arr.push(i);
    arrF.push(function(){
console.log(i);
    });
    arrB.push(function(){
        console.log(i);
        i++;
    });
    (function(i){
        arrClosure.push(function(){
            console.log(i);
            i++;
        });
    }(i));
}
console.log("%d",arr[0],arr[1],arr[2]);
//变量提升
arrF[0]();
arrF[1]();
arrF[2]();

arrB[0]();
arrB[1]();
arrB[2]();

arrClosure[0]();
arrClosure[1]();
arrClosure[2]();

//基于上述情况，ES6内定义了let,使得其声明的变量只在其所在的代码块内有效

//块级作用域的出现也使得广泛使用的匿名立即执行函数不再必要了。
(function(){
    var a = 10;
}());

//等价于

{
    let a=10;
}

function foo () {
    console.log('I am the outside one')
}

(function(){
    if(false){//ES6中，函数本身的作用域在其所在块级作用域之内，所以立即执行函数里的function虽然存在向上整体提升效果，但只能上浮到if语句块
        //所以最后运行结果输出inside。但在ES5中，很最后会输出outside，因为不存在if块级作用域的限制
        function foo() {
            console.log('I am the inside one')
        }
    }
    foo();

    /*但这个特性很容易引起冲突，因为我们很难判断我们代码的运行环境究竟在哪里，是遵循ES5的法则还是遵循ES6的法则（即使使用babel转码，babel也很难判断按照哪个法则来）。
    所以当这段代码运行在nodejs环境中的时候，编译器会选择直接报错，而并不像理论上分析得到的结果那样。
    我们应该尽量规避上面那种情况，使用严格模式。在严格模式下，函数必须定义在顶级作用域，定义在if，for语句中会直接报错。*/

}());
