/* global module */
/*jslint node: true */
/*jslint indent: 2 */
"use strict";

const business = {};
const fs = require('fs');
const _ = require('lodash');
const unidecode = require('unidecode');
const XRegExp = require('xregexp');
const kuler = require('kuler');
const utils = require('./src/utils');



const effects = {
    noespace: (value) => { return value.replace(/ /ig,""); },
    noaccent: (value) => { return utils.removeDiacritics(value); },
    lowcase: (value) => { return value.toLowerCase(); },
    alphanum: (value) => { return value.replace(/[^0-9a-zA-Z]/gi, ""); },
    nopunctuation: function (value) {
      const regex = XRegExp('\\p{P}','A');
      return value.replace(regex,"").replace(/\'/g, "");
    },
    num: (value) => { return value.replace(/[^0-9]/gi, ""); },
    firstnum: (value) => {return /([0-9]+){1}/.exec(value)[0]; }
};


business.getRules = function(path){
	let rules;
	try {
		rules = JSON.parse(fs.readFileSync(path, 'utf8'));
	}
	catch (err) {
		throw new Error("Erreur lors du chargement du fichier de configuration de la normalisation : " + err);
	}

	return rules;
};


business.doTheJob = function (jsonLine, cb) {


	let rules = business.getRules('config.normalize.json');


  _.forEach(rules.champs, function (traitements, champs) {
    if (jsonLine.hasOwnProperty(champs)) {
      let normalize_effect = traitements.split(',').map((traitement) => {return traitement.trim()});
      let normalized_champs = jsonLine[champs];
      _.forEach(normalize_effect, function (effect) {
        if (effect !== "" && effects.hasOwnProperty(effect)) {
          normalized_champs = effects[effect](normalized_champs);
        }
      });
      let name_champs = champs + '_normalized';
      jsonLine[name_champs] = normalized_champs;
    }
  });
  return cb();
};


business.finalJob = function (docObjects, cb) {
    return cb();
};

module.exports = business;