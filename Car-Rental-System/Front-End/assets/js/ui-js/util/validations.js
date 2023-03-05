function checkValidity(arValidations, buttonIds) {
    let errorCount = 0;

    for (let validation of arValidations) {
        if (check(validation.reg, validation.field)) {
            textSuccess(validation.field, '');
        } else {
            errorCount = errorCount + 1;
            setTextError(validation.field, validation.error);
        }
    }
    setButtonState(errorCount, buttonIds);
}

function check(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue);
}

function setTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField, '');
    } else {
        txtField.css('border', '2px solid red');
        // txtField.parent().children('span').text(error);
    }
}

function textSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField, '');
    } else {
        txtField.css('border', '2px solid green');
        // txtField.parent().children('span').text(error);
    }
}

function defaultText(txtField, error) {
    txtField.css('border', '1px solid #ced4da');
    // txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value, buttonIds) {
    if (value > 0) {
        $(buttonIds).attr('disabled', true);
    } else {
        $(buttonIds).attr('disabled', false);
    }
}