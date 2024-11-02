import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import '../src/assets/style/main.css'
import { HomePage } from "./pages/HomePage.jsx";
import { AboutUs } from "./pages/AboutUs.jsx";
import { ToyIndex } from "./pages/ToyIndex.jsx";
import { ToyEdit } from "./pages/ToyEdit.jsx";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { AppFooter } from "./cmps/AppFooter.jsx";
import { ToyDetails } from "./pages/ToyDetails.jsx";
import { store } from "./store/store.js";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className="main">
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  );
}
