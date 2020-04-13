$('input[name="Edit"]').on('click', function() {
    var prev = $(this).prev('input'),
        ro   = prev.prop('readonly');
    prev.prop('readonly', !ro).focus();
    $(this).val(ro ? 'Save' : 'Edit');
});