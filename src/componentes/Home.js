//Importamos los archivos o librerias necesarias en este caso necesitariamos el menu y los modal al igual que algunos controles de texto que se encuentran en introducir
import React from "react";
import Tipeo from './Tipeo';
import Menu from './Menu';
import Modal from './Modal';
import {Redirect} from 'react-router-dom';
import Introducir from './Introducir';
//Definimos la clase Home que es el encargada de iniciar la webapp con el login o registrado correspondiente
class Home extends React.Component{
    //definimos el constructor
    constructor(props){
        super(props)
        this.state={
            nombre:'',
            password:'',
            imagenes:['/imagenes/ingresar.png','/imagenes/registrarse.png','/imagenes/security.png'],
            datos:'',
            nombreRegistro : '',
            correoRegistro : '',
            passwordRegistro : '',
            login:false,
            correoValida:false
            
        }
        //Definimos los metodos necesarios ya sea para traer los datos del servidor o para registrar los cambios en el cuadro de texto 
        this.HandleChangeNombreRegistro = this.HandleChangeNombreRegistro.bind(this);
        this.HandleChangeCorreoRegistro = this.HandleChangeCorreoRegistro.bind(this);
        this.HandleChangePasswordRegistro = this.HandleChangePasswordRegistro.bind(this);
        this.HanleChangeNombre = this.HanleChangeNombre.bind(this);
        this.Ingresa = this.Ingresa.bind(this);
        this.SubmitRegistra = this.SubmitRegistra.bind(this);
       // this.Registrate = this.Registrate.bind(this);
        this.HandleCloseIngresar = this.HandleCloseIngresar.bind(this);
        this.HanleChangeContra = this.HanleChangeContra.bind(this);
    }
    //Este metodo se encarga de enviar los datos de registro del usuario al webservice
    
    //En este metodo se guarda en el state nombreRegistro el contenido de la caja de texto nombre del modal registro
    HandleChangeNombreRegistro(e){
        this.setState({
            nombreRegistro : e.target.value
        });
    }
    //En este metodo se guarda en el state correoRegistro el contenido de la caja de texto de correo del modal registro
    HandleChangeCorreoRegistro(e){
        this.setState({
            correoRegistro:e.target.value
        });
        console.log(this.state.correoRegistro);
    }
    //En este metodo se guarda la password del usuario del modal registrarse
    HandleChangePasswordRegistro(e){
        this.setState({
            passwordRegistro:e.target.value
        });
    }
    //En este metodo se guarda los cambios producidos en el cuadro de texto
    HanleChangeContra(e){
        this.setState({
            password: e.target.value
        });
    }
    //Aqui como su nombre lo indica, redireccina al usuario luego de 1s una vez invocado 
    Redireccion(){
        if(!(this.state.datos.respuesta.nombre==="")){
        setCookie("response",this.state.datos,80);
            setInterval(()=>{
            this.setState({
                login:true
            });
        },1000);
    }else{
        alert("Introduzca de nuevo los datos");
    }
    }
    //Este metodo trae los datos del servidor que utilizaremos en todo nuestro software
    Ingresa(e){
        //Esta sentencia se utiliza para que no se recargue la pagina
        e.preventDefault();
        //Aqui declaramos nuestra variable que se encargara de gestionar los webservices
        const traerDatosDelUsuario = new XMLHttpRequest();
        traerDatosDelUsuario.onload=(e)=>{
            if(traerDatosDelUsuario.readyState === 4 && traerDatosDelUsuario.status === 200){
                //Una vez que nos traigan los datos se guarda eso en el state datos luego se redirecciona
                let datos = JSON.parse(traerDatosDelUsuario.responseText);
                this.setState({
                    datos
                },()=>{
                   this.Redireccion()
                });
            }
        };
        var url ='http://localhost/control_webservices/iniciar_session.php?';
        traerDatosDelUsuario.open('GET',url.concat('correo=',this.state.nombre,'&password=',this.state.password),true);
        traerDatosDelUsuario.send();
 
    }
    SubmitRegistra(e){
        e.preventDefault();
        let correo = ""+this.state.correoRegistro+""; 
        let evaluacion = false;
        for(let i=0;i<correo.length;i++){
            if(correo.charAt(i)=="@"){
                evaluacion = true;
            }
        }
        this.setState({
            correoValida:evaluacion
        });
        if(this.state.correoValida){
            alert("Introduciste bien");
        }else{
            alert("Introduzca de nuevo");
        }
    }
    //Cuando el componente de destruye le pedimos que recargue la pagina porque osino se produce un error de diseño
    componentWillUnmount(){
        window.location.reload();
    }
    //Pedimos que guarde los cambios del cuadro de texto en la variable nombre perteneciente al estado 
    HanleChangeNombre(e){
        this.setState({
            nombre : e.target.value
        });
    }
    HandleClickModalIngresar(e){
        e.preventDefault();
        this.setState({
            login : true
        });
    }
    HandleCloseIngresar(e){
        this.setState({
            login : false
        });
    }
    render(){
        //Definimos la variable imagenes para colocar todas las imagenes en la pantalla
        const imagenes = this.state.imagenes;
        //Aqui se define lo que se mostrara
        return(
            <>
            <Menu  titulo='System Security'>
            <li><a id="apretar" href="#ingresar" data-toggle="modal"><img src={imagenes[0]} className='img img-responsive' style={{width:25,height:25,float:'left',marginRight:10}} />Ingresa</a></li>
            <li><a href="#registrate" data-toggle="modal" ><img src={imagenes[1]} className='img img-responsive' style={{width:25,height:25,float:'left',marginRight:10}} />Registrate</a></li>
            <Modal id="ingresar">
                <h4 className="text-center">Ingresa</h4>
                <form onSubmit={this.Ingresa}>
                    <Introducir valor={this.state.nombre} Id="Correo" TypeInput="mail" evento={this.HanleChangeNombre} TextoLabel="Correo"/>
                    <Introducir valor={this.state.password} Id="pass" TypeInput="password" evento={this.HanleChangeContra} TextoLabel="Contraseña"/>
                    <button className="btn btn-info">Aceptar</button>
                </form>
            </Modal>
            <Modal id="5286721">
				<h1>5286721</h1>
			</Modal>
            <Modal id="registrate">
                <h4 className="text-center">Registrate</h4>
                <form onSubmit={this.SubmitRegistra}>
                    <Introducir valor={this.state.nombreRegistro} Id="NombreRegistro" TypeInput="text" TextoLabel="Nombre" evento={this.HandleChangeNombreRegistro}/>
                    <Introducir valor={this.state.correoRegistro} Id="CorreoRegistro" TypeInput="text" TextoLabel="Correo" evento={this.HandleChangeCorreoRegistro}/>
                    <Introducir valor={this.state.passwordRegistro} Id="PasswordRegistro" TypeInput="password" TextoLabel="Password" evento={this.HandleChangePasswordRegistro}/>
                    <button className="btn btn-info">Aceptar</button>
                </form>                
            </Modal>
            </Menu>
            {
                this.state.login?(<Redirect refresh={true} to={{
                    pathname:'/home/index',
                    state:{
                        datos:this.state.datos                        
                    }
                }}/>):null}
            <div className="container-fluid">
             <div className="row">
                 <div className="col-lg-4"/>
            <div className="col-lg-4">
            <img src={this.state.imagenes[2]} className="img img-responsive"/><br/>
            </div>
            <div className="col-lg-4" />
            </div>
            </div>
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
export default Home;