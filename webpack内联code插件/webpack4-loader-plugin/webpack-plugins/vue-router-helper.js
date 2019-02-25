'use strict'

const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

var watcher = null
var ready = false
var router_path = [];
var pluginOptions = {
    watch: '',
    config: '',
    filename: ''
}

var ROOT_PATH = {
    watch: '',
    config: ''
}

function getVal(obj, type) {
    var rval = '';
    switch (type) {
        case 1:
            //rval = obj.path + '/' + obj.filename;
            //rval = obj.replace('.vue', '');
            if (obj.filename.substring(0, 1) == '_') {
                rval = obj.path + '/:' + obj.filename.substring(1).replace('.vue', '') + '?';
            } else {
                rval = obj.path + '/' + obj.filename;
                rval = rval.replace('.vue', '');
            }
            break;
        //name
        case 2:

            rval = obj.filename.substring(0, 1) == '_' ? obj.filename.substring(1) : obj.filename;
            rval = obj.path + '/' + rval;
            rval = rval.replace('.vue', '').substring(1).replace('/', '-');
            break;
    }
    return rval;
}

function generateRouter() {

    var strVar = '', indexed = { is: false, num: 0 }, _path = '', _name = '';
    strVar += 'import Vue from "vue";\n'
    strVar += 'import VueRouter from "vue-router";\n\n';

    strVar += 'Vue.use(VueRouter);\n\n'

    strVar += 'const routes = [\n';
    for (var i in router_path) {



        _path = getVal(router_path[i], 1);
        _name = getVal(router_path[i], 2);

        strVar += '  {\n'
        strVar += '    path: "' + _path + '",\n'
        strVar += '    name: "' + _name + '",\n'
        strVar += '    component: resolve => require(["' + router_path[i].component.replace('src/', '../') + '"], resolve)\n'
        strVar += '  },\n\n'

        if (_path == '/index') { indexed.is = true, indexed.i = i }
    }

    // set home
    if (indexed.is) {



        strVar += '  {\n'
        strVar += '    path: "*",\n'
        strVar += '    name: "index",\n'
        strVar += '    component: resolve => require(["' + router_path[indexed.i].component.replace('src/', '../') + '"], resolve)\n'
        strVar += '  },\n\n'

        strVar += '  {\n'
        strVar += '    path: "/",\n'
        strVar += '    name: "index",\n'
        strVar += '    component: resolve => require(["' + router_path[indexed.i].component.replace('src/', '../') + '"], resolve)\n'
        strVar += '  }\n\n'
    }

    strVar += ']\n\n';

    strVar += 'const router = new VueRouter({\n';
    strVar += '    mode: "hash",\n';
    strVar += '    routes: routes\n';
    strVar += '});\n\n';
    strVar += 'export default router;\n'


    return strVar
}





function createFolder(to) { //文件写入
    var sep = path.sep
    var folders = path.dirname(to).split(sep);
    var p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
};


function template(path) {

    var temp_name = path.slice(path.lastIndexOf('\\') + 1).replace('.vue', '');


    var strVar = "";
    strVar += "<template>\n";
    strVar += "    <div class=\"" + temp_name + "\">\n";
    strVar += "    <\/div>\n";
    strVar += "<\/template>\n";
    strVar += "\n";
    strVar += "<script>\n";
    strVar += "export default {\n";
    strVar += "    name: '" + temp_name + "',\n";
    strVar += "    data(){\n";
    strVar += "        return {\n";
    strVar += "\n";
    strVar += "        }\n";
    strVar += "    },\n";
    strVar += "\n";
    strVar += "    created() {\n";
    strVar += "\n";
    strVar += "    },\n";
    strVar += "\n";
    strVar += "    components: {\n";
    strVar += "\n";
    strVar += "    },\n";
    strVar += "\n";
    strVar += "    computed: {\n";
    strVar += "\n";
    strVar += "    },\n";
    strVar += "\n";
    strVar += "    mounted(){\n";
    strVar += "\n";
    strVar += "    },\n";
    strVar += "\n";
    strVar += "    methods: {\n";
    strVar += "\n";
    strVar += "    }\n";
    strVar += "}\n";
    strVar += "<\/script>\n";
    strVar += "\n";
    strVar += "<style lang=\"scss\" scoped>\n";
    strVar += "\n";
    strVar += "<\/style>\n";
    strVar += "\n";
    return strVar;
}


function writeTemplate(path) {

    fs.readFile(path, function (err, data) {
        if (err) throw err;

        if (data.toString() == '') {

            fs.writeFile(path, template(path), function (err) {
                if (err) {
                    throw err;
                }
            });
        }
    });




}



function doRouter() {
    router_path = [];
    readDirSync(pluginOptions.watch);

    var r_path = pluginOptions.config + '/' + pluginOptions.filename;

    //创建文件
    createFolder(r_path);

    //写入文件
    fs.writeFile(r_path, generateRouter(), function (err) {
        if (err) {
            throw err;
        }
    });
}



function readDirSync(path) {

    var pa = fs.readdirSync(path);
    pa.forEach(function (ele, index) {
        var info = fs.statSync(path + "/" + ele)
        if (info.isDirectory()) {
            readDirSync(path + "/" + ele);
        } else {
            var r_path = path + `/` + ele;
            router_path.push({
                filename: ele,
                path: path.replace(pluginOptions.watch, ''),
                component: r_path
            })
        }
    })
}




function randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var pos;

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}


var watch = function () {

    // 文件新增时
    function addFileListener(path_) {
        if (ready) {

            new Promise((resolve, reject) => {
                doRouter();
                resolve();
            }).then(() => {
                writeTemplate(path_);
            });

            //console.log('ROUTER_ROOT_PATH:' + ROUTER_ROOT_PATH)
            console.log('File', path_, 'has been added')
        }
    }
    function addDirecotryListener(path) {
        if (ready) {
            doRouter();
            console.log('Directory', path, 'has been added')
        }
    }

    // 文件内容改变时
    function fileChangeListener(path_) {
        doRouter();
        console.log('File', path_, 'has been changed')
    }

    // 删除文件时，需要把文件里所有的用例删掉
    function fileRemovedListener(path_) {
        doRouter();
        console.log('File', path_, 'has been removed')
    }

    // 删除目录时
    function directoryRemovedListener(path) {
        doRouter();
        console.info('Directory', path, 'has been removed')
    }

    if (!watcher) {
        watcher = chokidar.watch(ROOT_PATH.watch)
    }
    watcher
        .on('add', addFileListener)
        .on('addDir', addDirecotryListener)
        .on('change', fileChangeListener)
        .on('unlink', fileRemovedListener)
        .on('unlinkDir', directoryRemovedListener)
        .on('error', function (error) {
            console.info('Error happened', error);
        })
        .on('ready', function () {
            doRouter();
            //console.info('Initial scan complete. Ready for changes.');
            ready = true
        })
}




function VueRouterHelper(options) {
    // 使用配置（options）设置插件实例

    //初始化路径
    pluginOptions = options;
    var _path = path.resolve(__dirname, '../../', pluginOptions.watch);

    fs.exists(_path, function (exists) {
        if (exists) {
            console.log(_path + ' 存在!')
        } else {
            console.log('生成 ' + _path + ' 成功!')
            fs.mkdir(_path);
        }
    });

    ROOT_PATH.watch = path.resolve(path.resolve(__dirname), '../../', pluginOptions.watch);
    ROOT_PATH.config = path.resolve(path.resolve(__dirname), '../../', pluginOptions.config);
}

VueRouterHelper.prototype.apply = function (compiler) {
    compiler.plugin('done', function () {
        if (!watcher) {
            setTimeout(function () {
                watch();
                console.log('vue-router-helper start watching');
            }, 1500)
        }
    });
};

module.exports = VueRouterHelper; 