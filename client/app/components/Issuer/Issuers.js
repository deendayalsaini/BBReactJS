import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';


import {
  getFromStorage,
  setInStorage,
} from '../utils/storage';



class Issuers extends Component {
  constructor(props) {
    super(props);

      this.state = {
      isLoading: true,
      token: ''
    };
  }
  componentDidMount () {
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          const { token } = obj;
          // Verify token
          fetch('/api/account/verify?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                this.setState({
                  token,
                  isLoading: false
                });
              } else {
                this.setState({
                  isLoading: false,
                });
              }
            });
        } else {
          this.setState({
            isLoading: false,
          });
        }
 }


  render() {

     const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
    } = this.state;


    return (
        <div class="page-wrapper-row full-height">
         <div class="page-wrapper-middle">
          <div class="page-container">
            <div class="page-content-wrapper">
             <div class="page-content">
                <div class="container">
                    <div class="page-content-inner">
                        <div class="mt-content-body"> 
                        <div>
                          <Header token={token} />
                        </div>
                              <div>
              
                              </div>
                        </div>
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

export default Issuers;
