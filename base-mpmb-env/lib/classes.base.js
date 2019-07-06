/**
 * This module makes available the MPMB Character Sheet v13 base data.
 * Definitions in this module are for:
 *  - Fighting Style (FightingStyles)
 *  - Class (ClassList)
 *  - Subclass (ClassSubList) 
 **/
var FightingStyles = {
	archery : {
		name : "Archery Fighting Style",
		description : "\n   " + "+2 bonus to attack rolls I make with ranged weapons",
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isRangedWeapon) output.extraHit += 2;
				},
				"My ranged weapons get a +2 bonus on the To Hit."
			]
		}
	},
	defense : {
		name : "Defense Fighting Style",
		description : "\n   " + "+1 bonus to AC when I'm wearing armor",
		extraAC : {
			mod : 1,
			text : "I gain a +1 bonus to AC while wearing armor.",
			stopeval : function (v) { return !v.wearingArmor; }
		}
	},
	dueling : {
		name : "Dueling Fighting Style",
		description : "\n   " + "+2 to damage rolls when wielding a melee weapon in one hand and no other weapons",
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					for (var i = 1; i <= FieldNumbers.actions; i++) {
						if ((/off.hand.attack/i).test(What('Bonus Action ' + i))) return;
					};
					if (v.isMeleeWeapon && !v.isNaturalWeapon && !(/\b(2|two).?hand(ed)?s?\b/i).test(v.theWea.description)) output.extraDmg += 2;
				},
				"When I'm wielding a melee weapon in one hand and no weapon in my other hand, I do +2 damage with that melee weapon. This condition will always be false if the bonus action 'Off-hand Attack' exists."
			]
		}
	},
	great_weapon : {
		name : "Great Weapon Fighting Style",
		description : "\n   " + "Reroll 1 or 2 on damage if wielding two-handed/versatile melee weapon in both hands",
		calcChanges : {
			atkAdd : [
				function (fields, v) {
					if (v.isMeleeWeapon && (/\b(versatile|(2|two).?hand(ed)?s?)\b/i).test(v.theWea.description)) {
						fields.Description += (fields.Description ? '; ' : '') + 'Re-roll 1 or 2 on damage die' + ((/versatile/i).test(fields.Description) ? ' when two-handed' : '');
					}
				},
				"While wielding a two-handed or versatile melee weapon in two hands, I can re-roll a 1 or 2 on any damage die once."
			]
		}
	},
	protection : {
		name : "Protection Fighting Style",
		description : "\n   " + "As a reaction, I can give disadv. on an attack made vs. someone within 5 ft of me" + "\n   " + "I need to be wielding a shield and be able to see the attacker to do this",
		action : ["reaction", ""]
	},
	two_weapon : {
		name : "Two-Weapon Fighting Style",
		description : "\n   " + "I can add my ability modifier to the damage of my off-hand attacks",
		calcChanges : {
			atkCalc : [
				function (fields, v, output) {
					if (v.isOffHand) output.modToDmg = true;
				},
				"When engaging in two-weapon fighting, I can add my ability modifier to the damage of my off-hand attacks. If a melee weapon includes 'off-hand' or 'secondary' in its name or description, it is considered an off-hand attack."
			]
		}
	}
};

var Base_ClassList = {
	"barbarian" : {
		regExpSearch : /^((?=.*(marauder|barbarian|viking|(norse|tribes?|clans?)(wo)?m(a|e)n))|((?=.*(warrior|fighter))(?=.*(feral|tribal)))).*$/i,
		name : "Barbarian",
		source : [["SRD", 8], ["P", 46]],
		primaryAbility : "Strength",
		prereqs : "Strength 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 12,
		saves : ["Str", "Con"],
		skillstxt : {
			primary : "Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival"
		},
		armorProfs : {
			primary : [true, true, false, true],
			secondary : [false, false, false, true]
		},
		weaponProfs : {
			primary : [true, true],
			secondary : [true, true]
		},
		equipment : "Barbarian starting equipment:" +
			"\n \u2022 A greataxe -or- any martial melee weapon;" +
			"\n \u2022 Two handaxes -or- any simple weapon;" +
			"\n \u2022 An explorer's pack and four javelins." +
			"\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Primal Path", ["barbarian-berserker"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"rage" : {
				name : "Rage",
				source : [["SRD", 8], ["P", 48]],
				minlevel : 1,
				description : "\n   " + "Start/end as bonus action; add damage to melee weapons that use Str; lasts 1 min" + "\n   " + "Adv. on Strength checks/saves (not attacks); resistance to bludgeoning/piercing/slashing" + "\n   " + "Stops if I end turn without attacking or taking damage since last turn, or unconscious",
				additional : levels.map(function (n) {
					return "+" + (n < 9 ? 2 : n < 16 ? 3 : 4) + " melee damage";
				}),
				usages : [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, "\u221E\u00D7 per "],
				recovery : "long rest",
				action : ["bonus action", " (start/end)"],
				dmgres : [["Bludgeoning", "Bludgeon. (in rage)"], ["Piercing", "Piercing (in rage)"], ["Slashing", "Slashing (in rage)"]],
				savetxt : { text : ["Adv. on Str saves in rage"] },
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.isMeleeWeapon && classes.known.barbarian && classes.known.barbarian.level && (/\brage\b/i).test(v.WeaponText)) {
								output.extraDmg += classes.known.barbarian.level < 9 ? 2 : classes.known.barbarian.level < 16 ? 3 : 4;
							}
						},
						"If I include the word 'Rage' in a melee weapon's name or description, the calculation will add my Rage's bonus damage to it."
					]
				}
			},
			"unarmored defense" : {
				name : "Unarmored Defense",
				source : [["SRD", 8], ["P", 48]],
				minlevel : 1,
				description : "\n   " + "Without armor, my AC is 10 + Dexterity modifier + Constitution modifier + shield",
				armorOptions : {
					regExpSearch : /justToAddToDropDown/,
					name : "Unarmored Defense (Con)",
					source : [["SRD", 8], ["P", 48]],
					ac : 10,
					addMod : true
				},
				armorAdd : "Unarmored Defense (Con)"
			},
			"reckless attack" : {
				name : "Reckless Attack",
				source : [["SRD", 9], ["P", 48]],
				minlevel : 2,
				description : "\n   " + "Adv. on melee weapon attacks during my turn, but attacks vs. me adv. until next turn"
			},
			"danger sense" : {
				name : "Danger Sense",
				source : [["SRD", 9], ["P", 48]],
				minlevel : 2,
				description : "\n   " + "Adv. on Dexterity saves against seen effects (not blinded/deafened/incapacitated)",
				savetxt : { text : ["Adv. on Dex saves vs. seen effects"] }
			},
			"subclassfeature3" : {
				name : "Primal Path",
				source : [["SRD", 9], ["P", 48]],
				minlevel : 3,
				description : "\n   " + "Choose a Primal Path that shapes the nature of your rage and put it in the \"Class\" field" + "\n   " + "Choose either the Path of the Battlerager, Berserker, or Totem Warrior"
			},
			"fast movement" : {
				name : "Fast Movement",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 5,
				description : "\n   " + "I gain +10 ft speed when I'm not wearing heavy armor",
				speed : { allModes : "+10" }
			},
			"feral instinct" : {
				name : "Feral Instinct",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 7,
				description : "\n   " + "Adv. on Initiative; I can enter rage to act normally on the first turn when surprised",
				advantages : [["Initiative", true]]
			},
			"brutal critical" : {
				name : "Brutal Critical",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 9,
				description : "\n   " + "I can roll additional dice for the extra damage on a critical hit with a melee attack",
				additional : levels.map(function (n) {
					return n < 9 ? "" : (n < 13 ? 1 : n < 17 ? 2 : 3) + " additional di" + (n < 13 ? "" : "c") + "e"
				}),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon && classes.known.barbarian && classes.known.barbarian.level > 8 && (/d\d+/).test(fields.Damage_Die)) {
								var pExtraCritM = classes.known.barbarian.level < 13 ? 1 : classes.known.barbarian.level < 17 ? 2 : 3;
								if (v.extraCritM) {
									v.extraCritM += pExtraCritM;
									var extraCritRegex = /\d+(d\d+ extra on a crit(ical)?( hit)? in melee)/i;
									fields.Description = fields.Description.replace(extraCritRegex, v.extraCritM + '$1');
								} else {
									v.extraCritM = pExtraCritM;
									fields.Description += (fields.Description ? '; ' : '') + v.extraCritM + fields.Damage_Die.replace(/.*(d\d+).*/, '$1') + ' extra on a crit in melee';
								}
							}
						},
						"My melee attacks roll additional dice on a critical hit."
					]
				}
			},
			"relentless rage" : {
				name : "Relentless Rage",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 11,
				description : " [DC 10 + 5 per try, per short rest]" + "\n   " + "If I drop to 0 HP while raging, I can make a DC 10 Constitution save to stay at 1 HP" + "\n   " + "The DC increases by 5 for every attempt until I finish a short or long rest",
				recovery : "short rest",
				usages : "",
				usagescalc : "var FieldNmbr = parseFloat(event.target.name.slice(-2)); var usages = What('Limited Feature Used ' + FieldNmbr); var DCmod = Number(usages) * 5; event.value = (isNaN(Number(usages)) || usages === '') ? 'DC\u2003\u2003' : 'DC ' + Number(10 + DCmod);"
			},
			"persistent rage" : {
				name : "Persistent Rage",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 15,
				description : "\n   " + "My rage only lasts less than 1 minute if I fall unconscious or I choose to end it"
			},
			"indomitable might" : {
				name : "Indomitable Might",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 18,
				description : "\n   " + "If a Strength check is lower than my Strength score, I can use my Strength score instead"
			},
			"primal champion" : {
				name : "Primal Champion",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 20,
				description : "\n   " + "I add +4 to both my Strength and Constitution, and their maximums increase to 24",
				scores : [4,0,4,0,0,0],
				scoresMaximum : [24,0,24,0,0,0]
			}
		}
	},

	"bard" : {
		regExpSearch : /(bard|minstrel|troubadour|jongleur)/i,
		name : "Bard",
		source : [["SRD", 11], ["P", 51]],
		primaryAbility : "Charisma",
		abilitySave : 6,
		prereqs : "Charisma 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Dex", "Cha"],
		skillstxt : {
			primary : "Choose any three skills",
			secondary : "Choose any one skill"
		},
		toolProfs : {
			primary : [["Musical instrument", 3]],
			secondary : [["Musical instrument", 1]]
		},
		armorProfs : {
			primary : [true, false, false, false],
			secondary : [true, false, false, false]
		},
		weaponProfs : {
			primary : [true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]]
		},
		equipment : "Bard starting equipment:" +
			"\n \u2022 A rapier -or- a longsword -or- any simple weapon;" +
			"\n \u2022 A diplomat's pack -or- an entertainer's pack;" +
			"\n \u2022 A lute -or- any other musical instrument;" +
			"\n \u2022 Leather armor and a dagger." +
			"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Bard College", ["bard-college of lore"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : [4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 16, 16]
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 11], ["P", 52]],
				minlevel : 1,
				description : "\n   " + "I can cast bard cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use a musical instrument as a spellcasting focus" + "\n   " + "I can cast my known bard spells as rituals if they have the ritual tag",
				additional : levels.map(function (n, idx) {
					var cantr = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx];
					var splls = [4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 15, 15, 16, 16, 19, 19, 20, 20, 22, 22][idx];
					return cantr + " cantrips \u0026 " + splls + " spells known";
				})
			},
			"bardic inspiration" : {
				name : "Bardic Inspiration",
				source : [["SRD", 12], ["P", 53]],
				minlevel : 1,
				description : desc([
					"As a bonus action, I give a creature in 60 ft that can hear me an inspiration die (max 1)",
					"For 10 min, the recipient can add it to one ability check, attack roll, or saving throw",
					"This addition can be done after seeing the d20 roll, but before knowing the outcome"
				]),
				additional : ["d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12", "d12", "d12"],
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : levels.map(function (n) {
					return n < 5 ? "long rest" : "short rest";
				}),
				action : ["bonus action", ""]
			},
			"jack of all trades" : {
				name : "Jack of All Trades",
				source : [["SRD", 12], ["P", 54]],
				minlevel : 2,
				description : "\n   " + "I can add half my proficiency bonus to any ability check that doesn't already include it",
				eval : function() { Checkbox('Jack of All Trades', true); },
				removeeval : function() { Checkbox('Jack of All Trades', false); }
			},
			"song of rest" : {
				name : "Song of Rest",
				source : [["SRD", 12], ["P", 54]],
				minlevel : 2,
				description : "\n   " + "Those that use HD and can hear my performance during a short rest get extra healing",
				additional : ["", "d6", "d6", "d6", "d6", "d6", "d6", "d6", "d8", "d8", "d8", "d8", "d10", "d10", "d10", "d10", "d12", "d12", "d12", "d12"]
			},
			"subclassfeature3" : {
				name : "Bard College",
				source : [["SRD", 12], ["P", 54]],
				minlevel : 3,
				description : "\n   " + "Choose a College that reflects your personality and put it in the \"Class\" field " + "\n   " + "Choose either the College of Lore or the College of Valor"
			},
			"expertise" : {
				name : "Expertise",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 3,
				description : "\n   " + "I gain expertise with two skills I am proficient with; two more at 10th level",
				skillstxt : "Expertise with any two skill proficiencies, and two more at 10th level",
				additional : levels.map(function (n) {
					return n < 3 ? "" : "with " + (n < 10 ? 2 : 4) + " skills";
				}),
				extraname : "Expertise",
				extrachoices : ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"],
				extraTimes : levels.map(function (n) { return n < 3 ? 0 : n < 10 ? 2 : 4; }),
				"acrobatics" : {
					name : "Acrobatics Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Acrobatics") !== -1; },
					skills : [["Acrobatics", "only"]]
				},
				"animal handling" : {
					name : "Animal Handling Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Animal Handling") !== -1; },
					skills : [["Animal Handling", "only"]]
				},
				"arcana" : {
					name : "Arcana Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Arcana") !== -1; },
					skills : [["Arcana", "only"]]
				},
				"athletics" : {
					name : "Athletics Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Athletics") !== -1; },
					skills : [["Athletics", "only"]]
				},
				"deception" : {
					name : "Deception Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Deception") !== -1; },
					skills : [["Deception", "only"]]
				},
				"history" : {
					name : "History Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("History") !== -1; },
					skills : [["History", "only"]]
				},
				"insight" : {
					name : "Insight Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Insight") !== -1; },
					skills : [["Insight", "only"]]
				},
				"intimidation" : {
					name : "Intimidation Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Intimidation") !== -1; },
					skills : [["Intimidation", "only"]]
				},
				"investigation" : {
					name : "Investigation Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Investigation") !== -1; },
					skills : [["Investigation", "only"]]
				},
				"medicine" : {
					name : "Medicine Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Medicine") !== -1; },
					skills : [["Medicine", "only"]]
				},
				"nature" : {
					name : "Nature Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Nature") !== -1; },
					skills : [["Nature", "only"]]
				},
				"perception" : {
					name : "Perception Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Perception") !== -1; },
					skills : [["Perception", "only"]]
				},
				"performance" : {
					name : "Performance Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Performance") !== -1; },
					skills : [["Performance", "only"]]
				},
				"persuasion" : {
					name : "Persuasion Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Persuasion") !== -1; },
					skills : [["Persuasion", "only"]]
				},
				"religion" : {
					name : "Religion Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Religion") !== -1; },
					skills : [["Religion", "only"]]
				},
				"sleight of hand" : {
					name : "Sleight of Hand Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Sleight of Hand") !== -1; },
					skills : [["Sleight of Hand", "only"]]
				},
				"stealth" : {
					name : "Stealth Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Stealth") !== -1; },
					skills : [["Stealth", "only"]]
				},
				"survival" : {
					name : "Survival Expertise", description : "",
					source : [["SRD", 13], ["P", 54]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Survival") !== -1; },
					skills : [["Survival", "only"]]
				}
			},
			"font of inspiration" : {
				name : "Font of Inspiration",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 5,
				description : "\n   " + "I can now also recover my expended Bardic Inspiration uses after a short rest"
			},
			"countercharm" : {
				name : "Countercharm",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 6,
				description : "\n   " + "As an action, I can do a performance that lasts until the end of my next turn" + "\n   " + "While it lasts, any friend in earshot \u0026 30 ft has adv. on saves vs. frightened/charmed",
				action : ["action", ""]
			},
			"magical secrets" : {
				name : "Magical Secrets",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 10,
				description : "\n   " + "I can add two spells/cantrips from any class to my spells known; +2 at level 14 \u0026 18",
				additional : levels.map(function (n) {
					return n < 10 ? "" : (n < 14 ? 2 : n < 18 ? 4 : 6) + " spells/cantrips";
				}),
				spellcastingBonus : {
					name : "Magical Secret",
					"class" : "any",
					times : levels.map(function (n) {
						return n < 10 ? 0 : n < 14 ? 2 : n < 18 ? 4 : 6;
					})
				}
			},
			"superior inspiration" : {
				name : "Superior Inspiration",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 20,
				description : "\n   " + "I regain one use of Bardic Inspiration if I have no more remaining when I roll initiative"
			}
		}
	},

	"cleric" : {
		regExpSearch : /(cleric|priest|clergy|acolyte)/i,
		name : "Cleric",
		source : [["SRD", 15], ["P", 56]],
		primaryAbility : "Wisdom",
		abilitySave : 5,
		prereqs : "Wisdom 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Wis", "Cha"],
		skillstxt : {
			primary : "Choose two from History, Insight, Medicine, Persuasion, and Religion"
		},
		armorProfs : {
			primary : [true, true, false, true],
			secondary : [true, true, false, true]
		},
		weaponProfs : {
			primary : [true, false]
		},
		equipment : "Cleric starting equipment:" +
			"\n \u2022 A mace -or- a warhammer (if proficient);" +
			"\n \u2022 Scale mail -or- leather armor -or- chain mail (if proficient);" +
			"\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;" +
			"\n \u2022 A priest's pack -or- an explorer's pack;" +
			"\n \u2022 A shield and a holy symbol." +
			"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Divine Domain", ["cleric-life domain"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
			spells : "list",
			prepared : true
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 15], ["P", 58]],
				minlevel : 1,
				description : "\n   " + "I can cast prepared cleric cantrips/spells, using Wisdom as my spellcasting ability" + "\n   " + "I can use a holy symbol as a spellcasting focus" + "\n   " + "I can cast my prepared cleric spells as rituals if they have the ritual tag",
				additional : levels.map(function (n, idx) {
					return [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5][idx] + " cantrips known";
				})
			},
			"subclassfeature1" : {
				name : "Divine Domain",
				source : [["SRD", 16], ["P", 58]],
				minlevel : 1,
				description : "\n   " + "Choose a Domain related to your deity and put it in the \"Class\" field on the first page" + "\n   " + "Choose either Arcana, Death, Life, Light, Nature, Tempest, Trickery, or War Domain"
			},
			"channel divinity" : {
				name : "Channel Divinity",
				source : [["SRD", 16], ["P", 58]],
				minlevel : 2,
				description : "\n   " + "I can channel divine energy to cause an effect; the save for this is my cleric spell DC",
				usages : [0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3],
				recovery : "short rest"
			},
			"turn undead" : {
				name : "Channel Divinity: Turn Undead",
				source : [["SRD", 16], ["P", 59]],
				minlevel : 2,
				description : desc([
					"As an action, all undead within 30 ft that can see/hear me must make a Wisdom save",
					"If an undead fails this save, it is turned for 1 minute or until it takes any damage",
					"Turned: move away, never within 30 ft of me, no reactions or actions other than Dash",
					"Turned: may Dodge instead of Dash when nowhere to move and unable to escape bonds"
				]),
				action : ["action", ""]
			},
			"destroy undead" : {
				name : "Destroy Undead",
				source : [["SRD", 17], ["P", 59]],
				minlevel : 5,
				additional : ["", "", "", "", "CR \u00BD or lower", "CR \u00BD or lower", "CR \u00BD or lower", "CR 1 or lower", "CR 1 or lower", "CR 1 or lower", "CR 2 or lower", "CR 2 or lower", "CR 2 or lower", "CR 3 or lower", "CR 3 or lower", "CR 3 or lower", "CR 4 or lower", "CR 4 or lower", "CR 4 or lower", "CR 4 or lower"],
				description : "\n   " + "An undead up to the CR above that fails its save when I use Turn Undead is destroyed"
			},
			"divine intervention" : {
				name : "Divine Intervention",
				source : [["SRD", 17], ["P", 59]],
				minlevel : 10,
				additional : ["", "", "", "", "", "", "", "", "", "10% chance", "11% chance", "12% chance", "13% chance", "14% chance", "15% chance", "16% chance", "17% chance", "18% chance", "19% chance", "100% chance"],
				usages : 1,
				recovery : "long rest",
				description : "\n   " + "As an action, I can implore my deity for help; the DM determines the form of help" + "\n   " + "Without intervention, I can retry after a long rest; otherwise, I have to wait a week",
				action : ["action", ""]
			}
		}
	},

	"druid" : {
		regExpSearch : /(druid|shaman)/i,
		name : "Druid",
		source : [["SRD", 19], ["P", 61]],
		primaryAbility : "Wisdom",
		abilitySave : 5,
		prereqs : "Wisdom 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Wis", "Int"],
		skillstxt : {
			primary : "Choose two from Arcana, Animal Handling, Insight, Medicine, Nature, Perception, Religion, and Survival"
		},
		toolProfs : {
			primary : ["Herbalism kit"]
		},
		armorProfs : {
			primary : [true, true, false, true],
			secondary : [true, true, false, true]
		},
		weaponProfs : {
			primary : [false, false, ["club", "dagger", "dart", "javelin", "mace", "quarterstaff", "scimitar", "sickle", "sling", "spear"]]
		},
		equipment : "Druid starting equipment:" +
			"\n \u2022 A wooden shield -or- any simple weapon;" +
			"\n \u2022 A scimitar -or- any simple melee weapon;" +
			"\n \u2022 Leather armor, an explorer's pack, and a druidic focus." +
			"\n\nAlternatively, choose 2d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Druid Circle", ["druid-circle of the land"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : "list",
			prepared : true
		},
		features : {
			"druidic" : {
				name : "Druidic",
				source : [["SRD", 19], ["P", 66]],
				minlevel : 1,
				description : "\n   " + "I know Druidic; Hidden messages with it can only be understood by who know Druidic",
				languageProfs : ["Druidic"]
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 19], ["P", 66]],
				minlevel : 1,
				description : "\n   " + "I can cast prepared druid cantrips/spells, using Wisdom as my spellcasting ability" + "\n   " + "I can use a druidic focus as a spellcasting focus" + "\n   " + "I can cast my prepared druid spells as rituals if they have the ritual tag",
				additional : levels.map(function (n, idx) {
					return [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx] + " cantrips known";
				})
			},
			"subclassfeature2" : {
				name : "Druid Circle",
				source : [["SRD", 21], ["P", 67]],
				minlevel : 2,
				description : "\n   " + "Choose a Circle you can identify with and put it in the \"Class\" field on the first page" + "\n   " + "Choose either the Circle of the Land or the Circle of the Moon"
			},
			"subclassfeature2.wild shape" : {
				name : "Wild Shape",
				source : [["SRD", 20], ["P", 66]],
				minlevel : 2,
				description : "\n   " + "As an action, I assume the shape of a beast I have seen before with the following rules:" + "\n    - " + "I gain all its game statistics except Intelligence, Wisdom, or Charisma" + "\n    - " + "I get its skill/saving throw prof. while keeping my own, using whichever is higher" + "\n    - " + "I assume the beast's HP and HD; I get mine back when I revert back" + "\n    - " + "I can't cast spells in beast form, but transforming doesn't break concentration" + "\n    - " + "I retain features from class, race, etc., but I don't retain special senses" + "\n    - " + "I can choose whether equipment falls to the ground, merges, or stays worn" + "\n    - " + "I revert if out of time or unconscious; if KOd by damage, excess damage carries over",
				usages : [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, "\u221E\u00D7 per "],
				recovery : "short rest",
				additional : ["", "CR 1/4, no fly/swim; 1 hour", "CR 1/4, no fly/swim; 1 hour", "CR 1/2, no fly; 2 hours", "CR 1/2, no fly; 2 hours", "CR 1/2, no fly; 3 hours", "CR 1/2, no fly; 3 hours", "CR 1; 4 hours", "CR 1; 4 hours", "CR 1; 5 hours", "CR 1; 5 hours", "CR 1; 6 hours", "CR 1; 6 hours", "CR 1; 7 hours", "CR 1; 7 hours", "CR 1; 8 hours", "CR 1; 8 hours", "CR 1; 9 hours", "CR 1; 9 hours", "CR 1; 10 hours"],
				action : [["action", " (start)"], ["bonus action", " (end)"]]
			},
			"timeless body" : {
				name : "Timeless Body",
				source : [["SRD", 21], ["P", 67]],
				minlevel : 18,
				description : "\n   " + "I age more slowly, only 1 year for every 10 years that pass"
			},
			"beast spells" : {
				name : "Beast Spells",
				source : [["SRD", 21], ["P", 67]],
				minlevel : 18,
				description : "\n   " + "I can perform the somatic and verbal components of druid spells while in a beast shape"
			},
			"archdruid" : {
				name : "Archdruid",
				source : [["SRD", 21], ["P", 67]],
				minlevel : 20,
				description : "\n   " + "I can use Wild Shape an unlimited number of times" + "\n   " + "My druid spells don't require verbal, somatic, or free material components"
			},
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName == "druid") {
							if (spellObj.compMaterial && !(/M[\u0192\u2020]/i).test(spellObj.components)) spellObj.compMaterial = "";
							spellObj.components = spellObj.components.replace(/V,?|S,?|M$/ig, '');
							return true;
						};
					},
					"My druid spells don't require verbal, somatic, or material components."
				]
			}
		}
	},

	"fighter" : {
		regExpSearch : /^(?!.*(dark|green|fey|horned|totem|spiritual|exalted|sacred|holy|divine|nature|odin|thor|nature|natural|green))(?=.*(fighter|warrior|militant|warlord|phalanx|gladiator|trooper)).*$/i,
		name : "Fighter",
		source : [["SRD", 24], ["P", 70]],
		primaryAbility : "Strength or Dexterity",
		prereqs : "Strength 13 or Dexterity 13",
		die : 10,
		improvements : [0, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 6, 6, 6, 7, 7],
		saves : ["Str", "Con"],
		skillstxt : {
			primary : "Choose two from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival"
		},
		armorProfs : {
			primary : [true, true, true, true],
			secondary : [true, true, false, true]
		},
		weaponProfs : {
			primary : [true, true],
			secondary : [true, true]
		},
		equipment : "Fighter starting equipment:" +
			"\n \u2022 Chain mail -or- leather armor, a longbow, and 20 arrows;" +
			"\n \u2022 A martial weapon and a shield -or- two martial weapons;" +
			"\n \u2022 A light crossbow and 20 bolts -or- two handaxes;" +
			"\n \u2022 A dungeoneer's pack -or- an explorer's pack." +
			"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Martial Archetype", ["fighter-champion"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
		features : {
			"fighting style" : {
				name : "Fighting Style",
				source : [["SRD", 24], ["P", 72]],
				minlevel : 1,
				description : "\n   " + "Choose a Fighting Style for the fighter using the \"Choose Feature\" button above",
				choices : ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
				"archery" : FightingStyles.archery,
				"defense" : FightingStyles.defense,
				"dueling" : FightingStyles.dueling,
				"great weapon fighting" : FightingStyles.great_weapon,
				"protection" : FightingStyles.protection,
				"two-weapon fighting" : FightingStyles.two_weapon
			},
			"second wind" : {
				name : "Second Wind",
				source : [["SRD", 24], ["P", 72]],
				minlevel : 1,
				description : "\n   " + "As a bonus action, I regain 1d10 + fighter level HP; I can use this once per short rest",
				additional : levels.map(function (n) {
					return "1d10+" + n;
				}),
				usages : 1,
				recovery : "short rest",
				action : ["bonus action", ""]
			},
			"action surge" : {
				name : "Action Surge",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 2,
				description : "\n   " + "I can take one additional action on my turn on top of my normally allowed actions",
				usages : [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2],
				recovery : "short rest"
			},
			"subclassfeature3" : {
				name : "Martial Archetype",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 3,
				description : "\n   " + "Choose a Martial Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Champion, Battle Master, Eldritch Knight, or Purple Dragon Knight"
			},
			"indomitable" : {
				name : "Indomitable",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 9,
				description : "\n   " + "I can reroll a failed saving throw, but must keep the new result",
				usages : [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
				recovery : "long rest"
			}
		}
	},

	"monk" : {
		regExpSearch : /^((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		name : "Monk",
		source : [["SRD", 26], ["P", 76]],
		primaryAbility : "Dexterity and Wisdom",
		abilitySave : 5,
		prereqs : "Dexterity 13 and Wisdom 13",
		die : 8,
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		saves : ["Str", "Dex"],
		toolProfs : {
			primary : [["Artisan's tool or musical instrument", 1]]
		},
		skillstxt : {
			primary : "Choose two from Acrobatics, Athletics, History, Insight, Religion, and Stealth"
		},
		armorProfs : {
			primary : [false, false, false, false]
		},
		weaponProfs : {
			primary : [true, false, ["shortsword"]],
			secondary : [true, false, ["shortsword"]]
		},
		equipment : "Monk starting equipment:" +
			"\n \u2022 A shortsword -or- any simple weapon;" +
			"\n \u2022 A dungeoneer's pack -or- an explorer's pack;" +
			"\n \u2022 10 darts." +
			"\n\nAlternatively, choose 5d4 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Monastic Tradition", ["monk-way of the open hand"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		features : {
			"unarmored defense" : {
				name : "Unarmored Defense",
				source : [["SRD", 26], ["P", 78]],
				minlevel : 1,
				description : "\n   " + "Without armor and no shield, my AC is 10 + Dexterity modifier + Wisdom modifier",
				armorOptions : {
					regExpSearch : /justToAddToDropDown/,
					name : "Unarmored Defense (Wis)",
					source : [["SRD", 26], ["P", 78]],
					ac : 10,
					addMod : true
				},
				armorAdd : "Unarmored Defense (Wis)"
			},
			"martial arts" : {
				name : "Martial Arts",
				source : [["SRD", 26], ["P", 78]],
				minlevel : 1,
				description : desc([
					"Monk weapons: any simple melee (not two-handed/heavy), unarmed strike, shortsword",
					"With monk weapons, I can use Dex instead of Str and use the Martial Arts damage die",
					"When taking an Attack action with these, I get one unarmed strike as a bonus action"
				]),
				additional : levels.map(function (n) {
					return "1d" + (n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10);
				}),
				action : ["bonus action", " (with Attack action)"],
				eval : function() {
					AddString('Extra.Notes', 'Monk features:\n\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor/shields', true);
				},
				removeeval : function() {
					RemoveString('Extra.Notes', 'Monk features:\n\u25C6 Lose Unarmored Defense, Martial Arts, and Unarmored Movement with armor/shields', true);
				},
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (classes.known.monk && classes.known.monk.level && (v.theWea.monkweapon || v.baseWeaponName == "unarmed strike" || v.baseWeaponName == "shortsword" || (v.isMeleeWeapon && (/simple/i).test(v.theWea.type) && !(/\b(heavy|(2|two).?hand(ed)?s?)\b/i).test(v.theWea.description)))) {
								var aMonkDie = function (n) { return n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10; }(classes.known.monk.level);
								try {
									var curDie = eval(fields.Damage_Die.replace('d', '*'));
								} catch (e) {
									var curDie = 'x';
								};
								if (isNaN(curDie) || curDie < aMonkDie) {
									fields.Damage_Die = '1d' + aMonkDie;
								};
								fields.Mod = v.StrDex;
							};
						},
						"I can use either Strength or Dexterity and my Martial Arts damage die in place of the normal damage die for any 'Monk Weapons', which include unarmed strike, shortsword, and any simple melee weapon that is not two-handed or heavy."
					]
				}
			},
			"ki" : {
				name : "Ki",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 2,
				description : "\n   " + "I can spend ki to fuel special actions (see third page)" + "\n   " + "I need to meditate for at least 30 min of a short rest for that short rest to restore ki",
				usages : ["", 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				recovery : "short rest",
				extraname : "Ki Feature",
				"flurry of blows" : {
					name : "Flurry of Blows",
					source : [["SRD", 27], ["P", 78]],
					description : " [1 ki point]" + "\n   " + "After taking the Attack action, I can make 2 unarmed attacks as a bonus action",
					action : ["bonus action", " (after Attack action)"]
				},
				"patient defense" : {
					name : "Patient Defense",
					source : [["SRD", 27], ["P", 78]],
					description : " [1 ki point]" + "\n   " + "As a bonus action, I can take the Dodge action",
					action : ["bonus action", ""]
				},
				"step of the wind" : {
					name : "Step of the Wind",
					source : [["SRD", 27], ["P", 78]],
					description : " [1 ki point]" + "\n   " + "As a bonus action, I can either Dash or Disengage; My jump distance doubles when I do so",
					action : ["bonus action", ""]
				},
				"stunning strike" : {
					name : "Stunning Strike",
					source : [["SRD", 27], ["P", 79]],
					description : " [1 ki point]" + "\n   " + "After I hit a creature with a melee weapon attack, I can spend a ki point to try to stun it" + "\n   " + "It has to succeed on a Con save or be stunned until the end of my next turn"
				},
				autoSelectExtrachoices : [{
					extrachoice : "flurry of blows"
				}, {
					extrachoice : "patient defense"
				}, {
					extrachoice : "step of the wind"
				}, {
					extrachoice : "stunning strike",
					minlevel : 5
				}]
			},
			"unarmored movement" : {
				name : "Unarmored Movement",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 2,
				description : "\n   " + "Speed increases and eventually lets me traverse some surfaces without falling as I move",
				additional : levels.map(function (n) {
					if (n < 2) return "";
					var spd = "+" + (n < 6 ? 10 : n < 10 ? 15 : n < 14 ? 20 : n < 18 ? 25 : 30) + " ft";
					var xtr = n < 9 ? "" : "; Vertical surfaces and liquids";
					return spd + xtr;
				}),
				changeeval : function (v) {
					var monkSpd = '+' + (v[1] < 2 ? 0 : v[1] < 6 ? 10 : v[1] < 10 ? 15 : v[1] < 14 ? 20 : v[1] < 18 ? 25 : 30);
					SetProf('speed', monkSpd !== '+0', {allModes : monkSpd}, "Monk: Unarmored Movement");
				}
			},
			"subclassfeature3" : {
				name : "Monastic Tradition",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 3,
				description : "\n   " + "Choose a Monastic Tradition to commit to and put it in the \"Class\" field on page 1" + "\n   " + "Choose either Way of the Four Elements, Long Death, Open Hand, Shadow, or Sun Soul"
			},
			"deflect missiles" : {
				name : "Deflect Missiles",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 3,
				description : "\n   " + "As a reaction, I can reduce ranged weapon attack damage done to me" + "\n   " + "If the damage is negated, I catch and may throw it back (20/60 ft) as a monk weapon",
				action : ["reaction", ""],
				additional : levels.map(function (n) {
					return n < 3 ? "" : "1d10 + " + n + " + Dexterity modifier; 1 ki to throw";
				})
			},
			"slow fall" : {
				name : "Slow Fall",
				source : [["SRD", 27], ["P", 78]],
				minlevel : 4,
				description : "\n   " + "As a reaction, I can reduce any falling damage I take by five times my monk level",
				additional : levels.map(function (n) { return n < 4 ? "" : (n*5) + " less falling damage" }),
				action : ["reaction", ""]
			},
			"ki-empowered strikes" : {
				name : "Ki-Empowered Strikes",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 6,
				description : "\n   " + "My unarmed strikes count as magical for overcoming resistances and immunities",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.baseWeaponName == "unarmed strike" && !v.thisWeapon[1] && !v.theWea.isMagicWeapon && !(/counts as( a)? magical/i).test(fields.Description)) {
								fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
							};
						},
						"My unarmed strikes count as magical for overcoming resistances and immunities."
					]
				}
			},
			"evasion" : {
				name : "Evasion",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 7,
				description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
				savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
			},
			"stillness of mind" : {
				name : "Stillness of Mind",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 7,
				description : "\n   " + "As an action, I can end one effect on me that causes me to be charmed or frightened",
				action : ["action", ""]
			},
			"purity of body" : {
				name : "Purity of Body",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 10,
				description : typeA4 ? "\n   " + "My mastery of the ki flowing through me makes me immune to poison and disease" : " [" + "I am immune to poison and disease" + "]",
				savetxt : { immune : ["poison", "disease"] } //both immune to poison damage and the poisoned condition (see sage advice)
			},
			"tongue of the sun and moon" : {
				name : "Tongue of the Sun and Moon",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 13,
				description : "\n   " + "I can understand all spoken languages and all creatures with a language understand me"
			},
			"diamond soul" : {
				name : "Diamond Soul",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 14,
				description : "\n   " + "I am proficient with all saves; I can reroll a failed save once by spending 1 ki point",
				additional : "1 ki point to reroll failed saving throw",
				saves : ["Str", "Dex", "Con", "Int", "Wis", "Cha"]
			},
			"timeless body" : {
				name : "Timeless Body",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 15,
				description : "\n   " + "I don't require food or water; I don't suffer age penalties and can't be aged magically"
			},
			"empty body" : {
				name : "Empty Body",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 18,
				description : "\n   " + "Be invisible and resist non-force damage for 1 min or cast Astral Projection on self",
				additional : "Invisible: 4 ki point; Astral Projection: 8 ki points",
				action : ["action", ""],
				spellcastingBonus : {
					name : "Empty Body",
					spells : ["astral projection"],
					selection : ["astral projection"],
					firstCol : 8
				},
				spellFirstColTitle : "Ki",
				spellChanges : {
					"astral projection" : {
						components : "V,S",
						compMaterial : "",
						description : "I project myself to the Astral Plane with identical statistics, see book",
						changes : "I can spend 8 ki points to cast Astral Projection without requiring material components, although I can't bring other creatures with me."
					}
				}
			},
			"perfect self" : {
				name : "Perfect Self",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 20,
				description : "\n   " + "I regain 4 ki points if I have no more remaining when I roll initiative"
			}
		}
	},

	"paladin" : {
		regExpSearch : /^((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
		name : "Paladin",
		source : [["SRD", 30], ["P", 82]],
		primaryAbility : "Strength and Charisma",
		abilitySave : 6,
		prereqs : "Strength 13 and Charisma 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 10,
		saves : ["Wis", "Cha"],
		skillstxt : {
			primary : "Choose two from Athletics, Insight, Intimidation, Medicine, Persuasion, and Religion"
		},
		armorProfs : {
			primary : [true, true, true, true],
			secondary : [true, true, false, true]
		},
		weaponProfs : {
			primary : [true, true],
			secondary : [true, true]
		},
		equipment : "Paladin starting equipment:" +
			"\n \u2022 A martial weapon and a shield -or- two martial weapons;" +
			"\n \u2022 Five javelins -or- any simple melee weapon;" +
			"\n \u2022 A priest's pack -or- an explorer's pack;" +
			"\n \u2022 Chain mail and a holy symbol." +
			"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Sacred Oath", ["paladin-oath of devotion"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		spellcastingFactor : 2,
		spellcastingKnown : {
			spells : "list",
			prepared : true
		},
		features : {
			"divine sense" : {
				name : "Divine Sense",
				source : [["SRD", 30], ["P", 84]],
				minlevel : 1,
				description : "\n   " + "As an action, I sense celestials/fiends/undead/consecrated/desecrated within 60 ft" + "\n   " + "Until the end of my next turn, I sense the type/location if it is not behind total cover",
				usages : "1 + Charisma modifier per ",
				usagescalc : "event.value = 1 + What('Cha Mod');",
				recovery : "long rest",
				action : ["action", ""]
			},
			"lay on hands" : {
				name : "Lay on Hands",
				source : [["SRD", 31], ["P", 84]],
				minlevel : 1,
				description : "\n   " + "As an action, I can use points in my pool to heal a touched, living creature's hit points" + "\n   " + "I can neutralize poisons/diseases instead at a cost of 5 points per affliction",
				usages : [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
				recovery : "long rest",
				action : ["action", ""]
			},
			"fighting style" : {
				name : "Fighting Style",
				source : [["SRD", 31], ["P", 84]],
				minlevel : 2,
				description : "\n   " + "Choose a Fighting Style for the paladin using the \"Choose Feature\" button above",
				choices : ["Defense", "Dueling", "Great Weapon Fighting", "Protection"],
				"defense" : FightingStyles.defense,
				"dueling" : FightingStyles.dueling,
				"great weapon fighting" : FightingStyles.great_weapon,
				"protection" : FightingStyles.protection
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 31], ["P", 84]],
				minlevel : 2,
				description : "\n   " + "I can cast prepared paladin spells, using Charisma as my spellcasting ability" + "\n   " + "I can use a holy symbol as a spellcasting focus"
			},
			"divine smite" : {
				name : "Divine Smite",
				source : [["SRD", 31], ["P", 85]],
				minlevel : 2,
				description : desc([
					"When I hit a melee weapon attack, I can expend a spell slot to do +2d8 radiant damage",
					"This increases by +1d8 for each spell slot level above 1st and +1d8 against undead/fiends"
				])
			},
			"subclassfeature3.0" : {
				name : "Channel Divinity",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 3,
				description : "",
				usages : 1,
				recovery : "short rest"
			},
			"subclassfeature3" : {
				name : "Sacred Oath",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 3,
				description : "\n   " + "Choose a Sacred Oath you swear to and put it in the \"Class\" field on the first page" + "\n   " + "Choose Oath of the Ancients, Crown, Devotion, Vengeance, or become an Oathbreaker"
			},
			"divine health" : {
				name : "Divine Health",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 3,
				description : "\n   " + "I am immune to disease, thanks to the power of my faith",
				savetxt : { immune : ["disease"] }
			},
			"aura of protection" : {
				name : "Aura of Protection",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 6,
				description : "\n   " + "While I'm conscious, allies within range and I can add my Cha mod (min 1) to saves",
				additional : ["", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				addMod : { type : "save", field : "all", mod : "Cha", text : "While I'm conscious I can add my Charisma modifier (min 1) to all my saving throws." }
			},
			"aura of courage" : {
				name : "Aura of Courage",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 10,
				description : "\n   " + "While I'm conscious, allies within range and I can't be frightened",
				additional : ["", "", "", "", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				savetxt : { immune : ["frightened"] }
			},
			"improved divine smite" : {
				name : "Improved Divine Smite",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 11,
				description : "\n   " + "Whenever I hit a creature with a melee weapon, I do an extra 1d8 radiant damage",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isMeleeWeapon) fields.Description += (fields.Description ? '; ' : '') + '+1d8 Radiant damage';
						},
						"With my melee weapon attacks I deal an extra 1d8 radiant damage."
					]
				}
			},
			"cleansing touch" : {
				name : "Cleansing Touch",
				source : [["SRD", 32], ["P", 85]],
				minlevel : 14,
				description : "\n   " + "As an action, I can end one spell on me or another willing creature by touch",
				usages : "Charisma modifier per ",
				usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
				recovery : "long rest",
				action : ["action", ""]
			}
		}
	},

	"ranger" : {
		regExpSearch : /^((?=.*(ranger|strider))|((?=.*(nature|natural))(?=.*(knight|fighter|warrior|warlord|trooper)))).*$/i,
		name : "Ranger",
		source : [["SRD", 35], ["P", 89]],
		primaryAbility : "Dexterity and Wisdom",
		abilitySave : 5,
		prereqs : "Dexterity 13 and Wisdom 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 10,
		saves : ["Str", "Dex"],
		skillstxt : {
			primary : "Choose three from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, and Survival",
			secondary : "Choose one from Animal Handling, Athletics, Insight, Investigation, Nature, Perception, Stealth, or Survival"
		},
		armorProfs : {
			primary : [true, true, false, true],
			secondary : [true, true, false, true]
		},
		weaponProfs : {
			primary : [true, true],
			secondary : [true, true]
		},
		equipment : "Ranger starting equipment:" +
			"\n \u2022 Scale mail -or- leather armor;" +
			"\n \u2022 Two shortswords -or- two simple melee weapons;" +
			"\n \u2022 A dungeoneer's pack -or- an explorer's pack;" +
			"\n \u2022 A longbow and a quiver of 20 arrows." +
			"\n\nAlternatively, choose 5d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Ranger Archetype", ["ranger-hunter"]],
		attacks : [1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
		spellcastingFactor : 2,
		spellcastingKnown : {
			spells : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11]
		},
		features : {
			"favored enemy" : {
				name : "Favored Enemy",
				source : [["SRD", 35], ["P", 91]],
				minlevel : 1,
				description : "\n   " + "Use the \"Choose Feature\" button above to add a favored enemy to the third page" + "\n   " + "When selecting a favored enemy, I also learn one of the languages it speaks" + "\n   " + "I have adv. on Wis (Survival) checks to track and Int checks to recall info about them",
				additional :  levels.map(function (n) {
					return n < 6 ? "1 favored enemy" : (n < 14 ? 2 : 3) + " favored enemies";
				}),
				extraname : "Favored Enemy",
				extrachoices : ["Aberrations", "Beasts", "Celestials", "Constructs", "Dragons", "Elementals", "Fey", "Fiends", "Giants", "Monstrosities", "Oozes", "Plants", "Undead", "Two Races of Humanoids"],
				extraTimes : levels.map(function (n) { return n < 6 ? 1 : n < 14 ? 2 : 3; }),
				"aberrations" : {
					name : "Aberrations",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"beasts" : {
					name : "Beasts",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"celestials" : {
					name : "Celestials",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"constructs" : {
					name : "Constructs",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"dragons" : {
					name : "Dragons",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"elementals" : {
					name : "Elementals",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"fey" : {
					name : "Fey",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"fiends" : {
					name : "Fiends",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"giants" : {
					name : "Giants",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"monstrosities" : {
					name : "Monstrosities",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"oozes" : {
					name : "Oozes",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"plants" : {
					name : "Plants",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"undead" : {
					name : "Undead",
					description : "",
					source : [["SRD", 35], ["P", 91]],
					languageProfs : [1]
				},
				"two races of humanoids" : {
					name : "Two Races of Humanoids",
					description : "",
					source : [["SRD", 35], ["P", 91]]
				}
			},
			"natural explorer" : {
				name : "Natural Explorer",
				source : [["SRD", 36], ["P", 91]],
				minlevel : 1,
				description : "\n   " + "Use the \"Choose Feature\" button above to add a favored terrain to the third page",
				additional :  levels.map(function (n) {
					return n < 6 ? "1 favored terrain" : (n < 10 ? 2 : 3) + " favored terrains";
				}),
				extraname : "Favored Terrain",
				extrachoices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
				extraTimes : levels.map(function (n) { return n < 6 ? 1 : n < 10 ? 2 : 3; }),
				"arctic" : {
					name : "Arctic",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning arctic terrain" + "\n   " + "While traveling for an hour or more in arctic terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"coast" : {
					name : "Coast",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning coast terrain" + "\n   " + "While traveling for an hour or more in coast terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"desert" : {
					name : "Desert",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning desert terrain" + "\n   " + "While traveling for an hour or more in desert terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"forest" : {
					name : "Forest",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning forest terrain" + "\n   " + "While traveling for an hour or more in forest terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"grassland" : {
					name : "Grassland",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning grassland terrain" + "\n   " + "While traveling for an hour or more in grassland terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"mountain" : {
					name : "Mountain",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning mountain terrain" + "\n   " + "While traveling for an hour or more in mountain terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"swamp" : {
					name : "Swamp",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning swamp terrain" + "\n   " + "While traveling for an hour or more in swamp terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				},
				"underdark" : {
					name : "Underdark",
					source : [["SRD", 36], ["P", 91]],
					description : "\n   " + "I can double my proficiency bonus for Int/Wis checks concerning underdark terrain" + "\n   " + "While traveling for an hour or more in underdark terrain I gain the following benefits:" + "\n    - " + "My allies and I are not slowed by difficult terrain and can't get lost except by magic" + "\n    - " + "I am alert to danger even when doing something else; I forage twice as much food" + "\n    - " + "If alone (or alone with beast companion), I can move stealthily at my normal pace" + "\n    - " + "When tracking, I also learn the exact number, size, and time since passing"
				}
			},
			"fighting style" : {
				name : "Fighting Style",
				source : [["SRD", 36], ["P", 91]],
				minlevel : 2,
				description : "\n   " + "Choose a Fighting Style for the ranger using the \"Choose Feature\" button above",
				choices : ["Archery", "Defense", "Dueling", "Two-Weapon Fighting"],
				"archery" : FightingStyles.archery,
				"defense" : FightingStyles.defense,
				"dueling" : FightingStyles.dueling,
				"two-weapon fighting" : FightingStyles.two_weapon
			},
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 36], ["P", 91]],
				minlevel : 2,
				description : "\n   " + "I can cast ranger spells that I know, using Wisdom as my spellcasting ability",
				additional : levels.map(function (n, idx) {
					return n < 2 ? "" : [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11][idx] + " spells known";
				})
			},
			"subclassfeature3" : {
				name : "Ranger Archetype",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 3,
				description : "\n   " + "Choose a Ranger Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Beast Master or Hunter"
			},
			"primeval awareness" : {
				name : "Primeval Awareness",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 3,
				description : "\n   " + "As an action, I can use a spell slot to focus my awareness for 1 min per spell slot level" + "\n   " + "Out to 1 mile (6 in favored terrain), I sense if certain types of creatures are present",
				additional : "aber./celest./dragon/elem./fey/fiend/undead",
				action : ["action", ""]
			},
			"land's stride" : {
				name : "Land's Stride",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 8,
				description : "\n   " + "I can travel through nonmagical, difficult terrain without penalty" + "\n   " + "I have advantage on saves vs. plants that impede movement by magical influence",
				savetxt : { adv_vs : ["magical plants that impede movement"] }
			},
			"hide in plain sight" : {
				name : "Hide in Plain Sight",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 10,
				description : "\n   " + "I can hide with +10 to Dex (Stealth) after spending 1 minute creating camouflage" + "\n   " + "Once I move or take an action or a reaction, the benefit is lost"
			},
			"vanish" : {
				name : "Vanish",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 14,
				description : "\n   " + "I can't be nonmagically tracked if I don't want to be and can Hide as a bonus action",
				action : ["bonus action", ""]
			},
			"feral senses" : {
				name : "Feral Senses",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 18,
				description : "\n   " + "When not blinded or deafened, I'm aware of invisible, non-hidden creatures in 30 ft" + "\n   " + "I don't have disadvantage when attacking creatures I am aware of but can't see",
				vision : [["Feral senses", 30]]
			},
			"foe slayer" : {
				name : "Foe Slayer",
				source : [["SRD", 37], ["P", 92]],
				minlevel : 20,
				description : "\n   " + "Once per turn, I can add Wis mod to the attack or damage roll vs. favored enemy"
			}
		}
	},

	"rogue" : {
		regExpSearch : /(rogue|miscreant)/i,
		name : "Rogue",
		source : [["SRD", 39], ["P", 94]],
		primaryAbility : "Rogue: Dexterity",
		prereqs : "Dexterity 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6],
		die : 8,
		saves : ["Int", "Dex"],
		skillstxt :{
			primary : "Choose four from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, and Stealth",
			secondary : "Choose one from Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Performance, Persuasion, Sleight of Hand, or Stealth"
		},
		toolProfs : {
			primary : [["Thieves' tools", "Dex"]],
			secondary : [["Thieves' tools", "Dex"]]
		},
		armorProfs : {
			primary : [true, false, false, false],
			secondary : [true, false, false, false]
		},
		weaponProfs : {
			primary : [true, false, ["hand crossbow", "longsword", "rapier", "shortsword"]]
		},
		equipment : "Rogue starting equipment:" +
			"\n \u2022 A rapier -or- a shortsword;" +
			"\n \u2022 A shortbow and a quiver of 20 arrows -or- a shortswords;" +
			"\n \u2022 A burglar's pack -or- dungeoneer's pack -or- an explorer's pack;" +
			"\n \u2022 Leather armor, two daggers, and thieves' tools." +
			"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Roguish Archetype", ["rogue-thief"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		features : {
			"expertise" : {
				name : "Expertise",
				source : [["SRD", 39], ["P", 96]],
				minlevel : 1,
				description : "\n   " + "I gain expertise with two skills/thieves' tools I am proficient with; two more at 6th level",
				skillstxt : "Expertise with any two skill proficiencies and/or thieves' tools, and two more at 6th level",
				additional : levels.map(function (n) {
					return "with " + (n < 6 ? 2 : 4) + " skills";
				}),
				extraname : "Expertise",
				extrachoices : ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival", "Thieves' Tools"],
				extraTimes : levels.map(function (n) { return n < 6 ? 2 : 4; }),
				"acrobatics" : {
					name : "Acrobatics Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Acrobatics") !== -1; },
					skills : [["Acrobatics", "only"]]
				},
				"animal handling" : {
					name : "Animal Handling Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Animal Handling") !== -1; },
					skills : [["Animal Handling", "only"]]
				},
				"arcana" : {
					name : "Arcana Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Arcana") !== -1; },
					skills : [["Arcana", "only"]]
				},
				"athletics" : {
					name : "Athletics Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Athletics") !== -1; },
					skills : [["Athletics", "only"]]
				},
				"deception" : {
					name : "Deception Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Deception") !== -1; },
					skills : [["Deception", "only"]]
				},
				"history" : {
					name : "History Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("History") !== -1; },
					skills : [["History", "only"]]
				},
				"insight" : {
					name : "Insight Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Insight") !== -1; },
					skills : [["Insight", "only"]]
				},
				"intimidation" : {
					name : "Intimidation Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Intimidation") !== -1; },
					skills : [["Intimidation", "only"]]
				},
				"investigation" : {
					name : "Investigation Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Investigation") !== -1; },
					skills : [["Investigation", "only"]]
				},
				"medicine" : {
					name : "Medicine Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Medicine") !== -1; },
					skills : [["Medicine", "only"]]
				},
				"nature" : {
					name : "Nature Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Nature") !== -1; },
					skills : [["Nature", "only"]]
				},
				"perception" : {
					name : "Perception Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Perception") !== -1; },
					skills : [["Perception", "only"]]
				},
				"performance" : {
					name : "Performance Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Performance") !== -1; },
					skills : [["Performance", "only"]]
				},
				"persuasion" : {
					name : "Persuasion Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Persuasion") !== -1; },
					skills : [["Persuasion", "only"]]
				},
				"religion" : {
					name : "Religion Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Religion") !== -1; },
					skills : [["Religion", "only"]]
				},
				"sleight of hand" : {
					name : "Sleight of Hand Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Sleight of Hand") !== -1; },
					skills : [["Sleight of Hand", "only"]]
				},
				"stealth" : {
					name : "Stealth Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Stealth") !== -1; },
					skills : [["Stealth", "only"]]
				},
				"survival" : {
					name : "Survival Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) { return v.skillProfs.indexOf("Survival") !== -1; },
					skills : [["Survival", "only"]]
				},
				"thieves' tools" : {
					name : "Thieves' Tools Expertise", description : "",
					source : [["SRD", 39], ["P", 96]],
					prereqeval : function(v) {
						return CurrentProfs.tool["thieves' tools"] || (/thieve.?s.{1,3}tools/i).test(v.toolProfs.toString());
					},
					eval : function () {
						if ((/thieve.?s.*tools/i).test(What('Too Text'))) {
							Checkbox('Too Exp', true);
						};
					},
					removeeval : function () {
						if ((/thieve.?s.*tools/i).test(What('Too Text'))) {
							Checkbox('Too Exp', false);
						};
					}
				}
			},
			"sneak attack" : {
				name : "Sneak Attack",
				source : [["SRD", 39], ["P", 96]],
				minlevel : 1,
				description : "\n   " + "Once per turn, I can add damage to finesse/ranged attack if I have adv." + "\n   " + "I don't need adv. if a conscious ally is within 5 ft of the target and I don't have disadv.",
				additional : levels.map(function (n) {
					return Math.ceil(n / 2) + "d6";
				}),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (classes.known.rogue && classes.known.rogue.level && !v.isSpell && !v.isDC && (v.isRangedWeapon || (/\bfinesse\b/i).test(fields.Description))) {
								v.sneakAtk = Math.ceil(classes.known.rogue.level / 2);
								fields.Description += (fields.Description ? '; ' : '') + 'Sneak attack ' + v.sneakAtk + 'd6';
							};
						},
						"Once per turn, when I attack with a ranged or finesse weapon while I have advantage or an conscious ally is within 5 ft of the target, I can add my sneak attack damage to the attack."
					]
				}
			},
			"thieves cant" : {
				name : "Thieves' Cant",
				source : [["SRD", 39], ["P", 96]],
				minlevel : 1,
				description : "\n   " + "I know the secret rogue language that I can use to convey messages inconspicuously",
				languageProfs : ["Thieves' Cant"]
			},
			"cunning action" : {
				name : "Cunning Action",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 2,
				description : "\n   " + "I can use a bonus action to take the Dash, Disengage, or Hide action",
				action : ["bonus action", ""]
			},
			"subclassfeature3" : {
				name : "Roguish Archetype",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 3,
				description : "\n   " + "Choose a Roguish Archetype you strive to emulate and put it in the \"Class\" field" + "\n   " + "Choose either Arcane Trickster, Assassin, Mastermind, Swashbuckler, or Thief"
			},
			"uncanny dodge" : {
				name : "Uncanny Dodge",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 5,
				description : "\n   " + "As a reaction, I halve the damage of an attack from an attacker that I can see",
				action : ["reaction", ""]
			},
			"evasion" : {
				name : "Evasion",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 7,
				description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
				savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
			},
			"reliable talent" : {
				name : "Reliable Talent",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 11,
				description : "\n   " + "If I make an ability check where I add my proficiency bonus, rolls of 9 or lower are 10"
			},
			"blindsense" : {
				name : "Blindsense",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 14,
				description : "\n   " + "With my hearing, I can locate hidden or invisible creatures that are within 10 ft of me",
				vision : [["Blindsense", 10]]
			},
			"slippery mind" : {
				name : "Slippery Mind",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 15,
				description : "\n   " + "I am proficient with Wisdom saving throws",
				saves : ["Wis"]
			},
			"elusive" : {
				name : "Elusive",
				source : [["SRD", 40], ["P", 96]],
				minlevel : 18,
				description : "\n   " + "Attackers do not gain advantage on attacks vs. me, unless I am incapacitated"
			},
			"stroke of luck" : {
				name : "Stroke of Luck",
				source : [["SRD", 40], ["P", 97]],
				minlevel : 20,
				description : "\n   " + "I can turn a missed attack into a hit or a failed ability check into a natural 20",
				recovery : "short rest",
				usages : 1
			}
		}
	},

	"sorcerer" : {
		regExpSearch : /sorcerer|witch/i,
		name : "Sorcerer",
		source : [["SRD", 42], ["P", 99]],
		primaryAbility : "Charisma",
		abilitySave : 6,
		prereqs : "Charisma 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 6,
		saves : ["Con", "Cha"],
		skillstxt : {
			primary : "Choose two from Arcana, Deception, Insight, Intimidation, Persuasion, and Religion"
		},
		weaponProfs : {
			primary : [false, false, ["dagger", "dart", "light crossbow", "quarterstaff", "sling"]]
		},
		equipment : "Sorcerer starting equipment:" +
			"\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;" +
			"\n \u2022 A component pouch -or- an arcane focus;" +
			"\n \u2022 A dungeoneer's pack -or- an explorer's pack;" +
			"\n \u2022 Two daggers." +
			"\n\nAlternatively, choose 3d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Sorcerous Origin", ["sorcerer-draconic bloodline"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
			spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15]
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 43], ["P", 101]],
				minlevel : 1,
				description : "\n   " + "I can cast sorcerer cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus ",
				additional : levels.map(function (n, idx) {
					var cantr = [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6][idx];
					var splls = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15][idx];
					return cantr + " cantrips \u0026 " + splls + " spells known";
				})
			},
			"subclassfeature1" : {
				name : "Sorcerous Origin",
				source : [["SRD", 43], ["P", 101]],
				minlevel : 1,
				description : "\n   " + "Choose the Sorcerous Origin for your innate powers and put it in the \"Class\" field" + "\n   " + "Choose either Draconic Bloodline, Storm Sorcery, or Wild Magic"
			},
			"font of magic" : {
				name : "Font of Magic",
				source : [["SRD", 43], ["P", 101]],
				minlevel : 2,
				description : desc([
					"As a bonus action, I can use sorcery points to create spell slots and vice versa",
					"I can convert spell slots to sorcery points at a rate of 1 point per spell slot level",
					"I can convert sorcery points to spell slots, which last until I finish a long rest, as follows:",
					"Level 1 for 2 sorcery points;   level 2 for 3 sorcery points;   level 3 for 5 sorcery points",
					"Level 4 for 6 sorcery points;   level 5 for 7 sorcery points"
				]),
				usages : [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				recovery : "long rest",
				action : ["bonus action", ""],
				additional : "Sorcery Points"
			},
			"metamagic" : {
				name : "Metamagic",
				source : [["SRD", 44], ["P", 101]],
				minlevel : 3,
				description : "\n   " + "Use the \"Choose Feature\" button above to add a Metamagic option to the third page" + "\n   " + "I can use only 1 Metamagic option on a spell unless otherwise written",
				additional : levels.map(function (n) {
					return n < 3 ? "" : (n < 10 ? 2 : n < 17 ? 3 : 4) + " known";
				}),
				extraname : "Metamagic Option",
				extrachoices : ["Careful Spell", "Distant Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
				extraTimes : levels.map(function (n) {
					return n < 3 ? 0 : n < 10 ? 2 : n < 17 ? 3 : 4;
				}),
				"careful spell" : {
					name : "Careful Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "If the spell allows a saving throw, I can protect Cha modifier number of creatures" + "\n   " + "The selected creatures automatically succeed on their saving throws vs. the spell"
				},
				"distant spell" : {
					name : "Distant Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "I double the range of the spell or make the range 30 ft if the range was touch"
				},
				"empowered spell" : {
					name : "Empowered Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "If the spell uses damage dice, I can reroll my Charisma modifier number of damage dice" + "\n   " + "I can Empower a spell even if I use another Metamagic option on it"
				},
				"extended spell" : {
					name : "Extended Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "If the spell has a duration of at least 1 min, I can double it, up to 24 hours"
				},
				"heightened spell" : {
					name : "Heightened Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [3 sorcery points]" + "\n   " + "If the spell allows a saving throw, I can have one target get disadv. on their first save"
				},
				"quickened spell" : {
					name : "Quickened Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [2 sorcery points]" + "\n   " + "If the spell has a casting time of 1 action, I can cast it as a bonus action",
					action : ["bonus action", ""]
				},
				"subtle spell" : {
					name : "Subtle Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point]" + "\n   " + "I can cast the spell without the need to use somatic or verbal components"
				},
				"twinned spell" : {
					name : "Twinned Spell",
					source : [["SRD", 44], ["P", 102]],
					description : " [1 sorcery point per spell level, minimum 1]" + "\n   " + "If spell/cantrip has a target of one and not self, I can aim it at second target within range"
				}
			},
			"sorcerous restoration" : {
				name : "Sorcerous Restoration",
				source : [["SRD", 44], ["P", 102]],
				minlevel : 20,
				description : "\n   " + "I regain 4 expended sorcery points whenever I finish a short rest"
			}
		}
	},

	"warlock" : {
		regExpSearch : /warlock/i,
		name : "Warlock",
		source : [["SRD", 46], ["P", 105]],
		primaryAbility : "Charisma",
		abilitySave : 6,
		prereqs : "Charisma 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 8,
		saves : ["Wis", "Cha"],
		skillstxt : {
			primary : "Choose two from Arcana, Deception, History, Intimidation, Investigation, Nature, and Religion"
		},
		armorProfs : {
			primary : [true, false, false, false],
			secondary : [true, false, false, false]
		},
		weaponProfs : {
			primary : [true, false],
			secondary : [true, false]
		},
		equipment : "Warlock starting equipment:" +
			"\n \u2022 A light crossbow and 20 bolts -or- any simple weapon;" +
			"\n \u2022 A component pouch -or- an arcane focus;" +
			"\n \u2022 A scholar's pack -or- a dungeoneer's pack;" +
			"\n \u2022 Leather armor, any simple weapon, and two daggers." +
			"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Otherworldly Patron", ["warlock-the fiend"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : "warlock1",
		spellcastingKnown : {
			cantrips : [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
			spells : [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
		},
		spellcastingList : {
			"class" : "warlock",
			level : [0, 5] //lower and higher limit
		},
		features : {
			"pact magic" : {
				name : "Pact Magic",
				source : [["SRD", 46], ["P", 107]],
				minlevel : 1,
				description : "\n   " + "I can cast warlock cantrips/spells that I know, using Charisma as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I regain these spell slots on a short rest",
				additional : levels.map(function (n, idx) {
					var cantr = [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4][idx];
					var splls = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15][idx];
					var slots = n < 2 ? 1 : n < 11 ? 2 : n < 17 ? 3 : 4;
					var sllvl = n < 3 ? 1 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : 5;
					return cantr + " cantrips \u0026 " + splls + " spells known; " + slots + "\u00D7 " + Base_spellLevelList[sllvl] + " spell slot";
				})
			},
			"subclassfeature1" : {
				name : "Otherworldly Patron",
				source : [["SRD", 46], ["P", 107]],
				minlevel : 1,
				description : "\n   " + "Choose the Otherworldly Patron you have a bargain with and put it in the \"Class\" field" + "\n   " + "Choose either the Archfey, the Fiend, the Great Old One, or the Undying"
			},
			"eldritch invocations" : {
				name : "Eldritch Invocations",
				source : [["SRD", 47], ["P", 107]],
				minlevel : 2,
				description : "\n   " + "Use the \"Choose Feature\" button above to add Eldritch Invocations to the third page" + "\n   " + "Whenever I gain a warlock level, I can replace an invocation I know with another",
				additional : levels.map(function (n) {
					return n < 2 ? "" : (n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8) + " invocations known";
				}),
				extraname : "Eldritch Invocation",
				extrachoices : ["Agonizing Blast (prereq: Eldritch Blast cantrip)", "Armor of Shadows", "Ascendant Step (prereq: level 9 warlock)", "Beast Speech", "Beguiling Influence", "Bewitching Whispers (prereq: level 7 warlock)", "Book of Ancient Secrets (prereq: Pact of the Tome)", "Chains of Carceri (prereq: level 15 warlock, Pact of the Chain)", "Devil's Sight", "Dreadful Word (prereq: level 7 warlock)", "Eldritch Sight", "Eldritch Spear (prereq: Eldritch Blast cantrip)", "Eyes of the Rune Keeper", "Fiendish Vigor", "Gaze of Two Minds", "Lifedrinker (prereq: level 12 warlock, Pact of the Blade)", "Mask of Many Faces", "Master of Myriad Forms (prereq: level 15 warlock)", "Minions of Chaos (prereq: level 9 warlock)", "Mire the Mind (prereq: level 5 warlock)", "Misty Visions", "One with Shadows (prereq: level 5 warlock)", "Otherworldly Leap (prereq: level 9 warlock)", "Repelling Blast (prereq: Eldritch Blast cantrip)", "Sculptor of Flesh (prereq: level 7 warlock)", "Sign of Ill Omen (prereq: level 5 warlock)", "Thief of Five Fates", "Thirsting Blade (prereq: level 5 warlock, Pact of the Blade)", "Visions of Distant Realms (prereq: level 15 warlock)", "Voice of the Chain Master (prereq: Pact of the Chain)", "Whispers of the Grave (prereq: level 9 warlock)", "Witch Sight (prereq: level 15 warlock)"],
				extraTimes : levels.map(function (n) {
					return n < 2 ? 0 : n < 5 ? 2 : n < 7 ? 3 : n < 9 ? 4 : n < 12 ? 5 : n < 15 ? 6 : n < 18 ? 7 : 8;
				}),
				"agonizing blast (prereq: eldritch blast cantrip)" : {
					name : "Agonizing Blast",
					description : "\n   " + "I can add my Charisma modifier to every hit with my Eldritch Blast cantrip",
					source : [["SRD", 48], ["P", 110]],
					prereqeval : function(v) { return v.hasEldritchBlast; },
					calcChanges : {
						atkCalc : [
							function (fields, v, output) {
								if (v.baseWeaponName == 'eldritch blast') output.extraDmg += What('Cha Mod');
							},
							"I add my Charisma modifier to the damage of every beam of my Eldritch Blast cantrip."
						],
						spellAdd : [
							function (spellKey, spellObj, spName) {
								if (spellKey == "eldritch blast") {
									spellObj.description = spellObj.description.replace("1d10 Force damage", "1d10+" + What("Cha Mod") + " Force dmg");
									return true;
								};
							},
							"I add my Charisma modifier to the damage of every beam of my Eldritch Blast cantrip."
						]
					}
				},
				"armor of shadows" : {
					name : "Armor of Shadows",
					description : "\n   " + "I can cast Mage Armor on myself at will, without using a spell slot or material components",
					source : [["SRD", 48], ["P", 110]],
					spellcastingBonus : {
						name : "Armor of Shadows",
						spells : ["mage armor"],
						selection : ["mage armor"],
						firstCol : "atwill"
					},
					spellChanges : {
						"mage armor" : {
							range : "Self",
							components : "V,S",
							compMaterial : "",
							description : "If I'm not wearing armor, I gain AC 13 + Dex modifier for the duration; spell ends if I don armor",
							changes : "With the Armor of Shadows invocation I can cast Mage Armor without a material component, but only on myself."
						}
					}
				},
				"ascendant step (prereq: level 9 warlock)" : {
					name : "Ascendant Step",
					description : "\n   " + "I can cast Levitate on myself at will, without using a spell slot or material components",
					source : [["SRD", 48], ["P", 110]],
					spellcastingBonus : {
						name : "Ascendant Step",
						spells : ["levitate"],
						selection : ["levitate"],
						firstCol : "atwill"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 9; },
					spellChanges : {
						"levitate" : {
							range : "Self",
							components : "V,S",
							compMaterial : "",
							description : "I rise vertically, up to 20 ft; during my move, I can move up/down up to 20 ft",
							changes : "With the Ascendant Step invocation I can cast Levitate without a material component, but only on myself."
						}
					}
				},
				"beast speech" : {
					name : "Beast Speech",
					description : "\n   " + "I can cast Speak with Animals at will, without using a spell slots",
					source : [["SRD", 48], ["P", 110]],
					spellcastingBonus : {
						name : "Beast Speech",
						spells : ["speak with animals"],
						selection : ["speak with animals"],
						firstCol : "atwill"
					}
				},
				"beguiling influence" : {
					name : "Beguiling Influence",
					description : "\n   " + "I gain proficiencies with the Deception and Persuasion skills",
					source : [["SRD", 48], ["P", 110]],
					skills : ["Deception", "Persuasion"]
				},
				"bewitching whispers (prereq: level 7 warlock)" : {
					name : "Bewitching Whispers",
					description : "\n   " + "Once per long rest, I can cast Compulsion using a warlock spell slot",
					source : [["SRD", 48], ["P", 110]],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Bewitching Whispers",
						spells : ["compulsion"],
						selection : ["compulsion"],
						firstCol : "oncelr"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 7; }
				},
				"book of ancient secrets (prereq: pact of the tome)" : {
					name : "Book of Ancient Secrets",
					description : desc([
						"I can add any two 1st-level spells that have the ritual tag to my Book of Shadows",
						"If I come across spells with the ritual tag, I can transcribe them into my book, as well",
						"I can cast any of these spells in my Book of Shadows as rituals, but not as normal spells",
						"I can cast my known warlock spells as rituals if they have the ritual tag"
					]),
					source : [["SRD", 48], ["P", 110]],
					eval : function() {
						CurrentSpells['book of ancient secrets'] = {
							name : 'Book of Ancient Secrets',
							ability : 6,
							list : {class : 'any', ritual : true},
							known : {spells : 'book'},
							refType : "feat"
						};
						SetStringifieds('spells'); CurrentUpdates.types.push('spells');
					},
					removeeval : function() {
						delete CurrentSpells['book of ancient secrets'];
						SetStringifieds('spells'); CurrentUpdates.types.push('spells');
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 3 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the tome'; },
					calcChanges : {
						spellAdd : [
							function (spellKey, spellObj, spName) {
								if (spName == "book of ancient secrets") {
									spellObj.firstCol = "(R)";
									if (!(/.*(\d+ ?h\b|special|see b).*/i).test(spellObj.time)) {
										var numMinutes = Number(spellObj.time.replace(/(\d+) ?min.*/, "$1"));
										if (isNaN(numMinutes)) numMinutes = 0;
										spellObj.time = (numMinutes + 10) + " min";
									}
									return true;
								};
							},
							"By the Book of Ancient Secrets invocation, I can cast ritual spells from my Book of Shadows. Ritual spell always have a casting time of 10 minutes or more."
						]
					}
				},
				"chains of carceri (prereq: level 15 warlock, pact of the chain)" : {
					name : "Chains of Carceri",
					description : "\n   " + "I can cast Hold Monster at will if the target is a celestial, fiend, or elemental" + "\n   " + "This uses no spell slots/material comp.; I can only target an individual once per long rest",
					source : [["SRD", 49], ["P", 110]],
					spellcastingBonus : {
						name : "Chains of Carceri",
						spells : ["hold monster"],
						selection : ["hold monster"],
						firstCol : "atwill"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 15 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the chain'; },
					spellChanges : {
						"speak with animals" : {
							components : "V,S",
							compMaterial : "",
							description : "1 celestial, fiend, or elemental, save or paralyzed; extra save at end of each turn",
							changes : "With the Chains of Carceri invocation I can cast Hold Monster without a material component, but only on a celestial, fiend, or elemental."
						}
					}
				},
				"devil's sight" : {
					name : "Devil's Sight",
					description : "\n   " + "I can see in magical and nonmagical darkness out to 120 ft",
					source : [["SRD", 49], ["P", 110]],
					vision : [["Devil's sight", 120]]
				},
				"dreadful word (prereq: level 7 warlock)" : {
					name : "Dreadful Word",
					description : "\n   " + "Once per long rest, I can cast Confusion using a warlock spell slot",
					source : [["SRD", 49], ["P", 110]],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Dreadful Word",
						spells : ["confusion"],
						selection : ["confusion"],
						firstCol : "oncelr"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 7; }
				},
				"eldritch sight" : {
					name : "Eldritch Sight",
					description : "\n   " + "I can cast Detect Magic at will, without using a spell slot",
					source : [["SRD", 49], ["P", 110]],
					spellcastingBonus : {
						name : "Eldritch Sight",
						spells : ["detect magic"],
						selection : ["detect magic"],
						firstCol : "atwill"
					}
				},
				"eldritch spear (prereq: eldritch blast cantrip)" : {
					name : "Eldritch Spear",
					description : "\n   " + "My Eldritch Blast cantrip has a range of 300 ft",
					source : [["SRD", 49], ["P", 111]],
					prereqeval : function(v) { return v.hasEldritchBlast; },
					calcChanges : {
						atkAdd : [
							function (fields, v) {
								if (v.baseWeaponName == 'eldritch blast') fields.Range = 300 * (v.rangeM ? v.rangeM : 1) + ' ft';
							},
							"My Eldritch Blast cantrip has a range of 300 ft."
						]
					},
					spellChanges : {
						"eldritch blast" : {
							range : "300 ft",
							changes : "My Eldritch Blast cantrip has a range of 300 ft."
						}
					}
				},
				"eyes of the rune keeper" : {
					name : "Eyes of the Rune Keeper",
					description : "\n   " + "I can read all writing",
					source : [["SRD", 49], ["P", 111]]
				},
				"fiendish vigor" : {
					name : "Fiendish Vigor",
					description : "\n   " + "I can cast False Life on myself at will, without using a spell slot or material components",
					source : [["SRD", 49], ["P", 111]],
					spellcastingBonus : {
						name : "Fiendish Vigor",
						spells : ["false life"],
						selection : ["false life"],
						firstCol : "atwill"
					},
					spellChanges : {
						"false life" : {
							components : "V,S",
							compMaterial : "",
							description : "I gain 1d4+4 temporary hit points for the duration",
							changes : "With the Fiendish Vigor invocation I can cast False Life without a material component."
						}
					}
				},
				"gaze of two minds" : {
					name : "Gaze of Two Minds",
					description : "\n   " + "As an action, I can touch a willing creature and perceive through its senses (not my own)" + "\n   " + "This lasts until the end of my next turn, but I can use an action to extend the duration",
					source : [["SRD", 49], ["P", 111]]
				},
				"lifedrinker (prereq: level 12 warlock, pact of the blade)" : {
					name : "Lifedrinker",
					description : "\n   " + "My pact weapon does extra necrotic damage equal to my Charisma modifier",
					source : [["SRD", 49], ["P", 111]],
					calcChanges : {
						atkCalc : [
							function (fields, v, output) {
								if (v.pactWeapon || (v.isMeleeWeapon && (/\bpact\b/i).test(v.WeaponText))) output.extraDmg += What('Cha Mod');
							},
							"If I include the word 'Pact' in a melee weapon's name or description, the calculation will add my Charisma modifier to its damage. However, it won't say that this added damage is of the necrotic type, as it can only display a single damage type."
						]
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 12 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the blade'; }
				},
				"mask of many faces" : {
					name : "Mask of Many Faces",
					description : "\n   " + "I can cast Disguise Self on myself at will, without using a spell slot",
					source : [["SRD", 49], ["P", 111]],
					spellcastingBonus : {
						name : "Mask of Many Faces",
						spells : ["disguise self"],
						selection : ["disguise self"],
						firstCol : "atwill"
					}
				},
				"master of myriad forms (prereq: level 15 warlock)" : {
					name : "Master of Myriad Forms",
					description : "\n   " + "I can cast Alter Self at will, without using a spell slot",
					source : [["SRD", 49], ["P", 111]],
					spellcastingBonus : {
						name : "Mask of Myriad Forms",
						spells : ["alter self"],
						selection : ["alter self"],
						firstCol : "atwill"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 15; }
				},
				"minions of chaos (prereq: level 9 warlock)" : {
					name : "Minions of Chaos",
					description : "\n   " + "Once per long rest, I can cast Conjure Elemental using a warlock spell slot",
					source : [["SRD", 49], ["P", 111]],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Minions of Chaos",
						spells : ["conjure elemental"],
						selection : ["conjure elemental"],
						firstCol : "oncelr"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 9; }
				},
				"mire the mind (prereq: level 5 warlock)" : {
					name : "Mire the Mind",
					description : "\n   " + "Once per long rest, I can cast Slow using a warlock spell slot",
					source : [["SRD", 49], ["P", 111]],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Mire the Mind",
						spells : ["slow"],
						selection : ["slow"],
						firstCol : "oncelr"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 5; }
				},
				"misty visions" : {
					name : "Misty Visions",
					description : "\n   " + "I can cast Silent Image at will, without using a spell slot or material components",
					source : [["SRD", 49], ["P", 111]],
					spellcastingBonus : {
						name : "Misty Visions",
						spells : ["silent image"],
						selection : ["silent image"],
						firstCol : "atwill"
					},
					spellChanges : {
						"silent image" : {
							components : "V,S",
							compMaterial : "",
							changes : "With the Misty Visions invocation I can cast Silent Image without a material component."
						}
					}
				},
				"one with shadows (prereq: level 5 warlock)" : {
					name : "One with Shadows",
					description : "\n   " + "As an action, when I'm in an area of dim light or darkness, I can become invisible" + "\n   " + "I become visible again when I move or take an action or reaction",
					source : [["SRD", 49], ["P", 111]],
					action : ["action", ""],
					prereqeval : function(v) { return classes.known.warlock.level >= 5; }
				},
				"otherworldly leap (prereq: level 9 warlock)" : {
					name : "Otherworldly Leap",
					description : "\n   " + "I can cast Jump on myself at will, without using a spell slot or material components",
					source : [["SRD", 49], ["P", 111]],
					spellcastingBonus : {
						name : "Otherworldly Leap",
						spells : ["jump"],
						selection : ["jump"],
						firstCol : "atwill"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 9; },
					spellChanges : {
						"jump" : {
							range : "Self",
							components : "V,S",
							compMaterial : "",
							description : "My jump distance is tripled for the duration",
							changes : "With the Otherworldly Leap invocation I can cast Jump without a material component, but only on myself."
						}
					}
				},
				"repelling blast (prereq: eldritch blast cantrip)" : {
					name : "Repelling Blast",
					description : "\n   " + "I can have creatures hit by my Eldritch Blast cantrip be pushed 10 ft away from me",
					source : [["SRD", 49], ["P", 111]],
					prereqeval : function(v) { return v.hasEldritchBlast; },
					calcChanges : {
						atkAdd : [
							function (fields, v) {
								if (v.baseWeaponName == 'eldritch blast') fields.Description += '; Target pushed back 10 ft';
							},
							"When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."
						]
					},
					spellChanges : {
						"eldritch blast" : {
							description : "Spell attack beam 1d10 Force damage \u0026 push 10 ft; beams can be combined; +1 beam at CL5,11,17",
							changes : "When I hit a creature with my Eldritch Blast cantrip, it is pushed 10 ft away from me."
						}
					}
				},
				"sculptor of flesh (prereq: level 7 warlock)" : {
					name : "Sculptor of Flesh",
					description : "\n   " + "Once per long rest, I can cast Polymorph using a warlock spell slot",
					source : [["SRD", 50], ["P", 111]],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Sculptor of Flesh",
						spells : ["polymorph"],
						selection : ["polymorph"],
						firstCol : "oncelr"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 7; }
				},
				"sign of ill omen (prereq: level 5 warlock)" : {
					name : "Sign of Ill Omen",
					description : "\n   " + "Once per long rest, I can cast Bestow Curse using a warlock spell slot",
					source : [["SRD", 50], ["P", 111]],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Sign of Ill Omen",
						spells : ["bestow curse"],
						selection : ["bestow curse"],
						firstCol : "oncelr"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 5; }
				},
				"thief of five fates" : {
					name : "Thief of Five Fates",
					description : "\n   " + "Once per long rest, I can cast Bane using a warlock spell slot",
					source : [["SRD", 50], ["P", 111]],
					usages : 1,
					recovery : "long rest",
					spellcastingBonus : {
						name : "Thief of Five Fates",
						spells : ["bane"],
						selection : ["bane"],
						firstCol : "oncelr"
					}
				},
				"thirsting blade (prereq: level 5 warlock, pact of the blade)" : {
					name : "Thirsting Blade",
					description : "\n   " + "When taking the attack action, I can attack twice with my pact weapon",
					source : [["SRD", 50], ["P", 111]],
					action : ['action', 'Pact Weapon (2 attacks per action)'],
					prereqeval : function(v) { return classes.known.warlock.level >= 5 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the blade'; }
				},
				"visions of distant realms (prereq: level 15 warlock)" : {
					name : "Visions of Distant Realms",
					description : "\n   " + "I can cast Arcane Eye at will, without using a spell slot",
					source : [["SRD", 50], ["P", 111]],
					spellcastingBonus : {
						name : "Visions of Distant Realms",
						spells : ["arcane eye"],
						selection : ["arcane eye"],
						firstCol : "atwill"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 15; }
				},
				"voice of the chain master (prereq: pact of the chain)" : {
					name : "Voice of the Chain Master",
					description : "\n   " + "While on the same plane as my familiar, I can communicate telepathically with it" + "\n   " + "Also, I can perceive through its senses and have it speak with my voice while doing so",
					source : [["SRD", 50], ["P", 111]],
					prereqeval : function(v) { return classes.known.warlock.level >= 3 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the chain'; }
				},
				"whispers of the grave (prereq: level 9 warlock)" : {
					name : "Whispers of the Grave",
					description : "\n   " + "I can cast Speak with Dead at will, without using a spell slot",
					source : [["SRD", 50], ["P", 111]],
					spellcastingBonus : {
						name : "Whispers of the Grave",
						spells : ["speak with dead"],
						selection : ["speak with dead"],
						firstCol : "atwill"
					},
					prereqeval : function(v) { return classes.known.warlock.level >= 9; }
				},
				"witch sight (prereq: level 15 warlock)" : {
					name : "Witch Sight",
					description : "\n   " + "I can see the true form of creatures (shapechangers/illusions/transmutations) within 30 ft",
					source : [["SRD", 50], ["P", 111]],
					vision : [["Witch sight", 30]],
					prereqeval : function(v) { return classes.known.warlock.level >= 15; }
				}
			},
			"pact boon" : {
				name : "Pact Boon",
				source : [["SRD", 47], ["P", 107]],
				minlevel : 3,
				description : "\n   " + "Choose a Pact Boon (Blade, Chain, or Tome) using the \"Choose Feature\" button above",
				choices : ["Pact of the Blade", "Pact of the Chain", "Pact of the Tome"],
				"pact of the blade" : {
					name : "Pact of the Blade",
					description : desc([
						"As an action, I can create a pact weapon in my empty hand; I'm proficient in its use",
						"I can choose the type of melee weapon every time I create it, and it has those statistics",
						"The weapon disappears if it is more than 5 ft away from me for 1 minute",
						"The weapon counts as magical; I can transform a magic weapon into my pact weapon",
						"This occurs over an hour-long ritual that I can perform during a short rest",
						"I can use an action to re-summon it in any form and can dismiss it as no action"
					]),
					action : ["action", ""],
					calcChanges : {
						atkCalc : [
							function (fields, v, output) {
								if (v.theWea.pactWeapon || (v.isMeleeWeapon && (/\bpact\b/i).test(v.WeaponText))) {
									v.pactWeapon = true;
								}
							}, ""
						],
						atkAdd : [
							function (fields, v) {
								if (v.pactWeapon || v.theWea.pactWeapon || (v.isMeleeWeapon && (/\bpact\b/i).test(v.WeaponText))) {
									v.pactWeapon = true;
									fields.Proficiency = true;
									if (!v.theWea.isMagicWeapon && !(/counts as( a)? magical/i).test(fields.Description)) fields.Description += (fields.Description ? '; ' : '') + 'Counts as magical';
								};
							},
							"If I include the word 'Pact' in a melee weapon's name, it gets treated as my Pact Weapon."
						]
					}
				},
				"pact of the chain" : {
					name : "Pact of the Chain",
					description : "\n   " + "I can cast Find Familiar as a ritual and it can be a Pseudodragon, Imp, Quasit, or Sprite" + "\n   " + "When taking the attack action, I can forgo 1 attack to have my familiar attack instead" + "\n   " + "It makes this 1 attack by using its reaction",
					spellcastingBonus : {
						name : "Pact of the Chain",
						spells : ["find familiar"],
						selection : ["find familiar"],
						firstCol : "(R)"
					}
				},
				"pact of the tome" : {
					name : "Pact of the Tome",
					source : [["SRD", 48], ["P", 108]],
					description : "\n   " + "I have a Book of Shadows with any three cantrips of my choosing" + "\n   " + "I can cast these cantrips as long as I have the book on my person" + "\n   " + "Regardless of the lists they come from, these count as warlock cantrips to me" + "\n   " + "I can get a replacement book with a 1-hour ceremony during a short or long rest",
					spellcastingBonus : {
						name : "Pact of the Tome",
						"class" : "any",
						level : [0, 0],
						times : 3
					}
				}
			},
			"mystic arcanum" : {
				name : "Mystic Arcanum",
				source : [["SRD", 48], ["P", 108]],
				minlevel : 11,
				description : "\n   " + "I can choose one spell from the warlock spell list of each level mentioned above" + "\n   " + "I can cast these spells each once per long rest without needing to use a spell slot",
				additional : ["", "", "", "", "", "", "", "", "", "", "6th level", "6th level", "6th and 7th level", "6th and 7th level", "6th, 7th, and 8th level", "6th, 7th, and 8th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level", "6th, 7th, 8th, and 9th level"],
				spellcastingBonus : [{
					name : "Mystic Arcanum (6)",
					"class" : "warlock",
					level : [6, 6],
					firstCol : "oncelr"
				}, {
					name : "Mystic Arcanum (7)",
					"class" : "warlock",
					level : [7, 7],
					firstCol : "oncelr",
					times : levels.map(function (n) { return n < 13 ? 0 : 1; })
				}, {
					name : "Mystic Arcanum (8)",
					"class" : "warlock",
					level : [8, 8],
					firstCol : "oncelr",
					times : levels.map(function (n) { return n < 15 ? 0 : 1; })
				}, {
					name : "Mystic Arcanum (9)",
					"class" : "warlock",
					level : [9, 9],
					firstCol : "oncelr",
					times : levels.map(function (n) { return n < 17 ? 0 : 1; })
				}]
			},
			"eldritch master" : {
				name : "Eldritch Master",
				source : [["SRD", 48], ["P", 108]],
				minlevel : 20,
				description : "\n   " + "I can regain all used pact magic spells slots by spending 1 minute entreating my patron",
				recovery : "long rest",
				usages : 1
			}
		}
	},

	"wizard" : {
		regExpSearch : /^(?=.*(wizard|mage|magus))(?!.*wild mage).*$/i,
		name : "Wizard",
		source : [["SRD", 52], ["P", 112]],
		primaryAbility : "Intelligence",
		abilitySave : 4,
		prereqs : "Intelligence 13",
		improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
		die : 6,
		saves : ["Int", "Wis"],
		skillstxt : {
			primary : "Choose two from Arcana, History, Insight, Investigation, Medicine, and Religion"
		},
		weaponProfs : {
			primary : [false, false, ["dagger", "dart", "light crossbow", "quarterstaff", "sling"]]
		},
		equipment : "Wizard starting equipment:" +
			"\n \u2022 A quarterstaff -or- a dagger;" +
			"\n \u2022 A component pouch -or- an arcane focus;" +
			"\n \u2022 A scholar's pack -or- an explorer's pack;" +
			"\n \u2022 A spellbook." +
			"\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
		subclasses : ["Arcane Tradition", ["wizard-evocation"]],
		attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		spellcastingFactor : 1,
		spellcastingKnown : {
			cantrips : [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
			spells : "book",
			prepared : true
		},
		features : {
			"spellcasting" : {
				name : "Spellcasting",
				source : [["SRD", 52], ["P", 114]],
				minlevel : 1,
				description : "\n   " + "I can cast prepared wizard cantrips/spells, using Intelligence as my spellcasting ability" + "\n   " + "I can use an arcane focus as a spellcasting focus" + "\n   " + "I can cast all wizard spells in my spellbook as rituals if they have the ritual tag",
				additional : levels.map(function (n, idx) {
					return [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5][idx] + " cantrips known";
				})
			},
			"arcane recovery" : {
				name : "Arcane Recovery",
				source : [["SRD", 53], ["P", 115]],
				minlevel : 1,
				description : "\n   " + "Once per day after a short rest, I can recover a number of 5th-level or lower spell slots",
				additional : levels.map(function (n) {
					var lvls = Math.ceil(n / 2);
					return lvls + " level" + (lvls > 1 ? "s" : "") + " of spell slots";
				}),
				usages : 1,
				recovery : "long rest"
			},
			"subclassfeature2" : {
				name : "Arcane Tradition",
				source : [["SRD", 53], ["P", 115]],
				minlevel : 2,
				description : "\n   " + "Choose the Arcane Tradition you studied and put it in the \"Class\" field" + "\n   " + "Choose either the School of Abjuration, Conjuration, Divination, Enchantment," + "\n   " + "Evocation, Illusion, Necromancy, or Transmutation, or become a Bladesinger"
			},
			"spell mastery" : {
				name : "Spell Mastery",
				source : [["SRD", 53], ["P", 115]],
				minlevel : 18,
				description : "\n   " + "By spending 8 hours in study, I can pick a 1st and 2nd-level spell in my spellbook" + "\n   " + "While prepared, I can cast them at their lowest levels without expending spell slots"
			},
			"signature spell" : {
				name : "Signature Spell",
				source : [["SRD", 54], ["P", 115]],
				minlevel : 20,
				description : "\n   " + "Two 3rd-level spells of my choice in my spellbook will always count as prepared" + "\n   " + "I can cast both at third level once per short rest without expending spell slots",
				recovery : "short rest",
				usages : 2
			}
		}
	}
};

var Base_ClassSubList = {
	"barbarian-berserker" : {
		regExpSearch : /^((?=.*\b(berserker|berserk|berserkr|ulfheoinn|ulfheonar)s?\b)|((?=.*(warrior|fighter))(?=.*(odin|thor)))).*$/i,
		subname : "Path of the Berserker",
		fullname : "Berserker",
		source : [["SRD", 9], ["P", 49]],
		abilitySave : 6,
		features : {
			"subclassfeature3" : {
				name : "Frenzy",
				source : [["SRD", 9], ["P", 49]],
				minlevel : 3,
				description : desc([
					"As a bonus action each turn while raging, I can make a melee attack",
					"After my rage is over, I suffer one level of exhaustion"
				]),
				action : ["bonus action", " attack (while raging)"]
			},
			"subclassfeature6" : {
				name : "Mindless Rage",
				source : [["SRD", 10], ["P", 49]],
				minlevel : 6,
				description : "\n   " + "While raging, I can't be charmed or frightened, and such effects are suspended",
				savetxt : { text : ["Immune to being charmed/frightened in rage"] }
			},
			"subclassfeature10" : {
				name : "Intimidating Presence",
				source : [["SRD", 10], ["P", 49]],
				minlevel : 10,
				description : "\n   " + "As an action, frighten one creature in 30 ft for one turn if it fails a Wisdom save" + "\n   " + "This effect ends if the creature is out of line of sight or more than 60 ft away\n   If a creature succeeds its saving throw, it is immune for 24 hours",
				action : ["action", ""]
			},
			"subclassfeature14" : {
				name : "Retaliation",
				source : [["SRD", 10], ["P", 50]],
				minlevel : 14,
				description : "\n   " + "When an enemy within 5 ft damages me, I can make a melee attack as a reaction",
				action : ["reaction", " (after taking damage)"]
			}
		}
	},
	"bard-college of lore" : {
		regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*lore).*$/i,
		subname : "College of Lore",
		source : [["SRD", 13], ["P", 54]],
		features : {
			"subclassfeature3" : {
				name : "Bonus Proficiencies",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 3,
				description : "\n   " + "I gain proficiency with three skills of my choice",
				skillstxt : "Choose any three skills"
			},
			"subclassfeature3.1" : {
				name : "Cutting Words",
				source : [["SRD", 13], ["P", 54]],
				minlevel : 3,
				description : "\n   " + "As a reaction, when a foe within earshot & 60 ft rolls ability check, attack or damage," + "\n   " + "I can subtract a Bardic Inspiration die from the result unless the foe can't be charmed",
				action : ["reaction", ""]
			},
			"subclassfeature6" : {
				name : "Additional Magical Secrets",
				source : [["SRD", 13], ["P", 55]],
				minlevel : 6,
				description : "\n   " + "I can add two spells/cantrips from any class to my Spells Known",
				spellcastingBonus : {
					name : "Additional Magical Secret",
					"class" : "any",
					times : 2
				}
			},
			"subclassfeature14" : {
				name : "Peerless Skill",
				source : [["SRD", 14], ["P", 55]],
				minlevel : 14,
				description : "\n   " + "When making an ability check, I can expend a use of Bardic Inspiration to add the die"
			}
		}
	},
	"cleric-life domain" : {
		regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*\b(life|living|healing)\b).*$/i,
		subname : "Life Domain",
		source : [["SRD", 17], ["P", 60]],
		spellcastingExtra : ["bless", "cure wounds", "lesser restoration", "spiritual weapon", "beacon of hope", "revivify", "death ward", "guardian of faith", "mass cure wounds", "raise dead"],
		features : {
			"subclassfeature1" : {
				name : "Bonus Proficiency",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 1,
				description : "\n   " + "I gain proficiency with heavy armor",
				armorProfs : [false, false, true, false]
			},
			"subclassfeature1.1" : {
				name : "Disciple of Life",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 1,
				description : desc([
					"Whenever a 1st-level or higher spell I cast restores HP to a creature, it heals more",
					"The creature regains an additional 2 + spell level (SL) worth of hit points",
					'Note that "X/SL" on the spell page means per spell slot level above the spell\'s normal level'
				]),
				calcChanges : {
					spellAdd : [
						// note that Heroes' Feast is omitted from the below because there is not enough space to amend its short description
						function (spellKey, spellObj, spName) {
							if (spellObj.psionic) return false;
							var startDescr = spellObj.description;
							switch (spellKey) {
								case "death ward" :
								case "harm" :
								case "virtue-uass" :
									return false;
								case "goodberry" :
									spellObj.description = spellObj.description.replace("Create ", "").replace("1 HP", "3+SL HP");
									break;
								case "enervation" :
									spellObj.description = spellObj.description.replace("action to repeat", "1 a to repeat").replace("see book", "see B");
								case "life transference" :
								case "vampiric touch" :
									spellObj.description = spellObj.description.replace(/(heals? (half|twice)( the damage dealt| that)?)( in HP)?/, "$1+2+SL");
									break;
								case "mass heal" :
									spellObj.description = spellObj.description.replace("creatures in range;", "crea in range, each then +11 HP;").replace("cured of", "cures").replace("and all diseases", "diseases");
									break;
								case "regenerate" :
									spellObj.description = spellObj.description.replace("1 HP/rnd", "3+SL HP/rnd");
								default :
									if ((/\bHP o(f|r)\b/).test(spellObj.description)) return false;
									var supremeTestRegex = /(.*?)(\d+d\d+\+?\d*)(\+\d+d?\d*\/\d?SL)?((\+spell(casting)? ability mod(ifier)?|(\+|-)\d+ \(.{3}\))? hp.*)/i;
									if (classes.known.cleric.level > 16 && supremeTestRegex.test(spellObj.description)) return false; // has supreme healer
									var testRegex = /(.*?)([1-9]\d*d?\d*)((\+\d+d?\d*\/\d?SL)?((\+spell(casting)? ability mod(ifier)?|(\+|-)\d+ \(.{3}\))? hp.*))/i;
									var theMatch = spellObj.description.match(testRegex);
									if (!theMatch) return false;
									try {
										var perLvl = theMatch[4] ? theMatch[4].replace(/.*(\/\d?SL).*/i, '$1') : "";
										theMatch[4] = theMatch[4] ? Number(theMatch[4].replace(/\/\d?SL/i, '')) + 1 : NaN;
										var repl2 = spellObj.level > 8 ? "$3" : isNaN(theMatch[4]) ? "+SL$3" : "+" + theMatch[4] + perLvl + "$5";
										var repl1 = isNaN(theMatch[2]) ? "$1$2+2" : isNaN(theMatch[4]) ? "$1" + (Number(theMatch[2]) + 2) : "$1" + (Number(theMatch[2]) + 2 + spellObj.level);
										spellObj.description = spellObj.description.replace(testRegex, repl1 + repl2);
									} catch (err) {
										spellObj.description = startDescr;
									}
							}
							return startDescr !== spellObj.description;
						},
						"When I use a spell that restores hit points, it restores an additional 2 + the level of the spell slot (or spell slot equivalent) used to cast the spell."
					]
				}
			},
			"subclassfeature2" : {
				name : "Channel Divinity: Preserve Life",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 2,
				description : "\n   " + "As an action, I can heal any creature within 30 ft of me up to half their maximum HP" + "\n   " + "I divide the number of hit points among the creatures as I see fit",
				additional : ["", "10 hit points", "15 hit points", "20 hit points", "25 hit points", "30 hit points", "35 hit points", "40 hit points", "45 hit points", "50 hit points", "55 hit points", "60 hit points", "65 hit points", "70 hit points", "75 hit points", "80 hit points", "85 hit points", "90 hit points", "95 hit points", "100 hit points"],
				action : ["action", ""]
			},
			"subclassfeature6" : {
				name : "Blessed Healer",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 6,
				description : "\n   " + "When I restore HP to another with a spell, I regain 2 + the spell (slot) level in HP",
				calcChanges : {
					spellAdd : [
						// note that several healing spells are not present here because they don't restore hp at casting (only later)
						function (spellKey, spellObj, spName) {
							var startDescr = spellObj.description;
							switch (spellKey) {
								case "life transference" :
									spellObj.description = spellObj.description.replace("Necrotic", "Necro").replace(", and", ",") + "; I then regain 2+SL HP";
									break;
								case "mass heal" :
									spellObj.description = "Heal 700 HP, split over crea in range, each then +11 HP; also cures blind, deaf, diseases; I heal +11 HP";
									break;
								case "power word heal" :
									spellObj.description = spellObj.description.replace(/heals all.*/i, "full HP; not charmed, frightened, paralyzed, stunned; can stand up as rea; if other, I heal 2+SL");
									break;
								case "regenerate" :
									spellObj.description = spellObj.description.replace(" for rest of duration", "");
								case "heal" :
									spellObj.description = spellObj.description.replace("all diseases", "diseases");
								case "cure wounds" :
								case "healing word" :
								case "mass cure wounds" :
								case "mass healing word" :
								case "prayer of healing" :
									spellObj.description = spellObj.description.replace(/creatures?/i, "crea").replace("within", "in").replace("spellcasting ability modifier", "spellcasting ability mod") + "; if other, I heal 2+SL";
							}
							return startDescr !== spellObj.description;
						},
						"When I cast a spell that restores hit points to another creature than myself at the moment of casting, I also heal 2 + the level of the spell slot (or spell slot equivalent) hit points."
					]
				}
			},
			"subclassfeature8" : {
				name : "Divine Strike",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 8,
				description : "\n   " + "Once per turn, when I hit a creature with a weapon attack, I can do extra damage",
				additional : levels.map(function (n) {
					if (n < 8) return "";
					return "+" + (n < 14 ? 1 : 2) + "d8 radiant damage";
				}),
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (classes.known.cleric && classes.known.cleric.level > 7 && !v.isSpell) {
								fields.Description += (fields.Description ? '; ' : '') + 'Once per turn +' + (classes.known.cleric.level < 14 ? 1 : 2) + 'd8 radiant damage';
							}
						},
						"Once per turn, I can have one of my weapon attacks that hit do extra radiant damage."
					]
				}
			},
			"subclassfeature17" : {
				name : "Supreme Healing",
				source : [["SRD", 17], ["P", 60]],
				minlevel : 17,
				description : "\n   " + "When I restore HP with a spell, I heal the maximum amount instead of rolling the dice",
				calcChanges : {
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (spellObj.psionic || (/color spray|sleep/).test(spellKey)) return;
							var startDescr = spellObj.description;
							var testRegex = /(.*?)(\d+d\d+\+?\d*)(\+\d+d?\d*\/\d?SL)?((\+spell(casting)? (ability )?mod(ifier)?|(\+|-)\d+ \(.{3}\))? hp.*)/i;
							var theMatch = spellObj.description.match(testRegex);
							if (!theMatch) return false;
							try {
								var lvl9 = spellObj.level > 8;
								var perLvl = theMatch[3] ? theMatch[3].replace(/.*(\/\d?SL).*/i, '$1') : "";
								theMatch[2] = Number(theMatch[2].replace(/(\d+).*/, '$1')) * Number(theMatch[2].replace(/\d+d(\d+).*/, '$1')) + ((/\d+d\d+\+(\d+)/).test(theMatch[2]) ? Number(theMatch[2].replace(/\d+d\d+\+(\d+)/, '$1')) : 0) + 2 + (perLvl || lvl9 ? spellObj.level : "+SL");
								theMatch[3] = theMatch[3] ? Number(theMatch[3].replace(/\+(\d+).*/, '$1')) * ((/\+\d+d(\d+).*/).test(theMatch[3]) ? Number(theMatch[3].replace(/\+\d+d(\d+).*/, '$1')) : 1) + 1 : NaN;
								var repl = isNaN(theMatch[3]) ? "$1" + theMatch[2] + "$4" : "$1" + theMatch[2] + "+" + theMatch[3] + perLvl + "$4";
								spellObj.description = spellObj.description.replace(testRegex, repl);
							} catch (err) {
								spellObj.description = startDescr;
							}
							return startDescr !== spellObj.description;
						},
						"When I use a spell that restores hit points, it restores the maximum of the dice rolled and an additional 2 + the level of the spell slot (or spell slot equivalent) used to cast the spell."
					]
				}
			}
		}
	},
	"druid-circle of the land" : {
		regExpSearch : /^(?=.*(druid|shaman))(?=.*\b(land|arctic|coast|deserts?|forests?|grasslands?|savannah|steppes?|mountains?|swamps?|underdark)\b).*$/i,
		subname : "Circle of the Land",
		source : [["SRD", 21], ["P", 68]],
		features : {
			"subclassfeature2" : {
				name : "Bonus Cantrip",
				source : [["SRD", 21], ["P", 68]],
				minlevel : 2,
				description : "\n   " + "I know one additional druid cantrip of my choice",
				spellcastingBonus : {
					name : "Bonus Druid Cantrip",
					"class" : "druid",
					level : [0, 0]
				}
			},
			"subclassfeature2.1" : {
				name : "Natural Recovery",
				source : [["SRD", 21], ["P", 68]],
				minlevel : 2,
				description : "\n   " + "After a short rest, I can recover a number of 5th-level or lower spell slots",
				additional : ["1 level spell slots", "1 level spell slots", "2 levels spell slots", "2 levels spell slots", "3 levels spell slots", "3 levels spell slots", "4 levels spell slots", "4 levels spell slots", "5 levels spell slots", "5 levels spell slots", "6 levels spell slots", "6 levels spell slots", "7 levels spell slots", "7 levels spell slots", "8 levels spell slots", "8 levels spell slots", "9 levels spell slots", "9 levels spell slots", "10 levels spell slots", "10 levels spell slots"],
				usages : 1,
				recovery : "long rest"
			},
			"subclassfeature3" : {
				name : "Circle Spells",
				source : [["SRD", 21], ["P", 68]],
				minlevel : 3,
				description : "\n   " + "Choose a terrain that grants you spells using the \"Choose Feature\" button above",
				choices : ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"],
				"arctic" : {
					name : "Arctic Circle Spells",
					description : "\n   " + "My mystical connection to the arctic infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["hold person", "spike growth", "sleet storm", "slow", "freedom of movement", "ice storm", "commune with nature", "cone of cold"]
				},
				"coast" : {
					name : "Coast Circle Spells",
					description : "\n   " + "My mystical connection to the coast infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["mirror image", "misty step", "water breathing", "water walk", "control water", "freedom of movement", "conjure elemental", "scrying"]
				},
				"desert" : {
					name : "Desert Circle Spells",
					description : "\n   " + "My mystical connection to the desert infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["blur", "silence", "create food and water", "protection from energy", "blight", "hallucinatory terrain", "insect plague", "wall of stone"]
				},
				"forest" : {
					name : "Forest Circle Spells",
					description : "\n   " + "My mystical connection to the forest infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["barkskin", "spider climb", "call lightning", "plant growth", "divination", "freedom of movement", "commune with nature", "tree stride"]
				},
				"grassland" : {
					name : "Grassland Circle Spells",
					description : "\n   " + "My connection to the grassland infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["invisibility", "pass without trace", "daylight", "haste", "divination", "freedom of movement", "dream", "insect plague"]
				},
				"mountain" : {
					name : "Mountain Circle Spells",
					description : "\n   " + "My connection to the mountains infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["spider climb", "spike growth", "lightning bolt", "meld into stone", "stone shape", "stoneskin", "passwall", "wall of stone"]
				},
				"swamp" : {
					name : "Swamp Circle Spells",
					description : "\n   " + "My mystical connection to the swamp infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["darkness", "melf's acid arrow", "water walk", "stinking cloud", "freedom of movement", "locate creature", "insect plague", "scrying"]
				},
				"underdark" : {
					name : "Underdark Circle Spells",
					description : "\n   " + "My connection to the underdark infuses me with the ability to cast certain spells" + "\n   " + "These are always prepared, but don't count against the number of spells I can prepare",
					spellcastingExtra : ["spider climb", "web", "gaseous form", "stinking cloud", "greater invisibility", "stone shape", "cloudkill", "insect plague"]
				}
			},
			"subclassfeature6" : {
				name : "Land's Stride",
				source : [["SRD", 22], ["P", 68]],
				minlevel : 6,
				description : "\n   " + "I can travel through nonmagical, difficult terrain without penalty" + "\n   " + "I have advantage on saves vs. plants that impede movement by magical influence",
				savetxt : { adv_vs : ["magical plants that impede movement"] }
			},
			"subclassfeature10" : {
				name : "Nature's Ward",
				source : [["SRD", 22], ["P", 68]],
				minlevel : 10,
				description : "\n   " + "I am immune to poison/disease and I can't be charmed/frightened by elementals or fey",
				savetxt : { text : ["Immune to being charmed or frightened by elementals or fey"], immune : ["poison", "disease"] }
			},
			"subclassfeature14" : {
				name : "Nature's Sanctuary",
				source : [["SRD", 22], ["P", 68]],
				minlevel : 14,
				description : "\n   " + "When a beast or plant attacks me, it must make a Wis save or pick a different target" + "\n   " + "If it can't, it automatically misses; On a successful save, it is immune for 24 hours"
			}
		}
	},
	"fighter-champion" : {
		regExpSearch : /champion/i,
		subname : "Champion",
		fullname : "Champion",
		source : [["SRD", 25], ["P", 72]],
		features : {
			"subclassfeature3" : {
				name : "Improved Critical",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 3,
				description : "\n   " + "I score a critical hit with my weapon attacks on a roll of 19 and 20",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (!v.isSpell && !v.CritChance && classes.known.fighter && classes.known.fighter.level < 15) {
								fields.Description += (fields.Description ? '; ' : '') + 'Crit on 19-20';
								v.CritChance = 19;
							};
						},
						"My weapon attacks score a critical on a to hit roll of both 19 and 20."
					]
				}
			},
			"subclassfeature7" : {
				name : "Remarkable Athlete",
				source : [["SRD", 25], ["P", 72]],
				minlevel : 7,
				description : "\n   " + "I add half my proficiency bonus to Str/Dex/Con checks if I would otherwise add none" + "\n   " + "When making running jumps, I add my Strength modifier to the distance in feet",
				eval : function() { Checkbox('Remarkable Athlete', true); },
				removeeval : function() { Checkbox('Remarkable Athlete', false); }
			},
			"subclassfeature10" : function () {
				var FSfea = newObj(Base_ClassList.fighter.features["fighting style"]);
				FSfea.name = "Additional Fighting Style";
				FSfea.source = [["SRD", 25], ["P", 73]];
				FSfea.minlevel = 10;
				FSfea.description = "\n   " + "Choose an Additional Fighting Style using the \"Choose Feature\" button above ";
				return FSfea;
			}(),
			"subclassfeature15" : {
				name : "Superior Critical",
				source : [["SRD", 25], ["P", 73]],
				minlevel : 15,
				description : "\n   " + "I score a critical hit with my weapon attacks on a roll of 18, 19, and 20",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isSpell) return;
							if (v.CritChance && v.CritChance > 18) {
								fields.Description = fields.Description.replace('Crit on ' + CritChance + '-20', 'Crit on 18-20');
								v.CritChance = 18;
							} else if (!v.CritChance) {
								fields.Description += (fields.Description ? '; ' : '') + 'Crit on 18-20';
								v.CritChance = 18;
							};
						},
						"My weapon attacks also score a critical on a to hit roll of 18."
					]
				}
			},
			"subclassfeature18" : {
				name : "Survivor",
				source : [["SRD", 25], ["P", 73]],
				minlevel : 18,
				description : "\n   " + "At the start of my turn, if I'm not above half or at 0 HP, I regain 5 + Con mod HP"
			}
		}
	},
	"monk-way of the open hand" : {
		regExpSearch : /^(?=.*\bopen\b)(?=.*\bhand\b)((?=.*(monk|monastic))|(((?=.*martial)(?=.*(artist|arts)))|((?=.*spiritual)(?=.*warrior)))).*$/i,
		subname : "Way of the Open Hand",
		source : [["SRD", 28], ["P", 79]],
		features : {
			"subclassfeature3" : {
				name : "Hand Technique",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 3,
				description : desc([
					"Whenever I hit a creature with a Flurry of Blows attack I can do one of the following:",
					"\u2022 Have it make a Dexterity save or be knocked prone",
					"\u2022 Have it make a Strength save or be pushed up to 15 ft away from me",
					"\u2022 Stop it from taking reactions until the end of my next turn"
				])
			},
			"subclassfeature6" : {
				name : "Wholeness of Body",
				source : [["SRD", 28], ["P", 79]],
				minlevel : 6,
				description : "\n   " + "As an action, I regain hit points equal to three times my monk level",
				additional : levels.map(function (n) { return n < 6 ? "" : (n*3) + " hit points" }),
				usages : 1,
				recovery : "long rest",
				action : ["action", ""]
			},
			"subclassfeature11" : {
				name : "Tranquility",
				source : [["SRD", 29], ["P", 80]],
				minlevel : 11,
				description : "\n   " + "After a long rest, I gain the effect of a Sanctuary spell until a next long rest",
				extraname : "Way of the Open Hand 17",
				"quivering palm" : {
					name : "Quivering Palm",
					source : [["SRD", 29], ["P", 80]],
					description : " [3 ki points]" + "\n   " + "When I hit a creature with an unarmed strike, I can start imperceptible vibrations" + "\n   " + "Within my monk level in days, I can use an action to have the creature make a Con save" + "\n   " + "If it fails, it is reduced to 0 hit points; If it succeeds, it takes 10d10 necrotic damage"
				},
				autoSelectExtrachoices : [{
					extrachoice : "quivering palm",
					minlevel : 17
				}]
			}
		}
	},
	"paladin-oath of devotion" : {
		regExpSearch : /^(?=.*(devotion|obedience))(((?=.*paladin)|((?=.*(exalted|sacred|holy|divine))(?=.*(knight|fighter|warrior|warlord|trooper))))).*$/i,
		subname : "Oath of Devotion",
		source : [["SRD", 32], ["P", 86]],
		spellcastingExtra : ["protection from evil and good", "sanctuary", "lesser restoration", "zone of truth", "beacon of hope", "dispel magic", "freedom of movement", "guardian of faith", "commune", "flame strike"],
		features : {
			"subclassfeature3" : {
				name : "Channel Divinity: Sacred Weapon",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 3,
				description : "\n   " + "As an action, for 1 minute, I add my Cha modifier to hit for one weapon I'm holding" + "\n   " + "It also counts as magical and emits bright light in a 20-ft radius and equal dim light",
				action : ["action", ""],
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (classes.known.paladin && classes.known.paladin.level > 2 && !v.isSpell && (/^(?=.*sacred)(?=.*weapon).*$/i).test(v.WeaponText)) {
								output.extraHit += What('Cha Mod');
							};
						},
						"If I include the words 'Sacred Weapon' in the name or description of a weapon, it gets my Charisma modifier added to its To Hit."
					]
				}
			},
			"subclassfeature3.1" : {
				name : "Channel Divinity: Turn the Unholy",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 3,
				description : "\n   " + "As an action, all fiends/undead within 30 ft that can hear me must make a Wis save" + "\n   " + "If one of them fails this save, it is turned for 1 minute or until it takes damage" + "\n   " + "Turned: move away, never within 30 ft of me, no reactions or actions other than Dash" + "\n   " + "Turned: may Dodge instead of Dash when nowhere to move and unable to escape bonds",
				action : ["action", ""]
			},
			"subclassfeature7" : {
				name : "Aura of Devotion",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 7,
				description : "\n   " + "While I'm conscious, allies within range and I can't be charmed",
				additional : ["", "", "", "", "", "", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "10-foot aura", "30-foot aura", "30-foot aura", "30-foot aura"],
				savetxt : { immune : ["charmed"] }
			},
			"subclassfeature15" : {
				name : "Purity of Spirit",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 15,
				description : "\n   " + "I am always under the effect of a Protection from Evil and Good spell"
			},
			"subclassfeature20" : {
				name : "Holy Nimbus",
				source : [["SRD", 33], ["P", 86]],
				minlevel : 20,
				description : "\n   " + "As an action, I shine with a 30-ft radius bright light and equal dim light for 1 minute" + "\n   " + "If an enemy starts its turn in the bright light, it takes 10 radiant damage" + "\n   " + "For the duration, I have advantage on saves vs. spells cast by fiends and undead",
				recovery : "long rest",
				usages : 1,
				action : ["action", ""]
			}
		}
	},
	"ranger-hunter" : {
		regExpSearch : /^(?!.*(monster|barbarian|bard|cleric|druid|fighter|monk|paladin|rogue|sorcerer|warlock|wizard))(?=.*(hunter|huntress|hunts(wo)?m(e|a)n)).*$/i,
		subname : "Hunter",
		fullname : "Hunter",
		source : [["SRD", 37], ["P", 93]],
		features : {
			"subclassfeature3" : {
				name : "Hunter's Prey",
				source : [["SRD", 37], ["P", 93]],
				minlevel : 3,
				description : "\n   " + "Choose Colossus Slayer, Giant Killer, or Horde Breaker with the \"Choose Feature\" button",
				choices : ["Colossus Slayer", "Giant killer", "Horde Breaker"],
				"colossus slayer" : {
					name : "Hunter's Prey: Colossus Slayer",
					description : "\n   " + "Once per turn, when hitting someone that is below max HP, I do an extra 1d8 damage"
				},
				"giant killer" : {
					name : "Hunter's Prey: Giant Killer",
					description : "\n   " + "As a reaction, when a Large or larger enemy in 5 ft attacks me, I can attack it once",
					action : ["reaction", ""]
				},
				"horde breaker" : {
					name : "Hunter's Prey: Horde Breaker",
					description : "\n   " + "Once per turn, when I hit a creature, I can make an attack vs. another within 5 ft of it"
				}
			},
			"subclassfeature7" : {
				name : "Defensive Tactics",
				source : [["SRD", 38], ["P", 93]],
				minlevel : 7,
				description : "\n   " + "\"Choose Feature\" button to choose Escape the Horde, Multiattack Defense, or Steel Will",
				choices : ["Escape the Horde", "Multiattack Defense", "Steel Will"],
				"escape the horde" : {
					name : "Defensive Tactic: Escape the Horde",
					description : "\n   " + "Creatures attacking me with opportunity attacks have disadvantage on the attack rolls"
				},
				"multiattack defense" : {
					name : "Defensive Tactic: Multiattack Defense",
					description : "\n   " + "When a creature hits me, I gain +4 AC against that creature for the rest of the turn"
				},
				"steel will" : {
					name : "Defensive Tactic: Steel Will",
					description : "\n   " + "I have advantage on saves against being frightened",
					savetxt : { adv_vs : ["frightened"] }
				}
			},
			"subclassfeature11" : {
				name : "Multiattack",
				source : [["SRD", 38], ["P", 93]],
				minlevel : 11,
				description : "\n   " + "Choose Volley or Whirlwind Attack using the \"Choose Feature\" button above",
				choices : ["Volley", "Whirlwind Attack"],
				"volley" : {
					name : "Multiattack: Volley",
					description : "\n   " + "As an action, I can make ranged attacks vs. all within a 10-ft radius of a point in range",
					action : ["action", ""]
				},
				"whirlwind attack" : {
					name : "Multiattack: Whirlwind Attack",
					description : "\n   " + "As an action, I can make melee attacks vs. all creatures within 5 ft of me",
					action : ["action", ""]
				}
			},
			"subclassfeature15" : {
				name : "Superior Hunter's Defense",
				source : [["SRD", 38], ["P", 93]],
				minlevel : 15,
				description : "\n   " + "\"Choose Feature\" button to choose Evasion, Stand Against the Tide, or Uncanny Dodge",
				choices : ["Evasion", "Stand Against the Tide", "Uncanny Dodge"],
				"evasion" : {
					name : "Evasion",
					description : "\n   " + "My Dexterity saves vs. areas of effect negate damage on success and halve it on failure",
					savetxt : { text : ["Dex save vs. area effects: fail \u2015 half dmg, success \u2015 no dmg"] }
				},
				"stand against the tide" : {
					name : "Stand Against the Tide",
					description : "\n   " + "When a creature misses me with a melee attack, I can use my reaction on the attack" + "\n   " + "I force the attacker to repeat it vs. another (not attacker) of my choice within range",
					action : ["reaction", ""]
				},
				"uncanny dodge" : {
					name : "Uncanny Dodge",
					description : "\n   " + "As a reaction, I halve the damage of an attack from an attacker that I can see",
					action : ["reaction", ""]
				}
			}
		}
	},
	"rogue-thief" : {
		regExpSearch : /^(?!.*(barbarian|bard|cleric|druid|fighter|monk|paladin|ranger|sorcerer|warlock|wizard))(?=.*(thief|burglar)).*$/i,
		subname : "Thief",
		fullname : "Thief",
		source : [["SRD", 41], ["P", 97]],
		features : {
			"subclassfeature3" : {
				name : "Fast Hands",
				source : [["SRD", 40], ["P", 97]],
				minlevel : 3,
				description : "\n   " + "As a bonus action, I can do one of the following:" + "\n    - " + "Make a Dexterity (Sleight of Hand) check" + "\n    - " + "Use my thieves' tools to disarm a trap or open a lock" + "\n    - " + "Take the Use an Object action",
				action : ["bonus action", ""]
			},
			"subclassfeature3.1" : {
				name : "Second-Story Work",
				source : [["SRD", 41], ["P", 97]],
				minlevel : 3,
				description : "\n   " + "I climb at my normal speed; I add my Dex modifier to the distance of a running jump",
				speed : { climb : { spd : "walk", enc : "walk" } }
			},
			"subclassfeature9" : {
				name : "Supreme Sneak",
				source : [["SRD", 41], ["P", 97]],
				minlevel : 9,
				description : "\n   " + "I have advantage on Dexterity (Stealth) checks when moving no more than half speed"
			},
			"subclassfeature13" : {
				name : "Use Magic Device",
				source : [["SRD", 41], ["P", 97]],
				minlevel : 13,
				description : "\n   " + "I can use magic items even if I don't meet the class, race, and/or level requirements"
			},
			"subclassfeature17" : {
				name : "Thief's Reflexes",
				source : [["SRD", 41], ["P", 97]],
				minlevel : 17,
				description : "\n   " + "Unless surprised, I can take two turns on the first round of any combat" + "\n   " + "The first turn is at my regular initiative, and the second is at my initiative - 10"
			}
		}
	},
	"sorcerer-draconic bloodline" : {
		regExpSearch : /^(?=.*(sorcerer|witch))(?=.*(draconic|dragon)).*$/i,
		subname : "Draconic Bloodline",
		source : [["SRD", 44], ["P", 102]],
		features : {
			"subclassfeature1" : {
				name : "Dragon Ancestor",
				source : [["SRD", 44], ["P", 102]],
				minlevel : 1,
				description : "\n   " + "Choose a Dragon Ancestor using the \"Choose Feature\" button above" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
				choices : ["Black Dragon Ancestor", "Blue Dragon Ancestor", "Brass Dragon Ancestor", "Bronze Dragon Ancestor", "Copper Dragon Ancestor", "Gold Dragon Ancestor", "Green Dragon Ancestor", "Red Dragon Ancestor", "Silver Dragon Ancestor", "White Dragon Ancestor"],
				"black dragon ancestor" : {
					name : "Black Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with black dragons, which are affiliated with acid damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "acid"
				},
				"blue dragon ancestor" : {
					name : "Blue Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with blue dragons, which are affiliated with lightning damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "lightning"
				},
				"brass dragon ancestor" : {
					name : "Brass Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with brass dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "fire"
				},
				"bronze dragon ancestor" : {
					name : "Bronze Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with bronze dragons, which are affiliated with lightning dmg" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "lightning"
				},
				"copper dragon ancestor" : {
					name : "Copper Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with copper dragons, which are affiliated with acid damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "acid"
				},
				"gold dragon ancestor" : {
					name : "Gold Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with gold dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "fire"
				},
				"green dragon ancestor" : {
					name : "Green Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with green dragons, which are affiliated with poison damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "poison"
				},
				"red dragon ancestor" : {
					name : "Red Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with red dragons, which are affiliated with fire damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "fire"
				},
				"silver dragon ancestor" : {
					name : "Silver Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with silver dragons, which are affiliated with cold damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "cold"
				},
				"white dragon ancestor" : {
					name : "White Dragon Ancestor",
					description : "\n   " + "I have draconic ancestry with white dragons, which are affiliated with cold damage" + "\n   " + "When interacting with dragons, if I can add my proficiency bonus, I can double it",
					dependentChoices : "cold"
				},
				languageProfs : ["Draconic"],
				choiceDependencies : [{
					feature : "subclassfeature6",
					choiceAttribute : true
				}]
			},
			"subclassfeature1.1" : {
				name : "Draconic Resilience",
				source : [["SRD", 45], ["P", 102]],
				minlevel : 1,
				description : "\n   " + "When I am not wearing armor, my AC is 13 + Dexterity modifier" + "\n   " + "My hit point maximum increases by an amount equal to my sorcerer level",
				calcChanges : {
					hp : function (totalHD) {
						if (classes.known.sorcerer) {
							return [classes.known.sorcerer.level, "Draconic Resilience (sorcerer level)"];
						}
					}
				},
				armorOptions : {
					regExpSearch : /^(?=.*(dragon|draconic))(?=.*(hide|skin|scales|resilience)).*$/i,
					name : "Draconic Resilience",
					source : [["SRD", 45], ["P", 102]],
					ac : 13
				},
				armorAdd : "Draconic Resilience"
			},
			"subclassfeature6" : {
				name : "Elemental Affinity",
				source : [["SRD", 45], ["P", 102]],
				minlevel : 6,
				description : "\n   " + "Choose a Dragon Ancestor using the \"Choose Feature\" button above" + "\n   " + "I add Cha mod for spell damage if matching my dragon ancestor's affiliated type" + "\n   " + "I can spend 1 sorcery point to gain resistance to my dragon ancestor's affiliated type",
				additional : "optional: 1 sorcery point",
				choices : ["acid", "cold", "fire", "lightning", "poison"],
				choicesNotInMenu : true,
				"acid" : {
					name : "Acid Elemental Affinity",
					description : "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does acid damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain acid resistance for 1 hour",
					calcChanges : {
						atkCalc : [
							function (fields, v, output) {
								if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/acid/i).test(fields.Damage_Type)) {
									output.extraDmg += What('Cha Mod');
								};
							},
							"Cantrips and spells that deal acid damage get my Charisma modifier added to their damage."
						],
						spellAdd : [
							function (spellKey, spellObj, spName) {
								if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "acid", "Cha", true);
							},
							"Cantrips and spells that deal acid damage get my Charisma modifier added to their damage."
						]
					}
				},
				"cold" : {
					name : "Cold Elemental Affinity",
					description : "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does cold damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain cold resistance for 1 hour",
					calcChanges : {
						atkCalc : [
							function (fields, v, output) {
								if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/cold/i).test(fields.Damage_Type)) {
									output.extraDmg += What('Cha Mod');
								};
							},
							"Cantrips and spells that deal cold damage get my Charisma modifier added to their damage."
						],
						spellAdd : [
							function (spellKey, spellObj, spName) {
								if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "cold", "Cha", true);
							},
							"Cantrips and spells that deal cold damage get my Charisma modifier added to their damage."
						]
					}
				},
				"fire" : {
					name : "Fire Elemental Affinity",
					description : "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does fire damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain fire resistance for 1 hour",
					calcChanges : {
						atkCalc : [
							function (fields, v, output) {
								if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/fire/i).test(fields.Damage_Type)) {
									output.extraDmg += What('Cha Mod');
								};
							},
							"Cantrips and spells that deal fire damage get my Charisma modifier added to their damage."
						],
						spellAdd : [
							function (spellKey, spellObj, spName) {
								if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "fire", "Cha", true);
							},
							"Cantrips and spells that deal fire damage get my Charisma modifier added to their damage."
						]
					}
				},
				"lightning" : {
					name : "Lightning Elemental Affinity",
					description : "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does lightning damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain lightning resistance for 1 hour",
					calcChanges : {
						atkCalc : [
							function (fields, v, output) {
								if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/lightning/i).test(fields.Damage_Type)) {
									output.extraDmg += What('Cha Mod');
								};
							},
							"Cantrips and spells that deal lightning damage get my Charisma modifier added to their damage."
						],
						spellAdd : [
							function (spellKey, spellObj, spName) {
								if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "lightn(\.|ing)?", "Cha", true);
							},
							"Cantrips and spells that deal lightning damage get my Charisma modifier added to their damage."
						]
					}
				},
				"poison" : {
					name : "Poison Elemental Affinity",
					description : "\n   " + "I add my Charisma modifier to one damage roll of a spell if it does poison damage" + "\n   " + "When I do this, I can spend 1 sorcery point to gain poison resistance for 1 hour",
					calcChanges : {
						atkCalc : [
							function (fields, v, output) {
								if (classes.known.sorcerer && classes.known.sorcerer.level > 5 && v.isSpell && (/poison/i).test(fields.Damage_Type)) {
									output.extraDmg += What('Cha Mod');
								};
							},
							"Cantrips and spells that deal poison damage get my Charisma modifier added to their damage."
						],
						spellAdd : [
							function (spellKey, spellObj, spName) {
								if (!spellObj.psionic) return genericSpellDmgEdit(spellKey, spellObj, "poison", "Cha", true);
							},
							"Cantrips and spells that deal poison damage get my Charisma modifier added to their damage."
						]
					}
				}
			},
			"subclassfeature14" : {
				name : "Dragon Wings",
				source : [["SRD", 45], ["P", 103]],
				minlevel : 14,
				description : desc([
					"As a bonus action, unless armor is in the way, I can sprout dragon wings from my back",
					"I gain a fly speed equal to my current speed until I dismiss the wings as a bonus action"
				]),
				action : ["bonus action", " (start/stop)"],
				speed : { fly : { spd : "walk", enc : "walk" } }
			},
			"subclassfeature18" : {
				name : "Draconic Presence",
				source : [["SRD", 45], ["P", 103]],
				minlevel : 18,
				description : "\n   " + "As an action, I create 60-ft radius aura of awe/fear for concentration up to 1 minute" + "\n   " + "All hostiles in this aura must make a Wis save or be charmed (awe) or frightened (fear)" + "\n   " + "They make their saves at the beginning of their turns" + "\n   " + "A creature that succeeds on the save is immune to my aura for 24 hours",
				additional : "5 sorcery points",
				action : ["action", ""]
			}
		}
	},
	"warlock-the fiend" : {
		regExpSearch : /^(?=.*(fiend|devil|demon|daemon|hell|abyss))(?=.*warlock).*$/i,
		subname : "the Fiend",
		source : [["SRD", 50], ["P", 109]],
		spellcastingExtra : ["burning hands", "command", "blindness/deafness", "scorching ray", "fireball", "stinking cloud", "fire shield", "wall of fire", "flame strike", "hallow"],
		features : {
			"subclassfeature1" : {
				name : "Dark One's Blessing",
				source : [["SRD", 50], ["P", 109]],
				minlevel : 1,
				description : "\n   " + "When I reduce a hostile to 0 HP, I gain Cha mod + warlock level temporary HP (min 1)"
			},
			"subclassfeature6" : {
				name : "Dark One's Own Luck",
				source : [["SRD", 50], ["P", 109]],
				minlevel : 6,
				description : "\n   " + "When I make an ability check or saving throw, I can add 1d10 after rolling the d20",
				recovery : "short rest",
				usages : 1
			},
			"subclassfeature10" : {
				name : "Fiendish Resilience",
				source : [["SRD", 51], ["P", 109]],
				minlevel : 10,
				description : "\n   " + "After a short or long rest, I can choose one damage type to become resistance to" + "\n   " + "This lasts until I choose another type; Magical and silver weapons ignore this resistance"
			},
			"subclassfeature14" : {
				name : "Hurl Through Hell",
				source : [["SRD", 51], ["P", 109]],
				minlevel : 14,
				description : "\n   " + "When I hit a creature with an attack, I can instantly transport it through lower planes" + "\n   " + "It returns at the end of my next turn and takes 10d10 psychic damage if not a fiend",
				recovery : "long rest",
				usages : 1
			}
		}
	},
	"wizard-evocation" : {
		regExpSearch : /(evocation|evocer|evoker)/i,
		subname : "School of Evocation",
		fullname : "Evoker",
		source : [["SRD", 54], ["P", 117]],
		features : {
			"subclassfeature2" : {
				name : "Evocation Savant",
				source : [["SRD", 54], ["P", 117]],
				minlevel : 2,
				description : "\n   " + "I halve the gp and time needed to copy evocation spells into my spellbook"
			},
			"subclassfeature2.1" : {
				name : "Sculpt Spells",
				source : [["SRD", 54], ["P", 117]],
				minlevel : 2,
				description : "\n   " + "If I cast an evocation spell affecting others I can see, I can protect 1 + the spell's level" + "\n   " + "The chosen automatically succeed on their saving throws vs. the spell" + "\n   " + "They also take no damage if the spell would normally deal half damage on a save"
			},
			"subclassfeature6" : {
				name : "Potent Cantrip",
				source : [["SRD", 54], ["P", 117]],
				minlevel : 6,
				description : "\n   " + "Any cantrips I cast still deal half damage on a successful save",
				calcChanges : {
					atkAdd : [
						function (fields, v) {
							if (v.isSpell && v.isDC && v.thisWeapon[3] && SpellsList[v.thisWeapon[3]].save) {
								fields.Description = fields.Description.replace(/ success - no( damage|thing)/ , "success - half damage");
							};
						},
						"My cantrips still do half damage on a successful saving throw, but none of their other effects."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (spellObj.psionic || spellObj.level || !spellObj.save || !(/\d+d\d+/).test(spellObj.description)) return;
							var startDescr = spellObj.description;
							spellObj.description = spellObj.description.replace("at CL 5, 11, and 17", "CL 5, 11, 17").replace(/damage/ig, "dmg").replace(/creatures?/ig, "crea").replace("save or ", "").replace("at casting or entering", "at cast/enter").replace(/(; \+\d+d\d+.*$|$)/, "; save: half dmg only$1");
							switch (spellKey) {
								case "lightning lure" :
									spellObj.description = spellObj.description.replace(/(Lightn|pull)(ing|ed)/gi, "$1");
									break;
								case "create bonfire" :
									spellObj.description = spellObj.description.replace("half dmg only", "half dmg");
									break;
							}
							return startDescr !== spellObj.description;
						},
						"My cantrips still do half damage on a successful saving throw, but none of their other effects."
					]
				}
			},
			"subclassfeature10" : {
				name : "Empowered Evocation",
				source : [["SRD", 54], ["P", 117]],
				minlevel : 10,
				description : "\n   " + "I can add my Int modifier to a single damage roll of any wizard evocation spell I cast",
				calcChanges : {
					atkCalc : [
						function (fields, v, output) {
							if (v.thisWeapon[4].indexOf("wizard") !== -1) {
								output.extraDmg += What('Int Mod');
							};
						},
						"I add my Intelligence modifier to a single damage roll of any wizard evocation spell I cast."
					],
					spellAdd : [
						function (spellKey, spellObj, spName) {
							if (spName != "wizard" || !What("Int Mod") || Number(What("Int Mod")) <= 0) return;
							var lookForDie;
							switch (spellKey) {
								case "fire shield" :
									spellObj.description = spellObj.description.replace(/ gives| and/ig, ";").replace("the same dmg", "same");
								case "flame blade" :
									spellObj.description = spellObj.description.replace("to make a ", ":");
								case "mordenkainen's sword" :
									spellObj.description = spellObj.description.replace(" makes melee spell attacks", ", melee spell atk");
								case "melf's minute meteors" :
									spellObj.description = spellObj.description.replace("casting/bns a send up to two", "cast/bns send 1-2");
								case "crusader's mantle" :
								case "magic missile" :
								case "scorching ray" :
									spellObj.description += "; +" + What("Int Mod") + " dmg once";
									return true;
								case "wall of light" :
								case "wrath of nature" :
									spellObj.description = spellObj.description.replace(/ dmg|; see B/gi, "") + "; 1\xD7 +" + What("Int Mod") + " dmg";
									return true;
								case "witch bolt" :
									spellObj.description = spellObj.description.replace("Spell attack", "Spell atk").replace("Lightning", "Lightn.") + "; 1\xD7 +" + What("Int Mod") + " dmg";
									return true;
								case "maelstrom" :
									spellObj.description = spellObj.description.replace("starting turn in save or", "starting save").replace(" and", ",") + "; 1\xD7 +" + What("Int Mod") + " dmg";
									return true;
								case "wall of fire" :
									spellObj.description = spellObj.description.replace("and", "\u0026").replace("save halves; see B", "save half") + "; 1\xD7 +" + What("Int Mod") + " dmg";
									return true;
								case "whirlwind" :
									spellObj.description = spellObj.description.replace("see book", "see B") + "; 1\xD7 +" + What("Int Mod") + " dmg";
									return true;
								case "crown of stars" :
									spellObj.description = spellObj.description.replace("bonus action", "bns") + "; 1\xD7 +" + What("Int Mod") + " dmg";
									return true;
								case "dawn" :
									spellObj.description = spellObj.description.replace("bns a move it", "bns move") + "; 1\xD7 +" + What("Int Mod") + " dmg";
									return true;
								case "maddening darkness" :
									spellObj.description = spellObj.description.replace("save halves", "save half") + "; 1\xD7+" + What("Int Mod") + " dmg";
									return true;
								case "sickening radiance" :
									spellObj.description = spellObj.description.replace("1 level of exhaustion", "1 lvl exhaust.") + "; 1\xD7+" + What("Int Mod") + " dmg";
									return true;
								case "blade barrier" : // doesn't fit...
									return true;
								case "chaos bolt-uass" :
									spellObj.description = spellObj.description.replace(" of target", "");
								case "chromatic orb" :
								case "chaos bolt-xgte" :
									lookForDie = "d8";
									break;
								case "melf's acid arrow" :
								case "vitriolic sphere" :
									lookForDie = "d4";
									break;
								case "holy weapon" :
									lookForDie = "4d8";
									break;
								case "destructive wave" :
									lookForDie = "5d6";
									break;
							}
							if (lookForDie) {
								spellObj.description = spellObj.description.replace(lookForDie, lookForDie + "+" + What("Int Mod"));
								return true;
							}
							if (!spellObj.psionic && spellObj.school == "Evoc") return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Int", true);
						},
						"I add my Intelligence modifier to a single damage roll of any wizard evocation spell I cast."
					]
				}
			},
			"subclassfeature14" : {
				name : "Overchannel",
				source : [["SRD", 54], ["P", 118]],
				minlevel : 14,
				description : "\n   " + "When I cast a 5th-level or lower wizard spell that damages, it can deal max damage" + "\n   " + "Except the first time I do this after a long rest, I suffer 2d12 necrotic dmg per spell lvl" + "\n   " + "Every time I do it after that, before a long rest, I take another 1d12 necrotic damage" + "\n   " + "This necrotic damage surpasses my resistances/immunities; I can't overchannel cantrips",
				recovery : "long rest",
				usagescalc : "event.value = '1 + \u221E';"
			}
		}
	}
};

module.exports = {
    FightingStyles: FightingStyles,
    ClassList: Base_ClassList,
    ClassSubList: Base_ClassSubList
}