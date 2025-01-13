$(document).ready(function () {

  // 임시 비활성화 링크 표시
  $('.link-item a').each(function(){
    var href = $(this).attr('href');
    if (!href || href === '#') { $(this).addClass('disabled-link'); }
  })

  // readonly 전용 클래스 추가 // 테스트용
  const readonlyInputs = document.querySelectorAll('input[readonly]:not([type="radio"]):not([type="checkbox"])');
  if(readonlyInputs.length > 0) {    
    readonlyInputs.forEach(input => {
      input.classList.add('readonly-txt')
    })
    console.log("readonly 속성이 있습니다") // 테스트 코드용 개발 전달
  }

  let desktop = window.matchMedia('(min-width: 1080px)').matches;
  /* js 미디어쿼리 */
  $(window).on('resize', function(){
    desktop = window.matchMedia('(min-width: 1080px)').matches;
    if (!desktop) {
      $('header .menu-area .open-btn').removeClass('on')
    }
  });

  // gnb 메뉴
  $("header .menu-area .open-btn").on("click", function () {
    if (desktop){
      $(this).toggleClass("on");
      $('.log-info').hide();
    } else {
      $(this).toggleClass('sm-on')
      $('body').css('overflow', 'hidden')
    }    
  });
  // 모바일 close 
  $("header .sm-menu-header .sm-close").on("click", function () {
    $("header .open-btn").removeClass("sm-on");
    $('body').css('overflow', '')
  });

  // pc close
  $("header .menu-box .close-btn").on("click", function () {
    $("header .open-btn").removeClass("on");
    $('.log-info').show();
  });

  // 커스텀 셀렉트 open , close
  $('.custom-select-open').on('click',function(){
    $(this).parent().toggleClass('is-open')
    $(this).toggleClass('is-open')
  })

  /* 탭 변환 */
  $('.tab-list li a').click(function () {
    $('.tab-cont').hide().filter(this.hash).show();
    $('.tab-list li a').removeClass('show');
    $(this).addClass('show');
    return false;
  }).filter(':eq(0)').click();

  /* table click event */
  var ableClickTr = $('.com-view-table table.hasClick tbody tr');
  ableClickTr.click(function(){
    ableClickTr.removeClass('is-clicked')
    $(this).addClass('is-clicked')
  })

  /* ILP_003 기관 운영강좌 유형 텍스트 필드 show hide */
  $('.chk-write .chk-box input[type="text"]').addClass('v-hide');
  $('.chk-write .chk-box input[type="checkbox"]').click(function(){
    var chkInput = $(this).parent().find('input[type="text"]');
    chkInput.toggleClass('v-hide')
    if(!chkInput.hasClass('v-hide')){
      chkInput.focus();
    }
  })

  /* layer pop 형성 시 */
  $('.layer-btn').on('click',function(){
    $('html').css('overflow-y', 'hidden')
  })
  /* layer pop 삭제 시 */
  $('.layer-pop .layer-close').on('click',function(){
    $('html').css('overflow-y', 'scroll')
  })

  /* layer pop hide 클래스 동적 추가 */
  $('.layer-pop button:not(.hide-layer-close)').each(function(){
    var onClickValue = $(this).attr('onclick')
    if(onClickValue && onClickValue.includes('hide()') && onClickValue.includes('data-pop')){
      $(this).addClass('layer-hide-trigger')
    }
  })

  /* 로컬 스토리지 새창 팝업 */
  var isWindowOpen = localStorage.getItem('newWindow')
  window.addEventListener('storage', (event)=>{
    if(event.newValue === 'false') {
      $('html').css('overflow-y', 'scroll')
    }
  })

  /* hide trigger 클릭 시 스크롤 풀기  */
  $(document).on("click", ".layer-hide-trigger", function() {
    $('html').css('overflow-y', 'scroll')

    // 중복 팝업 있을 시 닫을 때 함께 hide()
    var closestPop = $(this).closest('.layer-pop');
    if(closestPop.find('.hide-layer-content').length > 0){
      closestPop.find('.hide-layer-content').hide();
    }
  });

  $('.auth-area button').click(function(){
    $('.auth-area button').not($(this)).removeClass('is-active')
    $(this).addClass('is-active')
  }).filter(':eq(0)').click();

  // 파일첨부
  $('.file').on('change', function() {
    var fileName = $(this).val().split(/\\|\//).pop();
    if (fileName) {
        $(this).siblings('.upload-name').val(fileName);
    } else {
        $(this).siblings('.upload-name').val(''); // 비어있을 경우 초기화
    }
  });

  let windowLocation = window.location.pathname;
  if (windowLocation != "/work/LCP_002.html" && windowLocation != "/work/LAP_101.html"){
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
  }

  /* 아이디 찾기 인증 방식 */
  $("input:radio[name=searchGbn]").click(function() {
		if(this.value == "01")
		{
			$(".hp").css("display","");
			$(".email").css("display","none");
		}
		else if(this.value == "02")
		{
			$(".hp").css("display","none");
			$(".email").css("display","");
		}
	});

  /* 본인인증 임시 값 숨기기 */
  const actualValue = "135345";
  $('#secure-value').text('●'.repeat(actualValue.length));
  
  /* 메인화면 공지사항 스와이퍼 */
  var mainNotice = new Swiper(".main-notice-detail .swiper", {
    allowTouchMove: false,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".main-notice-detail .swiper-button-next",
      prevEl: ".main-notice-detail .swiper-button-prev",
    },
    breakpoints : {
      360 : {
        slidesPerView : 1,
      },
      1079 : {
        slidesPerView : 3
      }
    }
  });

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





