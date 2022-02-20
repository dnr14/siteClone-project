class InfiniteSlide {
  constructor(
    sliderWrapId,
    sliderId,
    rightButtonsClassName,
    leftButtonsClassName
  ) {
    this.sliderWrap = document.getElementById(sliderWrapId);
    this.slider = document.getElementById(sliderId);
    this.rightButtons = document.querySelectorAll(`.${rightButtonsClassName}`);
    this.leftButtons = document.querySelectorAll(`.${leftButtonsClassName}`);

    this.pageWidth = this.sliderWrap.clientWidth;
    this.pageArray = [...this.slider.children];
    this.totalPage = this.pageArray.length;

    this.buttonStop = true;
    this.pageIdx = 0;
    this.setTimeOutTime1 = 200;
    this.setTimeOutTime2 = 50;
    this.loopTime = 4000;
    this.transitionTime = `0.2s`;
    this.current = null;

    this.init();
  }

  init() {
    if (this.totalPage > 1) {
      const cloneFirstPage = this.pageArray[0].cloneNode(true);
      const cloneLastPage =
        this.pageArray[this.pageArray.length - 1].cloneNode(true);
      this.slider.appendChild(cloneFirstPage);
      this.slider.insertBefore(cloneLastPage, this.pageArray[0]);
      this.pageArray.push(cloneFirstPage);
      this.pageArray.unshift(cloneLastPage);
    }

    this.slider.style.width = `${this.pageArray.length * this.pageWidth}px`;
    this.pageArray.forEach(
      (page) => (page.style.width = `${this.pageWidth}px`)
    );
    this.pageArray.forEach(
      (page) =>
        (page.style.transform = `translateX(-${
          this.pageWidth * (this.pageIdx + 1)
        }px)`)
    );
    this.pageArray.forEach(
      (page) => (page.style.transition = this.transitionTime)
    );
    this.pageIdx++;

    this.createPaginaition();
    this.eventHandler();
    this.setLoop();
  }

  rightBtnEvent = (e) => {
    if (this.buttonStop) {
      this.pageArray.forEach(
        (page) =>
          (page.style.transform = `translateX(-${
            this.pageWidth * (this.pageIdx + 1)
          }px)`)
      );
      this.pageIdx++;

      if (this.pageIdx === this.pageArray.length - 1) {
        this.buttonStop = false;
        setTimeout(() => {
          this.pageArray.forEach((page) => {
            page.style.transition = "0ms";
            page.style.transform = `translateX(-${this.pageWidth}px)`;
          });

          setTimeout(() => {
            this.pageArray.forEach(
              (page) => (page.style.transition = this.transitionTime)
            );
            this.buttonStop = true;
          }, this.setTimeOutTime2);
        }, this.setTimeOutTime1);

        this.pageIdx = 1;
      }
      this.paginationRender();
    } else {
      e.preventDefault();
      return;
    }
  };

  leftBtnEvent = (e) => {
    if (this.buttonStop) {
      this.pageArray.forEach(
        (page) =>
          (page.style.transform = `translateX(-${
            this.pageWidth * (this.pageIdx - 1)
          }px)`)
      );
      this.pageIdx--;

      if (this.pageIdx === 0) {
        this.buttonStop = false;
        setTimeout(() => {
          this.pageArray.forEach((page) => {
            page.style.transition = "0ms";
            page.style.transform = `translateX(-${
              this.pageWidth * (this.pageArray.length - 2)
            }px)`;
          });

          setTimeout(() => {
            this.pageArray.forEach(
              (page) => (page.style.transition = this.transitionTime)
            );
            this.buttonStop = true;
          }, this.setTimeOutTime2);
        }, this.setTimeOutTime1);

        this.pageIdx = this.pageArray.length - 2;
      }

      this.paginationRender();
    } else {
      e.preventDefault();
      return;
    }
  };

  createPaginaition() {
    const div = document.createElement("div");
    div.id = "pagination";
    for (let i = 0; i < this.pageArray.length / 2; ++i) {
      const span = document.createElement("span");
      span.classList.add("bullet");
      if (i === 0) {
        span.classList.add("active");
        this.current = span;
      }

      span.dataset.tableIdx = i;
      span.addEventListener("click", this.paginationEvent);
      div.appendChild(span);
    }

    this.sliderWrap.appendChild(div);
  }

  paginationEvent = (e) => {
    const { currentTarget } = e;
    const { tableIdx } = currentTarget.dataset;
    this.pageIdx = Number(tableIdx);

    if (this.current !== null) this.current.classList.remove("active");

    currentTarget.classList.add("active");
    this.current = currentTarget;

    this.rightBtnEvent();
  };

  paginationRender() {
    const pagination = this.sliderWrap.querySelector("#pagination");
    const { children } = pagination;
    const childrenArray = [...children];

    childrenArray.forEach((span) => {
      const { tableIdx } = span.dataset;
      if (this.pageIdx - 1 === Number(tableIdx)) {
        if (this.current !== null) {
          this.current.classList.remove("active");
        }

        span.classList.add("active");
        this.current = span;
      }
    });
  }

  eventHandler() {
    this.rightButtons.forEach((button) =>
      button.addEventListener("click", this.rightBtnEvent)
    );
    this.leftButtons.forEach((button) =>
      button.addEventListener("click", this.leftBtnEvent)
    );
    window.addEventListener("resize", this.optimizeAnimation(this.resize));
    window.addEventListener("resize", this.optimizeAnimation(this.clean));
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
  };

  // 매번 resize시 실행
  resize = () => {
    // 바텀 슬라이드 이미지 깨짐 때문에 넣은 로직
    // 이미지가 3개면 다시 개발해야된다.
    if (window.innerWidth > 1260) {
      this.pageArray.forEach((page, idx) => {
        idx % 2 === 0
          ? (page.firstElementChild.src = `./images/main/bottomSlide/bottomSlideIMG259px${2}.jpg`)
          : (page.firstElementChild.src = `./images/main/bottomSlide/bottomSlideIMG259px${1}.jpg`);
      });
    } else {
      this.pageArray.forEach((page, idx) => {
        idx % 2 === 0
          ? (page.firstElementChild.src = `./images/main/bottomSlide/bottomSlideIMG${2}.jpg`)
          : (page.firstElementChild.src = `./images/main/bottomSlide/bottomSlideIMG${1}.jpg`);
      });
    }
    this.pageIdx = 0;
    this.pageIdx++;
    this.pageWidth = this.sliderWrap.clientWidth;
    this.pageArray.forEach((page) => (page.style.transition = "0ms"));
    this.pageArray.forEach(
      (page) => (page.style.width = `${this.pageWidth}px`)
    );
    this.pageArray.forEach(
      (page) =>
        (page.style.transform = `translateX(-${
          this.pageWidth * this.pageIdx
        }px)`)
    );
    this.slider.style.width = `${
      this.pageArray.length * (this.pageWidth + 2)
    }px`;
    this.paginationRender();
  };

  // resize 후
  clean = (e) => {
    const { currentTarget } = e;
    if (currentTarget.__resizeTo) {
      clearTimeout(currentTarget.__resizeTo);
    }
    currentTarget.__resizeTo = setTimeout(() => {
      this.pageArray.forEach(
        (page) => (page.style.transition = this.transitionTime)
      );
    }, 200);
  };

  setLoop() {
    this.timer = setInterval(() => this.rightBtnEvent(), this.loopTime);
  }
}

const bottomInfiniteSlide = new InfiniteSlide(
  "bottom_slide_wrap",
  "bottom_slide",
  "btn_right",
  "btn_left"
);
