//封装获取样式函数
function getStyle(element, attr) {
        if(element.currentStyle) {
                return element.currentStyle[attr];
        } else {
                return getComputedStyle(element, false)[attr];
        }
}
var oTop = document.getElementById('top');
var oImg = oTop.getElementsByTagName("img");
var oWrap = document.getElementById("wrap");
var oPages = oWrap.getElementsByTagName('div');
var oSpans = oWrap.getElementsByTagName('span');
var oWord1 = oWrap.getElementsByClassName('word1');
var oP = oWrap.getElementsByTagName('p');
var oH1 = oWrap.getElementsByTagName('h1');
var oA = document.getElementsByTagName("a");
//刷新加载效果
function logoLoad (time) {
	//设置toplogo加载出现效果
	setTimeout(function  () {
		oImg[0].style.opacity = "1";
		oImg[0].style.transition = "0.5s";
	},time)
}
function oSPload (time1,time2) {
	//oSpans懒加载效果
	Array.prototype.forEach.call(oSpans,function  (ele,index,self) {
		ele.style.display = "none";
		setInterval(function  () {
			ele.style.display = "block";
		},time1)
	});
	//oP懒加载
	Array.prototype.forEach.call(oP,function  (ele,index,self) {
		setTimeout(function  () {
			oP[index].style.opacity = "1";
			oP[index].style.transition = "0.9s";
			if (index < 6) {
				oH1[index].style.opacity = "1";
				oH1[index].style.transition = "0.9s";
			};
		},time2)
	}) ;
}
//让top等于浏览器宽度
~~function  () {
	window.onresize = arguments.callee;
	var w = window.innerWidth;
	oTop.width = w;
}
function load () {
	logoLoad(500);
	oSPload(1200,800);
	//遍历page，实现page和top刷新下落效果
	Array.prototype.forEach.call(oPages,function  (ele,index,self) {
		let i = 0;
		ele.style.height = "0px";
		oTop.style.height = "0px";
		var X = setInterval(function  () {
			oTop.style.height = "55px";
			oTop.style.transition = "0.2s";
			oPages[i].style.height = "100%";
			oPages[i].style.transition = "0.5s";
			i++;
			if (i == oPages.length) {
				clearInterval(X);
			};
		},100)
	}) ;
}
~~function  () {
	Array.prototype.forEach.call(oPages,function  (ele,index,self) {
		// 鼠标hover效果
		~~function onmouse () {
			ele.onmouseover = function oPagesover () {
				for (let i = oPages.length - 1; i >= 0; i--) {
					oPages[i].style.backgroundColor = colorArr[i];
				};
				this.style.width = "380px";
				this.style.transition = oSpans[index].style.transition = "0.5s";
				oSpans[index].style.bottom = "0px";
				
				oWord1[index].style.color = "white";
				oPages[index].style.backgroundColor = "";
				if (oPages[index - 1]) {
					oPages[index - 1].style.width = "305px";
				};
				if (oPages[index + 1]) {
					oPages[index + 1].style.width = "305px";
				};
				if (oPages[index - 1] == undefined || oPages[index + 1] == undefined ) {
					oPages[index].style.width = "355px";
				};
			}
			ele.onmouseout = function oPagesout () {
				for (let i = oPages.length - 1; i >= 0; i--) {
					oPages[i].style.backgroundColor = "";
				};
				this.style.width = "330px";
				oWord1[index].style.color = "rgb(181,172,179)";
				oSpans[index].style.bottom = "-100px";
				oSpans[index].style.transition = "0.3s";
				if (this.previousElementSibling) {
					this.previousElementSibling.style.width = "330px";
				};
				if (this.nextElementSibling) {
					this.nextElementSibling.style.width = "330px";
				};
			}
		}();
		//page点击事件
		ele.addEventListener ("click",function  () {
			//控制页面跳转
			for(let i = 0;i<=oPages.length;i++){
				if (index == i) {
					var a = index+1;
					// console.log(a);
					function gotoPage () {
						window.location.href = "pages/page"+a+".html"
					}
					setTimeout(gotoPage,500)
				};
			}
			//控制所有文字变透明且消失
			for (var i = oP.length - 1; i >= 0; i--) {
				oP[i].style.opacity = "0";
				oP[i].style.zIndex = "-10";
				oP[i].style.transition = "0.5s";
				if (i<oH1.length) {
					oH1[i].style.opacity = "0";
					oH1[i].style.zIndex = "-10";
					oH1[i].style.transition = "0.5s";
				};
			};
			//控制本page宽度变为100%，其他的变为0
			for (var i = oPages.length - 1; i >= 0; i--) {
				if (i == index) {
					this.style.width = "100%";
					this.style.transition = "0.5s";
				}else{
					oPages[i].style.width = "0";
					oPages[i].style.transition = "0.5s";
				};
				//让本page的onmouseover，onmouseout事件失效
				oPages[i].onmouseout = null;
				oPages[i].onmouseover = null;
			};
			//控制page底部蒙版减退
			oSpans[index].style.bottom = "-100px";
			// oSpans[index].style.transition = "0.5s";
		}) 
	}) ;
}();

//读取各个页面传来的index
function GetUrlPara(){
	var url = document.location.toString();
	var arrUrl = url.split("?");
	var para = arrUrl[1];
	return para;
}
//子页面返回加载效果
function reload2 () {
	// console.log(GetUrlPara());
	//取数据的第一位 i
	var i = GetUrlPara().substring(0,1);
	if (i != "undefined") {
		// load = null;
		Array.prototype.forEach.call(oPages,function  (ele,index,self) {
			if (i == index +1) {
				oPages[index].style.width = "100%";
			}else{
				oPages[index].style.width = "0";
			}
			setTimeout(function  () {
				if (i == index) {
					oPages[index].style.width = "330px";
					oPages[index].style.transition = "0.3s"
				}else{
					oPages[index].style.transition = "0.3s"
					oPages[index].style.width = "330px";
				}
			},100)
		})
		oSPload(0,200);
		logoLoad(500);
	};
};

//自身刷新函数
//监听页面刷新按钮和f5刷新事件
~~function listenRefresh () {
	document.onkeydown = function  (e) {
		e = e || window.event;
			if (e.keyCode == 116) {
				console.log(e.keyCode);
		};
	}
}();
//刷新去掉子页面发送来的数据
function reload () {
	var start = location.pathname.indexOf("/i");
	var url = location.pathname.substring(start+1);
	window.location.href = url;
};
//判断加载方式
//如果是首页自身刷新，就使用load
//如果是子页返回，就执行reload2
~~function chooseLoad () {
	//获取当前地址中/i的位置  赋值给start
	var start = location.pathname.indexOf("/i");
	// console.log(GetUrlPara())
	//判断如果存在GetUrlPara()
	if (GetUrlPara() != undefined) {
		// console.log(GetUrlPara().substring(1));
		//如果获取的数据从第一个切断到最后一个，为[object%20Attr]#
		//且满足地址是index.html，则表示主页是子页面跳转的
		//执行第二种加载方式
		if (GetUrlPara().substring(1) == "[object%20Attr]" && location.pathname.substring(start+1) == "index.html") {
			window.onload = reload2();
		}
	};
	//如果GetUrlPara()不存在，且地址为index.html
	//则表示页面时首页自己刷新
	//执行第一种加载方式
	if (location.pathname.substring(start+1) == "index.html" && GetUrlPara()== undefined) {
		// console.log(location.pathname.substring(start+1));
		if (location.pathname.substring(start+1) == "index.html") {
			window.onload = load();
		}
	};
}();
