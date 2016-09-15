$(function(){
    $(".task-checked").on('click',function(event){
       // event.preventDefault();
       $value = this.value;
       $.ajax({
            type : "GET",
            url: "/updatenotification/"+$value,
            data: {
			// csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
			'notification_id':$value
		},
        });
      });
});