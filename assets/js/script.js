$(document).ready(function () {
  //gnb 메뉴
  $("header .menu-area .open-btn").on("click", function () {
    $(this).toggleClass("on");
  });
  $("header .menu-box .close-btn").on("click", function () {
    $("header .open-btn").removeClass("on");
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
});
