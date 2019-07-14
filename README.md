# dndata-5e
Tools and pipelines for converting 5e character sheet data from the [MorePurpleMoreBetter versions](https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet) to node modules, etc

## Node Module
The current node module is super simple.  

```js
var dndata = require('dndata-5e').data;

console.log(dndata.SpellsList["alarm"].description);
/* Produces:
 "Door, window, or 20-ft cube area; audible (60 ft) or mental alarm (1 mile) if undesignated crea enters" */
```
It only has the freely available/SRD content by default, just like the MPMB sheet.  However, a very basic import is available:

```js
var dndata = require('dndata-5e').data;
var fs = require('fs');

dndata.addContent(fs.readFileSync("path/to/mpmb-formatted-file.js", 'utf8'));
```