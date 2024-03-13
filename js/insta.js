// Get Photos from Instagram using JavaScript API: https://rudrastyh.com/javascript/get-photos-from-instagram.html

// Instagram feed
var token = "https://graph.instagram.com/v11.0/10218560180051171/media"
    userid = 50002183,
    num_photos = 24,
    slickAnimClass = 'slick-animate',
    $carousel = $('.carousel'),
    $blockFeed = $('#instagram-feed'),
    carouselSettings, item, image, imgSource, imgAlt;

$carousel.hide();

// Carousel created with slick.js
carouselSettings = {
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: true,
  infinite: true,
  pauseOnHover: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 800,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

$.ajax({
  url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', 
  dataType: 'jsonp',
  type: 'GET',
  data: { 
    access_token: token,
    count: num_photos
  },
  success: function(data) {
    for(item in data.data) {
      imgSource = data.data[item].images.standard_resolution.url;
      imgAlt = '';
      image = '<img src="' + imgSource + '" />';
      item = '<div class="item">' + image + '</div>';
      $blockFeed.append(item);
    }
    // Create carousel
    $carousel
      .slick(carouselSettings)
      .fadeIn(800);
  }
});

// Carousel events to fix jump when looped
$carousel.on('init', function() {
  $('.slick-current').addClass(slickAnimClass);
}).on('beforeChange', function() {
  $(".item").removeClass(slickAnimClass);
}).on('afterChange', function() {
  $('.slick-current').addClass(slickAnimClass);
});