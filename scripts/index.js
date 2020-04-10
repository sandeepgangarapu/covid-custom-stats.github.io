// Write Javascript code!
$(document).ready(function () {
  //alert('JS working')
  // process the form

  $('#infoForm').submit(function (event) {
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
      'email': $('input[id=email]').val(),
      'regions': $('select[id=regions]').val(),
      'statistics': $('select[id=statistics]').val(),
    };
    console.log(formData)
    //process the form
    $.ajax({
      type: "POST",
      url: "https://us-central1-testapi-a873e.cloudfunctions.net/addUser",
      data: formData,
      contentType: "application/JSON",
      encode: false,
      success: function (msg) {
        document.location.href = "./thank-you.html"
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


})
