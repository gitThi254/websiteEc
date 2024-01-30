import { useDisLikes } from "../../hooks/blog.hook";

const BtnDislike = ({ id, dislikes }: { id: string; dislikes: number }) => {
  const { mutate: dislikeMutation } = useDisLikes();

  return (
    <button onClick={() => dislikeMutation(id)}>dislikes {dislikes}</button>
  );
};

export default BtnDislike;
