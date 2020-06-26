let assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../index");
let should = chai.should();

let SLUG = '321Vibhav';
let baseUrl = '/api/v1/url';

chai.use(chaiHttp);
describe("URLS", function(){
  it("Should add URL in DB", (done) => {
    chai.request(server)
    .post(baseUrl)
    .send({
      url: "http://datasector.in",
      slug: SLUG
    })
    .end((err, res) => {
        res.should.have.status(200);
        console.log("Response Body:", res.body);
        done();
    });
  });
  it("Should Delete Slug data", (done)=>{
    chai.request(server)
    .delete(`${baseUrl}/${SLUG}`)
    .end((err, result)=>{                    
        result.should.have.status(200)                
        console.log(`Deleted Particlar URL with SLUG: ${SLUG}`, result.body);
        done();
    });
  });
});
    

    