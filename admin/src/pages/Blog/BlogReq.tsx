import React from 'react';
import BlogForm from './BlogForm';
import { useCategories } from '../../hooks/category.hook';
import Loader_image from '../../common/Loader_image';
import { useBlog } from '../../hooks/blog.hook';
import { useLocation, useParams } from 'react-router-dom';

const BlogReq = () => {
  const location = useLocation().pathname.split('/')[2];

  const { data: categories, isPending: pending } = useCategories();
  const { id } = useParams();

  const { data: blog, isPending } = useBlog(id);
  if ((location === 'edit' && isPending) || pending) return <Loader_image />;
  return (
    <>
      {categories && (
        <>
          {location === 'edit' ? (
            <BlogForm categories={categories} blog={blog} />
          ) : (
            <BlogForm categories={categories} />
          )}
        </>
      )}
    </>
  );
};

export default BlogReq;
