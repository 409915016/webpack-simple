// give grade to movie
$(function() {
  if($("div").hasClass("giveGrade")) {
    var linkId = $("#link_id").val();
    var resetGrade = $(".rgstar").last().index();
    var userVoteScore = Math.round(parseInt(movieGiveGrade.userVoteScore) / 2) - 1;
    $(".myGrade").on("tap", function() {
      if (!isLogin) {
        alert("打分失败，请先登录");
      } else {
        if (userVoteScore <= 0 && !$(".myGrade").hasClass("gstar")) {
          var pos = $(this).last().index();
          localStorage.grade = pos;
          localStorage.pos = (pos + 1) * 2;
          for (var i = 0; i <= 4; i++) {
            if (pos - i >= 0) {
              $(".myGrade").eq(pos - i).addClass("gstar");
            }
          }
          $.ajax({
            url: "/link/votelink?link_id=" + linkId + "&score=" + localStorage.pos,
            type: "GET",
            dataType: "jsonp",
            cache: false,
            success: function(resp) {
              $("#giveNewGrade").show();
              refreshGrade(resp, movieGiveGrade, localStorage.grade);
            }
          });
        }
      }
    });
    //rest user grade to movie
    var showResetBtn = function() {
      if (movieGiveGrade.userVoteScore >= 0) {
        $("#giveNewGrade").show();
      }
    };
    showResetBtn();
    $("#giveNewGrade").on("tap", function() {
      $(".resetLayout").show();
      $(".rcover").show();
    });
    $(".rcover").on("tap", function() {
      $(".resetLayout").hide();
      $(".rcover").hide();
    });
    $(".resetMyGrade").on("tap", function() {
      var pos = $(this).last().index();
      localStorage.pos = parseInt(pos) + 1;
      for (var i = 0; i <= 4; i++) {
        if (pos - i >= 0) {
          $(".resetMyGrade").eq(pos).addClass("rgstar");
          $(".resetMyGrade").eq(pos - i).addClass("rgstar");
        }
        $(".resetMyGrade").eq(pos + i + 1).removeClass("rgstar");
      }
    });
    $(".restBtn").on("tap", function() {
      $(".rcover").hide();
      $(".resetLayout").hide();
      var resetGrade = $(".rgstar").last().index();
      localStorage.grade = resetGrade;
      if (~resetGrade) {
        $(".myGrade").removeClass("gstar");
        for (var i = 0; i <= resetGrade; i++) {
          $(".myGrade").eq(resetGrade - i).addClass("gstar");
        }
        localStorage.pos = (parseInt(resetGrade) + 1) * 2;
        $.ajax({
          url: "/link/votelink?link_id=" + linkId + "&score=" + localStorage.pos,
          type: "GET",
          dataType: "jsonp",
          cache: false,
          success: function(resp) {
            refreshGrade(resp, movieGiveGrade, localStorage.grade);
          }
        });

      }
    });
    //show the data from backstage
    var showFileScores = function(data) {

      var total = parseInt(data.voteData.total);
      var userVote = ((data.userVoteScore) / 2);
      var sumScore = 0,
        avgScore = 0;
      for (var i = 0, l = data.voteData.datas.length; i < l; i++) {
        sumScore += window.parseInt(data.voteData.datas[i]) * (10 - i * 2);
        scorePercentage = parseInt((data.voteData.datas[i] / total * 100).toFixed(0));
        $(".takePercent").eq(i).css("width", scorePercentage);
        if (scorePercentage >= 0) {
          $(".percentNum").eq(i).html(scorePercentage + "%");
        }
      }
      avgScore = total ? sumScore / total : 0;
      var starNum = Math.round(Number(avgScore) / 2);
      $(".peoGradeCouter").html(total);
      if (avgScore >= 0) {
        $(".avgGradeNum").html(avgScore.toFixed(1));
      }
      for (var j = 0; j < starNum; j++) {
        $(".redStar").eq(j).removeClass("bstar").addClass("sbstar");
        $(".redStar").eq(starNum + j).removeClass("sbstar");
      }
      $(".myGrade").removeClass("gstar");
      for (var k = 0; k < userVote; k++) {
        $(".myGrade").eq(k).addClass("gstar");
      }
    };
    showFileScores(movieGiveGrade);
    var showWarnTxt = function(resp) {
        $(".gradeWarn").html(resp.msg).show();
      }
      //function of send ajax data
    var refreshGrade = function(resp, data, grade) {
      if (resp.res == 1) {
        showWarnTxt(resp);
        var userOldGrade = parseInt(data.userVoteScore);
        grade = localStorage.grade;
        if (userOldGrade <= 0) {
          data.voteData.total = parseInt(data.voteData.total) + 1;
        } else {
          data.voteData.datas[5 - (userOldGrade / 2)] = parseInt(data.voteData.datas[5 - (userOldGrade / 2)]) - 1;
        }
        data.userVoteScore = localStorage.pos;
        data.voteData.datas[4 - grade] = parseInt(data.voteData.datas[4 - grade]) + 1;
        showFileScores(movieGiveGrade);
      } else {
        showWarnTxt(resp);
      }
    };
  }
});