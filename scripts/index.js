// Write Javascript code!
$(document).ready(function () {
  //alert('JS working')
  // process the form

  $('#infoForm').submit(function (event) {
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
      'email': $('input[id=email]').val(),
      'regions': $('select[id=regions]').text(),
      'statistics': $('select[id=statistics]').text(),
    };
    console.log(formData)
    //process the form
    $.ajax({
      type: "POST",
      url: "https://us-central1-custom-stats.cloudfunctions.net/addUser",
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

      }
    });
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
  });


})
