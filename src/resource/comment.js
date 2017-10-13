var commentList = $('.commentList');
var submitComment = function(opts, callback) {
    $.post("/link/submitcomment/raw", {
      link_id: opts.link_id,
      comment_content: opts.comment_content,
      agentType: opts.agentType || 0,
      parent_id: opts.parent_id || 0,
      sina_checked: opts.sina_checked || 0,
      subject: opts.subject
    }, function(resp) {
      if (resp.res != '1') {
        callback(resp.msg);
      } else {
        if (resp.comments.comments) {
          callback(null, resp.comments.comments , opts.parent_id || 0);
        } else {
          callback(null);
        }
      }
    }, 'json');
  };
var commentreplyInput = function(){
    $("<div></div>").addClass("input-modal").appendTo($("body"))
    var tmp = '<div class="input-box"><div class="impression-text-wrap"> <textarea class="impression-text" type="text" placeholder="请输入内容..."/></textarea> </div> <div class="btn-wrap"><div class="reply-submit">回复</div><div class="reply-cancel">取消</div> </div></div>';
    $(".input-modal").html(tmp)
    $(".reply-cancel").on('click', function() {
        $(".input-modal").hide()
        $(".impression-text").val("")
    })
    $(".reply-submit").on('click', function() {
        if ($(".impression-text").val()=="") {
          alert("请填写内容");
          return
        }
        window.location.hash = 'comments';
        $(".loading").show();
        $(".input-modal").hide()
        submitComment({
          link_id: getLinkId(),
          comment_content: $(".impression-text").val(),
          subject: $('.subject').text(),
          parent_id: $(".input-modal").attr('data-pid')
        }, function(err, resp , pid) {
          if (err) {
            alert("评论失败：" + err);
            $(".loading").hide();
          } else {
            if (resp) {
              preTinyData(resp,function(data){
                data.forEach(function(comment) {
                  appendComment(comment,false,comment.parent_id);
                  $(".impression-text").val("")
                  $(".loading").hide();
                });
              })
            }
          }
        });
      })
}

commentreplyInput();

var getCommentList = function(opts, callback) {
  if (!opts || !opts.link_id) {
    callback("请输入link_id参数");
  } else {
    opts.page = opts.page || 1;
    $.post("/link/linkComments/raw/" + opts.link_id + "?page=" + opts.page, {}, function(resp) {
      if (resp.res != '1') {
        callback(resp.msg);
      } else {
        callback(null, resp);
      }
    }, 'json');
  }
};

var getLinkId = function() {
  return $('#link_id').val();
}

var compare = function(property){
    return function(a,b){
        var value1 = parseInt(a[property]);
        var value2 = parseInt(b[property]);
        return value2-value1;
    }
}
var preTinyData = function(comments,callback){
  sourceCommentData = {}
  var data = [];
      for (key in comments){
          for(i in comments[key]){
              data.push(comments[key][i])
              sourceCommentData[comments[key][i].id] = comments[key][i]
          }
      }
      data.sort(compare('id'))
            //console.log(data)
  $('.com_num').text(data.length)
  commentList.html('<a name="comments"></a><div class="loading"></div><div class="line_bot"></div>')
  callback(data)
}
var sourceCommentData = {};
var appendComment = function(comment, reverse , pid) {
  if( pid != 0 && sourceCommentData[pid] != null){
      //console.log(sourceCommentData[pid])
      var parentComment = $('<div></div>').addClass("reply-content").html('<span class="reply-name">'+ sourceCommentData[pid].user_name+": </span>"+sourceCommentData[pid].comment_content)
  }
  
  var commentDom = $('<div></div>').addClass('com_li line_bot clear');
  var username = $('<div></div>').addClass('user_name clear').text(comment.user_name);
  var comment_content = $('<div></div>').addClass('com_litxt clear').html(comment.comment_content);
  //var comment_alltime = $('<div></div>').addClass('com_time rig').html(comment.comment_alltime);
  var reply = $('<div></div>').attr("data-id",comment.id).addClass('com_reply rig').text("回复").on("click",function(){
      if(isLogin){
        $(".input-modal").attr('data-pid',$(this).attr('data-id')).show()
      }else{
        alert("登录后才能回复评论")
      }  
  });
  var comment_alltime = $('<div></div>').addClass('com_time rig').text(comment.comment_time+"前");
  commentDom.append(username).append(comment_content).append(parentComment).append(reply).append(comment_alltime);
  if (reverse) {
    commentDom.insertBefore(commentList.children('.com_li').first());
  } else {
    commentList.append(commentDom);
  }
}
$(function() {
  var islock = false;
  var getPageComments = function(page) {
    islock = true;
    getCommentList({
      link_id: getLinkId(),
      page: page
    }, function(err, comment_data) {
      islock = false;
      if (err) {
        console.log("获取评论失败！");
      } else {
        var commentList = $('.commentList').data('page', page);
        if (!comment_data.pages) {
          $('.showmore').hide();
        } else {
          $('.showmore').show();
        }
        if (comment_data.data && comment_data.data.comments) {
          
          

          if (comment_data.data.comments[0] && comment_data.data.comments[0].length) {
            preTinyData(comment_data.data.comments,function(data){
                data.forEach(function(comment) {
                  appendComment(comment,false,comment.parent_id);
                });
            })
          }


        }
      }
    });
  };
  
  $(window).scroll(function() {
    if (window.scrollY + window.innerHeight >= $('.commentList').offset().top - 200) {
      if (!$('.commentList').data('page') && !islock) {
        getPageComments(1);
      }
    }
  });

  $('.showmore').on('tap', function() {
    var current_page = $('.commentList').data('page');
    if (current_page && !islock) {
      current_page = Number(current_page);
      current_page++;
      getPageComments(current_page);
    }
  });
  $('.com_send').on('click', function() {
    var comment_content = $('.com_txt').val();
    if (!comment_content) {
      alert("请填写评论");
    } else {
      window.location.hash = 'comments';
      $(".loading").show();
      submitComment({
        link_id: getLinkId(),
        comment_content: comment_content,
        subject: $('.subject').text()
      }, function(err, resp , pid) {
        if (err) {
          alert("评论失败：" + err);
          $(".loading").hide();
        } else {
          if (resp) {
            preTinyData(resp,function(data){
                data.forEach(function(comment) {
                  appendComment(comment,false,pid);
                  $(".com_txt").val("");
                  $(".loading").hide();
                });
            })              
          }
        }
      });
    }
  });
});