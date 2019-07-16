function checkInput(input) {
    if (input.value.length > 0) {
        input.className = 'active';
    } else {
        input.className = '';
    }
}

function onFormSuccess(form, e) {
    e.preventDefault();
    var bookData = {};
    for (var i = 0; i < form.length; i++) {
        var input = form[i];
        if (input.name) {
            bookData[input.name] = input.value;
        }
    }

    $.ajax({
        url: 'booking-mail',
        dataType: 'text',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: bookData,
        success: function( data ){
            $('#booking').fadeOut('slow',function () {
                $('#form_success').fadeIn('slow')
            })
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown )
        }
    });
}