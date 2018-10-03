"use strict";

// wait till document ready 
$(document).ready(function(){
	// mark task as complete
    $('.toggleBtn').on('click', function(){
        // get task id of task selected
        var button = $(this);
        var listItem = $(this).closest('li');
        var taskId = listItem.attr('id').slice(1);

        // if 'Complete!'
		if (button.attr('class').includes('toggleBtn complete')){
		    $.get('/complete', 'id=' + taskId, function(){
	      		$('#t' + taskId + ' .completed').html('<b>Status:</b> Completed!');
	      		button.toggleClass('complete btn-secondary btn-success');
	      		button.text('Resume Task')
	   		});	
		}
		// if 'Resume!'
		else {
			$.get('/resume', 'id=' + taskId, function(){
	        	$('#t' + taskId + ' .completed').html('<b>Status:</b> In-progress');
	        	button.toggleClass('complete btn-secondary btn-success');
	        	button.text('Mark as Complete');
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

    $('form[action="/create"]').on('submit', function(event){
    	if ($(this)[0].checkValidity() === false){
    		event.preventDefault();
    		event.stopPropagation();
    	}
    	$(this).addClass('was-validated');
    });
});
