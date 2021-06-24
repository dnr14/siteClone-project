class Slider {
  constructor(conatinerId, slicerId, rightBtnId, leftBtnId, isloop, _time) {
    this.$sliderWrap = document.getElementById(conatinerId);
    this.$slider = document.getElementById(slicerId);
    this.$items = document.querySelectorAll(`#${slicerId}>.item`);

    this.$rightBtn = document.getElementById(rightBtnId);
    this.$leftBtn = document.getElementById(leftBtnId);

    this.$bar = document.querySelector('.sliderBar>.bar');
    this.$play = document.getElementById('play');
    this.$pause = document.getElementById('pause');

    this.item_leng = this.$items.length;
    this.loop = isloop;
    this.time = _time;

    this.count = 1;
    this.transformX = 0;
    //1. 컨테이너 너비 가져오기
    //2. slider-wrap 총 너비 계산해서 넣어주기 컨테이너 너비 * 자식 개수
    //3. 자식 너비 컨테이너 너비로 넣기
    this.init();
  }
  init() {
    try {
      this.drawBar();
      this.resize();
      this.evnethandler();
      this.setLoop();
    } catch (error) {
      console.error(error)
    }

  }

  optimizeAnimation = (callback) => {
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


  evnethandler() {
    window.addEventListener('resize', this.optimizeAnimation(this.resize));
    this.$rightBtn.addEventListener('click', this.rightMove);
    this.$leftBtn.addEventListener('click', this.leftMove);
    this.$lis.forEach(el => el.addEventListener('click', this.liClickEvent));
    this.$play.addEventListener('click', this.loopClick);
    this.$pause.addEventListener('click', this.loopClick);
  }

  loopClick = (e) => {
    let target = e.currentTarget;
    let [sibling] = this.siblings(target);
    target.style.display = `none`;
    sibling.style.display = `block`;
    target.id === 'play'
      ? this.setLoop()
      : clearInterval(this.timer);
  }

  siblings = (t) => {
    return [...t.parentElement.children].filter(e => e != t);
  }

  drawBar() {
    for (let i = 0; i < this.item_leng; ++i) {
      let li = document.createElement('li');
      li.classList.add('barBtn');
      li.dataset.index = i;
      this.$bar.appendChild(li);
    }

    this.$lis = document.querySelectorAll('.barBtn');
    this.libackground();
  }


  resize = () => {
    this.count = 1;
    this.transformX = 0;
    const sliderWrapWidth = this.$sliderWrap.clientWidth;
    this.$slider.style.width = `${sliderWrapWidth * (this.item_leng + 5)}px`;
    this.$slider.style.transform = `translateX(${this.transformX}px)`;
    this.$items.forEach(el => {
      el.style.width = `${sliderWrapWidth}px`;
    });
    this.libackground();
  }

  leftMove = () => {
    if (this.leftValidation()) {
      this.transformX += this.$sliderWrap.clientWidth;
      this.$slider.style.transform = `translateX(${this.transformX}px)`;
      this.count--;
      this.libackground();
    }
  }

  rightMove = () => {
    if (this.rightValidation()) {
      this.transformX += -this.$sliderWrap.clientWidth;
      this.$slider.style.transform = `translateX(${this.transformX}px)`;
      this.count++;
      this.libackground();
    }
  }

  rightValidation() {
    if (this.count !== this.item_leng) {
      return true;
    }
    return false;
  }


  leftValidation() {
    if (this.count !== 1) {
      return true;
    }
    return false;
  }

  setLoop() {
    if (this.loop) {
      if (this.time === undefined) {
        throw new Error('loop를 쓰고 싶으면 time을 초기화해주세요.');
      }
      this.timer = setInterval(() => {
        if (this.rightValidation()) {
          this.count++;
          this.transformX += -this.$sliderWrap.clientWidth;
          this.$slider.style.transform = `translateX(${this.transformX}px)`;
        } else {
          this.resize();
        }
        this.libackground();
      }, this.time);
    }
  }

  libackground() {
    this.$lis.forEach(el => {
      el.removeAttribute('style');
      if (el.dataset.index == this.count - 1) {
        el.style.backgroundColor = `#5f5f5f`;
      }
    });
  }

  liClickEvent = (e) => {
    let li = e.currentTarget;
    let index = parseInt(li.dataset.index);
    index === 0
      ? this.transformX = 0
      : this.transformX = -(index * this.$sliderWrap.clientWidth);
    this.count = index + 1;
    this.$slider.style.transform = `translateX(${this.transformX}px)`;
    this.libackground();
  }


}

window.onload = () => {
  new Slider("slider-wrap", 'slider', 'rightBtn', 'leftBtn', false, 3000);
}