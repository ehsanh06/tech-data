$(() => {
    let form = $('form'),
        formMessages = $('#form-messages'),
        formSuccess = false;

    // Form event listener
    $(form).on('submit', (e) => {
        e.preventDefault();

        // Serialize form data.
        let formData = $(form).serialize();

        // Submit form via AJAX
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })

            // On successful request
            .done((response) => {
                // Form message has the success class
                $(formMessages)
                    .removeClass('error')
                    .addClass('success')

                    // Set message text
                    .text(response);

                // Empty the form
                $('#fname', '#lname', '#company', '#email').val('');

            })
            .fail((data) => {

                // Form message has the error class
                $(formMessages)
                    .removeClass('success')
                    .addClass('error');

                // Set message text
                data.responseText !== '' ? $(formMessages).text(data.responseText) : $(formMessages).text('Oops! An error occured and your message could not be sent.');
            });
    });

    removeit();

    $("button.form__submit").on('click', () => {

        let formDataFilled = $('#fname').val().length > 0 && $('#lname').val().length > 0 && $('#company').val().length > 0 && $('#email').val().length > 0 && $('#gdpr').is(":checked");
        console.log("this: ", $(this));
        console.log('formDataFilled: ' + formDataFilled)
        if (formDataFilled == true) {
            formSuccess = true;
            setTimeout(() => {
                if (formSuccess === true) {
                    console.log('Hooray!');
                }
            }, 1500);
        }
    });

});

// If viewport is 820px and below, remove desktop .App__main
// Simple workaround for bug of Mobile version form 
function removeit() {
    if ($(window).width() < 820) {
        $('body main.desktop').remove();
    }
}