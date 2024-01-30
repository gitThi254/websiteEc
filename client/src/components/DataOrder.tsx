import React from "react";

const DataOrder = ({ item }: { item: any }) => {
  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      key={item.id}
    >
      <th className="w-[100px] border m-4">
        <img src={item.product_image[0].url} alt={item.product_name} />
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item?.product_name}
      </th>
      <td className="px-6 py-4">
        <span
          className={`inline-block w-16 h-8 border border-g`}
          style={{ backgroundColor: `${item.value[1]}` }}
        ></span>
      </td>
      <td className="px-6 py-4">{item.value[0]}</td>
      <td className="px-6 py-4">{item.qty}</td>

      <td className="px-6 py-4">{item?.category_name}</td>
      <td className="px-6 py-4">
        ${(Number(item.qty) * Number(item.price)).toFixed(2)}
      </td>
      <td className="px-6 py-4">{item.order} </td>
      <td className="px-6 py-4">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Buy again
        </a>
      </td>
    </tr>
  );
};

export default DataOrder;
