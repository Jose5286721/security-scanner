import React from 'react';
class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state ={id:''}
    }
    componentDidMount(){
        this.setState({
            id: this.props.id
        });
    }
    render(){
        return(
            <div id={this.state.id} className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <a href="#uno" className="close" data-dismiss="modal">&times;</a>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
        
    );
}
}
export default Modal;