/* global __dirname, require, process, it */

'use strict';

const
    fs = require('fs'),
    pkg = require('../package.json'),
    business = require('../index.js'),
    testData = require('./dataset/in/test.json'),
    chai = require('chai'),
    expect = chai.expect,
    kuler = require('kuler')
  ;

describe(pkg.name + '/index.js', function () {
  describe('#doTheJob', function () {
    it('normalisation des champs de la premiere notice: ', function (done) {
      let docObject = testData[0];
      business.doTheJob(docObject, function (err) {

        if (err){
          console.log(kuler(err.errCode,'red'));
          console.log(kuler(err.errMessage,'red'));
          process.exit(1);
        }

        expect(docObject.auteur_normalized).to.be.equal('questcequejensais');
        expect(docObject.titre_normalized).to.be.equal('alapechejeneveuxplusallermoman');
        expect(docObject.issn_normalized).to.be.equal('13674803');
        expect(docObject.doi_normalized).to.be.equal('101093bioinformaticsbtu019utWOS000336095100034');
        expect(docObject.page_normalized).to.be.equal('1589');
        expect(docObject.volume_normalized).to.be.equal('12');
        expect(docObject.numero_normalized).to.be.equal('5');

      });
      docObject = testData[1];
      business.doTheJob(docObject, function (err) {
      	if (err){
			console.log(kuler(err.errCode,'red'));
			console.log(kuler(err.errMessage,'red'));
			process.exit(1);
		}

		expect(docObject.auteur_normalized).to.be.equal('ueco');
		expect(docObject.titre_normalized).to.be.equal('traitedurbanismedespeuplesnomades');
		expect(docObject.issn_normalized).to.be.equal('13674808');
		expect(docObject.doi_normalized).to.be.equal('101093bioinformaticsbtu019');
		expect(docObject.page_normalized).to.be.equal('1333');
		expect(docObject.volume_normalized).to.be.equal('6');
		expect(docObject.numero_normalized).to.be.equal('08');

	  });

      done();
    });

  });

  describe('#getRules()',function(){

  	it ('test de récupération de config valide: ',function(){
		this.timeout(0);
  		let path="config.normalize.json";
  		let rules = business.getRules(path);
  		expect(rules).to.be.not.equal(undefined);
	});

  	it ('test de récupération de config qui plante ',function(){
		this.timeout(0);

		expect(function(){
			let path="../config.normalize.json";
			business.getRules(path);
		}).to.throw(Error);

	});
  });
});
