import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import './App.css';

class App extends React.Component {
  render() { 
    return ( 
        <div className="App">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="calculatorArea">
                  <div className="row">
                    
                    <div className="col-md-12 calculator-header-part">
                      <div className="resultArea">
                        
                      </div>
                    </div>

                    <div className="col-md-12 calculator-body-part">
                      <div className="row justify-content-center">
                          <button className="btn btn-primary top-button">
                              <i className="fa fa-undo"></i>
                          </button>
                          <button className="btn btn-primary top-button">
                              <i className="fa fa-arrow-left"></i>
                          </button>
                          <button className="btn btn-primary top-button  text-bold">
                              C
                          </button>
                          <button className="btn btn-primary top-button  text-bold">
                              AC
                          </button>
                      </div>

                      <div className="row justify-content-center mt-2">
                          <button className="btn btn-success btn-mem text-bold">
                              mc
                          </button>
                          <button className="btn btn-success btn-mem text-bold">
                              m+
                          </button>
                          <button className="btn btn-success btn-mem text-bold">
                              m-
                          </button>
                          <button className="btn btn-success btn-mem text-bold">
                              mr
                          </button>
                      </div>

                      
                      <div className="row justify-content-center mt-2">
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                              7
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                             8
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                              9
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                              /
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                              R
                          </button>
                      </div>

                      <div className="row justify-content-center mt-2">
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                            4
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                            5
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                            6
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                            X
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                           x^2
                          </button>
                      </div>

                      <div className="row justify-content-center mt-2">
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                            1
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                            2
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                            3
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                            -
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                            1/x
                          </button>
                      </div>

                      <div className="row justify-content-center mt-2">
                          <button className="btn btn-primary btn-digit-operation btn-digit text-bold">
                            0
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                            .
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                            +-
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-operation text-bold">
                            +
                          </button>
                          <button className="btn btn-primary btn-digit-operation btn-equal text-bold">
                            =
                          </button>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            </div>
        </div>
     );
  }
}
 
export default App;
