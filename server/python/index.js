// 使用子进程执行脚本
const Exec = require('child_process').exec


class PythonShell {
    static async PythonShell(api,args){
        arg = " -p ";
        args.forEach(ele => {
            arg += JSON.stringify(ele)
        });
        console.log(arg)
        Exec("python3 server/python/"+api+arg, function(err,stdout,stderr){
            if(err) {
                console.log('get weather api error:'+stderr);
            } else {
                console.log(stdout);
            }
        });
    }

}


module.exports = PythonShell