
console.log("Please wait ! =))");

$(document).ready(function () {
 var check_empty = 1;
function create_html(color_Text,item,funding_rate_number){
   return txt1 = `<h4 class="${color_Text}" > <span class="circle"></span>${item.symbol} : ${(funding_rate_number * 100).toFixed(3)}%  <span class='hour'>${item.collectCycle} hour</span> </h4>`;
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
            var text =  create_html("positive",item,funding_rate_number)
            $(".container_popup").append(text);

        }else if(funding_rate_number * 100 < -1.0){
          check_empty = 0;
            var text = create_html("negative",item,funding_rate_number)
            
            $(".container_popup").append(text);
        }
      });

      $(".proccess").remove();
      if(check_empty == 1){
        var txt1 = `<p >Not today !</p>`;
        $(".container_popup").append(txt1);
      }
      $(".container_popup").append("<h2>DONE !</h2>");
      console.warn("Done !");
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
});
