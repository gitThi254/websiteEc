import React from 'react';

const Carousel = () => {
  return (
    <>
      <div className="p-4 sm:p-6 xl:p-10">
        <div className="swiper carouselThree swiper-initialized swiper-horizontal swiper-backface-hidden">
          <div
            className="swiper-wrapper"
            style={{
              transitionDuration: '0ms',
              transform: 'translate3d(-1610px, 0px, 0px)',
            }}
          >
            <div
              className="swiper-slide swiper-slide-next"
              data-swiper-slide-index="2"
              style={{ width: '805px' }}
            >
              <img src="src/images/carousel/carousel-02.jpg" alt="carousel" />
            </div>
            <div
              className="swiper-slide swiper-slide-prev"
              data-swiper-slide-index="0"
              style={{ width: '805px' }}
            />
            <img src="src/images/carousel/carousel-03.jpg" alt="carousel" />
          </div>
          <div
            className="swiper-slide swiper-slide-active"
            data-swiper-slide-index="1"
            style={{ width: '805px' }}
          />
          <img src="src/images/carousel/carousel-01.jpg" alt="carousel" />
        </div>
      </div>
      <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
        <span className="swiper-pagination-bullet"></span>
        <span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
        <span className="swiper-pagination-bullet"></span>
      </div>
      <div className="swiper-button-next">
        <svg
          className="fill-current"
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.75938 19.4875C1.53438 19.4875 1.34687 19.4125 1.15937 19.2625C0.821875 18.925 0.821875 18.4 1.15937 18.0625L9.03437 9.99998L1.15937 1.97498C0.821875 1.63748 0.821875 1.11248 1.15937 0.774976C1.49687 0.437476 2.02187 0.437476 2.35937 0.774976L10.8344 9.39997C11.1719 9.73748 11.1719 10.2625 10.8344 10.6L2.35937 19.225C2.20937 19.375 1.98438 19.4875 1.75938 19.4875Z"
            fill=""
          ></path>
        </svg>
      </div>
      <div className="swiper-button-prev">
        <svg
          className="fill-current"
          width="12"
          height="20"
          viewBox="0 0 12 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.2344 19.4875C10.0094 19.4875 9.78438 19.4125 9.63437 19.225L1.15937 10.6C0.821875 10.2625 0.821875 9.73748 1.15937 9.39997L9.63437 0.774976C9.97188 0.437476 10.4969 0.437476 10.8344 0.774976C11.1719 1.11248 11.1719 1.63748 10.8344 1.97498L2.95937 9.99998L10.8719 18.025C11.2094 18.3625 11.2094 18.8875 10.8719 19.225C10.6469 19.375 10.4594 19.4875 10.2344 19.4875Z"
            fill=""
          ></path>
        </svg>
      </div>
    </>
  );
};

export default Carousel;
