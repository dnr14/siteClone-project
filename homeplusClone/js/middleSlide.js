class MiddleInfiniteSlide {

  constructor(sliderWrapId, sliderId, rightButtonsId, leftButtonsId) {
    this.sliderWrap = document.getElementById(sliderWrapId);
    this.slider = document.getElementById(sliderId);
    this.rightButton = document.getElementById(rightButtonsId);
    this.leftButton = document.getElementById(leftButtonsId);

    this.pageWidth = this.sliderWrap.clientWidth;
    this.pageArray = [...this.slider.children];
    this.totalPage = this.pageArray.length;

    this.buttonStop = true;
    this.pageIdx = 0;
    this.setTimeOutTime1 = 1000;
    this.setTimeOutTime2 = 50;
    this.loopTime = 4000;
    this.transitionTime = `1s`;
    this.current = null;

    this.init();
  }

  init() {

    if (this.totalPage > 1) {
      const cloneFirstPage = this.pageArray[0].cloneNode(true);
      const cloneLastPage = this.pageArray[this.pageArray.length - 1].cloneNode(true);
      this.slider.appendChild(cloneFirstPage);
      this.slider.insertBefore(cloneLastPage, this.pageArray[0]);
      this.pageArray.push(cloneFirstPage);
      this.pageArray.unshift(cloneLastPage);
    }

    this.slider.style.width = `${this.pageArray.length * this.pageWidth}px`;
    this.pageArray.forEach(page => page.style.width = `${this.pageWidth}px`);
    this.pageArray.forEach(page => page.style.transform = `translateX(-${(this.pageWidth * (this.pageIdx + 1))}px)`);
    this.pageArray.forEach(page => page.style.transition = this.transitionTime);
    this.pageIdx++;

    this.createPaginaition();
    this.eventHandler();
    this.setLoop();
  }

  rightBtnEvent = () => {

    if (this.buttonStop) {

      if (this.pageIdx < this.pageArray.length - 1) {
        this.pageArray.forEach(page => page.style.transform = `translateX(-${(this.pageWidth * (this.pageIdx + 1))}px)`);
        this.pageIdx++;


        if (this.pageIdx === this.pageArray.length - 1) {
          this.buttonStop = false;
          setTimeout(() => {
            this.pageArray.forEach(page => {
              page.style.transition = "0ms";
              page.style.transform = `translateX(-${this.pageWidth * 1}px)`;
            });

            setTimeout(() => {
              this.pageArray.forEach(page => page.style.transition = this.transitionTime);
              this.buttonStop = true;
            }, this.setTimeOutTime2);
          }, this.setTimeOutTime1);

          this.pageIdx = 1;
        }
      }
      this.paginationRender();

    }

  }

  leftBtnEvent = () => {
    if (this.buttonStop) {

      if (this.pageIdx > 0) {
        this.pageArray.forEach(page => page.style.transform = `translateX(-${(this.pageWidth * (this.pageIdx - 1))}px)`);
        this.pageIdx--;

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
      this.paginationRender();

    }

  }


  eventHandler() {
    this.rightButton.addEventListener('click', this.rightBtnEvent);
    this.leftButton.addEventListener('click', this.leftBtnEvent);
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


  createPaginaition() {
    const div = document.createElement('div');
    div.id = "pagination";
    const endLeng = Math.round(this.pageArray.length / 2) + 1;
    for (let i = 0; i < endLeng; ++i) {
      const span = document.createElement('span');
      span.classList.add('bullet');
      if (i === 0) {
        span.classList.add('active');
        this.current = span;
      }

      span.dataset.tableIdx = i;
      span.addEventListener('click', this.paginationEvent);
      div.appendChild(span);

    }

    this.sliderWrap.appendChild(div);
  }

  paginationEvent = (e) => {
    const { currentTarget } = e;
    const { tableIdx } = currentTarget.dataset;
    this.pageIdx = Number(tableIdx);

    if (this.current !== null)
      this.current.classList.remove('active');

    currentTarget.classList.add('active');
    this.current = currentTarget;

    this.rightBtnEvent();
  }

  paginationRender() {
    const pagination = this.sliderWrap.querySelector('#pagination');
    const { children } = pagination;
    const childrenArray = [...children];

    childrenArray.forEach(span => {
      const { tableIdx } = span.dataset;
      if ((this.pageIdx - 1) === Number(tableIdx)) {

        if (this.current !== null) {
          this.current.classList.remove('active');
        }

        span.classList.add('active');
        this.current = span;
      }
    });

  }


  setLoop() {
    this.timer = setInterval(() => this.rightBtnEvent(), this.loopTime);
  }
}

const middleinfiniteSlide = new MiddleInfiniteSlide("middleSlideWrap", "middleSlide", "middlebtnNext", "middlebtnPrev");
