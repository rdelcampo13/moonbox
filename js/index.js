// Hamburger Button
// ------------------------------------------------------------------------------------
$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }

  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });

  // API Pull
  // ------------------------------------------------------------------------------------

  var pricePoints = [];
  var timePoints = [];
  var lastPrice = '';
  var volume = '';

  function getData(url) {
    $.getJSON(url, function(data) {
      for (var i = 0; i < data['Data'].length; i++) {
        var date = new Date(data['Data'][i].time*1000);

        pricePoints.push(data['Data'][i].close);
        timePoints.push(date);
      };
      volume = data['Data'][data['Data'].length-1].volumeto.toString();
      $("#last-price").html('$' + pricePoints[pricePoints.length-1]);
      $("#volume").html('$' + Math.round(volume/100000) / 10 + ' MM');

      // CHART.js
      // ------------------------------------------------------------------------------------
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: timePoints,
              datasets: [{
                  label: 'Price',
                  data: pricePoints,
                  borderColor: [
                      'rgba(255,99,132,1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 3,
                  pointBorderColor: '#fff',
                  fill: false,
              }]
          },
          options: {
            legend: {
              display: false,
            },
            scales: {
              yAxes: [{
                  display: false,
                  gridLines : {
                      display : false,
                      color: '#fff',
                  },
                  ticks: {
                    fontColor: '#fff',
                  },
              }],
              xAxes: [{
                display: false,
                gridLines : {
                  display : false,
                  color: '#fff',
                },
                ticks: {
                  display: false,
                },
              }],
            },
          }
      });


    });
  }

  getData('https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=60&aggregate=1&e=CCCAGG');

});




