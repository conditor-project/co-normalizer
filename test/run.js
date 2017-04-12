/* global __dirname, require, process, it */

'use strict';

var
  fs = require('fs')
  , pkg = require('../package.json')
  , business = require('../index.js')
  , testData = require('./dataset/in/test.json')
  , chai = require('chai')
  , expect = chai.expect
  ;

describe(pkg.name + '/index.js', function () {
  describe('#doTheJob', function () {


    it('normalisation des champs de la premiere notice: ', function (done) {
      var docObject;
      business.doTheJob(docObject = testData[0], function (err) {
        expect(docObject.auteur_normalized).to.be.equal('questcequejensais');
        expect(docObject.titre_normalized).to.be.equal('alapechejeneveuxplusallermoman');
        expect(docObject.issn_normalized).to.be.equal('13674803');
        expect(docObject.doi_normalized).to.be.equal('101093bioinformaticsbtu019utWOS000336095100034');
        expect(docObject.issn_normalized).to.be.equal('13674803');
        expect(docObject.page_normalized).to.be.equal('1589');
        expect(docObject.volume_normalized).to.be.equal('12');
        expect(docObject.numero_normalized).to.be.equal('5');
        done();
      });
    });

  });
});
