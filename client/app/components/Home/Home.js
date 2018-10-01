import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';
import DashboardView from './DashboardView';

import {
  getFromStorage,
  setInStorage,
} from '../utils/storage';





class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              signInError: '',
              isLoading: false
            });
          } else {
            this.setState({
              signInError: '',
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

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (

    <div class="page-wrapper-row full-height">
     <div class="page-wrapper-middle">
            <div class="page-container">
                <div class="page-content-wrapper">
                    <div class="page-content">
                        <div class="container">
                            <div class="page-content-inner">
                                <div class="mt-content-body">
                 <Header  token={token} ev={this.logout} />
                   
<table width="100%">
  <tr>
    <td  width="47%" valign="top"> 
        
        <p class="signinlabel">About @BondBoard</p>
        <div>
        <div class="divfloatleft">
        <img src="/assets/global/img/Iperitus-Logo.png" width="80px;" height="40px" />
        </div>
        <div ><h3 class="welcometoBBlabel">Welcome to @BondBoard</h3></div>
        </div>
    </td>
    <td  width="6%"> 
    </td>
       <td  width="47%" valign="top"> 
          <div>
              <div>
               
               

                <p class="signinlabel">Login</p>

               
                <label class="control-label usernamepwdlabel">User Name or Email</label>
                <input
                  type="email"  class="form-control usernamepwdtxtbox"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={this.onTextboxChangeSignInEmail}
                />
                <br />
                <label class="control-label usernamepwdlabel">Password</label>
                <input
                  type="password"  class="form-control usernamepwdtxtbox"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={this.onTextboxChangeSignInPassword}
                />
                <br />
                <button class="form-control signinbtn" onClick={this.onSignIn}>Sign In</button>
                <br/>
                 {
                  (signInError) ? (
                    <p class="mesgError">{signInError}</p>
                  ) : (null)
                }

              </div>
              <br />
              <br />
              <div>
                {
                  (signUpError) ? (
                    <p>{signUpError}</p>
                  ) : (null)
                }
               
              </div>

            </div>
         </td>
        </tr>
         <tr>
         <td height="500px"> </td>
         </tr>
</table>
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
						        <DashboardView  token={token}/>
						        <button onClick={this.logout}>Logout</button>
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

export default Home;