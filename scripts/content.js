
console.log("Please wait ! =))");

$(document).ready(function () {

var check_empty = 1;
function create_html(color_Text,item,funding_rate_number,vol){
   return txt1 = `<h4 class="${color_Text}" > <span class="circle"></span>${item.symbol} : ${(funding_rate_number * 100).toFixed(3)}%  <span class='hour'>${item.collectCycle} hour X${vol}</span> </h4>`;
}
  $.ajax({
    url: "https://futures.mexc.com/api/v1/contract/funding_rate/",
    method: "GET",
    dataType: "json",
    success: function (response) {
      funding_rate = response.data;

      funding_rate.forEach((item, index) => {
        funding_rate_number = parseFloat(item.fundingRate);
        if(funding_rate_number * 100 > 1.0){
          check_empty = 0;
          display(item,funding_rate_number,"positive");
          

        }else if(funding_rate_number * 100 < -1.0){
          check_empty = 0;
          display(item,funding_rate_number,"negative");

        }
      });

      $(".proccess").remove();
      if(check_empty == 1){
        var txt1 = `<p class="proccess" >Dell có con nào đâu ! =))</p>`;
        $(".container_popup").append(txt1);
      }
      console.warn("Done !");
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });

  function display(coinIfor,funding_rate_number,text_color){
    $.ajax({
      url: "https://futures.mexc.com/api/v1/contract/detailV2",
      method: "GET",
      dataType: "json",
      success: function (response) {
        funding_rate = response.data;
        var volume = 0;
        funding_rate.forEach((item, index) => {
          if(coinIfor.symbol == item.symbol ){
            volume = item.maxL;
          }
        }
        );
        var text =  create_html(text_color,coinIfor,funding_rate_number,volume)
        $(".container_popup").append(text);
      },
      error: function (error) {
        console.error("Error:", error);
      },
    });
  }
});
