export default class Cookie {

	//数组去重
	static removeRepeatArray = (arr) => {
		return arr.filter(function(item, index, self) {
			return self.indexOf(item) === index;
		});
	}
	//数组顺序打乱
	static upsetArr = (arr) => {
		return arr.sort(function() {
			return Math.random() - 0.5
		});
	}
	//数组最大值最小值
	//数组最大值
	static maxArr = (arr) => {
		return Math.max.apply(null, arr);
	}
	//数组最小值
	static minArr = (arr) => {
		return Math.min.apply(null, arr);
	}
	//数组求和，平均值
	//这一块的封装，主要是针对数字类型的数组
	//求和
	static sumArr = (arr) => {
		return arr.reduce(function(pre, cur) {
			return pre + cur
		})
	}
	//数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活！
	static covArr = (arr) => {
		return this.sumArr(arr) / arr.length;
	}
	//从数组中随机获取元素
	//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
	//2
	//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
	//8
	//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
	//8
	//ecDo.randomOne([1,2,3,6,8,5,4,2,6])
	//1
	static randomOne = (arr) => {
		return arr[Math.floor(Math.random() * arr.length)];
	}
	//返回数组（字符串）一个元素出现的次数
	//ecDo.getEleCount('asd56+asdasdwqe','a')
	//result：3
	//ecDo.getEleCount([1,2,3,4,5,66,77,22,55,22],22)
	//result：2
	static getEleCount = (obj, ele) => {
		var num = 0;
		for(var i = 0, len = obj.length; i < len; i++) {
			if(ele === obj[i]) {
				num++;
			}
		}
		return num;
	}
	//返回数组（字符串）出现最多的几次元素和出现次数 ###
	//arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
	//返回值：el->元素，count->次数
	//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
	//默认情况，返回所有元素出现的次数
	//result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
	//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
	//传参（rank=3），只返回出现次数排序前三的
	//result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
	//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
	//传参（ranktype=1,rank=null），升序返回所有元素出现次数
	//result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
	//ecDo.getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
	//传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
	//result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
	static getCount = (arr, rank, ranktype) => {
		var obj = {},
			k, arr1 = []
		//记录每一元素出现的次数
		for(var i = 0, len = arr.length; i < len; i++) {
			k = arr[i];
			if(obj[k]) {
				obj[k]++;
			} else {
				obj[k] = 1;
			}
		}
		//保存结果{el-'元素'，count-出现次数}
		for(var o in obj) {
			arr1.push({
				el: o,
				count: obj[o]
			});
		}
		//排序（降序）
		arr1.sort(function(n1, n2) {
			return n2.count - n1.count
		});
		//如果ranktype为1，则为升序，反转数组
		if(ranktype === 1) {
			arr1 = arr1.reverse();
		}
		var rank1 = rank || arr1.length;
		return arr1.slice(0, rank1);
	}

	//得到n1-n2下标的数组 
	//ecDo.getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
	//result：[5, 6, 7, 8, 9]
	//getArrayNum([0,1,2,3,4,5,6,7,8,9],2) //不传第二个参数,默认返回从n1到数组结束的元素
	//result：[2, 3, 4, 5, 6, 7, 8, 9]
	static getArrayNum = (arr, n1, n2) => {
		return arr.slice(n1, n2);
	}
	//筛选数组
	//删除值为'val'的数组元素
	//ecDo.removeArrayForValue(['test','test1','test2','test','aaa'],'test',')
	//result：["aaa"]   带有'test'的都删除
	//ecDo.removeArrayForValue(['test','test1','test2','test','aaa'],'test')
	//result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
	static removeArrayForValue = (arr, val, type) => {
		return arr.filter(function(item) {
			return type ? item.indexOf(val) === -1 : item !== val
		})
	}
	//获取对象数组某些项
	//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
	//ecDo.getOptionArray(arr,'a,c')
	//result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
	//ecDo.getOptionArray(arr,'b')
	//result：[2, 3, 9, 2, 5]
	static getOptionArray = (arr, keys) => {
		var newArr = []
		if(!keys) {
			return arr
		}
		var _keys = keys.split(','),
			newArrOne = {};
		//是否只是需要获取某一项的值
		if(_keys.length === 1) {
			for(var i = 0, len = arr.length; i < len; i++) {
				newArr.push(arr[i][keys])
			}
			return newArr;
		}
		for(var i = 0, len = arr.length; i < len; i++) {
			newArrOne = {};
			for(var j = 0, len1 = _keys.length; j < len1; j++) {
				newArrOne[_keys[j]] = arr[i][_keys[j]]
			}
			newArr.push(newArrOne);
		}
		return newArr
	}
	//排除对象数组某些项 
	//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
	//ecDo.filterOptionArray(arr,'a')
	//result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
	//ecDo.filterOptionArray(arr,'a,c')
	//result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
	static filterOptionArray = (arr, keys) => {
		var newArr = []
		var _keys = keys.split(','),
			newArrOne = {};
		for(var i = 0, len = arr.length; i < len; i++) {
			newArrOne = {};
			for(var key in arr[i]) {
				//如果key不存在排除keys里面,添加数据
				if(_keys.indexOf(key) === -1) {
					newArrOne[key] = arr[i][key];
				}
			}
			newArr.push(newArrOne);
		}
		return newArr
	}
	//对象数组排序
	//var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
	//ecDo.arraySort(arr,'a,b')a是第一排序条件，b是第二排序条件
	//result：[{"a":1,"b":2,"c":9},{"a":2,"b":3,"c":5},{"a":4,"b":2,"c":5},{"a":4,"b":5,"c":7},{"a":5,"b":9}]
	static arraySort = (arr, sortText) => {
		if(!sortText) {
			return arr
		}
		var _sortText = sortText.split(',').reverse(),
			_arr = arr.slice(0);
		for(var i = 0, len = _sortText.length; i < len; i++) {
			_arr.sort(function(n1, n2) {
				return n1[_sortText[i]] - n2[_sortText[i]]
			})
		}
		return _arr;
	}

	// 数组扁平化
	//ecDo.steamroller([1,2,[4,5,[1,23]]])
	//[1, 2, 4, 5, 1, 23]
	static steamroller = (arr) => {
		var newArr = [],
			_this = this;
		for(var i = 0; i < arr.length; i++) {
			if(Array.isArray(arr[i])) {
				// 如果是数组，调用(递归)steamroller 将其扁平化
				// 然后再 push 到 newArr 中
				newArr.push.apply(newArr, _this.steamroller(arr[i]));
			} else {
				// 不是数组直接 push 到 newArr 中
				newArr.push(arr[i]);
			}
		}
		return newArr;
	}

}