import './css/app.less'
import lkme from '../src/linkedme-init'

$.fn.prevAll = function (selector) {
  var prevEls = [];
  var el = this[0];
  if (!el) return $([]);
  while (el.previousElementSibling) {
    var prev = el.previousElementSibling;
    if (selector) {
      if ($(prev).is(selector)) prevEls.push(prev);
    }
    else prevEls.push(prev);
    el = prev;
  }
  return $(prevEls);
};


(function () {
  //let existNewspaper = true;
  let existNewspaper = $("div.newspaper_wrapper");
  let period, cat_id, article_id, hide, content_type;
  let newspaperWrapper = document.querySelector('.newspaper_wrapper');
  let subscibeBtn = $('#newspaper-subscibe');
  if (existNewspaper.length) {
    let NewspaperBtn = existNewspaper.find("button");
    period = NewspaperBtn.data("period");
    cat_id = NewspaperBtn.data("cat_id");
    article_id = NewspaperBtn.data("article_id");
    hide = NewspaperBtn.data("hide");
    content_type = NewspaperBtn.data("content_type");
    // console.log(period)
    // console.log(article_id)
    // console.log(hide)
    // console.log(content_type)
    newspaperWrapper.style.display = 'flex';

    //初始化 linkedme
    lkme.init();
    lkme.depth(period, cat_id, article_id, hide, content_type);
    let all_article_p = $(".article_p p");
    let download_ad_link = $(".h_w1 a");

    //判断文章截断
    if (all_article_p.length > 3) {
      let article_p_wrapper = $("article.article_p");
      $(all_article_p[3]).addClass("flag");
      let temp = $("p.flag").prevAll();
      article_p_wrapper.empty().append(temp.get().reverse()).append("<p>……</p>");
    }
    setTimeout(function () {
      if (download_ad_link.length) {
        download_ad_link.attr("href", subscibeBtn.data("link"));
      }
    }, 200)

  } else {
    //newspaperWrapper.style.display = 'none'
  }

  subscibeBtn.on('tap', function () {
    $(this).data("link") !== undefined ?
      window.location.href = $(this).data("link") : console.log('error');
  })
})();
