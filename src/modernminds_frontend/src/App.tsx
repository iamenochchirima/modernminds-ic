import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Dashboard from "./pages/Dashboard";
import ManageSubs from "./pages/ManageSubscriptions";
import ContactForm from "./pages/Contact";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Search from "./pages/Search";
import Subscribe from "./pages/Subscribe";
import Terms from "./pages/Terms";
import Userprofile from "./pages/Userprofile";
import Category from "./pages/Category";
import Unsubscibe from "./pages/Unsubscribe";
import EmailVerification from "./pages/EmailVerification";
import VerifyNewsletterEmail from "./pages/VerifyNewsletterEmail";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/manage-subscription" element={<ManageSubs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="article/:slug" element={<Article />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/search" element={<Search />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path="category/:slug" element={<Category />} />
        <Route path="unsubscribe/:token" element={<Unsubscibe/>} />
        <Route path="verify-email/:uuid/:token" element={<EmailVerification/>} />
        <Route path="verify-newsletter-email/:uuid/:token" element={<VerifyNewsletterEmail/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App