import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home } from './pages/Home';
import About from './pages/About'
import PrivateRoute from './utils/PrivateRoute';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
              
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
                      {/* <Route path="/" element={<Index />} />
                      <Route path="/:slug/" element={<Detail />} />
                      <Route path="/category/:slug/" element={<Category />} />
                      <Route path="/search/" element={<Search />} />

                     <Route path="/register/" element={<Register />} />
                      <Route path="/login/" element={<Login />} />
                      <Route path="/logout/" element={<Logout />} />
                      <Route path="/forgot-password/" element={<ForgotPassword />} />
                      <Route path="/create-password/" element={<CreatePassword />} />

                      <Route path="/dashboard/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                      <Route path="/posts/" element={<PrivateRoute><Posts /></PrivateRoute>} />
                      <Route path="/add-post/" element={<AddPost />} />
                      <Route path="/edit-post/:id/" element={<EditPost />} />
                      <Route path="/comments/" element={<Comments />} />
                      <Route path="/notifications/" element={<Notifications />} />
                      <Route path="/profile/" element={<Profile />} />

                      <Route path="/about/" element={<About />} />
                      <Route path="/contact/" element={<Contact />} /> */}
                  </Routes>
             
      </BrowserRouter>
    </div>
  );
}

export default App;
