import './css/app.less'
import lkme from '../src/linkedme-init'


(function () {
  //let existNewspaper = true;
  let existNewspaper = $("div.newspaper_wrapper")
  let period, article_id, hide, content_type;
  let newspaperWrapper = document.querySelector('.newspaper_wrapper');
  let subscibeBtn = $('#newspaper-subscibe');
  if (existNewspaper) {
    let NewspaperBtn = existNewspaper.find("button");
    period = NewspaperBtn.data("period")
    article_id = NewspaperBtn.data("article_id")
    hide = NewspaperBtn.data("hide")
    content_type = NewspaperBtn.data("content_type")
    console.log(period)
    console.log(article_id)
    console.log(hide)
    console.log(content_type)
    newspaperWrapper.style.display = 'flex';

    //初始化 linkedme
    lkme.init();
    console.log(lkme.depth(period, article_id, hide, content_type));
  } else {
    newspaperWrapper.style.display = 'none'
  }

  subscibeBtn.on('tap', function () {
    $(this).data("link") !== undefined ?
      window.location.href = $(this).data("link") : console.log('error');
  })
})();
