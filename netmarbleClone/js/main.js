

const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
const lis = [...navbar.children];
const depth2s = document.querySelectorAll('.depth2');

const navbarEvent = () => {
  header.classList.toggle('active');
  depth2s.forEach(depth2 => depth2.classList.toggle('active'));
}

lis.forEach(li => li.addEventListener('mouseenter', navbarEvent));
lis.forEach(li => li.addEventListener('mouseleave', navbarEvent));


// 유튜브 쪽 기능
const videoUl = document.querySelector('.video_list_inner');
const ifram = document.getElementById('video_iframe');
const videoLis = [...videoUl.children];
const urlArray = [
  "https://www.youtube-nocookie.com/embed/loVP-hSu3Ts?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=71",
  "https://www.youtube-nocookie.com/embed/DM800h8420c?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=72",
  "https://www.youtube-nocookie.com/embed/Ej6uIrSaTGY?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=75",
  "https://www.youtube-nocookie.com/embed/VH_2cd1bJY8?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=76",
  "https://www.youtube-nocookie.com/embed/Wj07hx6-Pzo?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=7",
  "https://www.youtube-nocookie.com/embed/X1i3HcNa27E?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=8",
  "https://www.youtube-nocookie.com/embed/oYlhlhZkllo?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=9",
  "https://www.youtube-nocookie.com/embed/LGyhlVX7r9w?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=10",
  "https://www.youtube-nocookie.com/embed/LGyhlVX7r9w?enablejsapi=1&origin=https%3A%2F%2Fch.netmarble.com&widgetid=10"
]



const focusEvent = (e) => {
  const { currentTarget } = e;
  videoLis.forEach(li => {
    if (li.classList.contains('selected'))
      li.removeAttribute('class');
  });
  ifram.src = urlArray[currentTarget.dataset.idx];
  currentTarget.classList.add('selected');
}
videoLis.forEach((li, idx) => li.dataset.idx = idx);
videoLis.forEach(li => li.addEventListener('click', focusEvent));
