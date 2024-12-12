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

  /* layer pop hide 클래스 동적 추가 */
  $('.layer-pop button').each(function(){
    var onClickValue = $(this).attr('onclick')
    if(onClickValue && onClickValue.includes('hide()') && onClickValue.includes('data-pop') ){
      $(this).addClass('layer-hide-trigger')
    }
  })

  /* hide trigger 클릭 시 스크롤 풀기  */
  $(document).on("click", ".layer-hide-trigger", function() {
    $('body').css('overflow', '')
  });

  $('.auth-area button').click(function(){
    $('.auth-area button').not($(this)).removeClass('is-active')
    $(this).addClass('is-active')
  }).filter(':eq(0)').click();


  /* input-type file 클릭시 가까운 upload-name에 값 추가 */
  // $('.file').on('change', function(){
  //   var fileName = $(this).val().split('\\').pop()
  //   $(this).closest('.filebox').find('.upload-name').val(fileName)
  // })

  // 파일첨부
  $('.file').on('change', function() {
    var fileName = $(this).val().split(/\\|\//).pop();
    if (fileName) {
        $(this).siblings('.upload-name').val(fileName);
    } else {
        $(this).siblings('.upload-name').val(''); // 비어있을 경우 초기화
    }
  });

  /* 본인인증 임시 값 숨기기 */
  const actualValue = "135345";
  $('#secure-value').text('●'.repeat(actualValue.length));
  
  /* 본인인증 테이블 변환 */
  $('.birth-chk').hide();
  $('.auth-area-in button').on('click',function(){
    // 휴대폰 인증, 아이핀 클릭 시
    if($(this).hasClass('mo-auth') || $(this).hasClass('i-pin')){
      $('.resident-chk').hide();
      $('.birth-chk').show()
    // 간편인증, 공동인증서 클릭 시
    } else {
      $('.birth-chk').hide();
      $('.resident-chk').show();
    }
  })

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




