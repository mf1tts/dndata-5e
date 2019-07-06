/* BEGIN COMMON HELPERS */
var app = {
    platform: "node"
};
this.fields = [];
this.bookmarkRoot = {
    children: [{
        children: []
    }]
};
this.info = {
        SheetType: "printer friendly letter",
        SpellsOnly: false,
        AdvLogOnly: false,
        SheetVersion: 13,
        
};
this.getField = function (name) {
    var item = this.fields.find((item) => item.name == name);
    if (item != this.undefined) {
        return item;
    }
    return {
        name: name,
        submitName: name,
        text: ""
    };
}
var npmclone = require('clone');
/* END COMMON HELPERS */