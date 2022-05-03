import CoinConverter from "./coinconverter/CoinConverter";
import Movie from "./movieList/Movie";
import Todo from "./todolist/Todo";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './routes/Home';
import Detail from "./routes/Detail";

function App() {
  return (
      <>
      {/* <Todo /> */}
      {/* <CoinConverter /> */}
      {/* <Movie /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/movie/:id' element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
      </>

  );
}

export default App;
