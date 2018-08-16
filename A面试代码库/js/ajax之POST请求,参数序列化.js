var params1 = {
	username: username,
	passwrod: password
};

function $params(obj) {
	var str = [];
	for(var p in obj) {
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	}
	return str.join("&");
}
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if(xhr.readyState == 4 && xhr.status == 200) {
		var data = xhr.responseText;
		data = JSON.prase(data);
		console.log(data);

	}
}
xhr.open("POST", "/url", true);
xhr.setRequestHeader('Content-Type', 'multipart/x-www-form-urlencoded; charset=UTF-8');
xhr.send($params(params1));