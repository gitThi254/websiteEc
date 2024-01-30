import Hero from "../../components/Hero";
import Product from "../../components/Product";
import Category from "../../components/Category";
import Gallery from "../../components/Gallery";
import Blog from "../../components/Blog";

const Home = () => {
  return (
    <>
      <main>
        <Hero />
        <Gallery />
        <Product />
        <Blog />
        <Category />
      </main>
    </>
  );
};

export default Home;
