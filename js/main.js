class Slider {
  constructor() {
    this.$as = Array.from([...document.querySelectorAll('.slider>a')]);
    this.$spanIcon = document.querySelector('span.icon');
    this.$aWidth = this.$as[0].offsetWidth;


    this.index = 0;
    this.innerWidth = window.innerWidth;

    this.fullWidth = this.$as.reduce((l, r) => l + r.offsetWidth, 0);

    this.$sliderBox = document.querySelector('.slider_bar .bar');
    this.$drag = document.querySelector('.slider_bar .bar .drag');
    this.$drag.style.width = `${(this.$sliderBox.offsetWidth / this.fullWidth) * this.$aWidth}px`;
    this._1퍼센드 = (this.fullWidth - this.$aWidth) / (this.$sliderBox.offsetWidth - this.$drag.offsetWidth);

    this.init();
  }


  init() {
    this.eventHanlder();
  }

  event = () => {
    this.$drag.style.width = `${(this.$sliderBox.offsetWidth / this.fullWidth) * this.$aWidth}px`;

    this.innerWidth = window.innerWidth;
    this.$as.forEach(a => {
      a.removeAttribute('style');
    });
    this.index = 0;
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
    this.$as.forEach(a => {
      a.removeAttribute('style');
      a.style.transform = `translateX(-${result}px)`;
    });
  }

  eventHanlder() {
    window.addEventListener('resize', this.event);
    this.$drag.addEventListener('mousedown', this.dragMouseDown);
    this.$sliderBox.addEventListener('click', this.sliderBarClick);
    this.$spanIcon.addEventListener('click', () => {

      if (this.innerWidth < 600) {
        if (this.$as[0].style.transform === `translateX(-${this.$as[0].offsetWidth * 4}px)`) return;
        const { offsetWidth } = this.$as[0];
        this.index += offsetWidth;
        this.$as.forEach(a => {
          a.style.transform = `translateX(-${this.index}px)`;
        });
      } else if (this.innerWidth < 900) {
        if (this.$as[0].style.transform === `translateX(-${this.$as[0].offsetWidth * 3}px)`) return;

        const { offsetWidth } = this.$as[0];

        this.$as[0].style.transform === `translateX(-${this.$as[0].offsetWidth * 2}px)` ?
          this.index += offsetWidth : this.index += offsetWidth * 2;

        this.$as.forEach(a => {
          a.style.transform = `translateX(-${this.index}px)`;
        });

      } else if (this.innerWidth >= 900) {
        if (this.$as[0].style.transform === `translateX(-${this.$as[0].offsetWidth * 2}px)`) return;

        const { offsetWidth } = this.$as[0];
        this.index += offsetWidth * 2;

        this.$as.forEach(a => {
          a.style.transform = `translateX(-${this.index}px)`;
        });
      }

    });
  }

  dragMouseDown = (e) => {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    const elementDrag = (e) => {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // if (this.$drag.offsetTop - pos2 >= 0 && this.$drag.offsetTop - pos2 <= (this.$sliderBox.offsetHeight - this.$drag.clientHeight)) {
      //   this.$drag.style.top = (this.$drag.offsetTop - pos2) + "px";
      // }
      if (this.$drag.offsetLeft - pos1 >= 0 && this.$drag.offsetLeft - pos1 <= (this.$sliderBox.offsetWidth - this.$drag.clientWidth)) {
        this.$drag.style.left = (this.$drag.offsetLeft - pos1) + "px";
      }
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
