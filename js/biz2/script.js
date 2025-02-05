/** 
 * 2525.01.09
 * 
 * 변경 사항 : 
 * 1. 변수 내부 함수 선언으로 변경 
 * 2. 초기화 기능 init()으로 함수명 통일
 * 3. 스크롤 바 생성 시 오른쪽 패딩 값 조절 기능 추가
 * 4. 푸터 하단 고정 (body min-heihgt 값 함수 추가)
 */

// 비활성화 링크
const disabledLink = {
  init : () => {
    const links = document.querySelectorAll('.link-item a')
    links.forEach(link =>{
      const href = link.getAttribute('href')
      if (!href || href === '#') {
          link.classList.add('disabled-link')
      }
    })
  }
}

// container 최소 높이값 설정 (푸터 하단 고정)
const container = {
  heightInit : () => {
    const headerH = $('header').outerHeight()
    const footerH = $('footer').outerHeight()
    const locationHeight = $('.top-location').outerHeight()

    var totalHeight;

    if($('.top-location').length > 0){
      totalHeight = headerH + footerH + locationHeight;
    } else {
      totalHeight = headerH + footerH;
    }
    $('.container').css('min-height', 'calc(100vh - ' + totalHeight + 'px)' )
  },

  moheightInit : () => {
    $('.container').css('min-height', 'none' )
  }
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

// LGP_001 contents
const infoConts = {
  init : () => {
    const infoBtns = document.querySelectorAll('.button-conts button')
    const closeBtns = document.querySelectorAll('.button-layer-close')

    infoBtns.forEach(infoBtn => {
      infoBtn.addEventListener('click', (event) => {
          let popupVal = event.target.getAttribute('data-popup');
          const popups = document.querySelectorAll('.button-layer')

          popups.forEach(popup => {
            let popVal = popup.getAttribute('data-pop');

            if(popupVal == popVal){popup.style.display= "block" }
          })

          if(window.matchMedia("(max-width: 1280px)").matches){
            var layerBg = document.querySelector('.layer-bg')
            if(layerBg){layerBg.remove();}

            const newBg = document.createElement('div')
            newBg.classList.add('layer-bg')
            document.querySelector('html').style.overflow = 'hidden';
            document.querySelector('body').appendChild(newBg)
          }
      })
    })

    closeBtns.forEach(closeBtn => {
      closeBtn.addEventListener('click', ()=>{
        document.querySelector('html').style.overflow = '';
        var layerBg = document.querySelector('.layer-bg');
        layerBg.remove();
      })
    })
  }
}

// 달력
const datePicker = {
  init : () => {
    const dateInputs = document.querySelectorAll('input[type="date"]')
    if(dateInputs.length > 0){
      dateInputs.forEach(dateInput => {
        dateInput.setAttribute('required', '')
      })
    }
  }
}

// 레이어 팝업
const layerPop = {
  init : () => {
    const layerCloses = document.querySelectorAll('.layer-pop button:not(.hide-layer-close)')

    // onclick hide가 존재 시 클래스 삽입
    layerCloses.forEach(layerClose => {
      const onClickValue = layerClose.getAttribute('onclick');
      if(onClickValue && onClickValue.includes('hide()') && onClickValue.includes('data-pop')){
        layerClose.classList.add('layer-hide-trigger') 
      }
    })
  }
}

// 레이어 스크롤 체크 
$.fn.hasScrollBar = function(){
  return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) 
  || (this.prop("scrollHeight") > this.prop("clientHeight"));
}

// 레이어 스크롤바 제외 패딩 셋팅
function layerPaddingSet(onClickPop){
  let targetEl = $(`[data-pop="${onClickPop}"]`);
  let $targetElScroll = targetEl.find('.layer-scroll')
  let targetElScroll = $targetElScroll.get(0)

  if($targetElScroll.hasScrollBar()){
    targetElScroll.style.paddingRight = '';  // inline padding값 초기화
    let newPaddingRight = undefined;
    let itemPaddingRight = parseInt(window.getComputedStyle(targetElScroll).paddingRight);

    let scrollWidth = targetElScroll.offsetWidth - targetElScroll.clientWidth;
    newPaddingRight = itemPaddingRight - scrollWidth;
    $targetElScroll.css('padding-right', newPaddingRight + 'px')
  }
}

// 레이어 스크롤바 리사이즈 이벤트
function layerPaddingReset(){
  $('.layer-scroll:visible').each(function(index,item){
    let $item = $(item)

    $item[index].style.paddingRight = ''; // inline padding값 초기화

    let itemPaddingRight = parseInt(window.getComputedStyle(item).paddingRight)
    let scrollWidth = item.offsetWidth - item.clientWidth;
    let newPaddingRight = itemPaddingRight - scrollWidth;
   
    $item.css('padding-right', newPaddingRight + 'px')
  })
}

// 셀렉트 옵션
const selectOption = {
  init : () => {
    const options = document.querySelectorAll('select option')
    options.forEach(option => {
      if(option.value === "전체" || option.innerText === "전체"){
        option.classList.add('all-option')
      }
    })
  }
}

// 읽기전용 인풋
const readonly = {
  init : () => {
    const readonlys = document.querySelectorAll('input[readonly]:not([type="radio"]):not([type="checkbox"])')
    if(readonlys.length > 0) {    
      readonlys.forEach(readonly => {
          readonly.classList.add('readonly-txt')
      })
    }
  },

  widthInit : () => {
    const resetInputs = document.querySelectorAll('.input-reset input')
    resetInputs.forEach(resetInput => {
      const inputValue = resetInput.getAttribute('value');
      const fakeDom = document.createElement('span');

      fakeDom.style.font = getComputedStyle(resetInput).font;
      fakeDom.textContent = inputValue;

      document.body.appendChild(fakeDom); 
      const fakeDomWidth = fakeDom.offsetWidth; // value 값 만큼 너비 측정

      resetInput.style.width = `${fakeDomWidth + 4}px`; // 페이지 로드 시 다 안보이는 현상으로 인해 4px 여백 값 추가 할당
      document.body.removeChild(fakeDom)
    })
  }
}

// 기간 설정 크기 변화 옵저버
function periodColumnSet(){
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
}

document.addEventListener("DOMContentLoaded", function(){
    // 윈도우 초기값 설정
    windowSize.setWinSize();
    let isPC = windowSize.getWinSize() === "pc";

    container.heightInit();
    disabledLink.init();
    datePicker.init();
    layerPop.init();
    selectOption.init();
    readonly.init();
    readonly.widthInit();
    infoConts.init();     

    periodColumnSet();
  
    // 윈도우 리사이즈 이벤트
    $(window).on('resize', function(){
      windowSize.setWinSize();
      const newIsPC = windowSize.getWinSize() === "pc";

      if(isPC !== newIsPC){
        container.heightInit();
        layerPaddingReset()
        isPC = newIsPC; // pc mo 상태값 업데이트
      } 
      if(!newIsPC){
        gnbTrigger.removeClass('on') // pc gnb 비활성화
      }
      if(window.matchMedia("(min-width: 1280px)").matches){
       $('.layer-bg').hide();
      }
    })

    // 레이어버튼 클릭 이벤트
    $('.layer-btn').on('click', function(){
      let onClickValue = $(this).attr('onclick'); 
      let onClickPop = onClickValue.match(/\[data-pop=([^\]]+)\]/)?.[1];
      layerPaddingSet(onClickPop)
    }) 
    
    // GNB 변수 선언
    const gnbTrigger = $('header .menu-area .open-btn')
    const gnbCloseTrigger = $('header .menu-area .close-btn')
    const gnbSubBox = $('header .menu-box')
    const gnbMobileCloseTrigger = $('header .sm-menu-header .sm-close')
  
    gnbTrigger.on('click',function(){
      let pc = windowSize.getWinSize() === "pc"; // 디바이스 확인
      if (pc){
        $(this).toggleClass('on');
        $('.log-info').hide();
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
    })
  
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
      chkInput.attr('placeholder', '강좌 종류 입력');

      chkInput.toggleClass('hidden-i')
      if(!chkInput.hasClass('hidden-i')){
        chkInput.focus();
      }
    })
  
    // 레이어 닫기 버튼 스크롤 생성
    $('.layer-btn').on('click',function(){
      $('html').css('overflow-y', 'hidden')
    })
  
    // 로컬 스토리지 새창 팝업 스크롤 제어 (로컬스토리지 변수값 참조)
    const isWindowOpen = localStorage.getItem('newWindow')
    window.addEventListener('storage', (event)=>{
      if(event.newValue === 'false') {
        $('html').css('overflow-y', 'scroll')
      }
    })
  
    // 레이어 닫기 클릭 시 스크롤 풀기
    $(document).on('click', '.layer-hide-trigger', function(event) {
        if($(this).hasClass('hide-layer-close')){
          $('html').css('overflow-y', 'hidden')  
        } else {
          $('html').css('overflow-y', 'scroll');
        }
    });

    // 목차 액티브 스타일
    $('.info-box ul > li > a').click(function(e){  
      $('.info-box ul > li').removeClass('is-active')
      $(this).parent().addClass('is-active')
    })

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
  
    /* 윈도우 URL별 show hide 적용 */
    let windowLocation = window.location.pathname;
    let notAnimationWindow = ["LCP_001", "LCP_002", "LAP_101", "reqCertification", "crtfctPage", "ILP_002"];
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







