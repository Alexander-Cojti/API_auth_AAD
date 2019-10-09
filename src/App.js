import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Documents from './components/documents';
import Upload from './components/Upload';
import Menu from './components/Menu';
import AuthContext from './services/Auth'




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
    this.changeComp2 = this.changeComp2.bind(this);
    this.changeComponent = this.changeComponent.bind(this);
    this.changeCompMen = this.changeCompMen.bind(this);
  }

  componente() {
    let now = this.state.page;
    if (now === 0) {
      return (<Menu />)
    } if (now === 1) {
      return (<Documents />)
    } else {
      return (<Upload />)
    }
  }

  changeComponent() {

    this.setState({
      page: 1
    })
  }
  changeComp2() {
    this.setState({
      page: 2
    })
  }
  changeCompMen() {

    this.setState({
      page: 0
    })
  }



  render() {
    return (
      <div className="App_nav">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
          <button className="btn btn-primary " onClick={this.changeCompMen} >Document Query</button>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            
            <ul className="navbar-nav">
              <li className="nav-item active">
                <button type="button" className="btn btn-primary " onClick={this.changeComponent}>Documents</button>
                
              </li>
              <li className="nav-item active">
                <button type="button" className="btn btn-primary " onClick={this.changeComp2}>Upload Documents <span className="sr-only">(current)</span></button>
              </li>
              <li>
          <button type="button" className="btn btn-primary "   onClick={ () => AuthContext.logOut() }>Logout</button>
        </li>     
            </ul>
          </div>
        </nav>

        {this.componente()}
      </div>

    )
  }
}


