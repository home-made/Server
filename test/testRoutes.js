var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
require("dotenv").load();
var server = process.env.SERVER || require("../server/server.js");

describe("Routes", function() {
  it("should update a user profile on /user/ PUT", function(done) {
    chai.request(server).put("/user/",  {
    "authId": "7564fjasdif",
    "firstName": "Luke",
    "lastName": "Skywalker",
    "bio": "Just a farm boy from Tattoine.",
    "status": "I'm a great cook with a lighsaber",
    "phoneNumber": "233-876-0001",
    "likes": [0],
    "profileUrl": "http://www.luke.com",
    "customerReviews": [{ 
        "reviewText": "he was a decent customer. very friendly",
        "reviewerId": "fjlasdf754",
        "score": 4.25,
        "orderId": "4"
      }],
    "chefReviews": [{
        "reviewText": "chef had that bomb lit",
        "reviewerId": "axncmufid745",
        "score": 4.25,
        "orderId": 1
      },
      {
        "reviewText": "chef sky was a decent cook",
        "reviewerId": "fdscnxvj234",
        "score": 4.25,
        "orderId": "4"
      },
      {
        "reviewText": "kitchen was a little messy. made me uneasy",
        "reviewerId": "axncmufid745",
        "score": 4.25,
        "orderId": "4"
      }],
    "isChef": true,
    "location": { "geo_lat": 75.3, "geo_lng": 65.34 },
    "score": 0
    }).end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should post a user profile on /user/:userId POST", function(done) {
    chai.request(server).post("/user/").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should list chef + dishes on /chef/:chefId GET", function(done) {
    chai.request(server).get("/chef/7564fjasdif").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should post a new dish on /dish/add POST", function(done) {
    chai
      .request(server)
      .post(
        "/dish/add",
        JSON.stringify({
          cuisineType: "Chinese",
          name: "Soup",
          description: "Minced meat soup.",
          dishImages: [
            "https://media-cdn.tripadvisor.com/media/photo-s/02/39/2d/21/chinese-dumplings-with.jpg"
          ],
          chefId: "7564fjasdif",
          allergies: ["none"],
          cashDonation: 8,
          isActive: true,
          quantity: 1
        })
      )
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("should update a dish on /dish PUT", function(done) {
    chai.request(server).put("/dish").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should list pending orders on /orders/0/:id GET", function(done) {
    chai.request(server).get("/orders/0/fdscnxvj234").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should list accepted orders on /orders/1/:id GET", function(done) {
    chai.request(server).get("/orders/1/fdscnxvj234").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should list completed orders on /orders/2/:id GET", function(done) {
    chai.request(server).get("/orders/2/7564fjasdif").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should list canceled orders on /orders/3/:id GET", function(done) {
    chai.request(server).get("/orders/3/fdscnxvj234").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should update request status /orders/ PUT", function(done) {
    chai.request(server).put("/orders/").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should post a new request on /orders POST", function(done) {
    chai.request(server).post("/orders/").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should list chefs with matching cuisine type on /chef/style/:id GET", function(
    done
  ) {
    chai.request(server).get("/chef/style/Mexican").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should list chef reviews on /reviews/0/:id GET", function(done) {
    chai.request(server).get("/reviews/0/7564fjasdif").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should list user reviews on /reviews/1/:id GET", function(done) {
    chai.request(server).get("/reviews/1/7564fjasdif").end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });

  it("should post a new user review on /reviews/1/:id POST", function(done) {
    chai
      .request(server)
      .post("/reviews/1/7564fjasdif", {
        reviewText: "customer was lit",
        reviewerId: "7564fjasdif",
        revieweeId: "axncmufid745",
        score: 4,
        orderId: "4"
      })
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("should post a new chef review on /review/:type POST", function(done) {
    chai
      .request(server)
      .post("/reviews/0/7564fjasdif", {
        reviewText: "chef had that bomb lit",
        reviewerId: "axncmufid745",
        revieweeId: "858723wrte",
        score: 4.25,
        orderId: "4"
      })
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });
});
