import React, { Component } from 'react';
import Api from '../services/Api';
import dotenv from 'dotenv';
dotenv.config();

// const axios = require("axios");


// const uploadUri = 'https://api-upload-files.azurewebsites.net/api/Archivos';
const uploadUri = process.env.UPLOAD;


export default class Upload extends Component {
    state = {
        file: false,
        status: '',
        images: 0,
        archivos: 0,
        loading: false,
        miarray: [],
        dataprice: [
            {
                name: ''
            }
        ]

    }

    fileSelectedCarImg = event => {
        const file = Array.from(event.target.files);
        this.setState({ file })
    }

    verArchivos = (event) => {

        event.preventDefault()
        const file = Array.from(event.target.files);
        this.setState({
            dataprice: file,
            status: 'wait'

        })
    }

    fileUploadCarImg = async () => {
        for (let index = 0; index < this.state.file.length; index++) {
            const element = this.state.file[index];
            const fd = new FormData();
            fd.append('image2', element, element.name)
             await Api.post(uploadUri, fd, {
                onUploadProgress: ProgressEvent => {
                    let porcentaje = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
                    console.log(porcentaje +'%');
                    this.setState({
                        images: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                    
                    
                    
                    if (porcentaje === 100) {
                        const newdata = 'ok';
                        this.setState({
                            miarray: [...this.state.miarray, newdata]
                        })

                    }
                }

            })
                .then(res => {
                    this.setState({
                        status: 'success'

                    })
                });
        }
    }


progresBarr() {
        if (this.state.images !== 0 && this.state.images !== 100) {
            return (
                <div className="barra">
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            style={{ width: `${this.state.images}%` }}
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {this.state.images}%
                 </div>
                    </div>
                </div>)
        }
    }

    render() {
        const productComponents = this.state.dataprice.map(item =>
            <tr>
                {item.name}
            </tr>)

        const estados = this.state.miarray.map((value) => <tr>{value}<i className="fa fa-check" style={{ color: "rgb(42, 231, 4)" }} ></i> </tr>)

        return (

            <div>
                <div className="barra">
                    <h1>Upload Document</h1>
                    <div>
                        <input
                            multiple
                            type="file"
                            onChange={(e) => {
                                this.fileSelectedCarImg(e);
                                this.verArchivos(e);
                            }} name='fullname'
                        />
                        
                    </div>
                    <p>Upload {this.state.images} %</p>
                    <button onClick={this.fileUploadCarImg}>Upload </button>
                   {this.progresBarr()} 

                </div>
            <div className="divTablew">
                <table className="table table-sm table-bordered ">
                    <thead>
                        <tr>
                            <th scope="col">Document</th>
                            <th scope="col">Status</th>
                        </tr>

                    </thead>

                    <td>
                        {productComponents}
                    </td>

                    <td>
                        {estados}
                    </td>
                </table>
            </div>                
            </div>
        )
    }
}




                    


