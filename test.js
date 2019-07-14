var dndata = require('./index').data;
var assert = require('assert');
var fs = require('fs');

//console.log(JSON.stringify(dndata.BackgroundList));
assert.ok(dndata.BackgroundList['acolyte'], "Default Background Missing.");
Object.values(dndata.BackgroundList).forEach(
    bg => assert (Object.keys(dndata.BackgroundFeatureList).some(
        bgf => bgf.toLowerCase() == bg.feature.toLowerCase()),
    "ERROR:: background " + bg.name + " has undefined feature " + bg.feature));
dndata.addContent(fs.readFileSync("datasource/MPMB-Base/additional content/v13/Backgrounds/Refugee [Goodman Games' work, transcribed by James Bowman].js", 'utf8'));

assert.ok(dndata.BackgroundList['acolyte'], "Default Background Missing after add.");
assert.ok(dndata.BackgroundList['refugee'], "Refugee Background Missing after add.");