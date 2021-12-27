const $divs = document.querySelectorAll('.information767pxDownBlock > div');
const $spnas = document.querySelectorAll('.information767pxDownBlock > div > .title > .cross');

(() => {
  const array = [176, 240, 145, 176, 207, 370, 50];
  let beforeOpen = null;
  const ClickEv = (_index) => (e) => {
    const target = e.currentTarget;
    const $ul = target.children[1];
    const $span = $spnas[_index];
    $span.classList.toggle('cross');
    $span.classList.toggle('cross_clicked');

    requestAnimationFrame(() => {
      // 새로운 클릭은 clicked가 없다.
      // false면 새로운 ul을 클릭
      // true면 자기 자신 클릭
      let isFalse = $ul.classList.contains("clicked");

      if (isFalse) {
        $ul.classList.remove('clicked');
        $ul.removeAttribute('style');
        beforeOpen = null;

      } else {
        $ul.classList.add('clicked');
        $ul.style.height = `${array[_index]}px`;

        if (beforeOpen !== target && beforeOpen !== null) {
          const $ul = beforeOpen.children[1];
          // 클릭 시 이전 + 원래모양으로 롤백
          const $title = beforeOpen.children[0];
          $title.children[1].classList.remove('cross_clicked');
          $title.children[1].classList.add('cross');
          $ul.classList.toggle('clicked');
          $ul.removeAttribute('style');
        }
        // 첫 클릭 무조건 beforeOpen에 할당  
        beforeOpen = target;
      }
    });
  }

  $divs.forEach((div, index) => {
    div.addEventListener('click', ClickEv(index));
  });
})();

