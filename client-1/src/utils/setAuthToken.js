import api from './api';

export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export const setUser = user =>{
  if (user){
    localStorage.setItem('user', JSON.stringify(user))
  }else{
    localStorage.removeItem('user')
  }
}
 
