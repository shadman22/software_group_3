var map;
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
