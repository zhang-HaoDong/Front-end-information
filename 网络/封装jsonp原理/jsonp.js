//封装一个jQuery的ajax函数，但跨域只实现了jsonp原理；

function _ajax (url, func) {
    var xml = new XMLHttpRequest();
    xml.open('get',url);
    xml.onreadystatechange = function () {
        if (xml.readyState == 4 && xml.status == 200){
            var data = JSON.parse(xml.responseText);
            func && func(data);
        }
        
    }
    xml.send();
}
var $ = {
    ajax : function (options) {
        var url = options.url;
        var data = options.data;
        var dataType = options.dataType;
        var targetProtocol = ''
        var targetHost = '';
        if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
            var targetUrl = new URL(url);
            targetHost = targetUrl.host;
            targetProtocol = targetUrl.protocol;

        }else{
            targetProtocol = location.protocol;
            targetHost = location.host;
        }
        if (dataType != 'jsonp') {
           _ajax(url,options.success);
        }else{
           if(location.protocol == targetProtocol && location.host ==targetHost) {
            _ajax(url, options.success);
           }else{
               var callback = 'zhd' + Math.floor(Math.random() * 1000000);
               window[callback] = options.success;
               var script = document.createElement('script');
               if (url.indexOf('?') > 0){
                   script.src = url + '&callback=' +callback;
               }else{
                script.src = url + '?callback=' +callback;
               }
               document.head.appendChild(script);
           }
        }

    }
}