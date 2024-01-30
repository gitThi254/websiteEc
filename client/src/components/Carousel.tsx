import { useBlogs } from "../hooks/blog.hook";

const CarouselHome = () => {
  const { data: blogs } = useBlogs();
  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
    { width: 1500, itemsToShow: 4 },
  ];
  return (
    <>
      <div>
        hello
        {/* <Carousel breakPoints={breakPoints}>
          {blogs?.map((item: any) => (
            <Link
              to={`/blog/${item._id}`}
              key={item._id}
              className="w-full h-[200px] bg-black text-white font-[30px] mx-[20px] flex items-end justify-center"
            >
              <img src={item.images[0].url} />
            </Link>
          ))}
        </Carousel> */}
      </div>
    </>
  );
};

export default CarouselHome;
