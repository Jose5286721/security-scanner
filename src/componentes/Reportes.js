var React = require('react');
var createReactClass = require('create-react-class');
var Reportes = createReactClass({
    getInitialState: function(){
        return {lista :[5,6,8,2,8,2,2545,4,65,65,6,5],
        opciones : ['Nombre-Alumno','Apellido-Alumno','Cedula-Alumno','Curso-Alumno','Turno-Alumno','Motivo_utilizacion-Sala','Hojas_a_imprimir-Sala'],
        fechaInicio:'',
        fechaFin:'',
        respuesta : '',
        horaInicio : '',
        horaFin: '',
        desHabBotonesExportacion : true
    };
    },
    HandExportarPDF: function(){
        var url = 'http://www.rga-system.com/control_webservices/informes/generarInformeEnPDF.php';
        window.location.assign(url.concat('?fechaInicio=',this.state.fechaInicio+" "+this.state.horaInicio,'&fechaFinal=',this.state.fechaFin+" "+this.state.horaFin));
    },
    HandleHoraInicio: function(e){
        this.setState({
            horaInicio : e.target.value
        });
        console.log(this.state.horaInicio);
    },
    HandleHoraFin: function(e){
        this.setState({
            horaFin : e.target.value
        });
        console.log(this.state.horaFin);
    }
    ,
    HandleEjecutar: function(){
        if(this.state.fechaInicio === '' || this.state.fechaFin === ''){
            alert("Introduzca por favor los datos");
        }else{
        var ajax = new XMLHttpRequest();
        ajax.onload = (e)=>{
            if(ajax.status == 200 && ajax.readyState == 4){
                console.log(ajax.responseText);
                var respuesta = JSON.parse(ajax.responseText).respuesta;
                
                if(respuesta === undefined){
                    alert("No hay registros");
                }else{
                this.setState({
                    respuesta,
                    desHabBotonesExportacion : false
                });
                }
            }
        }
        var url = 'http://www.rga-system.com/control_webservices/informes/generarInforme.php';
        ajax.open('GET',url.concat('?fechaInicio=',this.state.fechaInicio+" "+this.state.horaInicio,'&fechaFinal=',this.state.fechaFin+" "+this.state.horaFin),true);
        ajax.send();}
    },
    HandleExportarEXCEL:function(){
      var url = 'http://www.rga-system.com/control_webservices/informes/generarInformeEnExcel.php';
        window.open(url.concat('?fechaInicio=',this.state.fechaInicio+" "+this.state.horaInicio,'&fechaFinal=',this.state.fechaFin+" "+this.state.horaFin));
    },
    HandleFechaInicio: function(e){
        this.setState({
            fechaInicio: e.target.value
        });
        console.log(this.state.fechaInicio);
    },
    HandleFechaFin: function(e){
        this.setState({
            fechaFin: e.target.value
        });
        console.log(this.state.fechaFin);
    },
    render: function(){
        return(
            <>
            <div className="container-fluid">
                <div className="row">
                    
                    <div className="col-lg-4">
                        <h4>Fechas a filtrar</h4>
                        De <input className="form-control" onChange={this.HandleFechaInicio} value={this.state.fechaInicio} type="date" name="fecha1" required /> <input type="time" onChange={this.HandleHoraInicio} /><br/>
                         hasta <input className="form-control" onChange={this.HandleFechaFin} value={this.state.fechaFin} type="date" name="fecha2" required /> <input type="time" onChange={this.HandleHoraFin}  />
                    </div>
                    <div className="col-lg-4">
                    </div>
                    <div className="col-lg-4">
                        <button className="btn btn-warning" onClick={this.HandleEjecutar}>Ejecutar</button>
                        <button className="btn btn-danger" onClick={this.HandExportarPDF} disabled={this.state.desHabBotonesExportacion}>Exportar a PDF <span className="far fa-file-pdf"></span></button>
                        <button className="btn btn-success" onClick={this.HandleExportarEXCEL} disabled={this.state.desHabBotonesExportacion}>Exportar a EXCEL <span className="far fa-file-excel"></span></button>
                    </div>
                </div>
            </div>
            <div style={{marginTop:50}} className="container-fluid">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha y hora</th>
                            <th>Nombre Alumno</th>
                            <th>Cedula</th>
                            <th>Trabajo a realizar</th>
                            <th>Hojas impresas</th>
                            <th>Curso y Turno</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.respuesta !== ''?(
                            this.state.respuesta !== undefined ?(
                            this.state.respuesta.map((resultado)=>
                            <tr>
                                <td>{resultado.Fecha}</td>
                                <td>{resultado.Nombre}</td>
                                <td>{resultado.Cedula}</td>
                                <td>{resultado.Motivo}</td>
                                <td>{resultado.Impresiones}</td>
                                <td>{resultado.Curso}</td>
                            </tr>
                            )):(<script>alert("No hay registros");</script>)
                            ):(null)}
                    </tbody>
                </table>
            </div>
            </>
        );
    }
});
export default Reportes;