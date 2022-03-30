import './App.css';
import FileUploadPage from './Uploadfile.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";


function App() {
  return (<>
<div className='App-header'>
</div>
<div className='App'>
{ <BrowserRouter>
<Routes>
  <Route path='/' element={<Layout/>}/>
  <Route path='/softmagic/home' element={<Home/>}/>
  <Route path='/softmagic/contact' element = {<Contact/>}/>
  <Route path='/softmagic/upload' element = {<FileUploadPage/>}/>
  <Route path='*' element = {<NoPage/>}/>
</Routes>
</BrowserRouter>}
</div></>
  );
}

export default App;
