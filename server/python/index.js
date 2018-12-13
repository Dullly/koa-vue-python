// 使用子进程执行脚本
const Exec = require('child_process').exec

class PythonShell {
    // 错误方法
    static async PythonShellError(api,args){
        var arg = "";
        args.forEach(ele => {
            arg +=" -p " + JSON.stringify(ele)
        });
        console.log(arg)
        Exec("python3 server/python/"+api+arg, function(err,stdout,stderr){
            if(err) {
                console.log('获取python参数错误:'+stderr);
            } else {
                console.log("=========");
                console.log(stdout);
                return stdout;
            }
        });
    }
    static PythonShell(api,args){
        return new Promise((resolve, reject) => {
            var arg = "";
            args.forEach(ele => {
                arg +=" -p " + JSON.stringify(ele)
            });
            console.log(arg)
            Exec("python3 server/python/"+api+arg, function(err,stdout,stderr){
                if(err) {
                    console.log('获取python参数错误:'+stderr);
                    reject(new Error('获取python参数错误:'+stderr))
                } else {
                    console.log("=========");
                    console.log(stdout);
                    resolve(stdout)
                }
            });
        })
    }
}

module.exports = PythonShell