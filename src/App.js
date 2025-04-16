import "./App.css";
import { Routes, Route } from "react-router-dom";
import Plansform from "./pages/Plansform";
import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import Adminform from "./pages/Adminform";
import Admindashbord from "./pages/Admindashbord";
import PageNotFound from "./pages/PageNotFound";
import Resetpassword from "./pages/Resetpassword";
import Signup from "./pages/Signup";
import Protectroute from "./pages/Protectroute";
import Adminroute from "./pages/Adminroute";
import Authprotect from "./pages/Authprotect";

function App() {
  return (
    <>
      <div className="  overflow-auto  mx-auto h-screen  relative ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/Home" element={<Hero />} />

          <Route element={<Authprotect />}>
            <Route path="/Login" element={<Adminform />} />
            <Route path="/SignUp" element={<Signup />} />
          </Route>
          <Route path="/reset-password" element={<Resetpassword />} />
          <Route path="*" element={<PageNotFound />} />

          <Route element={<Protectroute />}>
            <Route
              path="/Home/Goldform"
              element={
                <Plansform
                  planlist={["1gm", "2gms", "4gms", "8gms"]}
                  pageheading="Gold Plan"
                  btnclass="proceedtopaybtngold"
                />
              }
            />
          </Route>

          <Route element={<Protectroute />}>
            <Route
              path="/Home/Silverform"
              element={
                <Plansform
                  planlist={["1gm", "2gms", "5gms", "10gms"]}
                  pageheading="Silver Plan"
                  btnclass="proceedtopaybtnsilver"
                />
              }
            />
          </Route>
          <Route element={<Protectroute />}>
            <Route
              path="/Home/Chitform"
              element={
                <Plansform
                  planlist={["10,00000", "20,00000", "50,00000"]}
                  pageheading="Chit Plan"
                  btnclass="proceedtopaybtnchit"
                />
              }
            />
          </Route>

          <Route element={<Adminroute />}>
            <Route path="/Admindashboard" element={<Admindashbord />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
