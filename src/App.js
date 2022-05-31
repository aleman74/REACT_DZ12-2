import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import appStore from './store/store';

import List from "./components/List";
import Item from "./components/Item";
import List2 from "./components/List2";
import Item2 from "./components/Item2";


function App() {
  return (
      <BrowserRouter>
          <Provider store={appStore}>
              <div id="container">

                <Routes>

                  <Route path='/' element={<List2 />} />
                  <Route path='/:id/details' element={<Item2 />} />

                </Routes>

              </div>
          </Provider>
      </BrowserRouter>
  );
}

export default App;
