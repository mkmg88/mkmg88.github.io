var window_width = 1244;
var window_height = 900;
var radius = 8;
var margin_top = 60;
var margin_left = 30;

var endTime = new Date(2016,5,20,10,20,20);
var sec = 0;

var balls = [];
var colors = ['#8BC34A','#E64A19','#FBC02D','#00BCD4','#512DA8','#FF4081','#303F9F','#FF4081','#009688','#795548'];

window.onload = function(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d'); 

	//自适应
	window_width = document.body.clientWidth;
	window_height = document.body.clientHeight;

	margin_left = Math.round(window_width/10);    //左右占1/5
	radius = Math.round(window_width*4/5/108)-1;  //数字占4/5
	margin_top = Math.round(window_height/5);     //顶部占1/5

	//画布宽度
	canvas.width = window_width;
	canvas.height = window_height;

	sec = getSec();  //相差的秒数
	
	setInterval(function(){
		updata();
		render(context);
	},50);
}

function updata(){
	var nextsec = getSec();  //新-相差的秒数
	var nexthouse = parseInt(nextsec/3600);
	var nextminutes = parseInt((nextsec - nexthouse*3600)/60);
	var nextseconds = nextsec%60;

	var house = parseInt(sec/3600);
	var minutes = parseInt((sec - house*3600)/60);
	var seconds = sec%60;

	if(nextseconds != seconds){  //时间改变	
		//添加小球	
		if(parseInt(house/10) != parseInt(nexthouse/10)){
			addballs(margin_left, margin_top, parseInt(nexthouse/10));
		}
		if(parseInt(house%10) != parseInt(nexthouse%10)){
			addballs(margin_left+15*(radius+1), margin_top, parseInt(nexthouse%10));
		}
		if(parseInt(minutes/10) != parseInt(nextminutes/10)){
			addballs(margin_left+39*(radius+1), margin_top, parseInt(nextminutes/10));
		}
		if(parseInt(minutes%10) != parseInt(nextminutes%10)){
			addballs(margin_left+54*(radius+1), margin_top, parseInt(nextminutes%10));
		}
		if(parseInt(seconds/10) != parseInt(nextseconds/10)){
			addballs(margin_left+78*(radius+1), margin_top, parseInt(nextseconds/10));
		}
		if(parseInt(seconds%10) != parseInt(nextseconds%10)){
			addballs(margin_left+93*(radius+1), margin_top, parseInt(nextseconds%10));
		}
		
		sec = nextsec;  //刷新时间数据
	}

	updateballs();
}

//小球的基本位置
function updateballs(){
	for(var i=0; i<balls.length; i++){
		
		balls[i].x += balls[i].vX;
		balls[i].y += balls[i].vY;
		balls[i].vY += balls[i].g;

		if(balls[i].y + radius >= window_height){
			balls[i].y = window_height - radius;
			balls[i].vY *= -0.75;
		}
	}

	//性能优化
	var cnt = 0;
	for(var i=0; i<balls.length; i++){
		if(balls[i].x + radius > 0 && balls[i].x - radius < window_width ){
			balls[cnt++] = balls[i];
		}
	}	
	while(balls.length > Math.min(300,cnt)){
		balls.pop();
	}
}

//把小球的数据添加到数组
function addballs(x,y,num){
	for(var i=0; i<digit[num].length; i++){
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var aball = {
					x : x+j*2*(radius+1)+(radius+1),
					y : y+i*2*(radius+1)+(radius+1),
					r : radius,
					g : 1.5 + Math.random(),  //重力加速度
					vX : Math.pow( -1, Math.ceil(Math.random()*1000 ))*4,  //x轴速度，4或-4
					vY : -5,   //y轴速度
					color : colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aball);
			}
		}
	}
}

//获取相差的秒数
function getSec(){
	var nowTime = new Date();
	var secr = parseInt((endTime.getTime() - nowTime.getTime())/1000 );
	return secr>0 ? secr : 0;
}

//绘制时钟
function render(cxt){
	cxt.clearRect(0,0,window_width,window_height);

	var house = parseInt(sec/3600);
	var minutes = parseInt((sec - house*3600)/60);
	var seconds = sec%60;
	
	renderDraw(margin_left,margin_top,parseInt(house/10),cxt);  //参数：起始点x,起始点y,绘制的数字,cxt对象
	renderDraw(margin_left+15*(radius+1),margin_top,parseInt(house%10),cxt);   //数字所占的位置：7*2*(r+1) = 14*(r+1)，加上一个空隙 15*(r+1)
	renderDraw(margin_left+30*(radius+1),margin_top,10,cxt);                   //冒号所占的位置：9*(r+1)
	renderDraw(margin_left+39*(radius+1),margin_top,parseInt(minutes/10),cxt);
	renderDraw(margin_left+54*(radius+1),margin_top,parseInt(minutes%10),cxt);
	renderDraw(margin_left+69*(radius+1),margin_top,10,cxt);
	renderDraw(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),cxt);
	renderDraw(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),cxt);

	//绘制小球
	for(var i=0; i<balls.length; i++){
		cxt.fillStyle = balls[i].color;
		
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2*Math.PI);
		cxt.closePath();

		cxt.fill();
	}
}

//绘制数字
function renderDraw(x,y,num,cxt){   
	cxt.fillStyle = '#4b7ebb';
	for(var i=0; i<digit[num].length; i++){    
		for(var j=0; j<digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				cxt.arc( x+(j*2*(radius+1))+(radius+1), y+(i*2*(radius+1))+(radius+1), radius, 0, 2*Math.PI  );
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}

