/**
 * 时间帮助类
 */
export default class Date {
	/*多长时间之前*/
	static timeago = function(date) {
		const MathFloor = Math.floor;
		date = new Date(date);
		const dateYear = date.getFullYear();
		const dateMonths = date.getMonth() + dateYear * 12; // 计算总月数
		const time = date.getTime();
		const curDate = new Date();
		const curDateYear = curDate.getFullYear();
		const curDateMonths = curDate.getMonth() + curDateYear * 12; // 计算总月数
		const curTime = curDate.getTime();
		const deltaTime = MathFloor((curTime - time) / 1000); // 转为秒

		if(curDateMonths - dateMonths > 12) {
			return `${Math.floor((curDateMonths - dateMonths) / 12)}年前`;
		} else if(curDateMonths - dateMonths > 1) {
			return `${curDateMonths - dateMonths}个月前`;
		} else {
			if(deltaTime < 60) {
				return `${deltaTime}秒前`;
			} else if(deltaTime < 3600) {
				return `${MathFloor(deltaTime / 60)}分钟前`;
			} else if(deltaTime < 86400) {
				return `${MathFloor(deltaTime / 3600)}小时前`;
			} else if(deltaTime < 604800) {
				return `${MathFloor(deltaTime / 86400)}天前`;
			} else {
				return `${MathFloor(deltaTime / 604800)}周前`;
			}
		}
	}
	/**
	 * 获取当前时间
	 * @return {[type]} [description]
	 */
	static getTime = (time) => {
		if(strUtil.isEmpty(time)) {
			return new Date();
		} else {
			time = time.replace(/-/g, "/");
			time = time.replace(/\.\d/g, "");
			return new Date(time);
		}

	}

	/**
	 * 获取年份 如2015
	 * @return {[type]} [description]
	 */
	static getFullYear = (time) => {
		return dateUtil.getTime(time).getFullYear();
	}

	/**
	 * 获取年份 如115
	 * @return {[type]} [description]
	 */
	static getYear = (time) => {
		return dateUtil.getTime(time).getYear();
	}

	/**
	 * 获取月份 返回0-11 0表示一月 11表示十二月
	 */
	static getMonth = (time) => {
		return dateUtil.getTime(time).getMonth();
	}

	/**
	 * 获取星期几  返回的是0-6的数字，0 表示星期天
	 * @return {[type]} [description]
	 */
	static getWeek = (time) => {
		return dateUtil.getTime(time).getDay();
	}

	/**
	 * 获取当天日期
	 * @return {[type]} [description]
	 */
	static getDate = (time) => {
		return dateUtil.getTime(time).getDate();
	}

	/**
	 * 获取小时数
	 */
	static getHours = (time) => {
		return dateUtil.getTime(time).getHours();
	}

	/**
	 * 获取分钟数
	 */
	static getMinutes = (time) => {
		return dateUtil.getTime(time).getMinutes();
	}

	/**
	 * 获取秒数
	 */
	static getSeconds = (time) => {
		return dateUtil.getTime(time).getSeconds(); //获取秒数
	}

	/**
	 * 获取当前日期：
	 * formatStr：可选，格式字符串，默认格式：yyyy-MM-dd hh:mm:ss
	 * 约定如下格式：
	 * （1）YYYY/yyyy/YY/yy 表示年份
	 * （2）MM/M 月份
	 * （3）W/w 星期
	 * （4）dd/DD/d/D 日期
	 * （5）hh/HH/h/H 时间
	 * （6）mm/m 分钟
	 * （7）ss/SS/s/S 秒
	 * （8）iii 毫秒
	 */

	static formatDate = (formatStr, time) => {
		var str = formatStr;
		if(!formatStr) {
			str = "yyyy-MM-dd hh:mm:ss"; //默认格式
		}
		var Week = ['日', '一', '二', '三', '四', '五', '六'];
		str = str.replace(/yyyy|YYYY/, dateUtil.getFullYear(time));
		str = str.replace(/yy|YY/, (dateUtil.getYear(time) % 100) > 9 ? (dateUtil
			.getYear(time) % 100).toString() : '0' + (dateUtil.getYear(time) % 100));
		str = str.replace(/MM/, dateUtil.getMonth(time) >= 9 ? (parseInt(dateUtil
			.getMonth(time)) + 1).toString() : '0' + (parseInt(dateUtil.getMonth(
			time)) + 1));
		str = str.replace(/M/g, (parseInt(dateUtil.getMonth(time)) + 1));
		str = str.replace(/w|W/g, Week[dateUtil.getWeek(time)]);
		str = str.replace(/dd|DD/, dateUtil.getDate(time) > 9 ? dateUtil.getDate(
			time).toString() : '0' + dateUtil.getDate(time));
		str = str.replace(/d|D/g, dateUtil.getDate(time));
		str = str.replace(/hh|HH/, dateUtil.getHours(time) > 9 ? dateUtil.getHours(
			time).toString() : '0' + dateUtil.getHours(time));
		str = str.replace(/h|H/g, dateUtil.getHours(time));
		str = str.replace(/mm/, dateUtil.getMinutes(time) > 9 ? dateUtil.getMinutes(
			time).toString() : '0' + dateUtil.getMinutes(time));
		str = str.replace(/m/g, dateUtil.getMinutes(time));
		str = str.replace(/ss|SS/, dateUtil.getSeconds(time) > 9 ? dateUtil.getSeconds(
			time).toString() : '0' + dateUtil.getSeconds(time));
		str = str.replace(/s|S/g, dateUtil.getSeconds(time));
		str = str.replace(/iii/g, dateUtil.millSecond < 10 ? '00' + dateUtil.millSecond :
			(dateUtil.millSecond < 100 ? '0' + dateUtil.millSecond : dateUtil.millSecond)
		);
		return str;
	}

	/**
	 * 判断闰年 ：一般规律为：四年一闰，百年不闰，四百年再闰。
	 */
	static isLeapYear = (str) => {
		return(str % 4 == 0 && ((str != 0) || (str % 400 == 0)));
	}
	/**
	 * 获取当前时间(年月日)
	 *
	 * type:CN中文格式
	 *
	 * _.getDate() => 2014-04-26
	 * _.getDate('CN') => 2014年04月26日
	 *
	 */
	static getDate = function(type) {
		var time = new Date(),
			year = time.getFullYear(),
			m = time.getMonth() + 1,
			month = m < 10 ? ('0' + m) : m,
			d = time.getDate(),
			day = d < 10 ? ('0' + d) : d,
			dateText = '';

		if(type === 'CN') {
			return dateText += year + '年' + month + '月' + day + '日';
		} else {
			return dateText += year + '-' + month + '-' + day;
		}
	};
	/**
	 * 获取当前时间(时分秒)
	 *
	 * type:CN中文格式
	 *
	 * _.getTimes() => 17:06:25
	 * _.getTimes('CN') => 17时06分25秒
	 *
	 */
	static getTimes = function(type) {
		var time = new Date(),
			hours = time.getHours(),
			m = time.getMinutes(),
			minutes = m < 10 ? ('0' + m) : m,
			s = time.getSeconds(),
			seconds = s < 10 ? ('0' + s) : s,
			dateText = '';

		if(type === 'CN') {
			return dateText += hours + '时' + minutes + '分' + seconds + '秒';
		} else {
			return dateText += hours + ':' + minutes + ':' + seconds;
		}
	};

	/**
	 * @desc   格式化${startTime}距现在的已过时间
	 * @param  {Date} startTime 
	 * @return {String}
	 */
	static formatPassTime = (startTime) => {
		var currentTime = Date.parse(new Date()),
			time = currentTime - startTime,
			day = parseInt(time / (1000 * 60 * 60 * 24)),
			hour = parseInt(time / (1000 * 60 * 60)),
			min = parseInt(time / (1000 * 60)),
			month = parseInt(day / 30),
			year = parseInt(month / 12);
		if(year) return year + "年前"
		if(month) return month + "个月前"
		if(day) return day + "天前"
		if(hour) return hour + "小时前"
		if(min) return min + "分钟前"
		else return '刚刚'
	}

	/**
	 * 
	 * @desc   格式化现在距${endTime}的剩余时间
	 * @param  {Date} endTime  
	 * @return {String}
	 */
	static formatRemainTime = (endTime) => {
		var startDate = new Date(); //开始时间 var endDate = new Date(endTime); //结束时间 var t = endDate.getTime() - startDate.getTime(); //时间差 var d = 0,
		h = 0,
			m = 0,
			s = 0;
		if(t >= 0) {
			d = Math.floor(t / 1000 / 3600 / 24);
			h = Math.floor(t / 1000 / 60 / 60 % 24);
			m = Math.floor(t / 1000 / 60 % 60);
			s = Math.floor(t / 1000 % 60);
		}
		return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
	}

	//到某一个时间的倒计时
	//ecDo.getEndTime('2017/7/22 16:0:0')
	//result："剩余时间6天 2小时 28 分钟20 秒"
	static getEndTime=(endTime)=> {
		var startDate = new Date(); //开始时间，当前时间
		var endDate = new Date(endTime); //结束时间，需传入时间参数
		var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
		var d = 0,
			h = 0,
			m = 0,
			s = 0;
		if(t >= 0) {
			d = Math.floor(t / 1000 / 3600 / 24);
			h = Math.floor(t / 1000 / 60 / 60 % 24);
			m = Math.floor(t / 1000 / 60 % 60);
			s = Math.floor(t / 1000 % 60);
		}
		return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
	}

}