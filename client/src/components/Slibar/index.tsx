import React from "react";
const categories = [
  { id: 1, title: "Đầm", index: true },
  { id: 2, title: "Đầm suông" },
  { id: 3, title: "Đầm dáng A" },
  { id: 4, title: "Đầm ôm" },
  { id: 5, title: "Áo sơ mi", index: true },
  { id: 6, title: "Dài tay" },
  { id: 7, title: "Ngắn tay" },
  { id: 8, title: "Tay lỡ" },
  { id: 9, title: "Áo kiểu" },
  { id: 10, title: "Quần", index: true },
  { id: 11, title: "Quần short" },
  { id: 12, title: "Quần lửng" },
  { id: 13, title: "Quần dài" },
  { id: 14, title: "Chân váy", index: true },
  { id: 15, title: "Chân váy xếp li" },
  { id: 16, title: "Chân váy bút chì" },
  { id: 17, title: "Chân váy chữ A" },
  { id: 17, title: "Set bộ", index: true },
  { id: 17, title: "Jumpsuit", index: true },
];

const Slibar = () => {
  return (
    <section className="flex-1 px-5">
      <div>
        <p className="w-full text-md text-start font-semibold text-gray-800">
          Danh mục Tất cả sản phẩm
        </p>
      </div>
      <div className="flex flex-col gap-x-4">
        {categories.map((item) => (
          <p
            key={item.id}
            className={`${
              item?.index ? "font-bold" : "font-normal hover:underline"
            } cursor-pointer`}
          >
            {item.title}
          </p>
        ))}
      </div>
    </section>
  );
};

export default Slibar;
