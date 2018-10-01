import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';


import {
  getFromStorage,
  setInStorage,
} from '../utils/storage';


 


class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: ''
    };

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
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
<table width="100%">
<tr>
<td  width="47%"> 
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }

           

            <p>Sign In</p>

           <Header  token={token} />

            <input
              type="email"  class="form-control"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="password"  class="form-control"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
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
<td  width="6%"> 
</td>
       <td  width="47%"> 
 <p>Sign Up</p>
            <input class="form-control"
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            /><br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            /><br />
            <button class="btn purple form-control"  class="btn blue form-control" onClick={this.onSignUp}>Sign Up</button>
         </td>
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

         <Header  token={token} />


        <p>Account</p>
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

export default Logout;
