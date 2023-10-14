import LatestArticles from "../src/components/LatestArticles";
import Layout from "../src/components/Layout";
import SpecialArticles from "../src/components/SpecialArticles";

export default function Home() {
  return (
   <Layout >
    <SpecialArticles/>
    <LatestArticles/>
   </Layout>
  );
}
