console.log("hello")
import './css/app.less'
// import $ from 'zepto'
// import 'bc-zepto-touch'
import lkme from '../src/linkedme-init'

(function () {
  let existNewspaper = true;

  let newspaperWrapper = document.querySelector('.newspaper_wrapper');
  let subscibeBtn = $('#newspaper-subscibe');
  if (existNewspaper) {
    newspaperWrapper.style.display = 'block';

    //初始化 linkedme
    lkme.init();
    console.log(lkme.depth(6010, 129061, 1, 4));
  } else {
    newspaperWrapper.style.display = 'none'
  }

  subscibeBtn.on('tap', function () {
    $(this).data("link") !== undefined ?
      window.location.href = $(this).data("link") : console.log('error');
  })
})();
