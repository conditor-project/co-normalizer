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
      expect(err).to.be.undefined;
			expect(docObject.auteur.normalized).to.be.equal('eduardomolinaro');
			expect(docObject.auteur_init.normalized).to.be.equal('eduardom');
			expect(docObject.titre.normalized).to.be.equal('alapechejeneveuxplusyallermoman');
			expect(docObject.issn.normalized).to.be.equal('13674803');
			expect(docObject.doi.normalized).to.be.equal('101093bioinformaticsbtu019utWOS000336095100034');
			expect(docObject.page.normalized).to.be.equal('1589');
			expect(docObject.volume.normalized).to.be.equal('12');
			expect(docObject.numero.normalized).to.be.equal('5');
		});

		done();
	});

    it ('normalisation des champs de la deuxième notice: ',function(done){

      let docObject = testData[1];
      business.doTheJob(docObject, function (err) {
        expect(err).to.be.undefined;
        expect(docObject.auteur.normalized).to.be.equal('ueco');
        expect(docObject.titre.normalized).to.be.equal('traitedurbanismedespeuplesnomades');
        expect(docObject.issn.normalized).to.be.equal('13674808');
        expect(docObject.doi.normalized).to.be.equal('101093bioinformaticsbtu019');
        expect(docObject.page.normalized).to.be.equal('1333');
        expect(docObject.volume.normalized).to.be.equal('6');
        expect(docObject.numero.normalized).to.be.equal('08');

        });

      done();
    });

  });

  describe('#getRules()',function(){

  	it ('test de récupération de config valide: ',function(){

  		let path="config.normalize.json";
  		let rules = business.getRules(path);
  		expect(rules).to.be.not.equal(undefined);
	});

  	it ('test de récupération de config qui plante ',function(){



		let path="../config.normalize.json";
		business.getRules(path).catch((error) => {
			expect(error).to.be.an('object');
			expect(error.code).to.be.equal('ENOENT');
		});


	});
  });
});
