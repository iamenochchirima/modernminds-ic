import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./pages/Page404";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
