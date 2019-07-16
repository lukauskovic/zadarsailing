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

function setMinDate() {
    var now = new Date()

    var day = ("0" + now.getDate()).slice(-2)
    var month = ("0" + (now.getMonth() + 1)).slice(-2)

    var today = now.getFullYear() + "-" + (month) + "-" + (day)

    $('#date').val(today)
    $('#date').attr('min', today)
}

setMinDate()
$('#buttonDaily').click(function () {
    $('#sel1').val('1')
})
$('#buttonHalf').click(function () {
    $('#sel1').val('2')
})
$('#buttonSunset').click(function () {
    $('#sel1').val('3')
})