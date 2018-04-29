var loadTime;
var clickTime;
var seconds=0, minutes=0, hours=0, mSeconds;
var clicked = false;

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

$(document).ready(function(){
  $(".loadPic").hide();
  loadTime = new Date().getTime();
});

$(document).click(function(){
  if(clicked === false){
    clickTime = new Date().getTime();
    var distance = clickTime - loadTime;// + 600000;
    
    mSeconds = Math.floor((distance %  1000));

    var section = distance % 4440;
    var poemVersion;
    //Gif duration is 4440 ms
    if(distance <= 7000){
      if (section <= 1110) poemVersion = "00";
      else if (section > 1110 && section <= 2220) poemVersion = "01";
      else if (section > 2220 && section <= 3330) poemVersion = "02";
      else poemVersion = "03";
    }
    else if(distance > 7000 && distance <= 15000){
      if (section <= 1480) poemVersion = "10";
      else if (section > 1480 && section <= 2960) poemVersion = "11";
      else poemVersion = "12";
    }
    else if(distance > 15000 && distance <= 60000){
      if (section <= 1480) poemVersion = "20";
      else if (section > 1480 && section <= 2960) poemVersion = "21";
      else poemVersion = "22";
    }
    else if(distance > 60000 && distance <= 60000 * 15){
      if (section <= 1480) poemVersion = "30";
      else if (section > 1480 && section <= 2960) poemVersion = "31";
      else poemVersion = "32";
    }
    else if(distance > 60000 * 15 && distance <= 60000 * 15 * 3){
      if (section <= 1480) poemVersion = "40";
      else if (section > 1480 && section <= 2960) poemVersion = "41";
      else poemVersion = "42";
    }
    else {
      if (section <= 1480) poemVersion = "50";
      else if (section > 1480 && section <= 2960) poemVersion = "51";
      else poemVersion = "52";
    }

    var imageSelector = Math.floor(section / 120);

    $("#keyGif").attr("src", "./images/frame_"+ pad(imageSelector, 2) +"_delay-0.12s.gif");


    BALL_WIDTH = 40;
    POEM_WIDTH = 200;
    left_pos   = 0;

    left_table = [  -15, -15, -15, -15, -15, -35, 
                          -80, -140, -195, -225, -245,
                          -225, -200, -160, -120, -55,
                          5, 80, 130, 165, 195,
                          215, 195, 160, 130, 75,
                          5, -55, -120, -160, -140,
                          -100, -55, -35, -15, -15, -15, -15]

    left_pos = left_table[imageSelector];

    console.log(left_pos);

    $('#hidL').css('left', left_pos);
    $('#hidM').css('left', left_pos + POEM_WIDTH + 12);
    $('#hidR').css('left', left_pos + BALL_WIDTH + POEM_WIDTH);


    if(distance >= 1000)           seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if(distance >= 1000 * 60)      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if(distance >= 1000 * 60 * 60) hours   = Math.floor((distance / (1000 * 60 * 60)));

    hours   = String('00'+hours).slice(-2);
    minutes = String('00'+minutes).slice(-2);
    seconds = String('00'+seconds).slice(-2);

    var distRead = hours + ":" + minutes + ":" + seconds;
    $("#tWaited").text(distRead);

    poem = {
      "00": "剛剛\n影子在牆壁上畫了一個完美的弧\n然後又繼續有節奏地走著\n滴答滴答",
      "01": "瞬間\n乒乓球在這裡的拍面\n與自己的影子相遇\n瞬間\n再度別離",
      "02": "暈顛在船上的影子\n已經不知道繞了幾圈\n想必海是狂浪的",
      "03": "起跳\n這是影子離開身體的時間",
      "10": "剛剛\n葉子從秋天墜落\n最後鑲在他自己的影子上",
      "11": "從海上來的風\n在剛剛的時間裡\n搖晃了整個山陵的樹影\n嘎茲嘎茲的笑著",
      "12": "想必是一條很短的斑馬線\n有23個影子在剛剛的時間裡\n穿越",
      "20": "足夠影子追逐一整圈\n四百米的操場",
      "21": "躲在樹下的影子\n等著下個綠燈\n不耐煩的跟風一起晃動",
      "22": "串連起的影子\n在平交道前戲劇性的衝刺",
      "30": "剛剛\n有一陣風輕輕地抬走\n雲的影子\n放在了隔壁的樓頂",
      "31": "看著不想細數的影子掠過\n抓走公車站呆滯的人們\n然後再呆滯的等待",
      "32": "影子從第一個路燈\n到第27個路燈下\n完成綿延的接力賽",
      "40": "剛剛一架飛機用影子拂過了\n這座城市的\n樓房和街樹",
      "41": "窗筐的影子\n在車廂裡搖擺\n一路搖到下一站",
      "42": "輾過自己的影子\n交錯在這城市的河流裡\n混雜著通勤的怨歎",
      "50": "印在山谷裡的影子\n默默地漫開\n再輕輕地藏了起來",
      "51": "是誰說光不會轉彎\n連窗邊的影子都在剛剛\n默默轉了向",
      "52": "房子的影子\n被火車載著\n再到了下一個城市"
    }
    $("#poemText").text(poem[poemVersion]);

    $(".hidLeft").fadeIn();
    $(".hidRight").fadeIn();
    $("#hidM").fadeIn();
    // console.log("time");
    clicked = true;
    
  }
});