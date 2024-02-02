import { useCategories, useCategory } from '../../hooks/category.hook';
import { useParams } from 'react-router-dom';
import Loader from '../../common/Loader';
import ModelGroupCategory from '../../components/Model/ModelGroupCategory';

const CategoriesReq = ({ open, setOpen }: { open: any; setOpen: any }) => {
  const { id } = useParams();
  const { data: category, isPending } = useCategory(id);
  const { data: categories, isPending: pending } = useCategories();
  if (isPending || pending) return <Loader />;

  return (
    <>
      {category && categories && (
        <ModelGroupCategory
          title="From tạo mục sản phẩm"
          description="Form mục sản phẩm"
          button="Cập nhật sản phẩm"
          data={category}
          open={open}
          setOpen={setOpen}
          category={categories}
        />
      )}
    </>
  );
};

export default CategoriesReq;
