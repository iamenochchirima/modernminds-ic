import LatestArticles from "../ui/components/LatestArticles";
import Layout from "../ui/components/Layout";
import SpecialArticles from "../ui/components/SpecialArticles";

export default function Home() {
  return (
   <Layout >
    <SpecialArticles/>
    <LatestArticles/>
   </Layout>
  );
}
