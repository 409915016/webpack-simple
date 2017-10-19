<!DOCTYPE HTML>
<html>
  <head>
    <title>南方周末 - <?= $content->subject ?></title>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" name="viewport">
    <link rel="stylesheet" type="text/css" href="http://images.infzm.com/css/2.0/article/mobile.css?v=61">
    <link rel="stylesheet" type="text/css" href="http://images.infzm.com/css/2.0/article/mobile_comment.css?v=57">
  </head>
    <script type="text/javascript">
      var $tag = function(tag,element){return (element||document).getElementsByTagName(tag);};
      //根据类名和对象，返回相应的对象数组
      var $class = function(clsName,element){
        var elementArr=[];
        if(document.getElementsByClassName){
            elementArr = (element||document).getElementsByClassName(clsName);
        }else{
          var regCls = new RegExp("(^| )"+ clsName +"( |$)");
          var elementTag = $tag("*",element);
          for (var i = 0;i< elementTag.length;i++){
            regCls.test(elementTag[i].className) && elementArr.push(elementTag[i]);
          }     
        }
        return elementArr;
      };
    </script>
  </head>
  <body>
    <input type="hidden" id="link_id" name="link_id" value="<?= $content->link_id ?>" />
    <input type="hidden" id="content_id" name="content_id" value="<?= $content->id ?>" />
    <input type="hidden" id="agent_type" name="agent_type" value="<?=$agentType?>" />
    <div class="wapper">
      <div class="mainbody">
        <nav role="navigation" class="line_bot">
          <div class="navbar">
            <a class="inblock navlogo" href="http://wwww.infzm.com/" target="_blank">
                <img height="100%" width="100%" src="http://images.infzm.com/images/2.0/mobile/details/logo.png?=v1" alt="">
            </a>
          </div><!-- navbar -->
        </nav><!-- nav -->
        <div class="content">
            <session>
              <h1 class="subject"><?= $content->subject ?></h1>
              <div class="article_sfont article_head">
                <div class="pic_head">
                  <p>
                    <?
                      if(strtotime($content->release_time) > strtotime($content->edit_time) ){
                        echo  $content->release_time;
                      }else{
                        echo "最后更新：".$content->edit_time;
                      }
                    ?>
                 
                  <span style="display:none;"  id="content_source" class="article_source">
                    <?= $content->source ?>
                  </span>
                  </p>
                  <p id="content_author">
                    作者：
                    <?=$content->richAuthor?>
                    <?if($content->props->press_from){?>
                      <span class="location article_from">发自：<?=$content->props->press_from?></span>
                    <?}?>
                  </p>
                </div>
              </div>
              <? if($content->template=="video"){
                  $page_no = isset($_GET['page']) > 0 ? $_GET['page'] : 0;
                  $videos = array();
                  foreach($this->content_medias as $media)
                  {
                    if($media->media_type == 4 ) //如果 视频 格式
                    {
                     $videos[] = $media;
                   }      
                  }
                  /** 获取视频信息 @todo 把这段代码放到控制器里面去*/
                  $video_count = count($videos);
                  // 相关媒体中的视频媒体类型
                  if ($video_count > 0) {
                    $video = $videos[$page_no];
                    $suffix = end(explode(".",$video->file_path));
                    $file_type = array("flv","swf","mp4");
                    $video_url = "http://images.infzm.com/medias/".$video->file_path;
                    $video_h = $video->media_height;
                    $video_w = $video->media_width;
                  } elseif (isset($this->item->props->_video)) {
                  // 文章属性中的视频链接
                    $video_url = $this->item->props->_video;
                    $suffix = end(explode(".", $video_url));
                  }
                  if($content_medias[0]->media_type==1){
                     $poster_url = "http://images.infzm.com/medias/".$content_medias[0]->file_path;
                  }else{
                       $poster_url = "";
                  }    
                   ?>
                   <? if( ! empty($video->file_path) || $video_url) { 
                      if($suffix=='mp4'){
                    ?>            
                      <div style="width:100%;margin:0;">
                        <video  class="myVideo" width="<?=$video_w?>" height="<?=$video_h?>" poster="<?=$poster_url?>" preload="auto" controls="controls"><source src="<?=$video_url?>" type="video/mp4"/>
                        </video>
                      </div>                   
                      <?}else{?>
                         <div  style="width:100%;margin:0;">
                          <div style="margin-bottom:10px">该视频无法在移动设备上播放</div>
                         </div>
                    <?}}?>
                  
              <?}?>
              <article class="article_p">

                <?=$content->fulltext?>

                <div style="text-align:right;font-size:14px;margin-top:5px;">

               <?if( !empty($network_editor) ){?>

                  <span>网络编辑:</span>
   
                 <span id="network_editor"><?=$network_editor?></span>

                 <?}?>

                <?if( !empty($charge_editor) ){?>

                  <span style="margin-left:14px">责任编辑:</span>
   
                    <span id="charge_editor"><?=$charge_editor?></span>

                <?}?>

                </div>
              </article>
          <!-- article -->
          <!--newspaper link-->            
          <?if($content->newsstand_id){?>
            <div class="newspaper_wrapper">
              <button class="" id="newspaper-subscibe"
                data-period="<?=$content->newsstand_id?>"
                data-article_id="<?=$content->id?>"
                data-hide="1"
                data-content_type="<?=$content->content_type?>">
                打开南方周末客户端阅读原文
              </button>
            </div>   
          <?}?>
          <!--newspaper link end-->
          <? if($content->template == 'movie_new') : ?>
            <!-- give grade to movie -->
            <div class="giveGrade">
              <div>
                <span class="movieGrade">影片评分：</span>
                <span class="bstar redStar"></span>
                <span class="bstar redStar"></span>
                <span class="bstar redStar"></span>
                <span class="bstar redStar"></span>
                <span class="bstar redStar"></span>
                <span class="avgGradeNum">0.0</span>
                (<span class="allUserNum"><span class="peoGradeCouter">0</span>人评价</span>)
              </div>
              <ul>
                <li>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <div class="percent">
                    <div class="takePercent"></div>
                  </div>
                  <span class="percentNum">0%</span>
                </li>
                <li>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="mstar"></i>
                  <div class="percent">
                    <div class="takePercent"></div>
                  </div>
                  <span class="percentNum">0%</span>
                </li>
                <li>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="mstar"></i>
                  <i class="mstar"></i>
                  <div class="percent">
                    <div class="takePercent"></div>
                  </div>
                  <span class="percentNum">0%</span>
                </li>
                <li>
                  <i class="rstar mstar"></i>
                  <i class="rstar mstar"></i>
                  <i class="mstar"></i>
                  <i class="mstar"></i>
                  <i class="mstar"></i>
                  <div class="percent">
                    <div class="takePercent"></div>
                  </div>
                  <span class="percentNum">0%</span>
                </li>
                <li>
                  <i class="rstar mstar"></i>
                  <i class="mstar"></i>
                  <i class="mstar"></i>
                  <i class="mstar"></i>
                  <i class="mstar"></i>
                  <div class="percent">
                    <div class="takePercent"></div>
                  </div>
                  <span class="percentNum">0%</span>
                </li>
              </ul>
              <div id="userGrade" class="userGrade">
                <span class="">我的评价：</span>
                <span id="myGrade" class="gradeLayout">
                  <a class="mstar myGrade"></a>
                  <a class="mstar myGrade"></a>
                  <a class="mstar myGrade"></a>
                  <a class="mstar myGrade"></a>
                  <a class="mstar myGrade"></a>
                  <a id="giveNewGrade" class="resetColor">修改</a>
                </span>
                <span class="gradeWarn"></span>
              </div>
            </div>
            <? endif ?>
        
          <div class="comment_block">
                <div class="com_head">
                  <span class="com_head">评论
                    (<span class="com_num">0</span>)
                  </span>
                  <a class="rig com_sign inblock signby"></a>
                </div>
                <textarea class="com_txt" placeholder="说说你的看法…"></textarea>
                <div class="clear">
                 
                  <input type="button" class="com_send rig inblock"/>
                </div>
              </div><!-- submit comment -->
              <div class="commentList">


                <div class="loading"></div>
                <div class="line_bot"></div>
              </div><!-- comment list-->
               <div class="showmore">
                  <div class="allcom">更多评论</div>
                </div>
              <div>
                <h2 class="more_article">继续阅读</h2>
                <h3><a class="morelink"></a></h3>
              </div><!-- more article -->
            </session>
            </div><!-- comment in all -->
            <footer class="footer">
              <!-- <div>
                <a href="/" class="footnav line_rig inblock">首页</a>
                <a href="/topic/csr.shtml" class="footnav line_rig inblock">南周公益</a>
                <a class="footnav inblock signby">登录</a>
              </div> -->
              <div class="footright"> © infzm.com</div>
            </footer>
            <div class="go">
              <a title="返回顶部" class="top"></a>
              <!-- <a title="返回底部" class="bottom"></a> -->
            </div><!-- go to top or bottom  -->
          </div>
          <div class="download-tips">
           <div class="h_w1">
                <script type='text/javascript'>
               
                  
                  var m3_u = ('http://x.infzm.com/www/delivery/ajs.php');
                  var m3_r = Math.floor(Math.random() * 99999999999);
                  if (!document.MAX_used) document.MAX_used = ',';
                  document.write("<scr" + "ipt type='text/javascript' src='" + m3_u);
                  document.write("?zoneid=144");
                  document.write('&amp;cb=' + m3_r);
                  if (document.MAX_used != ',') document.write("&amp;exclude=" + document.MAX_used);
                  document.write(document.charset ? '&amp;charset=' + document.charset : (document.characterSet ? '&amp;charset=' + document.characterSet : ''));
                  document.write("&amp;loc=" + escape(window.location));
                  if (document.referrer) document.write("&amp;referer=" + escape(document.referrer));
                  if (document.context) document.write("&context=" + escape(document.context));
                  if (document.mmm_fo) document.write("&amp;mmm_fo=1");
                  document.write("'><\/scr" + "ipt>");
                
                </script>
                <noscript>
                    <a href='http://x.infzm.com/www/delivery/ck.php?n=ac3947de&amp;cb=INSERT_RANDOM_NUMBER_HERE' target='_blank'><img src='http://x.infzm.com/www/delivery/avw.php?zoneid=144&amp;cb=INSERT_RANDOM_NUMBER_HERE&amp;n=ac3947de' border='0' alt='' /></a>
                </noscript>
            </div>
            <a class="close-btn"></a>
          </div>
        </div>
        <div class="shade">
          <div class="wx_share rig"></div>
        </div>
        <div class="rcover"></div>

        <!-- reset user grade -->
        <div class="resetLayout">
          <div class="resetContent">
            <div class="movieGrade">重新评价：</div>
            <div class="resetGrade">
              <a class="bbstar resetMyGrade"></a>
              <a class="bbstar resetMyGrade"></a>
              <a class="bbstar resetMyGrade"></a>
              <a class="bbstar resetMyGrade"></a>
              <a class="bbstar resetMyGrade"></a>
            </div>
            <input class="restBtn" type="button" value="确定"/>
          </div>
        </div>
    
  </body>
  <script type="text/javascript">
  <?php
    $models = ESFactory::getModel('link');
  ?>
  var movieGiveGrade = <?=json_encode($models->getVoteDatas($content->link_id)); ?>;
  var closePage = <?echo json_encode($closePage) ?>;
  var contentRelations = <?echo json_encode($content_relations) ?>;  
  var sns_share_counts = <? echo json_encode($this->snsShare); ?>;
  var bannerStatus = true;
  //content css margin 20
  var windowWidth = document.documentElement.clientWidth - 20;
  var videoArr = $class("myVideo");
  for (var i = 0; i < videoArr.length; i++) {
    var ele = videoArr[i];
    var ww = ele.getAttribute("width");
    var hh = ele.getAttribute("height");
    var p = windowWidth / ww;
    ele.parentNode.style.textAlign = "center";
    ele.style.width = Math.round(ww * p) + "px";
    ele.style.height = Math.round(hh * p) + "px";
    ele.setAttribute("width", ele.style.width);
    ele.setAttribute("height", ele.style.height);
  }
  window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    if (window.orientation === 180 || window.orientation === 0) {
      if (bannerStatus) {
        $('.download-tips').show(); //竖屏
      }
    }
    if (window.orientation === 90 || window.orientation === -90) {
      $('.download-tips').hide(); //横屏
    }
  }, false);
  var s2html = $tag('title')[0].text;
  var reg = new RegExp("<[^<]*>", "gi");
  $tag('title')[0].text = s2html.replace(reg, " ");
</script>
  <!--******载入部分js jQuery文件********-->
<!--   <script src="http://qzs.qq.com/tencentvideo_v1/js/tvp/tvp.player.js"></script> -->
  <script src="http://images.infzm.com/js/lib/zepto/1.1.4/zepto.min.js"></script>
  <script src="http://images.infzm.com/js/lib/zepto/1.1.4/zepto-touch.min.js"></script>
  <script src="http://images.infzm.com/js/lib/zepto/1.1.4/zepto-detect.min.js"></script>
  <script src="http://images.infzm.com/js/com/infzm/content/mobile/comment.js?v=48"></script>
  <script src="http://images.infzm.com/js/com/infzm/content/mobile/main.js?v=54"></script>
  <script src="http://images.infzm.com/js/com/infzm/content/mobile/movie.js"></script>
  <script src="http://stats.infzm.com/public/static/analysis/analysis.js"></script>
  <script src="http://v3.jiathis.com/code/jia.js"></script>
  <script src="https://static.lkme.cc/linkedme.min.js"></script>

</html>
