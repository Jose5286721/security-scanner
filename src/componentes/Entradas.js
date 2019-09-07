var React = require("react");
var createReactClass = require("create-react-class");
var Entradas = createReactClass({
    getInitialState:function(){
        return{
            imagenes:['/imagenes/security.png']
        };
    },
    render: function(){
        return(
        <>
        <div className="col-lg-4"/>    
        <div className="col-lg-4 text-center" data-aos="fade-left" data-aos-duration="1200">
            <img src={this.state.imagenes[0]} className="img img-responsive" />
            <h3>Security Scanner</h3>
        </div>
        <div className="col-lg-4" />    
        </>
            );
    }
});
export default Entradas;