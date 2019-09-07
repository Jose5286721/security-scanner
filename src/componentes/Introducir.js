import React from 'react'
class Introducir extends React.Component{
    constructor(props){
        super(props);
        this.state = {adding:false}
        this.onHandleKey = this.onHandleKey.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }
    handleBlur(){
        this.setState({
            adding:false
        })   
    }
    handleFocus(){
        this.setState({
            adding:true
        })
    }
    onHandleKey(){
        this.setState({
            adding:!this.state.adding
        })
    }
    render(){
        let controlador = ["control-label"]
        if(this.state.adding){
            controlador.push('fijar')
        }else{
            controlador = ["control-label"]
        }
    return(<div className="form-group">
                        <label htmlFor={this.props.Id} className={controlador.join(' ')}>{this.props.TextoLabel}</label>
                        <input value={this.props.valor} id={this.props.Id} onFocus={this.handleFocus} onBlur={this.handleBlur} type={this.props.TypeInput} onChange={this.props.evento} className="form-control" required/>
                    </div>)
}
}
export default Introducir;