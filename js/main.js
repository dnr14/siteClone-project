class Slider {
  constructor() {
    this.$as = Array.from([...document.querySelectorAll('.slider>a')]);
    this.$spanIcon = document.querySelector('span.icon');
    this.$sliderBox = document.querySelector('.slider_bar .bar');
    this.$drag = document.querySelector('.slider_bar .bar .drag');


    this.$aWidth = this.$as[0].offsetWidth;
    this.currentTransformX = 0;
    this.innerWidth = window.innerWidth;

    this.fullWidth = this.$as.reduce((l, r) => l + r.offsetWidth, 0);
    this.$drag.style.width = `${(this.$sliderBox.offsetWidth / this.fullWidth) * this.$aWidth}px`;

    this.init();
  }

  set_1퍼센트() {
    if (this.innerWidth < 600) {
      this._1퍼센드 = (this.fullWidth - this.$aWidth) / (this.$sliderBox.offsetWidth - this.$drag.offsetWidth);
    } else if (this.innerWidth < 900) {
      this._1퍼센드 = (this.fullWidth - (this.$aWidth * 2)) / (this.$sliderBox.offsetWidth - this.$drag.offsetWidth);
    } else if (this.innerWidth > 900) {
      this._1퍼센드 = (this.fullWidth - (this.$aWidth * 3)) / (this.$sliderBox.offsetWidth - this.$drag.offsetWidth);
    }
  }

  init() {
    this.eventHanlder();
    this.set_1퍼센트();
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

  sliderMove = () => {
    const $a = this.$as[0];

    if (this.innerWidth < 600) {
      const fullWidth = $a.offsetWidth * 4;
      if ($a.style.transform === `translateX(-${fullWidth}px)`) return;

      const { offsetWidth } = $a;
      this.currentTransformX += offsetWidth;

      if (this.currentTransformX > fullWidth) this.currentTransformX = fullWidth;

      // this.$as.forEach(a => a.style.transform = `translateX(-${this.currentTransformX}px)`);
      // this.$drag.style.left = `${Math.round(this.currentTransformX / this._1퍼센드)}px`;
    }
    else if (this.innerWidth < 900) {

      const fullWidth = $a.offsetWidth * 3;
      if ($a.style.transform === `translateX(-${fullWidth}px)`) return;

      const { offsetWidth } = $a;

      $a.style.transform === `translateX(-${offsetWidth * 2}px)`
        ? this.currentTransformX += offsetWidth
        : this.currentTransformX += offsetWidth * 2;

      if (this.currentTransformX > fullWidth) this.currentTransformX = fullWidth;

      // this.$as.forEach(a => a.style.transform = `translateX(-${this.currentTransformX}px)`);
      // this.$drag.style.left = `${Math.round(this.currentTransformX / this._1퍼센드)}px`;
    }
    else if (this.innerWidth >= 900) {
      const fullWidth = $a.offsetWidth * 2;
      if ($a.style.transform === `translateX(-${fullWidth}px)`) return;

      const { offsetWidth } = $a;
      this.currentTransformX += offsetWidth * 2;

      if (this.currentTransformX > fullWidth) this.currentTransformX = fullWidth;

    }
    this.$as.forEach(a => a.style.transform = `translateX(-${this.currentTransformX}px)`);
    this.$drag.style.left = `${Math.round(this.currentTransformX / this._1퍼센드)}px`;
  }

  eventHanlder() {
    window.addEventListener('resize', this.event);
    this.$drag.addEventListener('mousedown', this.dragMouseDown);
    this.$sliderBox.addEventListener('click', this.sliderBarClick);
    this.$spanIcon.addEventListener('click', this.sliderMove);
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


window.onload = () => {
  new Slider();
}
