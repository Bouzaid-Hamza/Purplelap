export const bssParams = {
    speed: 1000,
    spaceBetween: 110,
    slidesPerView: 1,
    navigation: true,
    pagination: {
        clickable: true
    },
    autoplay: {
        delay: 2000,
        // pauseOnMouseEnter: true,
        disableOnInteraction: false
    },
    breakpoints: {
        1530: {
            slidesPerView: 4,
            spaceBetween: 110
        },
        1340: {
            slidesPerView: 4,
            spaceBetween: 50
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 65
        },
        720: {
            slidesPerView: 2,
            spaceBetween: 65
        }
    }
};

export const brsParams = {
    speed: 1000,
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    pagination: {
        clickable: true
    },
    autoplay: {
        delay: 2000,
        // pauseOnMouseEnter: true,
        disableOnInteraction: false
    },
    breakpoints: {
        1100: {
            slidesPerView: 3
        },
        680: {
            slidesPerView: 2
        }
    }
};
