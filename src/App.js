import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import appStore from './store/store';

import List from "./components/List";
import Item from "./components/Item";


function App() {
  return (
      <BrowserRouter>
          <Provider store={appStore}>
              <div id="container">

                <Routes>

                  <Route path='/' element={<List />} />
                  <Route path='/:id/details' element={<Item />} />

                </Routes>

              </div>
          </Provider>
      </BrowserRouter>
  );
}

export default App;
