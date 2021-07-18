// 날씨 정보 회전 슬라이드
(() => {
  const weatherBox = document.getElementById('weather_box');
  let [firstChliden, secondChliden] = weatherBox.children;

  setInterval(() => {
    firstChliden.style.transform = `translateY(-${weatherBox.clientHeight}px)`;
    setTimeout(() => {
      weatherBox.removeChild(firstChliden);
      firstChliden.removeAttribute('style');
      secondChliden.style.transform = `translateY(${weatherBox.clientHeight}px)`;
      weatherBox.appendChild(secondChliden);

      setTimeout(() => {
        secondChliden.style.transform = `translateY(${0}px)`;
        const temp = firstChliden;
        firstChliden = secondChliden;
        secondChliden = temp;
      }, 50);

    }, 500);

  }, 3000);

})();


// 뉴스 슬라이드
(() => {
  const newssviewSlider = document.getElementById('newssview_slider');
  const newssviewSliderWrap = document.getElementById('newssview_slider_wrap');

  const btnR = document.getElementById('newsRightBtn');
  const btnL = document.getElementById('newsLeftBtn');

  let currenttranslateX = 0;

  const newsRightBtnEvent = () => {
    if (currenttranslateX > -1500) {
      currenttranslateX += -750;
      [...newssviewSlider.children].forEach(item => item.style.transform = `translateX(${currenttranslateX}px)`);
    }

    if (currenttranslateX !== 0) {
      btnL.style.display = "flex";
    }
    if (currenttranslateX === -1500) {
      btnR.style.display = "none";
    }

  }
  const newsLeftBtnEvent = () => {
    if (currenttranslateX < 0) {
      currenttranslateX += 750;
      [...newssviewSlider.children].forEach(item => item.style.transform = `translateX(${currenttranslateX}px)`);
    }

    if (currenttranslateX === 0) {
      btnL.style.display = "none";
    }
    if (currenttranslateX !== -1500) {
      btnR.style.display = "flex";
    }
  }

  btnR.addEventListener('click', newsRightBtnEvent);
  btnL.addEventListener('click', newsLeftBtnEvent);
  newssviewSlider.style.width = `${newssviewSlider.children.length * newssviewSliderWrap.clientWidth}px`;

})();

// 이슈 슬라이드
(() => {
  const issueRolling = document.getElementById('issue_rolling');
  let chlidenArray = [...issueRolling.children];
  issueRolling.innerHTML = "";

  setInterval(() => {
    let firstChliden = chlidenArray.shift();
    issueRolling.appendChild(firstChliden);
    firstChliden.style.transform = `translateY(${25}px)`;

    setTimeout(() => {
      firstChliden.style.transform = `translateY(${0}px)`;

      setTimeout(() => {
        firstChliden.style.transform = `translateY(${-25}px)`;
        setTimeout(() => {
          firstChliden.removeAttribute('style');
          issueRolling.removeChild(firstChliden);
          chlidenArray.push(firstChliden);
        }, 500);
      }, 2400);
    }, 50);
  }, 3000);

})();


class GoodsInfiniteSlide {

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
              this.pageArray.forEach(page => page.style.transition = "0.5s");
              this.buttonStop = true;
            }, 100);
          }, 500);

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
              this.pageArray.forEach(page => page.style.transition = "0.5s");
              this.buttonStop = true;
            }, 100);
          }, 500);

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

// 탑 굿즈 슬라이드
new GoodsInfiniteSlide("group_event_slider_wrap", "group_event_slider", "shop_control_rightBotton", "shop_control_leftBotton", "shop_control_numbox");
// 미드 굿즈 슬라이드
new GoodsInfiniteSlide("list_goods_wrap", "group_goods_slider", "goods_btnR", "goods_btnL", "goods_num_box");
// 바텀 굿즈 슬라이드
new GoodsInfiniteSlide("bottom_goods_wrap", "bottom_goods_slider", "bottom_goods_btnR", "bottom_goods_btnL", "bottom_goods_num_box");


// 카테고리 슬라이드
(() => {
  const sliderWrap = document.getElementById('slider_wrap');
  const mainCategorySlider = document.getElementById('main_category_slider');
  const mainCategoryRightBtn = document.getElementById('main_category_right_Btn');
  const mainCategoryLeftBtn = document.getElementById('main_category_left_Btn');


  const mainCategorySliders = [...mainCategorySlider.children];
  const itemLeng = mainCategorySliders[0].children.length;
  const mainCategoryLeng = mainCategorySliders.length;
  const categoryWidth = sliderWrap.clientWidth;
  const lastmainCategoryLeng = mainCategorySliders[mainCategorySliders.length - 1].children.length;

  mainCategorySlider.style.width = `${mainCategorySliders.length * categoryWidth}px`;

  let parentsIdx = 0;
  let childIdx = 0;

  let beforeDoc = mainCategorySliders[parentsIdx].children[childIdx];
  beforeDoc.style.backgroundColor = getRandomColor();
  mainCategoryLeftBtn.style.display = `none`;

  mainCategoryRightBtn.addEventListener('click', () => {

    if (parentsIdx === (mainCategoryLeng - 1) && childIdx === (itemLeng - 1)) {
      childIdx = (itemLeng - 1);
      return;
    }

    if (parentsIdx === (mainCategoryLeng - 1) && childIdx === (lastmainCategoryLeng - 1)) {
      childIdx = (lastmainCategoryLeng - 1);
      return;
    }

    if (childIdx === itemLeng - 1) {
      parentsIdx++;
      childIdx = -1;
      mainCategorySliders.forEach(mainCategorySlider => {
        mainCategorySlider.style.transform = `translateX(-${750 * parentsIdx}px)`;
      });
    }

    if (beforeDoc !== null) {
      beforeDoc.style.backgroundColor = 'white';
      beforeDoc.firstElementChild.style.color = '#000'
    }
    childIdx++;
    const currentDoc = mainCategorySliders[parentsIdx].children[childIdx];
    currentDoc.style.backgroundColor = getRandomColor();
    currentDoc.firstElementChild.style.color = '#fff'
    beforeDoc = currentDoc;

    if (childIdx !== 0)
      mainCategoryLeftBtn.style.display = `flex`;

    if (parentsIdx === (mainCategoryLeng - 1) && childIdx === (lastmainCategoryLeng - 1))
      mainCategoryRightBtn.style.display = `none`;

  });

  mainCategoryLeftBtn.addEventListener('click', function () {

    if (parentsIdx === 0 && childIdx === 0)
      return;

    if (childIdx === 0) {
      parentsIdx--;
      childIdx = itemLeng;
      mainCategorySliders.forEach(mainCategorySlider => {
        mainCategorySlider.style.transform = `translateX(-${750 * parentsIdx}px)`;
      });
    }

    if (beforeDoc !== null) {
      beforeDoc.style.backgroundColor = 'white';
      beforeDoc.firstElementChild.style.color = '#000'
    }
    childIdx--;
    const currentDoc = mainCategorySliders[parentsIdx].children[childIdx];
    currentDoc.style.backgroundColor = getRandomColor();
    currentDoc.firstElementChild.style.color = '#fff'
    beforeDoc = currentDoc;

    if (parentsIdx === 0 && childIdx === 0)
      this.style.display = `none`;

    if (parentsIdx === (mainCategoryLeng - 1) && childIdx !== (lastmainCategoryLeng - 1))
      mainCategoryRightBtn.style.display = `flex`;

  });

  function getRandomColor(_isAlpha) {
    let r = getRand(100, 255),
      g = getRand(100, 255),
      b = getRand(100, 255),
      a = getRand(0, 10) / 10;

    let rgb = _isAlpha ? 'rgba' : 'rgb';
    rgb += '(' + r + ',' + g + ',' + b;
    rgb += _isAlpha ? ',' + a + ')' : ')';

    return rgb;

    function getRand(min, max) {
      if (min >= max) return false;
      return ~~(Math.random() * (max - min + 1)) + min;
    };
  };

})();


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

let timer = null;
const upScroll = document.getElementById('up-scroll');

const imgBounceEvent = (e) => {
  const { currentTarget } = e;
  currentTarget.style.backgroundColor = `#19ce60`;
  currentTarget.firstElementChild.style.transition = `${0.5}s`;
  timer = setInterval(() => {
    currentTarget.firstElementChild.style.transform = `translateY(-${10}px)`;
    setTimeout(() => {
      currentTarget.firstElementChild.style.transform = `translateY(${0}px)`;
    }, 100);
  }, 600);
}

upScroll.addEventListener('mouseover', imgBounceEvent);
upScroll.addEventListener('click', optimizeAnimation(scrollToTop));
upScroll.addEventListener('mouseout', (e) => {
  const { currentTarget } = e;
  currentTarget.style.backgroundColor = `#FFF`;
  clearInterval(timer);
});