

const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
const lis = [...navbar.children];
const depth2s = document.querySelectorAll('.depth2');

const navbarEvent = () => {
  header.classList.toggle('active');
  depth2s.forEach(depth2 => depth2.classList.toggle('active'));
}

lis.forEach(li => li.addEventListener('mouseenter', navbarEvent));
lis.forEach(li => li.addEventListener('mouseleave', navbarEvent));


// 유튜브 쪽 기능
const videoUl = document.querySelector('.video_list_inner');
const ifram = document.getElementById('video_iframe');
const videoLis = [...videoUl.children];
const urlArray = [
  "https://www.youtube-nocookie.com/embed/loVP-hSu3Ts?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=71",
  "https://www.youtube-nocookie.com/embed/DM800h8420c?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=72",
  "https://www.youtube-nocookie.com/embed/Ej6uIrSaTGY?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=75",
  "https://www.youtube-nocookie.com/embed/VH_2cd1bJY8?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=76",
  "https://www.youtube-nocookie.com/embed/Wj07hx6-Pzo?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=7",
  "https://www.youtube-nocookie.com/embed/X1i3HcNa27E?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=8",
  "https://www.youtube-nocookie.com/embed/oYlhlhZkllo?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=9",
  "https://www.youtube-nocookie.com/embed/LGyhlVX7r9w?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=10",
  "https://www.youtube-nocookie.com/embed/LGyhlVX7r9w?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=10"
]



const focusEvent = (e) => {
  const { currentTarget } = e;
  videoLis.forEach(li => {
    if (li.classList.contains('selected'))
      li.removeAttribute('class');
  });
  ifram.src = urlArray[currentTarget.dataset.idx];
  currentTarget.classList.add('selected');
}
videoLis.forEach((li, idx) => li.dataset.idx = idx);
videoLis.forEach(li => li.addEventListener('click', focusEvent));


class InfiniteSlide {

  constructor(sliderWrapId, sliderId, rightButtonsClassName, leftButtonsClassName, numBoxClassName) {
    this.sliderWrap = document.getElementById(sliderWrapId);
    this.slider = document.getElementById(sliderId);
    this.rightButtons = document.querySelectorAll(`.${rightButtonsClassName}`);
    this.leftButtons = document.querySelectorAll(`.${leftButtonsClassName}`);
    this.numBoxs = document.querySelectorAll(`.${numBoxClassName}`);

    this.pageWidth = this.sliderWrap.clientWidth;
    this.pageArray = [...this.slider.children];
    this.totalPage = this.pageArray.length;

    this.buttonStop = true;
    this.pageIdx = 0;
    this.setTimeOutTime1 = 200;
    this.setTimeOutTime2 = 50;
    this.loopTime = 4000;
    this.transitionTime = `0.2s`;

    if (this.totalPage > 1) {
      const cloneFirstPage = this.pageArray[0].cloneNode(true);
      const cloneLastPage = this.pageArray[this.pageArray.length - 1].cloneNode(true);
      this.slider.appendChild(cloneFirstPage);
      this.slider.insertBefore(cloneLastPage, this.pageArray[0]);
      this.pageArray.push(cloneFirstPage);
      this.pageArray.unshift(cloneLastPage);
    }

    this.init();
  }

  init() {
    this.slider.style.width = `${this.pageArray.length * this.pageWidth}px`;
    this.pageArray.forEach(page => page.style.width = `${this.pageWidth}px`);
    this.pageArray.forEach(page => page.style.transform = `translateX(-${(this.pageWidth * (this.pageIdx + 1))}px)`);
    this.pageArray.forEach(page => page.style.transition = this.transitionTime);
    this.pageIdx++;

    this.numBoxNumberChange();
    this.eventHandler();
    this.setLoop();
  }

  rightBtnEvent = (e) => {

    if (this.buttonStop) {

      if (this.pageIdx < this.pageArray.length - 1) {
        this.pageArray.forEach(page => page.style.transform = `translateX(-${(this.pageWidth * (this.pageIdx + 1))}px)`);
        this.pageIdx++;

        this.numBoxNumberChange();

        if (this.pageIdx === this.pageArray.length - 1) {
          this.buttonStop = false;
          setTimeout(() => {
            this.pageArray.forEach(page => {
              page.style.transition = "0ms";
              page.style.transform = `translateX(-${this.pageWidth}px)`;
            });

            setTimeout(() => {
              this.pageArray.forEach(page => page.style.transition = this.transitionTime);
              this.buttonStop = true;
            }, this.setTimeOutTime2);
          }, this.setTimeOutTime1);

          this.pageIdx = 1;
        }
      }

    } else {
      e.preventDefault();
      return;
    }

  }

  leftBtnEvent = (e) => {
    if (this.buttonStop) {

      if (this.pageIdx > 0) {
        this.pageArray.forEach(page => page.style.transform = `translateX(-${(this.pageWidth * (this.pageIdx - 1))}px)`);
        this.pageIdx--;

        this.numBoxNumberChange();

        if (this.pageIdx === 0) {
          this.buttonStop = false;
          setTimeout(() => {
            this.pageArray.forEach(page => {
              page.style.transition = "0ms";
              page.style.transform = `translateX(-${this.pageWidth * (this.pageArray.length - 2)}px)`;
            });

            setTimeout(() => {
              this.pageArray.forEach(page => page.style.transition = this.transitionTime);
              this.buttonStop = true;
            }, this.setTimeOutTime2);
          }, this.setTimeOutTime1);

          this.pageIdx = this.pageArray.length - 2;
        }
      }

    } else {
      e.preventDefault();
      return;
    }

  }

  //페이지 네이션으로 바꿈
  numBoxNumberChange() {
    const pageNum = `<span style="color:#000; font-weight:900">${this.pageArray[this.pageIdx].dataset.pageidex}</span><span> / ${this.totalPage}</span>`;
    this.numBoxs.forEach(numBox => numBox.innerHTML = pageNum);
  }

  eventHandler() {
    this.rightButtons.forEach(button => button.addEventListener('click', this.rightBtnEvent));
    this.leftButtons.forEach(button => button.addEventListener('click', this.leftBtnEvent));
    window.addEventListener('resize', this.optimizeAnimation(this.resize));
    window.addEventListener('resize', this.optimizeAnimation(this.clean));

  }

  // 1초에 최대 60번 실행
  // 60 프레임
  optimizeAnimation = (callback) => {
    let ticking = false;
    return (e) => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          callback(e);
          ticking = false;
        });
      }
    };
  }

  // 매번 resize시 실행
  resize = () => {

    // 바텀 슬라이드 이미지 깨짐 때문에 넣은 로직
    // 이미지가 3개면 다시 개발해야된다.
    if (window.innerWidth > 1260) {
      this.pageArray.forEach((page, idx) => {
        idx % 2 === 0
          ? page.firstElementChild.src = `/image/main/bottomSlide/bottomSlideIMG259px${2}.jpg`
          : page.firstElementChild.src = `/image/main/bottomSlide/bottomSlideIMG259px${1}.jpg`;
      });
    } else {
      this.pageArray.forEach((page, idx) => {
        idx % 2 === 0
          ? page.firstElementChild.src = `/image/main/bottomSlide/bottomSlideIMG${2}.jpg`
          : page.firstElementChild.src = `/image/main/bottomSlide/bottomSlideIMG${1}.jpg`;
      });
    }
    this.pageIdx = 0;
    this.pageIdx++;
    this.pageWidth = this.sliderWrap.clientWidth;
    this.pageArray.forEach(page => page.style.transition = "0ms");
    this.pageArray.forEach(page => page.style.width = `${this.pageWidth}px`);
    this.pageArray.forEach(page => page.style.transform = `translateX(-${(this.pageWidth * this.pageIdx)}px)`);
    this.slider.style.width = `${this.pageArray.length * (this.pageWidth + 2)}px`;

  }

  // resize 후 
  clean = (e) => {
    const { currentTarget } = e;
    if (currentTarget.resizeTo) {
      clearTimeout(currentTarget.resizeTo);
    }
    currentTarget.resizeTo = setTimeout(() => {
      this.pageArray.forEach(page => page.style.transition = this.transitionTime);
    }, 200);

  }

  setLoop() {
    this.timer = setInterval(() => this.rightBtnEvent(), this.loopTime);
  }
}

const bottomInfiniteSlide = new InfiniteSlide("bottom_slide_wrap", "bottom_slide", "btn_right", "btn_left");

/*
  해야할것
  this.time1
  this.time2
  변수명 변경
  페이지네이션 동적 생성
  footer만들기
*/