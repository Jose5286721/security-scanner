import React from 'react' 
import Menu from './Menu'
import {Link,Redirect} from "react-router-dom"
const imagenes = ['/imagenes/avatar.png','/imagenes/grupo.png','/imagenes/crecimiento.png','/imagenes/entradas.png','/imagenes/security.png'];
class Inicio extends React.Component{
    constructor(props){
        super(props);
        this.state = {usuario:'',
        role:0,
        cont : 1,
        datos:null,
        entra:0
        
    }
    }
    RellenarLosDatos(){
        
        const datos = this.state.datos.respuesta;
        console.log(datos);
        let usuarios = [datos.nombre,datos.permisos==1];
        this.setState({
            usuario :   usuarios[0],
            role : usuarios[1] 
        });
        //console.log("Ejecucion exitosa");
    }
    
        

    componentDidMount(){
        try{
        let datos1 = this.props.location.state.datos;
        //console.log(datos1);
       this.setState({
           cont:1,
           datos:datos1,
           entra : 1
       },()=>{this.RellenarLosDatos()});    
    }catch(error){
        this.setState({
            usuario:undefined
        });
    /*var json = getCookie("response");
    this.setState({
        cont:1,
        datos:json.respuesta
    },()=>{this.RellenarLosDatos()});*/
  }
        /*try{
            var ajax = new  XMLHttpRequest();
            ajax.onload = (e)=>{
                if(ajax.status === 200 && ajax.readyState === 4){
                    var json = ajax.responseText;
                    console.log(json);
                    /*this.setState({
                        cont:1,
                        datos:json
                    },()=>{this.RellenarLosDatos()});
                }
            }
            ajax.open('GET','http://localhost/control_webservices/persistencia_login.php',true);
            ajax.send();
        }catch(error){
            this.props.history.push('/');
        }*/
    }
    CerrarSesion(){
        this.setState({
            usuario:undefined
        });
    }
   
    HandleHref(e){
        e.preventDefault();
    }
        render(){
        var usuario =this.state.usuario;
            return(
            <>
            <Menu titulo='System Security'>
                <li><Link to='/home/index'><i className="fas fa-home"/> Home</Link></li>
                {this.state.role ?(<>
                <li><Link to="/home/Usuarios"><i className="fas fa-users"/> Usuarios</Link></li>
                <li><Link to="/home/Reportes"><i className="fas fa-file-contract" /> Reportes</Link></li>
                </> ):null}
                <li className='dropdown'><a href="#cuatro" className='dropdown-toggle' data-toggle='dropdown'><i className="fas fa-user"/> {this.state.usuario === undefined?<Redirect to="/" />:this.state.usuario}</a>
                <ul className="dropdown-menu">
                <li><a onClick={this.CerrarSesion.bind(this)}>Cerrar Sesion</a></li>
                </ul>
                </li>
             </Menu>
             
             </>
        );
             }
            }
            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires="+d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
              }
              
              function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for(var i = 0; i < ca.length; i++) {
                  var c = ca[i];
                  while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                  }
                  if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                  }
                }
                return "";
              }
    export default Inicio;   