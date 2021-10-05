import { Header } from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Products } from "./components/Products";
import { NewProduct } from "./components/NewProduct";
import { EditProduct } from "./components/EditProduct";
import { NotFound } from "./components/NotFound";

import { Provider } from 'react-redux' 
import { store } from "./redux/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Switch>
            <Route exact path='/' component={Products} />
            <Route exact path='/productos/nuevo' component={NewProduct} />
            <Route exact path='/productos/editar/:id' component={EditProduct} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
