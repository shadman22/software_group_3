var map;

function content_animation(){
  $(document).ready(function() {

  //window and animation items
  var animation_elements = $.find('.animation-element');
  var web_window = $(window);

  //check to see if any animation containers are currently in view
  function check_if_in_view() {
    //get current window information
    var window_height = web_window.height();
    var window_top_position = web_window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    //iterate through elements to see if its in view
    $.each(animation_elements, function() {

      //get the element sinformation
      var element = $(this);
      var element_height = $(element).outerHeight();
      var element_top_position = $(element).offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
      if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
        element.addClass('in-view');
      } else {
        element.removeClass('in-view');
      }
    });

  }

  //on or scroll, detect elements in view
  $(window).on('scroll resize', function() {
      check_if_in_view()
    })
    //trigger our scroll event on initial load
  $(window).trigger('scroll');

});
}


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.12&appId=914497515390833&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target=$(e.target);
    const id= $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url:'/jobs/'+id,
      success: function(response){
        alert('Deleting the job');
        window.location.href='/jobs/view';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

function logout(){
  window.location="/employers/logout";
}

$(document).ready(function(){
    $("#about_us_2").hide();
});
$(document).ready(function(){
    $("#aboutShow").click(function(){
      $("#about_us_2").show();
      $("#aboutShow").hide();
    });
});

$(document).ready(function(){
  $("#showLess").click(function(){
    $("#about_us_2").hide();
    $("#aboutShow").show();
  })
});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 23.748943, lng: 90.374528},
    zoom: 17
  });

  var marker = new google.maps.Marker({
          position: {lat: 23.748943, lng: 90.374528},
          map: map,
          title: 'Contact Us!!'
        });
}

function scrollsmooth(){
  $('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
        });
      }
    }
  });
}

function navbaranimation (){
  $(document).ready(function(){
  $(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if (scroll > 500) {
      $("nav").removeClass("navbar-dark")
      $("nav").removeClass("bg-dark")
      $(".navbar").css("background" , "#41B8F7");
      $(".nav-item").css("font-color" , "#000");
      $("nav").addClass("fixed-top");
    }

    else if (scroll < 500){
      $("nav").addClass("navbar-dark");
      $("nav").addClass("bg-dark"); 
      $("nav").removeClass("fixed-top");  
    }
  })
})
}



