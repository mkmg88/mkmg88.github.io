function ajax(URL, fnSuce, fnFaild){
	function createXHR(){
		if(typeof XMLHttpRequest != 'undefined'){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != 'undefined'){
			var version = [
				'MSXML2.XMLHttp.6.0',
				'MSXML2.XMLHttp.3.0',
				'MSXML2.XMLHttp'
			];
			for(var i = 0; i < version.length; i++){
				try{
					return new ActiveXObject(version[i]);
				}catch(e){
					
				}
			}
		}else{
			throw new Error('您的浏览器不支持XHR对象！');
		}
	}

	var xhr = createXHR();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){    //判断异步请求是否完成
			if(xhr.status == 200){
				fnSuce(xhr.responseText);
			}else{
				if(fnFaild){
					fnFaild();
				}
			}
		}
	}
	xhr.open('GET', URL + '?t=' + Math.random(),true);
	xhr.send(null);  
}
	