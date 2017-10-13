//cookie
jQuery_cookie = function(name, value, options) {
  if (typeof value != 'undefined') {
    options = options || {};
    if (value === null) {
      value = '';
      options = $.extend({}, options);
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString();
    }
    var path = options.path ? '; path=' + (options.path) : '';
    var domain = options.domain ? '; domain=' + (options.domain) : '';
    var secure = options.secure ? '; secure' : '';
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  } else {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

// sidebar
$(".navbar_btn").on("tap", function() {
  if (!$(".sidebar").hasClass("sidebar_show")) {
    $(".sidebar").removeClass("sidebar_hide").addClass("sidebar_show");
    $(".mainbody").addClass("mainbody_hide");
  } else {
    $(".mainbody").removeClass("mainbody_hide");
    $(".sidebar").removeClass("sidebar_show").addClass("sidebar_hide");
  }
});
$(".content").on("tap", function() {
  $(".mainbody").removeClass("mainbody_hide");
  $(".sidebar").removeClass("sidebar_show").addClass("sidebar_hide");
});
$(".slid_li").on("tap", function() {
  $(".slid_li").removeClass("slid_active");
});
$(".news_li").on("tap", function() {
  $(".news_li").addClass("slid_active");
});
$(".economy_li").on("tap", function() {
  $(".economy_li").addClass("slid_active");
});
$(".culture_li").on("tap", function() {
  $(".culture_li").addClass("slid_active");
});
$(".life_li").on("tap", function() {
  $(".life_li").addClass("slid_active");
});
$(".movie_li").on("tap", function() {
  $(".movie_li").addClass("slid_active");
});
$(".comment_li").on("tap", function() {
  $(".comment_li").addClass("slid_active");
});
$(".green_li").on("tap", function() {
  $(".green_li").addClass("slid_active");
});
$(".voice_li").on("tap", function() {
  $(".voice_li").addClass("slid_active");
});
$(".people_li").on("tap", function() {
  $(".people_li").addClass("slid_active");
});

//share and agree
$(".shareit").on("tap", function() {
  if (!$(".share_content").hasClass("share_show")) {
    $(".shareit").removeClass("sharebtn");
    $(".shareit").addClass("sharebtn_click");
    $(".share_content").removeClass("share_hide").addClass("share_show");
  } else {
    $(".shareit").removeClass("sharebtn_click").addClass("sharebtn");
    $(".share_content").removeClass("share_show").addClass("share_hide");
  }
});

function is_weixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    $(".inweixin").show();
    return true;
  } else {
    $(".inweixin").hide();
    return false;
  }
}
is_weixin();
$(".wx").on("tap", function() {
  $(".shade").show();
});
$(".shade").singleTap(function() {
  $(".shade").hide();
});

// comment loading
$(".com_txt").focus(function() {
  $(".go").hide();
});
$(".com_txt").blur(function() {
  $(".go").show();
});
$(".showmore").on("tap", function() {
  $(".showmore").hide();
});

//go and back
$(".top").on("tap", function() {
  window.scrollTo(99999, 0);
  return false;
});
$(".bottom").on("tap", function() {
  window.scrollTo(0, 99999);
  return false;
});
$(".backto").on("tap", function() {
  javascript: history.back(-1);
});
$(".signby").on("tap", function() {
  var curehref = window.location.href;
  window.location.href = "http://passport.infzm.com/?refer=" + encodeURIComponent(curehref);
  localStorage.position = window.scrollY;
  console.log(localStorage.position);
});
$(window).scroll(function() {
  //if (window.scrollY >= $('.pic_head').offset().top) {
  if (window.scrollY >= 100) {
    $(".go").show();
  } else {
    $(".go").hide();
  }
});

//more article
if ( contentRelations != null && typeof(contentRelations[0]) == "object") {
//if (typeof(contentRelations[0]) == "object") {
  $(".morelink").html(contentRelations[0].short_subject);
  $(".morelink").on("tap", function() {
    window.location.href = "/" + contentRelations[0].id;
  });
}else if (typeof(closePage.after) == "object") {
  $(".morelink").html(closePage.after.short_subject);
  $(".morelink").on("tap", function() {
    window.location.href = "/" + closePage.after.id;
  });
}

//check login

var isLogin = false;
(function() {
  checkLogin = function() {
    var options = {
      url: 'http://www.infzm.com/passport/loginform/raw',
      data: '',
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        var index = res.indexOf('_ISLOGIN = 1');
        if (index > 0) {
          $('.com_sign').hide();
          var start = res.indexOf('<a href="http://passport.infzm.com/my" class="usericon">'),
            subface = res.substring(start, res.length),
            end = subface.indexOf('</a>'),
            face = subface.substring(0, end) + '</a>';
          $('.navbar_user').html(face).css({
            'border-radius': '20px',
            'overflow': 'hidden'
          });
          window.scrollTo(0, parseInt(localStorage.position));
          isLogin = true;
        }
      }
    }
    $.ajax(options);
  }
  checkLogin();

  $('.article_p img').removeAttr('style');
  $('.article_p img').removeAttr('width');
  $('.article_p img').removeAttr('height');
  $('.article_p .picCaption').removeAttr('style');
  // if ($.os.android) {
  //   $('.download-btn').css({
  //     top: '28.33333333333333%',
  //     right: '4.533333333333334%',
  //     width: '21.333333333333335%',
  //     height: '43.333333333333335%'
  //   });
  //   $('.mainbody').css({
  //     'margin-top': window.innerWidth / 750 * 120
  //   });
  // } else {
  //   if ($.os.ios) {
  //     $('.download-btn').css({
  //       top: '18.75%',
  //       right: '2.34375%',
  //       width: '14.0625%',
  //       height: '62.5%'
  //     });
  //     $('.mainbody').css({
  //       'margin-top': window.innerWidth / 640 * 80
  //     });
  //   }
  // }
  // $('.download-btn').css({
  //   top: '30.046154%',
  //   right: '10.66666%',
  //   width: '20.266666%',
  //   height: '40.384615%'
  // }).on('tap', function() {
  //     analysisEvent('mobileFloatAdv','click','移动网页底部浮动横条广告','openDownload');
  //     window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=net.coollet.infzmreader';
  // });

$('.h_w1').on('tap', function() {
      analysisEvent('mobileFloatAdv','click','移动网页底部浮动横条广告打开','open');
  });
$('.close-btn').on('tap', function() {
  $('.download-tips').hide();
  bannerStatus = false;
  analysisEvent('mobileFloatAdv','click','移动网页底部浮动横条广告关闭','close');
});
if(typeof JSBinder == "function"){
  $('.download-tips').hide();
  bannerStatus = false;
}
/*  $('.mainbody').css({
    'margin-top': window.innerWidth / 750 * 120
  });*/
 /* $('.download-tips').on('tap', function() {
    if ($.os.android) {
      window.open('http://zhushou.360.cn/detail/index/soft_id/2587173?recrefer=SE_D_%E5%8D%97%E5%91%A8%E7%9F%A5%E9%81%93', '_blank');
    } else {
      if ($.os.ios) {
        var ua = window.navigator.userAgent.toLowerCase();
        if (/MicroMessenger/i.test(ua)) {
          $('.qr-mask-container').show();
          $('.qrcode-container').show().css('top', $(window).scrollTop() + (window.innerHeight - $('.qrcode-container').height()) / 2).data('visible', 'true');
        } else {
          // window.open('https://itunes.apple.com/cn/app/nan-fang-zhou-mo/id370704734?l=en&mt=8', '_blank');
          window.open('https://itunes.apple.com/cn/app/nan-zhou-zhi-dao/id950212449?mt=8', '_blank');
        }
      }
    }
  });*/
  /*$(window).on('scroll', function() {
    if ($('.qrcode-container').data('visible')) {
      $('.qrcode-container').css('top', $(window).scrollTop() + (window.innerHeight - $('.qrcode-container').height()) / 2);
    }
  });*/
/*  $('.qr-mask-container .close').on('tap', function() {
    $('.qr-mask-container').hide();
    $('.qrcode-container').data('visible', '').hide();
  });*/
})();