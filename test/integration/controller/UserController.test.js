// var supertest = require('supertest');

// describe('UserController', function() {

//   describe('#login() with admin account', function() {
//     it('should return status 302 with "Found" in body', function (done) {
//       supertest(sails.hooks.http.app)
//       .post('/user/login')
//       .send({ username: 'admin', password: 'wecarebill' })
//       .expect(302, 'Found. Redirecting to /user/csv', done);
//     });
//   });

//   describe('#login() with non-exists account', function() {
//     it('should return status 401 with "User not found" in body', function (done) {
//       supertest(sails.hooks.http.app)
//       .post('/user/login')
//       .send({ username: 'user', password: 123456 })
//       .expect(401, 'User not found', done);
//     });
//   });

//   describe('#logout()', function() {
//     it('should return status 200 with "Log out successfully!" in body', function (done) {
//       supertest(sails.hooks.http.app)
//       .get('/user/logout')
//       .expect(200, '"Log out successfully!"', done);
//     });
//   });

// });
