const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlYTBkMTQ4LWQwYTktNDA3Ni1hNmU0LWMzMDM0NDYxZGEyNSIsImFkZHJlc3MiOnsic3RyZWV0IjoiY291cmJldm9pZSIsImNpdHkiOiJjb3VyYmV2b2llIiwic3RhdGUiOiJmcmFuY2UiLCJ6aXBfY29kZSI6IjkyNDAwIn0sImFwcHJpZ2h0cyI6WyJnZW5lcmFsdmlldyIsInN0YXRpc3RpY3MiXSwiYXNzb2NpYXRlZF90ZWFtIjpudWxsLCJjb250cmFjdF9lbmQiOm51bGwsImNvbnRyYWN0X3N0YXJ0IjpudWxsLCJlbnRpdGxlIjoiYW1pbmUiLCJmaXJzdF9uYW1lIjoiYW1pbmUiLCJsYXN0X25hbWUiOiJsaWF6aWRpIiwicGFzc3dvcmQiOiIkMmEkMTAkbmlkemZ2MFR2ZXNIU2dTRjNJS3hsZS41WHBEMS5YdUJYWWJOMmI4WXQxMkRUWEZ2RXJZWXUiLCJzaXRlcmlnaHRzIjpbIkxhIHZpbGxlIGRlIFBhcmlzIl0sInRlYW0iOiIiLCJ1c2VybmFtZSI6ImFtaW5lIiwidXNlcnR5cGUiOiJTdXBlcnZpc29yIiwidmlld3JpZ2h0cyI6WyJvZmZzdHJlZXQiLCJvbnN0cmVldCIsImVuZm9yY2VycyJdLCJ6b25lcmlnaHQiOiJ6b25lIEEiLCJ6b25lcmlnaHRzIjpbIkxhIHZpbGxlIGRlIFBhcmlzIl0sImlhdCI6MTUxNTY3ODA1MywiZXhwIjoxNTE2MjgyODUzfQ.sddxWhHxvYo_c601cC7cO25XgKM8P6umNYl8-1S3GEI';
const app = require('../app.js');

describe('API endpoint /users', function(){

    //Users list
    it('Get all users from DB', function() {
        return chai.request(app)
            .get('/users')
            .set('Authorization', token)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('Array');
                expect(res.body[0]).to.contain.keys(['id', 'username', 'address', 'first_name', 'last_name']);
            });
    });


    //User creation
    it('Create a new user', function() {
        return chai.request(app)
            .post('/users')
            .set('Authorization', token)
            .type('form')
            .send({
                'username': 'test',
                'password': 'test',
                'entitle': 'test',
                'usertype': 'Admin',
                'address': 'test',
                'first_name': 'test',
                'last_name': 'test'
            }).then(function(res) {
                expect(res).to.have.status(201);
            });
    });


    //Remove user by id
    it('Remove a user from DB by id', function() {
        return chai.request(app)
            .delete('/users?id=a54dceb5-491c-48b9-a9e2-47550c2267bf')
            .set('Authorization', token)
            .send()
            .then(function(res) {
                console.log(res);
                expect(res).to.have.status(202);
            })
    });


    //update user by id
    it('Edit a user by id', function() {
        return chai.request(app)
            .put('/users')
            .set('Authorization', token)
            .type('form')
            .send({
                'id': '06770d21-a3e4-4ae8-b4e9-758a10cd8598',
                'username': 'test',
                'last_name': 'test2'
            }).then(function(res) {
                expect(res).to.have.status(202);
            });
    });


    // GET - Invalid path
    it('should return Not Found', function() {
        return chai.request(app)
            .delete('/users')
            .send({
                'id': ''
            })
            .then(function(res) {
                throw new Error('Path exists!');
            })
            .catch(function(err) {
                expect(err).to.have.status(401);
            });
    });

});
