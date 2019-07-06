var bg = require("./lib/backgrounds.base");
var cls = require("./lib/classes.base");
var ctr = require("./lib/creatures.base");
var ft = require("./lib/feats.base");
var gr = require("./lib/gear.base");
var mi = require("./lib/magicitems.base");
var rc = require("./lib/races.base");
var src = require("./lib/sources.base");
var spl = require("./lib/spells.base");

module.exports = {
    BackgroundFeatureList: bg.BackgroundFeatureList,
    BackgroundSubList: bg.BackgroundSubList,
    BackgroundList: bg.BackgroundList,
    FightingStyles: cls.FightingStyles,
    ClassList: cls.ClassList,
    ClassSubList: cls.ClassSubList,
    CreatureList: ctr.CreatureList,
    FeatsList: ft.FeatsList,
    ArmourList: gr.ArmourList,
    WeaponsList: gr.WeaponsList,
    AmmoList: gr.AmmoList,
    PacksList: gr.PacksList,
    GearList: gr.GearList,
    ToolsList: gr.ToolsList,
    TreasureCheckpointsTable: mi.TreasureCheckpointsTable,
    AddMagicItemsMenu: mi.AddMagicItemsMenu,
    sentientItemConflictTxt: mi.sentientItemConflictTxt,
    MagicItemsList: mi.MagicItemsList,
    RaceList: rc.RaceList,
    RaceSubList: rc.RaceSubList,
    SourceList: src.SourceList,
    SpellsList: spl.SpellsList,
    AtHigherLevels: spl.AtHigherLevels,
    spellLevelList: spl.spellLevelList,
    spellSchoolList: spl.spellSchoolList,
    AllSpellsArray: spl.AllSpellsArray, 
    AllSpellsObject: spl.AllSpellsObject, 
    AddSpellsMenu: spl.AddSpellsMenu, 
    AllCasterClasses: spl.AllCasterClasses
}