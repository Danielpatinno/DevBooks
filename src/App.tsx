/* eslint-disable prettier/prettier */

// components
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/global'

// pages
import { BookDetail } from './pages/BookDetail';
import { Search } from './pages/Search';
import { Books } from './pages/Books';

function App() {

  return (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path='/books/:bookId' element={<BookDetail/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App;
