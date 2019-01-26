if (document.getElementById("nextPage")) {
    oNextPage = document.getElementById("nextPage");
};
if (document.getElementById("prePage")) {
    var oPrePage = document.getElementById("prePage");
};
if (document.getElementsByClassName('nextImg')[0]) {
    oNextImg = document.getElementsByClassName('nextImg')[0];
};
if (document.getElementsByClassName('preImg')[0]) {
    var oPreImg = document.getElementsByClassName('preImg')[0];
};
if (document.getElementById("wrap")) {
    var oWrap = document.getElementById("wrap");
};
if (document.getElementsByTagName("a")) {
    var oA = document.getElementsByTagName("a");
};
if (document.getElementById("canvas")) {
     canvas = document.getElementById("canvas");
};
//变化后的颜色
var colorArr = ["rgb(46,39,44)","rgb(93,53,43)","rgb(8,33,57)"
,"rgb(92,30,30)","rgb(65,79,77)","rgb(8,50,51)"];
//本色
var colorArr2 = ["rgb(114,97,110)","rgb(232,132,107)","rgb(22,82,142)"
,"rgb(229,75,75)","rgb(162,97,91)","rgb(22,142,128)"];
//创建一个所有页面的相对路径的数组
var pagesArray = ["index.html","page1.html","page2.html","page3.html",
"page4.html","page5.html","page6.html"];

//获取当前页面的相对路径  跟数组中的格式相同！
function GetUrlRelativePath(){
　var url = document.location.toString();
　var arrUrl = url.split("//");
　var start = arrUrl[1].lastIndexOf(".html");
    var stop = start - 5;
//stop从.html的位置再减去5个
　var relUrl = arrUrl[1].substring(start,stop) + ".html";
//截取start到stop的字符 再加上 .html
　if(relUrl.indexOf("?") != -1){
　　relUrl = relUrl.split("?")[0];
　}
　return relUrl;
}

//鼠标靠边，下一页/上一页  出现   
~~function move () {
    //当鼠标位置超过当前窗口宽度的97%
    document.onmousemove = function  (e) {
        // console.log(typeof(oPrePage))//undefined
        //让右边的下一页  出现
        // console.log(e.clientX + "------");
        if (e.clientX >= window.innerWidth-60 && typeof(oNextPage) != "undefined") {
            // console.log(window.innerWidth-60+"++++++");
            oNextPage.style.left = window.innerWidth-60 + "px";
            oNextPage.style.transition = "0.3s";
        }else if(e.clientX <= window.innerWidth-60 && typeof(oNextPage) != "undefined"){
            oNextPage.style.left = window.innerWidth + "px";
        }
        //如果鼠标位置小于60px，就让左边的上一页出现
        if (e.clientX <= 60 && typeof(oPrePage) != "undefined") {
            oPrePage.style.left = "0px";
            oPrePage.style.transition = "0.3s";
        }else if(e.clientX >= 60 && typeof(oPrePage) != "undefined"){
            oPrePage.style.left = "-60px";
        }
    };
}();
//给上一页下一页和两个logo设置点击事件
if (typeof(oPrePage) != "undefined") {
	oPrePage.onclick  = gotoPage;
};
if (typeof(oPreImg) != "undefined") {
	oPreImg.onclick  = gotoPage;
};
if (typeof(oNextImg) != "undefined") {
	oNextImg.onclick  = gotoPage;
};
if (typeof(oNextPage) != "undefined") {
	oNextPage.onclick  = gotoPage;
};

//先封装跳转上一页和下一页的函数
function gotoPage () {
        //让页面的onmousemove事件清空
        document.onmousemove = null;
        //跳转下一页或者上一页动画
        //如果点下一页
        document.onclick = function  (e) {
            //如果点击上一页
            if (e.clientX >= window.innerWidth-60) {
                    ~~function gotoNextPage () {
                        //让canvas消失
                        canvasDisL();
                        //判断当前页面在数组中的index
                        for (let i = 0; i <= pagesArray.length; i++) {
                            if (GetUrlRelativePath() == pagesArray[i]) {
                                //设置定时器在canvas消失之后，
                                //0.3s之后让oNextPage沾满屏幕
                                setTimeout(function  () {
                                    oNextPage.style.left = "0";
                                    oNextPage.style.width = "100%";
                                    oNextPage.style.transition = "0.2s";
                                    oWrap.style.backgroundColor = colorArr2[i];
                                    oWrap.style.transition = "0.4s";
                                },300)
                                // console.log(pagesArray[i]);
                                setTimeout(function  () {
                                    window.location.href = pagesArray[i+1];
                                },600)
                                return i;
                            };
                        };
                  }();
            };
            //如果点上一页
            if(e.clientX <= 60){
                ~~function gotoPrePage () {
                    canvasDisR();
                    //判断当前页面在数组中的index
                    for (let i = 0; i <= pagesArray.length; i++) {
                        if (GetUrlRelativePath() == pagesArray[i]) {
                            setTimeout(function  () {
                                oPrePage.style.width = "100%";
                                oPrePage.style.transition = "0.2s";
                                oWrap.style.backgroundColor = colorArr2[i-1];
                                oWrap.style.transition = "0.4s";
                            },300)
                            setTimeout(function  () {
                                window.location.href = pagesArray[i - 1];
                             },600)
                            return i;
                        };
                    };
                }();
            }
        }
}
//canvas出现
window.onload = function  () {
    if (typeof (canvas) != "undefined") {
    canvas.style.top = "0";
    canvas.style.opacity = "1";
    canvas.style.transition = "0.3s";}
}
//canvas消失
//向下
function canvasDis  () {
    //判断canvas存不存在
    if (typeof (canvas) != "undefined") {
        canvas.style.top  = "100%";
        canvas.style.opacity = "0";
        canvas.style.transition = "0.3s";
    };
}
//向右
function canvasDisL  () {
    //判断canvas存不存在
    if (typeof (canvas) != "undefined") {
        canvas.style.marginLeft  = "-60%";
        canvas.style.opacity = "0";
        canvas.style.transition = "0.3s";
    };
}
//向左
function canvasDisR  () {
    //判断canvas存不存在
    if (typeof (canvas) != "undefined") {
        canvas.style.marginLeft  = "100%";
        canvas.style.opacity = "0";
        canvas.style.transition = "0.3s";
    };
}
//向首页传递本页的页码（也就是数组中的index）
//并且传递跳转至首页的方法gotoIndex
function gotoIndex () {
    // console.log( oA[0].attributes.onclick );
    for (let i = 0; i <= pagesArray.length; i++) {
        //判断当前地址是第几个页面  获取i
        if (GetUrlRelativePath() == pagesArray[i]) {
            //返回首页，并传递i
            canvasDis();
            setTimeout(function  () {
                window.location.href = "../index.html?"+i+oA[0].attributes.onclick
            },300)
        };
     };
}
~~function fobidden_back() {
    //防止页面后退
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate',back_common)
}();
//启用浏览器返回
function enable_back() {
    history.go(-1);
    window.removeEventListener('popstate',back_common)
}
function back_common() {
    history.pushState(null, null, document.URL);
}
// 监听页面返回事件
// ~~function(){
//     window.addEventListener("popstate", function(e) {
        //........
//     }, false);
//     ~~function pushHistory() {
//       var state = {
//           title: "title",
//           url: "#"
//       };
//       window.history.pushState(state, "title", "#");
//     }();
// }()
