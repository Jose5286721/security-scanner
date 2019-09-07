import React from 'react';
//import Introducir from './Introducir'
class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {adding:false,
        session:false,
        nombre : ""
        }
        this.onHandleKey = this.onHandleKey.bind(this);
        this.texto = React.createRef();
        this.textoNombre = this.textoNombre.bind(this);

    }
    textoNombre(e){
        this.setState(
            {
                nombre : e.target.value
            }
        );
        console.log(this.state.nombre);
    }
    onHandleKey(){
        this.setState({
            adding:!this.state.adding
        })
    }
    render(){
        let styles = ["control-label"]
        if(this.state.adding){
            styles.push('fijar')
        }
        return(
            <React.Fragment>
            <nav className="navbar navbar-inverse">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#uno" className="navbar-brand">{this.props.titulo}</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        {this.props.children}
                    </ul>
                </div>
            </nav>
            </React.Fragment>
        );
    }
}
export default Menu;