$(document).ready(function() {
    let opts = {
    }
    
    //Register as select
    $('#select-filter').select2(opts);
    $('#select-region').select2(opts);

    let form = $("form")

    form.on("submit", event => {
        event.preventDefault();
        console.log(event);
        console.log(event.target.value);
    })
});