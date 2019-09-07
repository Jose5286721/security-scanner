import React from 'react';
import Modal from './Modal';
class Usuarios extends React.Component{  
	constructor(props){
		super(props);
		this.state = {
			Id:'',
			Nombre:'',
			Apellido:'',
			Direccion:'',
			Curso:'',
			Turno:'',
			Cedula:'',
			respuesta:'',
			IdModificar:'',
			NombreModificar:'',
			ApellidoModificar:'',
			DireccionModificar:'',
			CursoModificar:'',
			TurnoModificar:'',
			CedulaModificar:'',
		};
		this.LimpiarM = this.LimpiarM.bind(this);
		this.Limpiar = this.Limpiar.bind(this);
		this.OnHandleId = this.OnHandleId.bind(this);
		this.OnHandleApellido = this.OnHandleApellido.bind(this);
		this.OnHandleCedula = this.OnHandleCedula.bind(this);
		this.OnHandleCurso = this.OnHandleCurso.bind(this);
		this.OnHandleDireccion = this.OnHandleDireccion.bind(this);
		this.OnHandleNombre = this.OnHandleNombre.bind(this);
		this.OnHandleTurno = this.OnHandleTurno.bind(this);
		this.OnHandleIdModificar = this.OnHandleIdModificar.bind(this);
		this.OnHandleApellidoModificar = this.OnHandleApellidoModificar.bind(this);
		this.OnHandleCedulaModificar = this.OnHandleCedulaModificar.bind(this);
		this.OnHandleCursoModificar = this.OnHandleCursoModificar.bind(this);
		this.OnHandleDireccionModificar = this.OnHandleDireccionModificar.bind(this);
		this.OnHandleNombreModificar = this.OnHandleNombreModificar.bind(this);
		this.OnHandleTurnoModificar = this.OnHandleTurnoModificar.bind(this);
		this.Eliminar = this.Eliminar.bind(this);
		this.ConsultaUsuario = this.ConsultaUsuario.bind(this);
		this.Modificar = this.Modificar.bind(this);
		this.Registrar = this.Registrar.bind(this);
		this.Iniciarlizar = this.Iniciarlizar.bind(this);
	}
	Iniciarlizar(e){
		e.preventDefault();
		try{
			var inicializar = new XMLHttpRequest();
			inicializar.onload = (e)=>{
				if(inicializar.status == 200 && inicializar.readyState == 4){
					var response = JSON.parse(inicializar.responseText).respuesta[0];
					this.setState({
						IdModificar:response.Id,
						NombreModificar:response.Nombre,
						ApellidoModificar:response.Apellido,
						DireccionModificar:response.Direccion,
						CedulaModificar:response.Cedula,
						CursoModificar:response.Curso,
						TurnoModificar:response.Turno,
					});
				}
			}
			inicializar.open("GET",`http://www.rga-system.com/control_webservices/consultaUsuarios.php?id=${e.target.value}`,false);
			inicializar.send();
		}catch(error){
			console.log("No posee conexion a internet");
		}
	}
	Modificar(e){
	
		e.preventDefault();
		try{
			var modificar = new XMLHttpRequest();
			modificar.onload = (e) => {
				if(modificar.status === 200 && modificar.readyState === 4){
					this.ConsultaUsuario();
					alert(modificar.responseText);
					
				}
			}
			modificar.open("GET","http://www.rga-system.com/control_webservices/modificarUsuario.php?"+'id='+this.state.IdModificar+'&nombre='+this.state.NombreModificar+'&apellido='+this.state.ApellidoModificar+'&direccion='+this.state.DireccionModificar+'&cedula='+this.state.CedulaModificar+'&curso='+this.state.CursoModificar+'&turno='+this.state.TurnoModificar,false);
			modificar.send();
		}catch(error){
			alert("No tiene conexion a internet");
		}
	}

	OnHandleId(e){
		this.setState({
			Id:e.target.value
		});
	}
	OnHandleIdModificar(e){
		this.setState({
			IdModificar:e.target.value
		});
	}
	OnHandleCurso(e){
		e.preventDefault();
		this.setState({
			Curso: e.target.value
		},()=>{
			console.log(this.state.Curso);
		});
	}
	OnHandleCursoModificar(e){
		e.preventDefault();
		this.setState({
			CursoModificar: e.target.value
		});
	}
	OnHandleTurno(e){
		this.setState({
			Turno: e.target.value
		});
	}
	OnHandleTurnoModificar(e){
		this.setState({
			TurnoModificar: e.target.value
		});
	}
	Registrar(e){
		if(!(this.state.Id == '')&&!(this.state.Nombre == '')&& !(this.state.Apellido == '')&&!(this.state.Direccion == '')&&!(this.state.Cedula == '')&&!(this.state.Curso == '')&&!(this.state.Turno == '')){
		e.preventDefault();
		var xmlHttpRequest = new XMLHttpRequest();
		xmlHttpRequest.onreadystatechange = (e)=>{
			if(xmlHttpRequest.status === 200 && xmlHttpRequest.readyState === 4){
				var rs = xmlHttpRequest.responseText;
				this.ConsultaUsuario();
				alert(rs);
			}
		}
		xmlHttpRequest.open('GET','http://www.rga-system.com/control_webservices/registrarUsuario.php?'+'id='+this.state.Id+'&nombre='+this.state.Nombre+'&apellido='+this.state.Apellido+'&direccion='+this.state.Direccion+'&cedula='+this.state.Cedula+'&curso='+this.state.Curso+'&turno='+this.state.Turno,false);
		xmlHttpRequest.send();
	}else{
			e.preventDefault();
			alert("Introduzca todos los datos");
		}
	}
	Limpiar(e){
		e.preventDefault();
		this.setState({
			Id:'',
			Nombre:'',
			Apellido:'',
			Direccion:'',
			Cedula:'',
			Curso:'',
			Turno:''
		});
	}
	LimpiarM(e){
		e.preventDefault();
		this.setState({
			IdModificar:'',
			NombreModificar:'',
			ApellidoModificar:'',
			DireccionModificar:'',
			CedulaModificar:'',
			CursoModificar:'',
			TurnoModificar:'',
		});
	}
	Eliminar(e){
		e.preventDefault();
		try{
			var respuesta = new XMLHttpRequest();
			respuesta.onload = ()=>{
				if(respuesta.status === 200 && respuesta.readyState){
					this.ConsultaUsuario();
					alert(respuesta.responseText);
					
				}
			}
			respuesta.open("GET",`http://www.rga-system.com/control_webservices/eliminarUsuario.php?id=${e.target.value}`,false);
			respuesta.send();
		}catch(error){
			alert("No esta conectado a internet");
		}
	}
	ConsultaUsuario(){
		try{
		var consulta = new XMLHttpRequest();
		consulta.onload = ()=>{
			if(consulta.status === 200 && consulta.readyState === 4){
				var respuesta = JSON.parse(consulta.responseText).respuesta;
				if(respuesta === undefined){
					alert("No hay registros");
					this.setState({
						respuesta:''
					});
				}else{
					this.setState({
						respuesta
					});
				}
			}
		}
		consulta.open("GET","http://www.rga-system.com/control_webservices/consultaUsuarios.php",false);
		consulta.send();
	}catch(error){
		alert("Conectese a internet");
	}

	}
	componentDidMount(){
		this.ConsultaUsuario();
	}
	OnHandleNombre(e){
		this.setState({
			Nombre:e.target.value
		});
	}
	OnHandleNombreModificar(e){
		this.setState({
			NombreModificar:e.target.value
		});
	}
	OnHandleApellido(e){
		this.setState({
			Apellido:e.target.value
		});
	}
	OnHandleApellidoModificar(e){
		this.setState({
			ApellidoModificar:e.target.value
		});
	}
	OnHandleDireccion(e){
		this.setState({
			Direccion:e.target.value
		});
	}
	OnHandleDireccionModificar(e){
		this.setState({
			DireccionModificar:e.target.value
		});
	}
	OnHandleCedula(e){	
		this.setState({
			Cedula:e.target.value
		});
	}
	OnHandleCedulaModificar(e){	
		this.setState({
			CedulaModificar:e.target.value
		});
	}
    render(){
        return(
            <React.Fragment>
            <div class="well text-center" data-aos="fade-top" data-aos-duration="1200"><h1>Usuarios</h1></div>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-8">
				<div class="container-fluid">
					<table class="table">
						<tr>
							<th>Id</th>
							<th>Cedula</th>
							<th>Nombre</th>
							<th>Apellido</th>
							<th>Direccion</th>
							<th>Curso</th>
							<th>Turno</th>
							<th>Acciones</th>
						</tr>
						{this.state.respuesta !== ''?(
							this.state.respuesta !== undefined?(
								
								this.state.respuesta.map((usuario) => 
								<>
								<tr>
									<td>{usuario.Id}</td>
									<td>{usuario.Cedula}</td>
									<td>{usuario.Nombre}</td>
									<td>{usuario.Apellido}</td>
									<td>{usuario.Direccion}</td>
									<td>{usuario.Curso}</td>
									<td>{usuario.Turno}</td>
									<td><button class="btn btn-success" href={`#${usuario.Cedula}`} value={usuario.Id} onClick={this.Iniciarlizar} data-toggle="modal">Modificar</button>
									<button value={usuario.Id} class="btn btn-danger" onClick={this.Eliminar}>Eliminar</button>
									</td>
								<Modal id={usuario.Cedula}>
								<div class="form-group">
							<label>Id:</label>
							<input type="text" value={this.state.IdModificar} onChange={this.OnHandleIdModificar} class="form-control" disabled/>
						</div>
						<div class="form-group">
							<label>Nombre:</label>
							<input type="text" value={this.state.NombreModificar} onChange={this.OnHandleNombreModificar} class="form-control" />
						</div>
						<div class="form-group">
							<label>Apellido:</label>
							<input type="text" value={this.state.ApellidoModificar} onChange={this.OnHandleApellidoModificar} class="form-control" />
						</div>
						<div class="form-group">
							<label>Direccion:</label>
							<input type="text" value={this.state.DireccionModificar} onChange={this.OnHandleDireccionModificar} class="form-control" />
						</div>
						<div class="form-group">
							<label>Cedula:</label>
							<input type="text" value={this.state.CedulaModificar} onChange={this.OnHandleCedulaModificar} class="form-control" />
						</div>
						<div class="form-group">
							<label>Curso:</label>
							<select value={this.state.CursoModificar} onChange={this.OnHandleCursoModificar} class="form-control">
								<option>Seleecione una opcion</option>
								<option value="1">1ro</option>
								<option value="2">2do</option>
								<option value="3">3ro</option>
							</select>
						</div>
						<div class="form-group">
							<label>Turno:</label>
							<select value={this.state.TurnoModificar} onChange={this.OnHandleTurnoModificar} class="form-control">
								<option>Seleccione una opcion</option>
								<option value="M">Mañana</option>
								<option value="T">Tarde</option>
							</select>
						</div>
						<button onClick={this.Modificar} class="btn btn-success">Modificar</button>	
						<button onClick={this.LimpiarM} class="btn btn-primary">Limpiar</button>
								</Modal>

								</tr>
							</>
								
								)
							):(<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>)
						):(<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>)
							
							
						}
					</table>

				</div>
			</div>
			<div class="col-lg-4" data-aos="fade-top" data-aos-duration="1200">
				<div class="container-fluid">
						<div class="form-group">
							<label>Id:</label>
							<input type="number" value={this.state.Id} onChange={this.OnHandleId} class="form-control" />
						</div>
						<div class="form-group">
							<label>Nombre:</label>
							<input type="text" value={this.state.Nombre} onChange={this.OnHandleNombre} class="form-control" />
						</div>
						<div class="form-group">
							<label>Apellido:</label>
							<input type="text" value={this.state.Apellido} onChange={this.OnHandleApellido} class="form-control" />
						</div>
						<div class="form-group">
							<label>Direccion:</label>
							<input type="text" value={this.state.Direccion} onChange={this.OnHandleDireccion} class="form-control" />
						</div>
						<div class="form-group">
							<label>Cedula:</label>
							<input type="number" value={this.state.Cedula} onChange={this.OnHandleCedula} class="form-control" />
						</div>
						<div class="form-group">
							<label>Curso:</label>
							<select value={this.state.Curso} onChange={this.OnHandleCurso} class="form-control">
								<option>Seleecione una opcion</option>
								<option value="1">1ro</option>
								<option value="2">2do</option>
								<option value="3">3ro</option>
							</select>
						</div>
						<div class="form-group">
							<label>Turno:</label>
							<select value={this.state.Turno} onChange={this.OnHandleTurno} class="form-control">
								<option>Seleccione una opcion</option>
								<option value="M">Mañana</option>
								<option value="T">Tarde</option>
							</select>
						</div>
						<button onClick={this.Registrar} class="btn btn-success">Registrar</button>	
						<button onClick={this.Limpiar} class="btn btn-primary">Limpiar</button>
				</div>
			</div>
		</div>
	</div>
    </React.Fragment>

        );
	}
}
export default Usuarios;