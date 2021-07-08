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

