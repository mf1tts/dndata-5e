# dndata-5e
Tools and pipelines for converting 5e character sheet data from the [MorePurpleMoreBetter versions](https://github.com/morepurplemorebetter/MPMBs-Character-Record-Sheet) to node modules, etc

## Node Module
The current node module is super simple.  

```js
var dndenv = require('dndata-5e');

console.log(dndenv.data.SpellsList["alarm"].description);
/* Produces:
 "Door, window, or 20-ft cube area; audible (60 ft) or mental alarm (1 mile) if undesignated crea enters" */
```
It only has the freely available/SRD content right now.  The next priority is going to be adding import functionality that can accept files matching the MPMB format.