import React from "react";

const Gallery = () => {
  return (
    <section className="text-gray-600 body-font mx-auto">
      <div className="px-5 py-4 mx-auto flex flex-wrap">
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img2.jpg?v=1053"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://file.hstatic.net/200000182297/file/sacc_3ac903271d5a4ea0b08e55159bbabfd0.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://theme.hstatic.net/200000182297/1000887316/14/home_new_banner_1.jpg?v=1053"
              />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img
                alt="gallery"
                className="w-full h-full object-cover object-center block"
                src="https://theme.hstatic.net/200000182297/1000887316/14/home_new_banner_2.jpg?v=1053"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://file.hstatic.net/200000182297/file/1920x500_1419eff661374b32aa624729627c58ad.jpg"
              />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img
                alt="gallery"
                className="w-full object-cover h-full object-center block"
                src="https://file.hstatic.net/200000182297/file/vac_fd6422cd073b44208df1c5e9432f4043.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
