// Write Javascript code!
$(document).ready(function () {
    //alert('JS working')
    // process the form
    //getloc()
  
    $('#contactForm').submit(function (event) {
      // get the form data
      // there are many ways to get this data using jQuery (you can use the class or id also)
      var formData = {
        'email': $('input[id=email]').val(),
        'regions': $('select[id=regions]').val(),
        'statistics':$('select[id=stats]').val()
      };
      console.log(formData)
      //process the form
      $.ajax({
        type: "POST",
        url: "https://us-central1-custom-stats.cloudfunctions.net/addUser",
        data: formData,
        encode: false,
        success: function (msg) {
          // $('#error').hide()
          // $('#duplicate').hide()
          // $('#success').show()
          //document.location.href = "./thank-you.html"
          console.log("Data Saved: " + JSON.stringify(msg));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          console.log(XMLHttpRequest.responseText)
          let error = XMLHttpRequest.responseText
          if (error.includes('duplicate')) {
            $('#error').hide()
            $('#success').hide()
            $('#duplicate').show()
          }
          else {
            $('#success').hide()
            $('#duplicate').hide()
            $('#error').show()
          }
        }
      });
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
    });
  
    function getloc() {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
  
      function success(pos) {
        var crd = pos.coords;
        console.log('Your current position is:', crd);
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getpincode(crd.latitude, crd.longitude)
        // https://geocode.xyz/13.03132,77.6597321?geoit=json
      }
  
      function getpincode(lat, lon) {
        $.ajax({
          type: "GET",
          url: "https://geocode.xyz/" + lat + "," + lon + "?geoit=json",
          encode: false,
          success: function (msg) {
            console.log("Data Saved: " + JSON.stringify(msg.postal));
            $('#pinCode').val(msg.postal)
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest.responseText)
          }
        });
  
      }
  
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  })