window.onload = function() {
	waterfall('main','box');

	
	var parent = document.getElementById('main'); 
	var dataInt = {"data" : [ {"src":"10.jpg"}, {"src":"1.jpg"}, {"src":"2.jpg"}, {"src":"3.jpg"}, {"src":"4.jpg"}]};


 	
	window.onscroll = loadpic;
	function loadpic(){
		if(csSilde() == true){
			var parent = document.getElementById('main'); 
			//将数据渲染到页面里面
			for(var i=0; i<dataInt.data.length; i++){
				var nBox = document.createElement('div');
				nBox.className = 'box';
				var nPic = document.createElement('div');
				nPic.className = 'pic';
				var nImg = document.createElement('img');
				nImg.src = 'img/' + dataInt.data[i].src;
				nPic.appendChild(nImg);
				nBox.appendChild(nPic);
				parent.appendChild(nBox);
			}
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	var parent = document.getElementById(parent);
	var aBox = getByClass(parent,box);
	var onewidth = aBox[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/onewidth);  //计算列数
	parent.style.width = onewidth*cols + 'px';  
	
	var hArr = [];
	for(var i=0; i<aBox.length; i++){
		if(i < cols){
			hArr.push(aBox[i].offsetHeight);  //储存顶部几张图片的高度
		}else{
			var minH = Math.min.apply(null,hArr);  //得到最小高度
			var index = getMinIndex(hArr,minH);   //得到最小高度在数组中的索引
			
			aBox[i].style.position = 'absolute';
			aBox[i].style.top = minH+'px';
			aBox[i].style.left = aBox[index].offsetLeft + 'px';

			hArr[index] += aBox[i].offsetHeight;  //高度重新赋值
		}
	}
}

function getByClass(parent,iClass) {
	var arr = parent.getElementsByTagName('*'),
		arr2 = [],
		re = new RegExp('\\b' + iClass + '\\b');
	for(var i=0; i<arr.length; i++){
		if( re.test(arr[i].className) ) {
			arr2.push(arr[i]);
		}
	}
	return arr2;
}

function getMinIndex(arr,val){
	for(var i=0; i<arr.length; i++){
		if( arr[i] === val ){
			return i;
		}
	}
}

//加载条件
function csSilde(){
	var parent = document.getElementById('main');
	var aBox = getByClass(parent,'box');
	
	//最后一个box的高度加上它的一半高度
	var lastBoxH = aBox[aBox.length - 1].offsetTop + Math.floor(aBox[aBox.length - 1].offsetHeight/2);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var toTop = scrollTop + document.documentElement.clientHeight;
	
	return lastBoxH < toTop;
}


