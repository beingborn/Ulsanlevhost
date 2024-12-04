$(document).ready(function () {
  //gnb 메뉴
  $("header .menu-area .open-btn").on("click", function () {
    $(this).toggleClass("on");
    $('.log-info').hide();
  });
  $("header .menu-box .close-btn").on("click", function () {
    $("header .open-btn").removeClass("on");
    $('.log-info').show();
  });

  //메인 공지사항 배너
  var mainInfoSwiper = new Swiper(".main-info-content .notice-area .swiper", {
    loop: true,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  /* 탭 변환 */
  $('.tab-list li a').click(function () {
    $('.tab-cont').hide().filter(this.hash).show();
    $('.tab-list li a').removeClass('show');
    $(this).addClass('show');
    return false;
  }).filter(':eq(0)').click();


  /* layer pop 형성 시 */
  $('.layer-btn').on('click',function(){
    $('body').css('overflow', 'hidden')
  })
  /* layer pop 삭제 시 */
  $('.layer-pop .layer-close').on('click',function(){
    $('body').css('overflow', '')
  })

  $('.auth-area button').click(function(){
    $('.auth-area button').not($(this)).removeClass('is-active')
    $(this).addClass('is-active')
  }).filter(':eq(0)').click();

});

/* 페이지 min-height 증가 */
function adjustContainerHeight(){
  if($('.full-page').length){
    var headerHeight = $('header').outerHeight()
    var footerHeight = $('footer').outerHeight()
    var totalHeight = headerHeight + footerHeight;
    $('.full-page .container').css('min-height', 'calc(100vh - ' + totalHeight + 'px)');
  }
}
$(function(){
  adjustContainerHeight()
})
$(window).on('resize', function(){
  adjustContainerHeight()
})

