class Slide {
    constructor(img, btn, imgActiveName, btnActivName) {
        this.intervalSw = false;
        this.img = img;
        this.btn = btn;
        this.imgActiveName = imgActiveName;
        this.btnActivName = btnActivName;
        this.items_index = 0;
        this.$slideBtns = document.querySelectorAll(`.${btn}`);
        this.$items = document.querySelectorAll(`.${img}`);
        this.$next = document.querySelector(`.next`);
        this.$pre = document.querySelector(`.pre`);

        this.$next.addEventListener('click', () => {
            this.items_index++;
            this.items_index === 3 ? this.items_index = 0 : '';
            this.imgChange(this.items_index);
            this.colorChange(this.items_index);
        });
        this.$pre.addEventListener('click', () => {
            this.items_index--;
            this.items_index < 0 ? this.items_index = 2 : '';
            console.log(this.items_index);
            this.imgChange(this.items_index);
            this.colorChange(this.items_index);
        });

        this.$slideBtns.forEach((element, btn_index) => {
            element.addEventListener('click', ((i) => (e) => {
                this.imgChange(i);
                this.colorChange(i);
                this.items_index = i;
            }
            )(btn_index));
        })
    }

    setUp() {
        // this.$next.addEventListener('click', () => {
        //     this.items_index++;
        //     this.items_index === 3 ? this.items_index = 0 : '';
        //     this.imgChange(this.items_index);
        //     this.colorChange(this.items_index);
        // });
        // this.$pre.addEventListener('click', () => {
        //     this.items_index--;
        //     this.items_index < 0 ? this.items_index = 2 : '';
        //     console.log(this.items_index);
        //     this.imgChange(this.items_index);
        //     this.colorChange(this.items_index);
        // });

        // this.$slideBtns.forEach((element, btn_index) => {
        //     element.addEventListener('click', ((i) => (e) => {
        //         this.imgChange(i);
        //         this.colorChange(i);
        //         this.items_index = i;
        //     }
        //     )(btn_index));
        // })
    }

    imgChange(index) {
        this.initialize(this.$items, this.img);
        this.$items[index].classList.add(this.imgActiveName);
    }

    colorChange(index) {
        this.initialize(this.$slideBtns, this.btn);
        this.$slideBtns[index].classList.add(this.btnActivName);
    }
    initialize(el, className) {
        el.forEach(el => el.className = `${className}`);
    }
    interval(time) {
        time === false ? 2500 : time;
        this.intervalSw = setInterval(() => {
            this.items_index++;
            if (this.items_index == this.$items.length) {
                this.items_index = 0;
            }
            this.imgChange(this.items_index);
            this.colorChange(this.items_index);
        }, time);
    }
    intervalStop() {
        clearInterval(this.intervalSw);
    }

}

const slide = new Slide("item", "slide_btn", "opacity_active", "active");
slide.interval(2500);