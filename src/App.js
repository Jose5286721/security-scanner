import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './componentes/Home';
import Inicio from './componentes/Inicio'
import Reportes from './componentes/Reportes';
import Usuarios from './componentes/Usuarios';
import Entradas from './componentes/Entradas';
class App extends React.Component {
  render(){
    return(
    <BrowserRouter>
      <>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Inicio} />
        <Route path="/home/Reportes" component={Reportes} />
        <Route path='/home/Usuarios' component={Usuarios} />
        <Route path='/home/index' component={Entradas} />
      </>
    </BrowserRouter>
    );
  }
}

export default App;
