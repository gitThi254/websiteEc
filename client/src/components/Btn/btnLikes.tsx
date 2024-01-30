import { useLikes } from "../../hooks/blog.hook";

const BtnLikes = ({ id, likes }: { id: string; likes: any }) => {
  const { mutate: likeMutation } = useLikes();

  return <button onClick={() => likeMutation(id)}>likes {likes}</button>;
};

export default BtnLikes;
