class Slider {
  constructor(obj) {
    this.$as = Array.from([...document.querySelectorAll(obj.sliderliName)]);

    this.$spanIconRight = document.querySelector(obj.sliderRightClickName);
    this.$spanIconLeft = document.querySelector(obj.sliderLeftClickName);

    this.$sliderBox = document.querySelector(obj.sliderBarBoxName);
    this.$drag = document.querySelector(obj.sliderBarDragName);

    this._600downX = obj.x;
    this._900downY = obj.y;
    this._900upZ = obj.z;

    this._600down = obj._offsetWidth._600down;
    this._900down = obj._offsetWidth._900down;
    this._900up = obj._offsetWidth._900up;



    this.$aWidth = this.$as[0].offsetWidth;
    this.currentTransformX = 0;
    this.innerWidth = window.innerWidth;

    this.fullWidth = this.$as.reduce((l, r) => l + r.offsetWidth, 0);

    this.$drag.style.width = `${(this.$sliderBox.offsetWidth / this.fullWidth) * this.$aWidth}px`;

    this.init();
  }

  init() {
    this.eventHanlder();
    this.set_1퍼센트();
  }

  set_1퍼센트() {
    if (this.innerWidth < 600) {
      this._1퍼센드 = (this.fullWidth - this.$aWidth * this._600downX) / (this.$sliderBox.offsetWidth - this.$drag.offsetWidth);
    } else if (this.innerWidth < 900) {
      this._1퍼센드 = (this.fullWidth - (this.$aWidth * this._900downY)) / (this.$sliderBox.offsetWidth - this.$drag.offsetWidth);
    } else if (this.innerWidth > 900) {
      this._1퍼센드 = (this.fullWidth - (this.$aWidth * this._900upZ)) / (this.$sliderBox.offsetWidth - this.$drag.offsetWidth);
    }

  }

  eventHanlder() {
    window.addEventListener('resize', this.event);
    this.$drag.addEventListener('mousedown', this.dragMouseDown);
    this.$sliderBox.addEventListener('click', this.sliderBarClick);
    this.$spanIconRight.addEventListener('click', this.sliderMove);
    this.$spanIconLeft.addEventListener('click', this.sliderMove);
  }


  event = () => {

    this.$aWidth = this.$as[0].offsetWidth;
    this.currentTransformX = 0;
    this.innerWidth = window.innerWidth;
    this.fullWidth = this.$as.reduce((l, r) => l + r.offsetWidth, 0);
    this.$drag.style.width = `${(this.$sliderBox.offsetWidth / this.fullWidth) * this.$aWidth}px`;
    this.set_1퍼센트();

    this.$as.forEach(a => a.removeAttribute('style'));
    this.$drag.style.left = '0px';
  }


  sliderBarClick = (e) => {
    if (e.currentTarget !== e.target) return;
    if (e.clientX > this.$sliderBox.offsetWidth - this.$drag.offsetWidth) {
      this.$drag.style.left = `${this.$sliderBox.offsetWidth - this.$drag.offsetWidth}px`;
      this.sliderBarMove(this.$sliderBox.offsetWidth - this.$drag.offsetWidth)
    } else {
      this.$drag.style.left = `${e.clientX - 20}px`;
      this.sliderBarMove(this.$drag.offsetLeft);
    }
  }

  sliderBarMove(x) {
    const result = Math.round(this._1퍼센드 * x);
    this.currentTransformX = result;
    this.$as.forEach(a => {
      a.removeAttribute('style');
      a.style.transform = `translateX(-${result}px)`;
    });
  }

  sliderMove = (e) => {
    const target = e.currentTarget;

    const $a = this.$as[0];
    const { offsetWidth } = $a;
    const { direction } = target.dataset;

    // RIGHT
    if (direction === 'right') {
      let fullWidth = 0;

      if (this.innerWidth < 600) {
        fullWidth = $a.offsetWidth * this._600down.widthNum;
      } else if (this.innerWidth < 900) {
        fullWidth = $a.offsetWidth * this._900down.widthNum;
      } else if (this.innerWidth >= 900) {
        fullWidth = $a.offsetWidth * this._900up.widthNum;
      }

      if ($a.style.transform === `translateX(-${fullWidth}px)`) return;

      if (this.innerWidth < 600) {
        this.currentTransformX += offsetWidth * this._600down.offset;

      } else if (this.innerWidth < 900) {

        if (this._900down.offset === true) {
          $a.style.transform === `translateX(-${offsetWidth * 2}px)`
            ? this.currentTransformX += offsetWidth
            : this.currentTransformX += offsetWidth * 2;
        } else {
          this.currentTransformX += offsetWidth * this._900down.offset;
        }

      } else if (this.innerWidth >= 900) {
        this.currentTransformX += offsetWidth * this._900up.offset;
      }

      if (this.currentTransformX > fullWidth) this.currentTransformX = fullWidth;

    }

    // LEFT
    if (direction === "left") {

      if ($a.style.transform === `translateX(0px)` || $a.style.transform === '') return;

      if (this.innerWidth < 600) {
        this.currentTransformX += -offsetWidth * this._600down.offset;
      } else if (this.innerWidth < 900) {

        if (this._900down._swich === true) {
          $a.style.transform === `translateX(${-offsetWidth * 2}px)`
            ? this.currentTransformX += -offsetWidth * 2
            : this.currentTransformX += -offsetWidth;
        } else {
          this.currentTransformX += -offsetWidth * this._900down.offset;
        }

      } else if (this.innerWidth >= 900) {
        this.currentTransformX += -offsetWidth * this._900up.offset;
      }

      if (this.currentTransformX < 0) this.currentTransformX = 0;

    }

    this.$as.forEach(a => a.style.transform = `translateX(-${this.currentTransformX}px)`);
    this.$drag.style.left = `${Math.round(this.currentTransformX / this._1퍼센드)}px`;
  }


  dragMouseDown = (e) => {
    let pos1 = 0, pos3 = 0, pos4 = 0;

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos3 = e.clientX;
      pos4 = e.clientY;

      if (this.$drag.offsetLeft - pos1 >= 0 && this.$drag.offsetLeft - pos1 <= (this.$sliderBox.offsetWidth - this.$drag.clientWidth)) {
        this.$drag.style.left = (this.$drag.offsetLeft - pos1) + "px";
      }

      // this.set_1퍼센트();
      this.sliderBarMove(this.$drag.offsetLeft);
    }

    const closeDragElement = () => {
      document.onmouseup = null; // onmouseup을 초기화 시킴니다.
      document.onmousemove = null; // onmousemove을 초기화 시킴니다. 
    }

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
}

const slider = {
  sliderliName: '.slider>a',
  sliderRightClickName: 'span#right',
  sliderLeftClickName: 'span#left',
  sliderBarBoxName: '#slider_bar .bar',
  sliderBarDragName: '#slider_bar .bar .drag',
  x: 1,
  y: 2,
  z: 3,
  _offsetWidth: {
    _600down: { widthNum: 4, offset: 1 },
    _900down: { widthNum: 3, offset: 2, _swich: true },
    _900up: { widthNum: 2, offset: 2 },
  }
}

const reSlider = {
  sliderliName: '.re-slider-wrap .slider .item',
  sliderRightClickName: 'span#re-right',
  sliderLeftClickName: 'span#re-left',
  sliderBarBoxName: '#re-slider_bar .bar',
  sliderBarDragName: '#re-slider_bar .bar .drag',
  x: 2,
  y: 3,
  z: 4,
  _offsetWidth: {
    // offset 한번클릭시 아이템 몇개를 넘길지 정하는 변수
    // widthNum 클릭이 가능한 최대 너비
    _600down: { widthNum: 5, offset: 2 },
    _900down: { widthNum: 9, offset: 3 },
    _900up: { widthNum: 8, offset: 4 },
  }
}


const solutionSlider = {
  sliderliName: '.solution-slider-wrap .slider .item',
  sliderRightClickName: 'span#solution-right',
  sliderLeftClickName: 'span#solution-left',
  sliderBarBoxName: '#solution-slider_bar .bar',
  sliderBarDragName: '#solution-slider_bar .bar .drag',
  //드래그 1px당 transrateX값 계산
  // x : 600아래
  // y : 900아래
  // z : 900위
  x: 1.85,
  y: 2.4,
  z: 3.3,
  _offsetWidth: {
    // offset 한번클릭시 아이템 몇개를 넘길지 정하는 변수
    // widthNum 클릭이 가능한 최대 너비
    _600down: { widthNum: 7.15, offset: 1 },
    _900down: { widthNum: 6.6, offset: 3 },
    _900up: { widthNum: 5.7, offset: 3 },
  }
}

const ideaSlider = {
  sliderliName: '.idea-wrap .slider .item',
  sliderRightClickName: 'div#idea-arrow-right',
  sliderLeftClickName: 'div#idea-arrow-left',
  sliderBarBoxName: '#idea-slider_bar .bar',
  sliderBarDragName: '#idea-slider_bar .bar .drag',
  //드래그 1px당 transrateX값 계산
  // x : 600아래
  // y : 900아래
  // z : 900위
  x: 1.85,
  y: 2.4,
  z: 3.3,
  _offsetWidth: {
    // offset 한번클릭시 아이템 몇개를 넘길지 정하는 변수
    // widthNum 클릭이 가능한 최대 너비
    _600down: { widthNum: 7.15, offset: 1 },
    _900down: { widthNum: 6.6, offset: 3 },
    _900up: { widthNum: 5.7, offset: 3 },
  }
}



window.onload = () => {
  new Slider(slider);
  new Slider(reSlider);
  new Slider(solutionSlider);
  new Slider(ideaSlider);

  const scrollToTop = (() => {
    let timeOut;
    return () => {
      if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0) {
        window.scrollBy(0, -150);
        timeOut = setTimeout(scrollToTop, 10);
      } else {
        clearTimeout(timeOut);
      }
    }
  })();



  const optimizeAnimation = (callback) => {
    let ticking = false;
    return () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
      }
    };
  }

  const ulHideOff = e => {
    if (window.innerWidth < 900)
      e.currentTarget.nextElementSibling.classList.toggle('item__toggle_clicked');
    e.currentTarget.children[1].classList.toggle('item__rotate');
  }

  const scrollTopBtnColorChange = (() => {

    let bodyH_Half = document.body.clientHeight / 3;

    return () => {

      const $btn1 = document.querySelectorAll('.scrollTop')[1];
      const $btn2 = document.querySelectorAll('.scrollTop')[2];
      const { offsetTop } = document.getElementById('footer');
      const { top } = $btn1.getBoundingClientRect();
      const { pageYOffset } = window;
      const result = parseInt(pageYOffset + top);
      result > offsetTop
        ? $btn1.classList.add('on')
        : $btn1.classList.remove('on')

      if (bodyH_Half < pageYOffset) {
        $btn1.classList.add('fadeon');
        $btn2.classList.add('fadeon');
      } else {
        $btn1.classList.remove('fadeon');
        $btn2.classList.remove('fadeon');
      }
    }

  })();

  const asideClickEv = (() => {
    const $aside = document.getElementById('aside')
    const $back = document.getElementById('back')
    const $html = document.querySelector('html')
    return () => {
      $aside.classList.toggle('aside100');
      $back.classList.toggle('on');
      $html.classList.toggle('noscroll');
    }
  })();





  const $asideBtns = document.querySelectorAll('.aside_open');
  const $footerBtns = document.querySelectorAll('.footerBtn');
  const $scrollTopBtns = document.querySelectorAll('.scrollTop');
  const $back = document.getElementById('back');

  $back.addEventListener('click', asideClickEv);
  $footerBtns.forEach(el => el.addEventListener('click', ulHideOff));
  $scrollTopBtns.forEach(el => el.addEventListener('click', optimizeAnimation(scrollToTop)));
  $asideBtns.forEach(el => el.addEventListener('click', asideClickEv));
  window.addEventListener("scroll", optimizeAnimation(scrollTopBtnColorChange), { passive: true });
}