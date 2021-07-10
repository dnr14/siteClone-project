

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
    this.time1 = 300;
    this.time2 = 100;

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
    this.pageIdx++;

    this.numBoxNumberChange();
    this.eventHandler();
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
              this.pageArray.forEach(page => page.style.transition = "0.2s");
              this.buttonStop = true;
            }, this.time2);
          }, this.time1);

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
              this.pageArray.forEach(page => page.style.transition = "0.2s");
              this.buttonStop = true;
            }, this.time2);
          }, this.time1);

          this.pageIdx = this.pageArray.length - 2;
        }
      }

    } else {
      e.preventDefault();
      return;
    }

  }

  eventHandler() {
    this.rightButtons.forEach(button => button.addEventListener('click', this.rightBtnEvent));
    this.leftButtons.forEach(button => button.addEventListener('click', this.leftBtnEvent));
  }

  numBoxNumberChange() {
    const pageNum = `<span style="color:#000; font-weight:900">${this.pageArray[this.pageIdx].dataset.pageidex}</span><span> / ${this.totalPage}</span>`;
    this.numBoxs.forEach(numBox => numBox.innerHTML = pageNum);
  }



}

new InfiniteSlide("bottom_slide_wrap", "bottom_slide", "r", "l");

/*
  해야할것
  왼쪽 오른쪽 버튼
  자동 loop
  resize
  페이지네이션 동적 생성
  footer만들기
*/