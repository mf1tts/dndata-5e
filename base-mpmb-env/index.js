import * as bg from "./lib/backgrounds.base";
import * as cls from "./lib/classes.base";
import * as ctr from "./lib/creatures.base";
import * as ft from "./lib/feats.base";
import * as gr from "./lib/gear.base";
import * as mi from "./lib/magicitems.base";
import * as rc from "./lib/races.base";
import * as src from "./lib/sources.base";
import * as spl from "./lib/spells.base";

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