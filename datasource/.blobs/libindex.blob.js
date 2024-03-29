// BEGIN Module Shim


module.exports = {
    BackgroundFeatureList: Base_BackgroundFeatureList,
    BackgroundSubList: Base_BackgroundSubList,
    BackgroundList: Base_BackgroundList,
    FightingStyles: FightingStyles,
    ClassList: Base_ClassList,
    ClassSubList: Base_ClassSubList,
    CreatureList: Base_CreatureList,
    FeatsList: Base_FeatsList,
    ArmourList: Base_ArmourList,
    WeaponsList: Base_WeaponsList,
    AmmoList: Base_AmmoList,
    PacksList: Base_PacksList,
    GearList: Base_GearList,
    ToolsList: Base_ToolsList,
    TreasureCheckpointsTable: TreasureCheckpointsTable,
    AddMagicItemsMenu: AddMagicItemsMenu,
    sentientItemConflictTxt: sentientItemConflictTxt,
    MagicItemsList: Base_MagicItemsList,
    RaceList: Base_RaceList,
    RaceSubList: Base_RaceSubList,
    SourceList: Base_SourceList,
    SpellsList: Base_SpellsList,
    AtHigherLevels: AtHigherLevels,
    spellLevelList: Base_spellLevelList,
    spellSchoolList: Base_spellSchoolList,
    addContent: function(content) {
        eval(content);
    }
}