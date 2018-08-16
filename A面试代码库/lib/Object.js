export default class OBJ {
 
	//清除对象中值为空的属性
	//ecDo.filterParams({a:"",b:null,c:"010",d:123})
	//Object {c: "010", d: 123}
	static filterParams = (obj) => {
		var _newPar = {};
		for(var key in obj) {
			if((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
				_newPar[key] = obj[key];
			}
		}
		return _newPar;
	}

}


//深拷贝
function clone(obj) {
  if (obj == null || typeof obj !== 'object') return obj

  let newObj = null

  // 时间对象有特殊性
  if (obj.constructor === Date) {
    newObj = new obj.constructor(obj)
  } else {
    obj.constructor()
  }


  for (let key in Object.getOwnPropertyDescriptors(obj)) {
    newObj[key] = clone(obj[key])
  }
  return newObj
}
//深比较
function deepCompare(a, b){
  if(a === null
    || typeof a !== 'object'
    || b === null
    || typeof b !== 'object'){
    return a === b
  }

  const propsA = Object.getOwnPropertyDescriptors(a)
  const propsB = Object.getOwnPropertyDescriptors(b)
  if(Object.keys(propsA).length !== Object.keys(propsB).length){
    return false
  }

  return Object.keys(propsA).every( key => deepCompare(a[key], b[key]))

}

 