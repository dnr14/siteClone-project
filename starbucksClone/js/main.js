const $searchEl = document.querySelector('.search');
const $searchInputEl = $searchEl.querySelector('input');

// 통합검색 처리
$searchEl.addEventListener('click', function () {
  $searchInputEl.focus();
});

$searchInputEl.addEventListener('focus', function () {
  $searchEl.classList.add('focused');
  $searchInputEl.setAttribute('placeholder', '통합검색');
})
$searchInputEl.addEventListener('blur', function () {
  $searchEl.classList.remove('focused');
  $searchInputEl.removeAttribute('placeholder')
})

// 배지 숨기기 처리
const $badgeEl = document.querySelector('header .badges');
const $toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {

  let opacity = 1, display = 'block', x = 100;

  if (window.scrollY > 500) {
    opacity = 0;
    display = 'none';
    x = 0;
  }

  gsap.to($badgeEl, .6, {
    opacity,
    display
  })

  gsap.to($toTopEl, .2, {
    x
  });

}, 300));
// _.throttle(callback,millis)

$toTopEl.addEventListener('click', () => {
  gsap.to(window, .7 ,{
    scrollTo: 0
  });
});

// VISUAL
const $fadeEls = document.querySelectorAll('.visual .fade-in');
$fadeEls.forEach((fadeEl, index) => {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,
    opacity: 1
  });
})

// SWIPER
const swiperOption1 = {
  direction: 'vertical',
  autoplay: true,
  loop: true
}
const swiperOption2 = {
  direction: 'horizontal',
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlided: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 3000
  },
  pagination: {
    el: '.promotion .swiper-pagination',
    clickable: true
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
}
const swiperOption3 = {
  direction: 'horizontal',
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
}
new Swiper('.notice-line .swiper-container', swiperOption1);
new Swiper('.promotion .swiper-container', swiperOption2);
new Swiper('.awards .swiper-container', swiperOption3);

const $promotionEl = document.querySelector('.promotion');
const $promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

$promotionToggleBtn.addEventListener('click', () => {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    $promotionEl.classList.add('hide');
  } else {
    $promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1,
    yoyo: true,
    ease: Power1.easeInOut,
    delay: random(0, delay)
  });
}

floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)


const $spyEls = document.querySelectorAll('section.scroll-spy');
$spyEls.forEach(spyEl => {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,// 보여짐 여부를 감시 할 요소를 지정
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();