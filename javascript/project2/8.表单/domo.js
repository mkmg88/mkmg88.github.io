function preDef(e){
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}
function addEvent( obj, type, fn ) {
   if ( obj.attachEvent ) {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
      obj.attachEvent( 'on'+type, obj[type+fn] );
   } else
      obj.addEventListener( type, fn, false );
}
function removeEvent( obj, type, fn ) {
   if ( obj.detachEvent ) {
      obj.detachEvent( 'on'+type, obj[type+fn] );
      obj[type+fn] = null;
   } else
      obj.removeEventListener( type, fn, false );
}
function getSelectText(text){
	if(typeof text.selectionStart == 'number'){    //非IE
		return text.value.substring(text.selectionStart,text.selectionEnd);
	}else if(document.selection){     //IE    
		return document.selection.createRange().text;
	}
}
function getNextElement(node){
    if(node.nodeType == 1) return node;  //如果是元素节点，就返回这个元素节点
    if(node.nextSibling) return getNextElement(node.nextSibling);   //不是元素节点，就判断是否有下一个节点，如果有就继续执行判断下一个节点
    return null;    //都没有就返回null
}
function  trim(str){
     return str.replace(/(^\s*)|(\s*$)/g,'');
}
function inArray(array,value){
	for(var i in array){
		if(array[i] === value) return true;
	}
	return false;
}

window.onload = function(){
	
	var oReg = document.forms['reg'];
	oReg.reset();  //初始化

	//用户名判断
	var oUser = oReg.elements['user'];
	addEvent(oUser,'focus',function(){
		var oSpan = getNextElement(this.nextSibling);
		oSpan.innerHTML = '<i></i>4-16个字符，支持汉字、字母和数字';
		oSpan.className = 'info';
	})
	addEvent(oUser,'blur',function(){
		var oSpan = getNextElement(this.nextSibling);
		if(trim(this.value) == ''){
			oSpan.innerHTML = '';
		}else if(!check_user()){
			if(this.value.length < 4){
				oSpan.innerHTML = '<i></i>字数过少，请重新输入';
			}else if(this.value.length > 16){
				oSpan.innerHTML = '<i></i>字数已超过限制，请重新输入';
			}else{
				oSpan.innerHTML = '<i></i>包含特殊字符，请重新输入';
			}
			oSpan.className = 'error';
		}else{
			oSpan.innerHTML = '<i></i>可用';
			oSpan.className = 'succ';
		}
	});

	function check_user(){
		if(/^[\w\u4e00-\u9fa5]{4,16}$/.test(oUser.value)) return true;
	}

	//密码判断
	var oPass = oReg.elements['pass'];
	addEvent(oPass,'focus',function(){
		var oSpan = getNextElement(this.nextSibling);
		oSpan.innerHTML = '<i></i>6-20位字符，支持字母、数字和符号组合'
		oSpan.className = 'info';
	});
	addEvent(oPass,'blur',function(){
		var oSpan = getNextElement(this.nextSibling);
		if(trim(this.value) == ''){
			oSpan.innerHTML = '';
		}else if(!check_pass()){
			if(this.value.length < 6){
				oSpan.innerHTML = '<i></i>密码位数过少，请重新输入';
			}else if(this.value.length > 16){
				oSpan.innerHTML = '<i></i>密码位数已超过限制，请重新输入';
			}else{
				oSpan.innerHTML = '<i></i>包含其他特殊字符，请重新输入';
			}
			oSpan.className = 'error';
		}else{
			oSpan.innerHTML = '<i></i>可用';
			oSpan.className = 'succ';
		}
	});

	function check_pass(){
		if(/^[\w\@\!\#\$\%\^\&\*\.\~]{6,20}$/.test(oPass.value)) return true;
	}

	addEvent(oPass,'keyup',function(){
		var oSpan = getNextElement(this.nextSibling);
		var aSi = getNextElement(oSpan.nextSibling).getElementsByTagName('i');
		var value = trim(this.value);
		var code_length = 0;
		if(/[0-9]/.test(value)){
			code_length++;
		}
		if(/[a-z]/.test(value)){
			code_length++;
		}
		if(/[A-Z]/.test(value)){
			code_length++;
		}
		if(/[\@\!\#]/.test(value)){
			code_length++;
		}
		if(/[\$\%\^]/.test(value)){
			code_length++;
		}
		if(/[\&\*\.\~]/.test(value)){
			code_length++;
		}
		if(value.length >= 10 && code_length >= 5){
			aSi[2].style.background = '#5bab3c';
			aSi[1].style.background = '#5bab3c';
			aSi[0].style.background = '#5bab3c';
		}else if(value.length >= 8 && code_length >= 3){
			aSi[2].style.background = '';
			aSi[1].style.background = '#ff8900';
			aSi[0].style.background = '#ff8900';
		}else if(value.length >= 6){
			aSi[2].style.background = '';
			aSi[1].style.background = '';
			aSi[0].style.background = 'orange';
		}else{
			aSi[2].style.background = '';
			aSi[1].style.background = '';
			aSi[0].style.background = '';
		}
	});

	//密码确认
	var oNotpass = oReg.elements['notpass'];
	addEvent(oNotpass,'focus',function(){
		var oSpan = getNextElement(this.nextSibling);
		oSpan.innerHTML = '<i></i>请再次输入密码';
		oSpan.className = 'info';
	});
	addEvent(oNotpass,'blur',function(){
		var oSpan = getNextElement(this.nextSibling);
		if(trim(this.value) != ''){
			if(!check_notpass()){
				oSpan.innerHTML = '<i></i>密码不一致，请确认后重新输入';
				oSpan.className = 'error';
			}else{
				oSpan.innerHTML = '<i></i>可用';
				oSpan.className = 'succ';
			}
		}else{
			this.value = '';
			oSpan.innerHTML = '';
		}
	});

	function check_notpass(){
		if(oNotpass.value == oPass.value && trim(oNotpass.value) != '') return true;
	}

	//问题选择
	var oQues = oReg.elements['ques'];
	addEvent(oQues,'change',function(){
		var oSpan = getNextElement(oQues.nextSibling);
		if(check_ques()){
			oSpan.innerHTML = '';
		}
	});
	function check_ques(){
		if(oQues.value != 0) return true;
	}


	//回答问题
	var ans = oReg.elements['ans'];
	addEvent(ans,'focus',function(){
		var oSpan = getNextElement(this.nextSibling);
		oSpan.innerHTML = '<i></i>请输入您的回答，2-32位字符'
		oSpan.className = 'info';

	});
	addEvent(ans,'blur',function(){
		var oSpan = getNextElement(this.nextSibling);
		if(trim(this.value) != ''){
			if(this.value.length < 2){
				oSpan.innerHTML = '<i></i>字数过少，请重新输入';
				oSpan.className = 'error';
			}else if(this.value.length > 32){
				oSpan.innerHTML = '<i></i>字数已超过限制，请重新输入';
				oSpan.className = 'error';
			}else{
				oSpan.innerHTML = '<i></i>可用';
				oSpan.className = 'succ';
			}
		}else{
			oSpan.innerHTML = '';
		}
	});

	function check_ans(){
		if(ans.value.length >= 2 && ans.value.length <= 32) return true;
	}

	//邮箱确认
	var mail = oReg.elements['mail'];
	addEvent(mail,'focus',function(){
		var oSpan = getNextElement(this.nextSibling);
		var oPoint = getNextElement(oSpan.nextSibling);
		oSpan.innerHTML = '<i></i>请输入您的邮箱';
		oSpan.className = 'info';
		if(trim(this.value).length >= 1 && this.value.indexOf('@') == -1){
			oPoint.style.display = 'block';
		}
	});
	addEvent(mail,'blur',function(){
			var oSpan = getNextElement(mail.nextSibling);
			var oPoint = getNextElement(oSpan.nextSibling);
			if(trim(mail.value) != ''){
				if(!check_mail()){
					oSpan.innerHTML = '<i></i>请输入正确的邮箱格式';
					oSpan.className = 'error';
				}else{
					oSpan.innerHTML = '<i></i>可用';
					oSpan.className = 'succ';
				}
			}else{
				oSpan.innerHTML = '';
			}
			oPoint.style.display = 'none';
	});

	function check_mail(){
		if(/^[\w\.\-]+\@[\w\-]+(\.[a-zA-Z]{2,10}){1,2}$/.test(trim(mail.value))) return true;
	}

	//邮箱提示
	addEvent(mail,'keyup',function(event){
		var oSpan = getNextElement(this.nextSibling);
		var oPoint = getNextElement(oSpan.nextSibling);
		var aMailLi = oPoint.getElementsByTagName('li');
		if(trim(this.value).length >= 1){
			oPoint.style.display = 'block';
			for(var i = 0; i < aMailLi.length; i++){
				var aMlsp = aMailLi[i].getElementsByTagName('i')[0];
				if(this.value.indexOf('@') == -1){
					aMlsp.innerHTML = this.value;
				}else{  //如果有@就不再提示
					oPoint.style.display = 'none';
				}
				//鼠标移入移出
				addEvent(aMailLi[i],'mouseover',function(){
					this.style.background = '#eee';
				});	
				addEvent(aMailLi[i],'mouseout',function(){
					this.style.background = 'none';
				});	
				//鼠标点击
				addEvent(aMailLi[i],'mousedown',function(){
					mail.value = this.innerHTML.replace(/<.*?>/ig,'');
					oPoint.style.display = 'none';
				});	
			}
		}
		//上下键选择
		if(this.MNow == undefined){   //声明计时器，并且只在第一次初始化
			this.MNow = 0;
		}
		function aMche(mun){
			for(var i = 0; i < aMailLi.length; i++){
				aMailLi[i].style.background = 'none';
			}
			aMailLi[mun].style.background = '#eee';
		}
		aMche(this.MNow);
		if(event.keyCode == 40){   //按下键的情况
			this.MNow++;
			if(this.MNow >= aMailLi.length){
				this.MNow = 0
			};
			aMche(this.MNow);
		}else if(event.keyCode == 38){   //按上键的情况
			this.MNow--;
			if(this.MNow < 0){
				this.MNow = aMailLi.length - 1;
			};
			aMche(this.MNow);
		}else if(event.keyCode == 13){   //按确定键的情况
			mail.value = aMailLi[this.MNow].innerHTML.replace(/<.*?>/ig,'');  //将文本框的值替换
			this.MNow = 0;   //将计数器复位
			oPoint.style.display = 'none';   //将提示框隐藏
			this.blur();   //将焦点移出
		}
	});
	
	
	//生日选择
	var oYear = oReg.elements['year'];
	var oMonth = oReg.elements['month'];
	var oDay = oReg.elements['day'];
	var dayObj = new Date;        //获取时间对象
	for(var i = 1950; i <= dayObj.getFullYear(); i++){
		oYear.add(new Option(i,i),undefined);
	}
	for(var i = 1; i <= 12; i++){
		oMonth.add(new Option(i,i),undefined);
	}
	
	var day30 = [4,6,9,11];
	var day31 = [1,3,5,7,8,10,12];
	function oDaycc(){
		if(oYear.value != 0 && oMonth.value != 0){   //当年和月都选择了
			oDay.options.length = 1;  //先把注入的日清空
			if(inArray(day31,parseInt(oMonth.value))){    //有31天的月
				addDay(31);
			}else if(inArray(day30,parseInt(oMonth.value))){  //有30天的月
				addDay(30);
			}else{    //2月
				if( ( parseInt(oYear.value) % 4 == 0 && parseInt(oYear.value) % 100 != 0 ) || parseInt(oYear.value) % 400 == 0 ){   /*闰年*/
					addDay(29);
				}else{
					addDay(28);
				}
			}
		}else{
			oDay.options.length = 1;  //年或月没选,注入的日清空
		}
		function addDay(daynum){
			for(var j = 1; j <= daynum; j++){
				oDay.add(new Option(j,j),undefined);
			}
		}
	}
	addEvent(oYear,'change',oDaycc);
	addEvent(oMonth,'change',oDaycc);
	addEvent(oDay,'change',function(){
		var oSpan = getNextElement(oDay.nextSibling);
		oSpan.innerHTML = '';
	});
	function check_day(){
		if(oYear.value != 0 && oMonth.value != 0 && oDay.value != 0 ) return true;
	}

	//备注
	
	var oComm = oReg.elements['remarks'];
	function oCommQL(){
		var oSpan = getNextElement(oComm.nextSibling);
		if(oComm.value.length <= 200){
			oSpan.innerHTML = '还可以输入<strong>' + (200 - oComm.value.length) + '</strong>字';
		}else{
			oSpan.innerHTML = '已经超过<strong class="red">' + (oComm.value.length - 200) + '</strong>字，<span>清尾</span>';
		}
		var oComm_Q = oSpan.getElementsByTagName('span')[0];
		addEvent(oComm_Q,'click',function(){   //点击清尾
			oComm.value = oComm.value.substring(0,200);
			oSpan.innerHTML = '还可以输入<strong>' + 0 + '</strong>字';
		});
	}
	//输入的时候
	addEvent(oComm,'keyup',function(){
		oCommQL();   //输入时执行判断函数
	});
	//粘贴的时候
	addEvent(oComm,'paste',function(){
		setTimeout(function(){
			oCommQL();  //粘贴后延迟执行判断函数
		},50);
	});
	function check_comm(){
		if(oComm.value.length <= 200) return true;
	}
	
	//提交按钮
	var oBtn = oReg.elements['btn'];
	addEvent(oBtn,'click',function(){
		var flag = true;
		if(!check_user()){
			flag = false;  //填写错误就阻止提交
			var oSpan = getNextElement(oUser.nextSibling);
			oSpan.innerHTML = '<i></i>用户名填写不正确，请确认后提交';
			oSpan.className = 'error';
		}
		if(!check_pass()){
			flag = false;  
			var oSpan = getNextElement(oPass.nextSibling);
			oSpan.innerHTML = '<i></i>密码填写不正确，请确认后提交';
			oSpan.className = 'error';
		}
		if(!check_notpass()){
			flag = false;  
			var oSpan = getNextElement(oNotpass.nextSibling);
			oSpan.innerHTML = '<i></i>确认密码填写不正确，请确认后提交';
			oSpan.className = 'error';
		}
		if(!check_ques()){
			flag = false;  
			var oSpan = getNextElement(oQues.nextSibling);
			oSpan.innerHTML = '<i></i>尚未选择问题，请确认后提交';
			oSpan.className = 'error';
		}
		if(!check_ans()){
			flag = false;  
			var oSpan = getNextElement(ans.nextSibling);
			oSpan.innerHTML = '<i></i>尚未回答，请确认后提交';
			oSpan.className = 'error';
		}
		if(!check_mail()){
			flag = false;  
			var oSpan = getNextElement(mail.nextSibling);
			oSpan.innerHTML = '<i></i>邮箱填写不正确，请确认后提交';
			oSpan.className = 'error';
		}
		if(!check_day()){
			flag = false;  
			var oSpan = getNextElement(oDay.nextSibling);
			oSpan.innerHTML = '<i></i>请选择生日';
			oSpan.className = 'error';
		}
		if(!check_comm()){
			flag = false;  
		}

		//成功地提交
		if(flag){
			oReg.submit();
		}
	});


}	