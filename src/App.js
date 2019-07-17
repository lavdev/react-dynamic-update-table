import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Table, Container, Badge } from 'react-bootstrap';
import "./App.css";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      file:null,
      data: []
    };

  }

componentDidMount(){
  this.fileUploadHandler();
}
  onChangeHandler = event => {
    var file = event.target.files[0];
    // console.log(file);
    // console.log(this.validateSize(event));
    if (this.validateSize(event)) {
      // console.log(file.name);
      // if return true allow to setState
      this.setState({
        selectedFile: file
      });
    }
  };

  fileUploadHandler = () => {

    if(this.state.selectedFile == null){
      return;
    }
    
    const data = new FormData();
    // console.log(this.state.selectedFile);
    data.append("file", this.state.selectedFile);
    // console.log(data);
    axios
      .post("http://localhost:8000/upload", data)
      .then(res => {
        // then print response status
        this.setState({"file": res.data.file.name});
        this.state.data.push(res.data.file);
        this.setState({userData: this.state.userData});

        // console.log( res.data.file.name);
        toast.success("upload success=>" + this.state.file);
      })
      .catch(err => {
        // then print response status
        toast.error("upload fail");
      });
  };

  validateSize = event => {
    let file = event.target.files[0];
    let size = 30000;
    let err = "";
    // console.log(file.size);
    if (file.size > size) {
      err = file.type + "is too large, please pick a smaller file\n";
      toast.error(err);
    }
    return true;
  };

  render() {
    return (
      <Container>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <ToastContainer />
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <h3><Badge variant="secondary">Carregar o arquivo</Badge></h3>
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  onChange={this.onChangeHandler}
                />
              </div>
              <div className="col-md-6 pull-right">
                <Button
                  width="100%"
                  type="button"
                  onClick={this.fileUploadHandler}
                  variant="outline-primary"
                >
                  Upload File
                </Button>
              </div>
            </form>   
          </div>        
        </div>  
        <p></p>
        <div className="row">   
            <div className="col-md-6 pull-left">
              <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>CPF/CNPJ</th>
                </tr>
              </thead>
              <tbody>
           {this.state.data.map((data, key) => {
              return (
              <tr key={key}>
                <td>{data.id}</td>
                <td>{data.name}</td>
              </tr>
              )
           })}
           </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
export default App;