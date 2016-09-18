$(document).ready(function(){

  var containerOnClick = function() {
    $("#notificationContainer").hide();
    $('.hide-post-popup').removeClass('visible');
  };

  var notificationsContentOnClick = function() {
    $(this).find('.hide-post-popup').removeClass('visible');
  };
  var togglechecked = function() {
        $(this).toggleClass("checked");
  };


  var checkPostOnClick = function() {
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
            $(".notstatus").on('click',function(){
              togglechecked.call(this);
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

  function load_contents(track_page){
      if(loading == false){
    console.log("hiiii"+track_page);
      loading = true;  //set loading flag on
      // $('.loading-info').show(); //show loading animation 

      $.ajax({
        type : "GET",
        url: "/notification/"+track_page,
        data: {
        // csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value,
          'page':track_page
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
          $(".notstatus").on('click',function(){
            togglechecked.call(this);
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
          loading = false;
          },
          error: function (jqXHR, textStatus, errorThrown)
           {
              console.log($errorThrown); 
           }
       });
    }
  }
  

  var track_page = 1;
  var loading  = false;

  load_contents(track_page); 
  $(window).scroll(function() { //detect page scroll
    if($(window).scrollTop() + $(window).height() >= $(document).height()) { //if user scrolled to bottom of the page
      track_page++; //page number increment
      // console.log(track_page);
      load_contents(track_page); //load content 
    }
  });






  $("#notificationLink").on('click',function(e)
  {
    $("#notificationContainer").fadeToggle(300);
    $("#notification_count").fadeOut("slow");
    return false;
  });

  $(".container").on('click', containerOnClick);

  $(".notificationsBody").on('click', function(e){
    e.stopPropagation();
  });

  $(".notificationsContent").on('click', function() {
    notificationsContentOnClick.call(this);
  });

  $(".notstatus").on('click',function(){
    togglechecked.call(this);
  });

  $(".hide-post").on('click', function(e) {
    e.stopPropagation();
    $(this).siblings('.hide-post-popup').addClass('visible');
  });

  $('[data-toggle="tooltip"]').tooltip();

  $(".hide-post-popup").on('click',function(event){
    event.preventDefault();
    hidePostPopup.call(this);
  });

});














$(document).ready(function()
{

  
});
