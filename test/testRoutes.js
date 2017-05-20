var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');
var should = chai.should();
chai.use(chaiHttp);


describe('Routes', function() {

  it('should update a user profile on /user/:userId PUT', function(done) {
    chai.request(server)
      .put('/user/:userId')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list chef + dishes on /chef/:chefId GET', function(done) {
    chai.request(server)
      .get('/chef/:chefId')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });


  it('should post a new dish on /dish/add POST', function(done) {
    chai.request(server)
      .post('/dish/add')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should update a dish on /dish/:id PUT', function(done) {
    chai.request(server)
      .put('/dish/:id')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list active orders on /orders/:id GET', function(done) {
    chai.request(server)
      .get('/orders/:id')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list inactive orders on /orders/all/:id GET', function(done) {
    chai.request(server)
      .get('/orders/all/:id')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });


  it('should list pending requests on /orders/ GET', function(done) {
    chai.request(server)
      .get('/orders/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should update request status /orders/ PUT', function(done) {
    chai.request(server)
      .put('/orders/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should post a new request on /orders POST', function(done) {
    chai.request(server)
      .post('/orders/')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list chefs with matching cuisine type on /chef/style/:id GET', function(done) {
    chai.request(server)
      .get('/chef/style/:id')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should list reviews on /review/style/:id GET', function(done) {
    chai.request(server)
      .get('/chef/style/:id')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('should post a new review on /review/:type/:id POST', function(done) {
    chai.request(server)
      .post('/review/:type/:id')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

});