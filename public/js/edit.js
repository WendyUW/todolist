"use strict";

// wait till document ready 
$(document).ready(function(){
    $('.saveBtn').on('click', function(){
        // get task id of task selected
        var listItem = $(this).closest('li');
        var taskId = listItem.attr('id');
	    console.log(taskId);
	    
	    $.get('/complete', 'id=' + taskId, function(){
	        $('#' + taskId + ' .status').text('Status: Complete');
	    });
    });
});
