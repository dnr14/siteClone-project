const familySite = document.getElementById('familySite');
const familyBox = document.getElementById('familyBox');
const userWrap = document.getElementById('userWrap');
const userLinkList = document.getElementById('userLinkList');
const goToTops = document.querySelectorAll('.goToTop');
const switchBtns = document.querySelectorAll('.switch');
const gLinksContent = document.getElementById('gLinksContent');
const focusEv = () => familyBox.classList.toggle('active');
const mouseEv = () => userLinkList.classList.toggle('active');
const gLinksOpenEv = () => gLinksContent.classList.toggle('active');


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


familySite.addEventListener('focusin', focusEv);
familySite.addEventListener('focusout', focusEv);
userWrap.addEventListener('mouseenter', mouseEv);
userWrap.addEventListener('mouseleave', mouseEv);
goToTops.forEach(el => el.addEventListener('click', optimizeAnimation(scrollToTop)));
switchBtns.forEach(el => el.addEventListener('click', gLinksOpenEv));