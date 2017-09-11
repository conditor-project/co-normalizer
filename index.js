"use strict";

const business = {};
const _ = require('lodash');
const XRegExp = require('xregexp');
const kuler = require('kuler');
const promise = require('bluebird');
const fs = promise.promisifyAll(require('fs'));
const removeDiacritics = require('diacritics').remove;
const path = require('path');
const normalizeConfigPath = path.join(__dirname, 'config.normalize.json');


const effects = {
    noespace: (value) => { return value.replace(/\s/ig,""); },
    noaccent: (value) => { return removeDiacritics(value); },
    lowcase: (value) => { return value.toLowerCase(); },
    alphanum: (value) => { return value.replace(/[^0-9a-zA-Z]/gi, ""); },
    nopunctuation: function (value) {
      const regex = XRegExp('\\p{P}','gA');
      return value.replace(regex,"").replace(/\'/g, "");
    },
    num: (value) => { return value.replace(/[^0-9]/gi, ""); },
    firstnum: (value) => {return /([0-9]+){1}/.exec(value)[0]; }
};


business.getRules = function(path){
	return fs.readFileAsync(path, 'utf8').then((contentFile) => {
		return JSON.parse(contentFile);
	})
}


business.doTheJob = function (jsonLine, cb) {
	this.getRules(normalizeConfigPath).then((rules)=>{
		_.forEach(rules.champs, function (traitements, champs) {
			if (jsonLine.hasOwnProperty(champs)) {
				let normalize_effect = traitements.split(',').map((traitement) => {return traitement.trim()});
				let normalized_champs = jsonLine[champs].value;
				_.forEach(normalize_effect, function (effect) {
					if (effect !== "" && effects.hasOwnProperty(effect)) {
						normalized_champs = effects[effect](normalized_champs);
					}
				});
				jsonLine[champs].normalized = normalized_champs;
			}
		});
		return cb();
	}).catch(function(err){ return cb(err); });
};

business.finalJob = function (docObjects, cb) {
    return cb();
};

module.exports = business;