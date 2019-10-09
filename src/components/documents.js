import React from 'react';
// import axios from 'axios';
import Popup from "reactjs-popup";
import { CSVLink } from 'react-csv';
// import AuthContext from '../services/Auth'
import Api from '../services/Api'
// import { adalApiFetch } from '../adalConfig';}



const UriDelete = process.env.REACT_APP_DELETE;
const endoPoint = process.env.REACT_APP_ENDPOINT;

      // const UriDelete = "https://cosmo-rest-api-delete.azurewebsites.net/api/documentos/";
      // const endoPoint = "?code=iSNnc6vHhXQXb1ph4eP2e44niZScEfGpg8xNNaKjgdeAFjXLDNAYRg==";
// const getUri = 'https://cosmo-rest-api-get.azurewebsites.net/api/documentos';

export default class Documents extends React.Component {
  state = {
    persons: []
  }
  componentDidMount() {
    this.getDocuments();
  }

  getDocuments = async () => {
    await Api.get('/',{
      params: {
        
    }}).then(res => {
      const persons = res.data;
      this.setState({ persons });
    })
  }


  async deletefn (id) {
    console.log("delete OK" + id);
    await Api.delete(UriDelete + id + endoPoint)
      .then(function (res) {
        console.log(res.data)
      })
    this.getDocuments();// recargar el get
  }
  render() {
    return (
      <div>
        <table className="table table-sm table-bordered table-responsive">
          <thead>
          <tr >
            <th scope="col">NOMBRE DOCUMENTO</th>
            <th scope="col">ID EMPRESA</th>
            <th scope="col">No. PLANILLA</th>
            <th scope="col">NIT EMPRESA</th>
            <th scope="col">ID DEPARTAMENTO</th>
            <th scope="col">NOMBRE DEPARTAMENTO</th>
            <th scope="col">No. BOLETA</th>
            <th scope="col">FECHA PAGO</th>
            <th scope="col">ID COLABORADOR</th>
            <th scope="col">NOMBRE COLABORADOR</th>
            <th scope="col">NIT COLABORADOR</th>
            <th scope="col"> </th>
          </tr>
          </thead>
          {
            this.state.persons.map(person =>
              <tr>
                <td>  {person.nombreDocumento} </td>
                <td>  {person.codigoEmpresa} </td>
                <td>  {person.numeroPlanila} </td>
                <td>  {person.nitEmpresa} </td>
                <td>  {person.codigoDepartamento} </td>
                <td>  {person.nombreDepartamento} </td>
                <td>  {person.numeroBoleta} </td>
                <td>  {person.fechaPago} </td>
                <td>  {person.codigoColaborador} </td>
                <td>  {person.nombreColaborador} </td>
                <td>  {person.nitColaborador} </td>
                <td>
                  <Popup trigger={<button className="btn btn-danger btn-sm"> Delete </button>} modal>
                    {close => (
                      <div >
                        <div className="content">
                          {" "}
                          ¿Quieres eliminar el Documento?
                        <br />
                        </div>
                        <div className="actions">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => {
                              console.log("modal closed ");
                              close();
                              this.deletefn(person.id);
                            }}
                          >
                            Aceptar
                                </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              console.log("modal closed ");
                              close();
                            }}
                          >
                            Cancelar
                                </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </td>
              </tr>)
          }

        </table>
        <CSVLink data={this.state.persons} separator={";"} filename={"Datos_DQ.csv"} >
          <button className="btn btn-success btn-sm">
            Download File
        </button>
        </CSVLink>

      </div>
    )
  }
}
