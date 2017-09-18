// ------------------------ Global Variables ------------------------------

var base = ['BTC', 'ETH', 'USD'];
var currency = [];
var activeBase = base[2];
var activeCurrency = 'BTC';
var pair = activeCurrency + activeBase;

// ------------------------ Functions ------------------------------

function changeActiveBase() {
  for (var i = 0; i < base.length; i++) {
    if (base[i] === activeBase) {
      $('#base-' + base[i]).attr('class', 'base active');
    } else {
      $('#base-' + base[i]).attr('class', 'base');
    };
  };
};

function changeCurrencyBase() {
  for (var i = 0; i < currency.length; i++) {
    if (currency[i] === activeCurrency) {
      $('#' + currency[i]).attr('class', 'currency activeCurr');
    } else {
      $('#' + currency[i]).attr('class', 'currency');
    };
  };
};

// function sortTable() {
//   var table, rows, switching, i, x, y, shouldSwitch;
//   table = document.getElementById("table");
//   switching = true;
//   /*Make a loop that will continue until
//   no switching has been done:*/
//   while (switching) {
//     //start by saying: no switching is done:
//     switching = false;
//     rows = table.getElementsByTagName("TR");
//     /*Loop through all table rows (except the
//     first, which contains table headers):*/
//     for (i = 1; i < (rows.length - 1); i++) {
//       //start by saying there should be no switching:
//       shouldSwitch = false;
//       /*Get the two elements you want to compare,
//       one from current row and one from the next:*/
//       x = rows[i].getElementsByTagName("TD")[1];
//       y = rows[i + 1].getElementsByTagName("TD")[1];
//       //check if the two rows should switch place:
//       if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
//         //if so, mark as a switch and break the loop:
//         shouldSwitch= true;
//         break;
//       }
//     }
//     if (shouldSwitch) {
//       /*If a switch has been marked, make the switch
//       and mark that a switch has been done:*/
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//     }
//   }
// }

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

function updateTableHeader() {
  if (activeBase === "USD") {
    $("#volume").text("VOL ($000s)")
  } else {
    $("#volume").text("VOL (" + activeBase + ")")
  };
};

// ------------------------ Event Listeners ------------------------------

// Click listener for .base class
$(document).on('click','.base',function(){
  activeBase = this.text;
  currency = [];

  // CoinMarketCap API Pull
  $.ajax({
    url: "https://api.coinmarketcap.com/v1/ticker/?convert=" + activeBase + "&limit=100",
    method: "GET"
  }).done(function(response) {

    $("#alt-list").empty();

    $.each(response, function(i, coin) {
        // If current coin is same as base skip to next
        if (coin.symbol === activeBase) {
          return true;
        };

        if (activeBase === "ETH" && coin.symbol === "BTC") {
          return true;
        };

        // Create table
        var table = $('<tr>').addClass('currency').attr('id', coin.symbol);

        // Set Coin Column
        var coinCol = $('<td>').text(coin.symbol);

        // Set Volume column
        if (activeBase === 'USD') {
          var volCol = $('<td>').text("$" + addCommas(Math.round(coin["24h_volume_" + activeBase.toLowerCase()] / 1000)));

        } else {
          var volCol = $('<td>').text(addCommas(Math.round(coin["24h_volume_" + activeBase.toLowerCase()])));

        };

        // Set Price Column
        if (activeBase === 'USD') {

            // If price is greater than 1
            if (coin["price_" + activeBase.toLowerCase()] > 1) {
              // Round to 2 decimals
              var priceCol = $('<td>').text("$" + addCommas(Number(coin["price_" + activeBase.toLowerCase()]).toFixed(2)));
            } else {
              // Else round to 6 decimals
              var priceCol = $('<td>').text("$" + Number(coin["price_" + activeBase.toLowerCase()]).toFixed(6));
            };

        } else {
          var priceCol = $('<td>').text(Number(coin["price_" + activeBase.toLowerCase()]).toFixed(8));

        };

        // Set %Change Column
        if (coin["percent_change_24h"] > 0) {
          var chngCol = $('<td>').text("+" + Number(coin["percent_change_24h"]).toFixed(2));
          chngCol.css("color", "#00ff00")

        } else {
          var chngCol = $('<td>').text(Number(coin["percent_change_24h"]).toFixed(2));
          chngCol.css("color", "#ff3300")
        };

        table.append(coinCol, volCol, priceCol, chngCol);
        table.appendTo('#alt-list');
        currency.push(coin.symbol);

    });


    activeCurrency = currency[0];
    pair = activeCurrency + activeBase;
    document.getElementById('content').src = "chart.html?value=" + pair;
    document.getElementById('content').style.display = "block";
    changeActiveBase();
    changeCurrencyBase();
    // sortTable();
    updateTableHeader();

  });

});

// Click listener for .currency class
$(document).on('click','.currency',function(){
  activeCurrency = $(this).attr('id');
  pair = activeCurrency + activeBase;
  document.getElementById('content').src = "chart.html?value=" + pair;
  document.getElementById('content').style.display = "block";
  changeActiveBase();
  changeCurrencyBase();
});

// ------------------------ Main Processes ------------------------------

// CoinMarketCap API Pull
$.ajax({
  url: "https://api.coinmarketcap.com/v1/ticker/?convert=" + activeBase + "&limit=100",
  method: "GET"
}).done(function(response) {

  $.each(response, function(i, coin) {
      // If current coin is same as base skip to next
      if (coin.symbol === activeBase) {
        return true;
      }

      // Create table
      var table = $('<tr>').addClass('currency').attr('id', coin.symbol);

      // Set Coin Column
      var coinCol = $('<td>').text(coin.symbol);

      // Set Volume column
      if (activeBase === 'USD') {
        var volCol = $('<td>').text("$" + addCommas(Math.round(coin["24h_volume_" + activeBase.toLowerCase()] / 1000)));

      } else {
        var volCol = $('<td>').text(addCommas(Math.round(coin["24h_volume_" + activeBase.toLowerCase()])));

      };

      // Set Price Column
      if (activeBase === 'USD') {

          // If price is greater than 1
          if (coin["price_" + activeBase.toLowerCase()] > 1) {
            // Round to 2 decimals
            var priceCol = $('<td>').text("$" + addCommas(Number(coin["price_" + activeBase.toLowerCase()]).toFixed(2)));
          } else {
            // Else round to 6 decimals
            var priceCol = $('<td>').text("$" + Number(coin["price_" + activeBase.toLowerCase()]).toFixed(6));
          };

      } else {
        var priceCol = $('<td>').text(Number(coin["price_" + activeBase.toLowerCase()]).toFixed(8));

      };

      // Set %Change Column
      if (coin["percent_change_24h"] > 0) {
        var chngCol = $('<td>').text("+" + Number(coin["percent_change_24h"]).toFixed(2));
        chngCol.css("color", "#00ff00")

      } else {
        var chngCol = $('<td>').text(Number(coin["percent_change_24h"]).toFixed(2));
        chngCol.css("color", "#ff3300")
      };

      table.append(coinCol, volCol, priceCol, chngCol);
      table.appendTo('#alt-list');
      currency.push(coin.symbol);

  });

  document.getElementById('content').src = "chart.html?value=" + pair;
  document.getElementById('content').style.display = "block";
  changeActiveBase();
  changeCurrencyBase();
  // sortTable();
  updateTableHeader();

});

