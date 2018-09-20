"use strict";

function toggleButton(button){
	button.toggleClass('complete');
	// 'Complete!' button
	if(button.attr('class') === 'toggleBtn complete'){
		button.text('Complete!')
	}
	else {
		button.text('Resume!');
	}
}

// wait till document ready 
$(document).ready(function(){
	// mark task as complete
    $('.toggleBtn').on('click', function(){
        // get task id of task selected
        var button = $(this);
        var listItem = $(this).closest('li');
        var taskId = listItem.attr('id').slice(1);

        // if 'Complete!'
		if (button.attr('class') === 'toggleBtn complete'){
		    $.get('/complete', 'id=' + taskId, function(){
	      		$('#t' + taskId + ' .completed').html('<b>Status:</b> Completed!');
	      		button.toggleClass('complete');
	      		button.text('Resume!')
	   		});	
		}
		// if 'Resume!'
		else {
			$.get('/resume', 'id=' + taskId, function(){
	        	$('#t' + taskId + ' .completed').html('<b>Status:</b> In-Progress');
	        	button.toggleClass('complete');
	        	button.text('Complete!');
	    	});

		}
    });

    // remove task
    $('.deleteBtn').on('click', function(){
        var listItem = $(this).closest('li');
        var taskId = listItem.attr('id').slice(1);
	    console.log(taskId);
	    
	    // on response, remove task
	    $.post('/delete', 'id=' + taskId, function(data){
	    	listItem.remove();
	    });
    });

});
