// For jQuery event handlers and listeners

// 
$(function() {

    // Populate score inputs in end game modal
    $("#end--game").click(function() {
        $("[name='yellow-score--modal']").val($("#yellow--score").text());
        $("[name='black-score--modal']").val($("#black--score").text());
    });

});