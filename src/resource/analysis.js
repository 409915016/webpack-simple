;(function () {

    function GetContentAuthor() {
        var em = document.getElementById("content_author")
        if (em) {
            var clsName = "authorName";
            var regCls = new RegExp("(^| )" + clsName + "( |$)");
            var elementArr = [];

            for (var i = 0; i < em.children.length; i++) {

                if (regCls.test(em.children[i].className)) {
                    elementArr.push(em.children[i].innerHTML.toString().replace(/<.+?>/g, ""))
                }
                ;
            }

            return elementArr.join("|");
        }
    }

    function GetContentSource() {
        if (document.getElementById("content_source")) {
            return document.getElementById("content_source").innerText.replace(regEx, '');
        }
        return "";
    }

    function GetNetworkEditor() {
        if (document.getElementById("network_editor")) {
            return document.getElementById("network_editor").innerText.replace(regEx, '|');
        }
        return "";
    }

    function GetChargeEditor() {
        if (document.getElementById("charge_editor")) {
            return document.getElementById("charge_editor").innerText.replace(regEx, '|');
        }
        return "";
    }

    var regEx = /\s+/g;
    var req, UID, ot;
    var expDays = 30;
    var expSeconds = 45;
    var exp = new Date();
    var refreshExp = new Date();
    var isRefresh;
    exp.setTime(exp.getTime() + (expDays * 24 * 60 * 60 * 1000));
    refreshExp.setTime(refreshExp.getTime() + (expSeconds * 1000));

    init();
    function init(a) {
        setUp();//启动cookies
        if (!window.remote_ip_info) {
            var s = document.createElement('script');
            s.onload = pullRequest;
            //加载新浪IP库
            s.type = 'text/javascript';
            s.src = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
            document.body.appendChild(s);
            s = null;
        }

        //检查脚本是否加载成功，否则重载
        ot = setInterval(function () {
            !!window.remote_ip_info ? clearInterval(ot) : init()
        }, 1500);
    }

    function pullRequest() {
        // 后台处理的文件地址

        if (GetCookie('ReFresh')) {
            return
        } else {
            SetCookie('ReFresh', true, refreshExp);
        }

        var url = "http://stats.infzm.com/data/";

        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest;
        } else if (window.ActiveXObject) {
            req = new ActiveXObject("Microsoft.XMLHttp");
        }
        if (req) {
            // 获取当前的网址
            var link = location.href.split('#')[0].split('?')[0];
            if(link.lastIndexOf("/") + 1 != link.length){
                link = link + "/";
            }
            //网址过长
            if (link.length > 150) {
                return;
            }

            if (/^http:\/\/+[(^i)|(\w|\-|\d|\+|\.i)]+nfzm.com+[\a-\z\A-\Z0-9\u4E00-\u9FA5\/\/?\&]/g.test(link)) {


                // 获取上页地址
                var oldlink = document.referrer;
                // 获取当前访问页的标题
                var titleName = document.title;

                //标题不包含中文
                if (!/[\u4E00-\u9FA5]/g.test(titleName)){
                    return;
                }
                // 屏幕分辨率
                var screen = window.screen.width + "*" + window.screen.height;
                // 异步请求发送
                //req.open("GET", url + "?id=" + escape(link) + "&oldlink=" + escape(oldlink) + "&title=" + escape(titleName) + "&sys=" + getSysInfo() + "&s=" + screen + "&b=" + GetBrowserType() + " " + GetBrowserVersion() + "&p=" + remote_ip_info.province + "&c=" + remote_ip_info.city + "&k=" + GetKeyword(oldlink) + "&guid=" + GetCookie('GUID') + "&wwc=" + GetCookie('WWHCount') + "&wwh=" + GetCookie('WWhenH'), true);
                req.open("GET", url + "?id=" + escape(link) + "&oldlink=" + escape(oldlink) + "&title=" + encodeURIComponent(titleName) + "&p=" + remote_ip_info.province + "&c=" + remote_ip_info.city + "&k=" + GetKeyword(oldlink) + "&guid=" + GetCookie('GUID') + "&wwc=" + GetCookie('WWHCount') + "&wwh=" + GetCookie('WWhenH') + "&author=" + GetContentAuthor() + "&source=" + GetContentSource() + "&networkeditor=" + GetNetworkEditor() + "&chargeeditor=" + GetChargeEditor() , true);
                req.onreadystatechange = callback; // 制定回调函数
                req.send(null);

            }
        }
    }

    window.analysisEvent = function (element, evtName, title, param) {
        // 后台处理的文件地址

        var url = "http://stats.infzm.com/normaldata/";

        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest;
        } else if (window.ActiveXObject) {
            req = new ActiveXObject("Microsoft.XMLHttp");
        }
        if (req) {
            // 获取当前的网址
            var link = 'http://' + element + '.' + evtName;

            if (param) {
                link = link + "." + param;
            }

            if (link.lastIndexOf("/") + 1 != link.length) {
                link = link + "/";
            }

            //网址过长
            if (link.length > 150) {
                return;
            }
            // 获取上页地址
            var oldlink = document.referrer;
            // 获取事件的中文标题
            var titleName = title;
            // 屏幕分辨率
            //var screen = window.screen.width + "*" + window.screen.height;
            // 异步请求发送
            //req.open("GET", url + "?id=" + escape(link) + "&oldlink=" + escape(oldlink) + "&title=" + escape(titleName) + "&sys=" + getSysInfo() + "&s=" + screen + "&b=" + GetBrowserType() + " " + GetBrowserVersion() + "&p=" + remote_ip_info.province + "&c=" + remote_ip_info.city + "&k=" + GetKeyword(oldlink) + "&guid=" + GetCookie('GUID') + "&wwc=" + GetCookie('WWHCount') + "&wwh=" + GetCookie('WWhenH'), true);
            req.open("GET", url + "?id=" + escape(link) + "&oldlink=" + escape(oldlink) + "&title=" + encodeURIComponent(titleName) + "&p=" + remote_ip_info.province + "&c=" + remote_ip_info.city + "&k=" + GetKeyword(oldlink) + "&guid=" + GetCookie('GUID') + "&wwc=" + GetCookie('WWHCount') + "&wwh=" + GetCookie('WWhenH'), true);
            req.onreadystatechange = null; // 制定回调函数
            req.send(null);
        }
    }

    // 获取来自搜索引擎的关键词
    function GetKeyword(url) {
        if (url.toString().indexOf("baidu") > 0) {
            return request(url, "wd");
        }
        else if (url.toString().indexOf("google") > 0) {
            return request(url, "q");
        }
        else if (url.toString().indexOf("sogou") > 0) {
            return request(url, "query");
        }
        else if (url.toString().indexOf("soso") > 0) {
            return request(url, "w");
        }
        else {
            return "";
        }
    }

    // 获取链接地址中某个参数的值
    function request(url, paras) {
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        var paraObj = {};
        for (i = 0; j = paraString[i]; i++) {
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
        }
        var returnValue = paraObj[paras.toLowerCase()];
        if (typeof (returnValue) == "undefined") {
            return "";
        } else {
            return returnValue;
        }
    }


    // 回调函数，可以获取添加后的访问ID，以便其他操作。
    function callback() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                //UID = JSON.parse(req.response).user;
                //console.log(UID);
            } else {
            }
            ;
        } else {
        }
    }


    // 获取系统信息
    function getSysInfo() {
        var ua = navigator.userAgent.toLowerCase();
        isWin7 = ua.indexOf("nt 6.1") > -1
        isVista = ua.indexOf("nt 6.0") > -1
        isWin2003 = ua.indexOf("nt 5.2") > -1
        isWinXp = ua.indexOf("nt 5.1") > -1
        isWin2000 = ua.indexOf("nt 5.0") > -1
        isWindows = (ua.indexOf("windows") != -1 || ua.indexOf("win32") != -1)
        isMac = (ua.indexOf("macintosh") != -1 || ua.indexOf("mac os x") != -1)
        isAir = (ua.indexOf("adobeair") != -1)
        isLinux = (ua.indexOf("linux") != -1)
        var broser = "";
        if (isWin7) {
            sys = "Windows 7";
        } else if (isVista) {
            sys = "Vista";
        } else if (isWinXp) {
            sys = "Windows xp";
        } else if (isWin2003) {
            sys = "Windows 2003";
        } else if (isWin2000) {
            sys = "Windows 2000";
        } else if (isWindows) {
            sys = "Windows";
        } else if (isMac) {
            sys = "Macintosh";
        } else if (isAir) {
            sys = "Adobeair";
        } else if (isLinux) {
            sys = "Linux";
        } else {
            sys = "Unknow";
        }
        return sys;
    }

    // 获取浏览器类型
    function GetBrowserType() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua == null) return "ie";
        else if (ua.indexOf('chrome') != -1) return "chrome";
        else if (ua.indexOf('opera') != -1) return "opera";
        else if (ua.indexOf('msie') != -1) return "ie";
        else if (ua.indexOf('safari') != -1) return "safari";
        else if (ua.indexOf('firefox') != -1) return "firefox";
        else if (ua.indexOf('gecko') != -1) return "gecko";
        else return "ie";
    }

    // 获取浏览器版本
    function GetBrowserVersion() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua == null) return "null";
        else if (ua.indexOf('chrome') != -1) return ua.substring(ua.indexOf('chrome') + 7, ua.length).split(' ')[0];
        else if (ua.indexOf('opera') != -1) return ua.substring(ua.indexOf('version') + 8, ua.length);
        else if (ua.indexOf('msie') != -1) return ua.substring(ua.indexOf('msie') + 5, ua.length - 1).split(';')[0];
        else if (ua.indexOf('safari') != -1) return ua.substring(ua.indexOf('safari') + 7, ua.length);
        else if (ua.indexOf('gecko') != -1) return ua.substring(ua.indexOf('firefox') + 8, ua.length);
        else return "null";
    }

    // Cookies
    function setUp() {
        SetCookie('GUID', Who(), exp);
        SetCookie('WWHCount', Count(), exp);
        When();
        // window.onbeforeunload = function() {
        //     alert('onbeforeunload')
        // }
    }

    function Who() {
        var GUID = GetCookie('GUID');
        if (GUID == null) {
            GUID = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                }).toUpperCase();
            };
            SetCookie('GUID', GUID(), exp);
            return GUID()
        }
        return GUID;
    }

    //访问时间
    function When() {
        var rightNow = new Date();
        var WWHTime = 0;
        WWHTime = GetCookie('WWhenH');
        WWHTime = WWHTime * 1
        var lastHereFormatting = new Date(WWHTime);
        // 访问时间记录
        var intLastVisit = (lastHereFormatting.getYear() * 10000) + (lastHereFormatting.getMonth() * 100) + lastHereFormatting.getDate();
        var lastHereInDateFormat = "" + lastHereFormatting;
        var dayOfWeek = lastHereInDateFormat.substring(0, 3);
        var dateMonth = lastHereInDateFormat.substring(4, 11);
        var timeOfDay = lastHereInDateFormat.substring(11, 16);
        var year = lastHereInDateFormat.substring(23, 25);
        var WWHText = dayOfWeek + ", " + dateMonth + " at " + timeOfDay;
        SetCookie("WWhenH", rightNow.getTime(), exp);
        return WWHText;
    }

    // 访问次数统计
    function Count() {
        var WWHCount = GetCookie('WWHCount')
        if (WWHCount == null) {
            WWHCount = 0;
        }
        else {
            if (!isRefresh)
                WWHCount++;
        }
        SetCookie('WWHCount', WWHCount, exp);
        return WWHCount;
    }

    function getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1)
            endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
    }

    //读取cookie中的信息
    function GetCookie(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            if (document.cookie.substring(i, j) == arg)
                return getCookieVal(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    }

    //设置Cookie内容
    function SetCookie(name, value) {
        var argv = SetCookie.arguments;
        var argc = SetCookie.arguments.length;
        var expires = (argc > 2) ? argv[2] : null;
        var path = (argc > 3) ? argv[3] : null;
        var domain = (argc > 4) ? argv[4] : null;
        var secure = (argc > 5) ? argv[5] : false;
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
    }
}());