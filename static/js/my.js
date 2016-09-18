$(document).ready(function()
{
  $("#notificationLink").on('click',function(e)
  {
    $("#notificationContainer").fadeToggle(300);
    $("#notification_count").fadeOut("slow");
    return false;
  });

  var containerOnClick = function() {
    $("#notificationContainer").hide();
    $('.hide-post-popup').removeClass('visible');
  };
  $(".container").on('click', containerOnClick);

  $(".notificationsBody").on('click', function(e){
    e.stopPropagation();
  });

  //Popup Click
  var notificationsContentOnClick = function() {
    $(this).find('.hide-post-popup').removeClass('visible');
  };
  $(".notificationsContent").on('click', function() {
    notificationsContentOnClick.call(this);
  });
  
  $(".hide-post").on('click', function(e) {
    e.stopPropagation();
    $(this).siblings('.hide-post-popup').addClass('visible');
  });

  $('[data-toggle="tooltip"]').tooltip();
  var checkPostOnClick = function() {
    console.log(this);
    var notificationId = $(this).data('notification-id');
     $.ajax({
          type : "GET",
          url: "/updatenotification/"+notificationId,
          data: {
            // csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            'notification_id':notificationId
          },
      });
  };
  $(".check-post").on('click', function() {
    checkPostOnClick.call(this);
  });
  var hidePostPopup = function() {
    var notificationId = $(this).data('notification-id');
    $.ajax({
        type : "GET",
        url: "/hidenotification/"+notificationId,
        data: {
            // csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
            'notification_id':notificationId
         },
         success : function(response) { 
            $('.notificationheader').html(response);
            $(".container").on('click', containerOnClick);
            $(".notificationsBody").on('click', function(e){
              e.stopPropagation();
            });
            $(".notificationsContent").on('click', function() {
              notificationsContentOnClick.call(this);
            });
            $(".hide-post").on('click', function(e) {
              e.stopPropagation();
              $(this).siblings('.hide-post-popup').addClass('visible');
            });
            $(".check-post").on('click', function() {
              checkPostOnClick.call(this);
            });
            $(".hide-post-popup").on('click',function(event){
              event.preventDefault();
              hidePostPopup.call(this);
            });

         },
         error: function (jqXHR, textStatus, errorThrown)
          {
             console.log($errorThrown); 
          }

    });
  };
  $(".hide-post-popup").on('click',function(event){
    event.preventDefault();
    hidePostPopup.call(this);
  });
});
