const li = document.querySelectorAll('.slider>li');
const hide = document.querySelectorAll('.label.hide');
const list = document.querySelectorAll('.item');
const btnList1 = document.querySelectorAll('.menu .item');
const btnList2 = document.querySelectorAll('.slider-nuber li');
const move = new Move(true);

btnList1.forEach((el, index) => {
  el.addEventListener('click', move.click(index));
});
btnList2.forEach((el, index) => {
  el.addEventListener('click', move.click(index));
});


function Move(loop = false) {
  let _showIndex = 0;
  let _value = 0;
  this.loop = loop;

  const moving = () => {

    _value == -3300 ? _value = 0 : _value += -550;

    li.forEach((el) => {
      if (_value == 0) {
        el.style.transform = `translateX(${_value}px)`;
        el.style.transition = "0s";
      } else {
        el.removeAttribute('style');
        el.style.transform = `translateX(${_value}px)`;
      }
    });
  }

  const btn_iterator = (index) => {

    list.forEach((el, listIndex) => {
      const childes = el.children;
      Array.prototype.forEach.call(childes, (el, i) => {
        el.removeAttribute("style");
        if (listIndex == index) {
          switch (i) {
            case 0:
              el.style.display = "inline";
              break;
            case 1:
              el.style.width = "30px";
              break;
          }
        }
      });
    });

    btnList2.forEach((el, i) => {
      el.removeAttribute('style');
      if (i == index) {
        el.style.border = "1px solid #FFF";
        el.style.borderRadius = "50%";
      }
    });

  }

  const img_iterator = (index) => {
    hide.forEach((el) => {
      el.classList.add('hide');
    });

    hide[index].classList.remove('hide');
  }


  // if (this.loop != false) {}

  setInterval(() => {
    _showIndex == 6 ? _showIndex = 0 : _showIndex += 1;
    moving();
    img_iterator(_showIndex);
    btn_iterator(_showIndex);

  }, 4000);


  this.click = function (index) {
    return (e) => {

      img_iterator(index);
      btn_iterator(index);
      let value = index * -550;

      li.forEach((el) => {
        el.style.transform = `translateX(${value}px)`;
      });

      _value = value;
      _showIndex = index;
    }
  }
}

