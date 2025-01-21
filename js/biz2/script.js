$(document).ready(function () {

  // GNB 임시 비활성화 링크 표시
  $('.link-item a').each(function(){
    var href = $(this).attr('href');
    if (!href || href === '#') { $(this).addClass('disabled-link'); }
  })

  // 달력 컴포넌트 속성 설정
  const dateInput = document.querySelectorAll('input[type="date"]')
  if(dateInput.length > 0){
    dateInput.forEach(input=> {
      input.setAttribute('required', '')
    })
  }

  let previousHeight;
  const periodTexts = document.querySelectorAll('li.apply-period > span');
  periodTexts.forEach(periodText => {
    previousHeight = periodText.offsetHeight;
  })

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      if(previousHeight != entry.target.offsetHeight){
        entry.target.classList.add('flex-col')
      } else {
        entry.target.classList.remove('flex-col')
      }
    });
  });

  periodTexts.forEach(periodText => {
    observer.observe(periodText);
  })

  // select 전체 옵션 클래스 추가 
  const options = document.querySelectorAll('select option')
  options.forEach(option => {
    if (option.value === "전체" || option.innerText === "전체"){
      option.classList.add('all-option')
    }
  })

  // readonly 전용 클래스 추가
  const readonlyInputs = document.querySelectorAll('input[readonly]:not([type="radio"]):not([type="checkbox"])');
  if(readonlyInputs.length > 0) {    
    readonlyInputs.forEach(input => {
        input.classList.add('readonly-txt')
    })
  }

  // 페이지 꽉차게 컨테이너 높이값 증가
  function adjustContainerHeight(){
    const fullWindowLocation = window.location.href;

    let fullPageWindow = ["IMP_012", "IMP_002", "IIP_802", "LCP_003", "LAP_200"]
    if(fullPageWindow.some(window => fullWindowLocation.includes(window))){
      $('html').addClass('full-page')
    }

    var headerHeight = $('header').outerHeight()
    var footerHeight = $('footer').outerHeight()
    var totalHeight = headerHeight + footerHeight;
    $('.full-page .container').css('min-height', 'calc(100vh - ' + totalHeight + 'px)');
  }

  // 윈도우 사이즈 체크
  const windowSize = {
    winSize: null,
    breakpoints : 1080,
    setWinSize(){
      this.winSize = window.innerWidth >= this.breakpoints ? "pc" : "mob";
    },
    getWinSize(){
      return this.winSize;
    }
  }

  // 윈도우 리사이즈 이벤트
  $(window).on('resize', function(){
    windowSize.setWinSize();
    const isPC = windowSize.getWinSize() === "pc";
    if(isPC){
      adjustContainerHeight();
    } else {
      $('.full-page .container').css('min-height', '')
      gnbTrigger.removeClass('on')
    }
  })


  // GNB 변수 선언
  const gnbTrigger = $('header .menu-area .open-btn')
  const gnbCloseTrigger = $('header .menu-area .close-btn')
  const gnbSubBox = $('header .menu-box')
  const gnbMobileCloseTrigger = $('header .sm-menu-header .sm-close')

  // GNB 열기
  gnbTrigger.on('click',function(){
    const isPC = windowSize.getWinSize() === "pc"; // 디바이스 확인
    // PC GNB 토글
    if (isPC){
      $(this).toggleClass('on');
      $('.log-info').hide();
    // MO GNB 토글
    } else {
      $(this).toggleClass('sm-on')
      $('body').css('overflow', 'hidden')
    }    
  })

  // GNB 닫기
  gnbCloseTrigger.on('click', function(){
    gnbTrigger.removeClass('on');
    $('.log-info').show();
  })

  // 모바일 close 
  gnbMobileCloseTrigger.on('click', function () {
    gnbTrigger.removeClass('sm-on');
    $('body').css('overflow', '')
  });
  
  // 메뉴 박스 이벤트 버블링 방지 
  gnbSubBox.click(function(e){
    e.stopPropagation();
  })

  // GNB 이외 영역 클릭 닫기
  $(document).click(function(e){
    if(gnbTrigger.hasClass('on')){
      // 클릭되어도 닫히면 안되는 요소들
      const notTarget = [gnbSubBox, gnbCloseTrigger, gnbTrigger, $('header')]  
      // 클릭된 요소가 배열 요소에 포함되지 않는 지 확인
      const isTargetOutside = notTarget.some(notTarget => notTarget.is(e.target)) == false;

      // 클릭된 요소가 배열 요소에 포함되지 않을 경우 실행
      if(isTargetOutside){
        gnbTrigger.removeClass('on')
        $('.log-info').hide();
      }
    }
  })

  // 커스텀 셀렉트 open , close
  $('.custom-select-open').on('click',function(){
    $(this).parent().toggleClass('is-open')
    $(this).toggleClass('is-open')
  })

  // 탭 변환 
  $('.tab-list li a').click(function () {
    $('.tab-cont').hide().filter(this.hash).show();
    $('.tab-list li a').removeClass('show');
    $(this).addClass('show');
    return false;
  }).filter(':eq(0)').click();

  // table click event 
  var ableClickTr = $('.com-view-table table.hasClick tbody tr');
  ableClickTr.click(function(){
    ableClickTr.removeClass('is-clicked')
    $(this).addClass('is-clicked')
  })

  // ILP_003 기관 운영강좌 유형 텍스트 필드 show hide
  $('.chk-write .chk-box input[type="text"]').addClass('hidden-i');
  $('.chk-write .chk-box input[type="checkbox"]').click(function(){
    var chkInput = $(this).parent().find('input[type="text"]');
    chkInput.toggleClass('hidden-i')
    if(!chkInput.hasClass('hidden-i')){
      chkInput.focus();
    }
  })

  // 레이어 닫기 버튼 스크롤 생성
  $('.layer-btn').on('click',function(){
    $('html').css('overflow-y', 'hidden')
  })

  // 레이어 닫기 버튼 스크롤 해제
  $('.layer-pop .layer-close').on('click',function(){
    $('html').css('overflow-y', 'scroll')
  })

  // 레이어 닫기 버튼 클래스 동적 추가
  $('.layer-pop button:not(.hide-layer-close)').each(function(){
    var onClickValue = $(this).attr('onclick')
    if(onClickValue && onClickValue.includes('hide()') && onClickValue.includes('data-pop')){
      $(this).addClass('layer-hide-trigger')
    }
  })

  // 로컬 스토리지 새창 팝업 스크롤 제어 (로컬스토리지 변수값 참조)
  const isWindowOpen = localStorage.getItem('newWindow')
  window.addEventListener('storage', (event)=>{
    if(event.newValue === 'false') {
      $('html').css('overflow-y', 'scroll')
    }
  })

  // 레이어 닫기 클릭 시 스크롤 풀기
  $(document).on('click', '.layer-hide-trigger', function() {
    $('html').css('overflow-y', 'scroll')

    // 닫기 버튼 클릭 시 다중 레이어 팝업 닫기
    var closestPop = $(this).closest('.layer-pop');
    if(closestPop.find('.hide-layer-content').length > 0){
      closestPop.find('.hide-layer-content').hide();
    }
  });

  // 본인인증 방식 탭
  $('.auth-area button').click(function(){
    $('.auth-area button').not($(this)).removeClass('is-active')
    $(this).addClass('is-active')
  }).filter(':eq(0)').click();

  // 파일첨부 커스텀
  $('.file').on('change', function() {
    var fileName = $(this).val().split(/\\|\//).pop();
    if (fileName) {
        $(this).siblings('.upload-name').val(fileName);
    } else {
        $(this).siblings('.upload-name').val(''); // 비어있을 경우 초기화
    }
  });
  
  /* readonly input 너비 초기화 */
  function setInputWidth(){
    const resetInput = document.querySelectorAll('.input-reset input')
    resetInput.forEach(input => {
      // 밸류 값을 복사한 후 span에 저장
      const inputValue = input.getAttribute('value');
      const fakeInput = document.createElement('span');

      // 기본 input 값의 padding과 font 스타일 style 적용
      fakeInput.style.font = getComputedStyle(input).font; // input 스타일 가져오기
      fakeInput.textContent = inputValue;

      // 가상 span 돔 등록 후 수치 값 확인
      document.body.appendChild(fakeInput);
      const fakeInputWidth = fakeInput.offsetWidth;

      // 동적으로 input에 값 추가 * css 기본 값 0으로 초기화
      // 페이지 로드 시 다 안보이는 현상으로 인해 4px 여백 값 추가 할당
      input.style.width = `${fakeInputWidth + 4}px`;
      document.body.removeChild(fakeInput);
    })
  }
  setInputWidth();

  
  /* 윈도우 URL별 show hide 적용 */
  let windowLocation = window.location.pathname;
  let notAnimationWindow = ["LCP_001", "LCP_002", "LAP_101", "reqCertification", "crtfctPage"]
    if(!notAnimationWindow.some(window => windowLocation.includes(window))){ // 해당 문자열을 가지고 있지 않은 경우에만 아래 코드 실행
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

  // 아이디 찾기 인증방식 show, hide
  $('input:radio[name=searchGbn]').click(function() {
		if(this.value == "01")
		{
			$('.hp').css('display','');
			$('.email').css('display','none');
		}
		else if(this.value == '02')
		{
			$('.hp').css('display','none');
			$('.email').css('display','');
		}
	});

  // 본인인증 임시 값 숨기기
  const actualValue = '135345';
  $('#secure-value').text('●'.repeat(actualValue.length));
  
  // 메인 공지사항 스와이퍼
  var mainNotice = new Swiper('.main-notice-detail .swiper', {
    allowTouchMove: false, // 터치 동작 비활성화
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.main-notice-detail .swiper-button-next',
      prevEl: '.main-notice-detail .swiper-button-prev',
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







