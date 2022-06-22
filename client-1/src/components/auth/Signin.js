import React, { Component, useEffect, useState } from "react";
import { Redirect, withRouter, useHistory } from "react-router-dom";
import { Grid, Button, Form, Segment, Header, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { useRouter } from "next/router";

//  const Signin = ({login }) => {
//    const [formData, setFormData] = useState({
//      email: "",
//      password: "",
//    });
//    const router = useRouter()

//    const user = JSON.parse(localStorage.getItem("user"));
//     useEffect(() => {
//      if (user) {
//        history.push('/');
//      }
//      console.log(user)
//     }, [user]);

//    const history = useHistory();
//     console.log(user)
//    const { email, password } = formData;

//    const onChange = (e) =>
//      setFormData({ ...formData, [e.target.name]: e.target.value });

//    const onSubmit = (e) => {
//      e.preventDefault();
//      login(email, password);
//    };

//     if (user) {
//       history.push('/');
//     }
//    return (
//      <Grid textAlign="center" verticalAlign="middle" className="app">
//        <Grid.Column style={{ maxWidth: 600 }}>
//          <Header as="h2" icon textAlign="center">
//            <Icon name="code branch" className="headerColor" />
//            <div className="headerColor">Login to ProGela</div>
//          </Header>
//          <Form size="large" onSubmit={onSubmit} className="form">
//            <Segment stacked>
//              <Form.Input
//                fluid
//                name="email"
//                icon="user"
//                iconPosition="left"
//                placeholder="Email"
//                onChange={onChange}
//                value={email}
//                required
//                type="email"
//              />
//              <Form.Input
//                fluid
//                name="password"
//                icon="lock"
//                iconPosition="left"
//                placeholder="Password"
//                onChange={onChange}
//                value={password}
//                required
//                type="password"
//              />
//              <Button color="red" className="headerColor" fluid size="large">
//                Sumit
//              </Button>
//            </Segment>
//          </Form>
//        </Grid.Column>
//      </Grid>
//    );
//  };

//  Signin.propTypes = {
//    login: PropTypes.func.isRequired,
//    isAuthenticated: PropTypes.bool,
//  };

//  export default withRouter(connect(null, { login })(Signin));

class Signin extends Component {

  user = JSON.parse(localStorage.getItem("user"));
  state = {
    email: "",
    password: "",
  };
  
  componentDidUpdate(){
     if(this.props.isTrue)  this.props.history.push('/');
    }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state);
  };
  render() {
    console.log(this.props.isTrue)
    console.log(this.user)
    if(this.user)  this.props.history.push('/');


    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h2" icon textAlign="center">
            <Icon name="code branch" className="headerColor" />
            <div className="headerColor">Login to ProGela</div>
          </Header>
          <Form size="large" onSubmit={this.onSubmit} className="form">
            <Segment stacked>
              <Form.Input
                fluid
                id="email"
                icon="user"
                iconPosition="left"
                placeholder="Email"
                onChange={this.onChange}
                required
                type="email"
              />
              <Form.Input
                fluid
                id="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.onChange}
                required
                type="password"
              />
              <Button color="red" className="headerColor" fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    isTrue: state.auth.isTrue
  }
}

export default connect(mapStateToProps, { login })(Signin);
