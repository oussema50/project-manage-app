import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

use(chaiHttp);

describe('Login API', () => {
  it('should log in with valid credentials', (done) => {
    const credentials = {
      email: 'oussema@gmail.com',
      password: 'aA12'
    };

    chai.request(app)
      .post('http://localhost:5001/api/v1/auth/login')  // Replace with your login route
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(200);  // Success status
        expect(res.body).to.have.property('token');  // Check for token in response
        done();
      });
  });

  it('should fail to log in with invalid credentials', (done) => {
    const credentials = {
      email: 'azerty@gmail.com',
      password: 'wrongpassword'
    };

    chai.request(app)
      .post('http://localhost:5001/api/v1/auth/login')  // Replace with your login route
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(401);  // Unauthorized status
        expect(res.body).to.have.property('message').eql('Invalid credentials');
        done();
      });
  });
});