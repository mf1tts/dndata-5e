module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        common: {
          src: [
            'base-mpmb-env/.blobs/common.blob.js', 
            'datasource/MPMB-Base/_functions/Functions0.js', 
            'datasource/MPMB-Base/_functions/Functions1.js', 
            'datasource/MPMB-Base/_functions/Functions2.js', 
            'datasource/MPMB-Base/_functions/Functions3.js'
          ],
          dest: 'base-mpmb-env/common.tmp'
        },
        backgrounds: {
            src: [
                "base-mpmb-env/.blobs/backgrounds.base.pre.js",
                "base-mpmb-env/common-clean.tmp",
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsBackgrounds.js", 
                "base-mpmb-env/.blobs/backgrounds.base.post.js"
            ],
            dest: "base-mpmb-env/backgrounds.tmp"
        },
        classes: {
            src: [
                "base-mpmb-env/.blobs/classes.base.pre.js", 
                "base-mpmb-env/common-clean.tmp",
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsClasses.js", 
                "base-mpmb-env/.blobs/classes.base.post.js"
            ],
            dest: "base-mpmb-env/classes.tmp"
        },
        creatures: {
            src: [
                "base-mpmb-env/.blobs/creatures.base.pre.js", 
                "base-mpmb-env/common-clean.tmp",
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsCreatures.js", 
                "base-mpmb-env/.blobs/creatures.base.post.js"
            ],
            dest: "base-mpmb-env/creatures.tmp"
        },
        feats: {
            src: [
                "base-mpmb-env/.blobs/feats.base.pre.js", 
                "base-mpmb-env/common-clean.tmp",
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsFeats.js", 
                "base-mpmb-env/.blobs/feats.base.post.js"
            ],
            dest: "base-mpmb-env/feats.tmp"
        },
        gear: {
            src: [
                "base-mpmb-env/.blobs/gear.base.pre.js", 
                "base-mpmb-env/common-clean.tmp",
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsGear.js", 
                "base-mpmb-env/.blobs/gear.base.post.js"
            ],
            dest: "base-mpmb-env/gear.tmp"
        },
        magicitems: {
            src: [
                "base-mpmb-env/.blobs/magicitems.base.pre.js", 
                "base-mpmb-env/common-clean.tmp",
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsMagicItems.js", 
                "base-mpmb-env/.blobs/magicitems.base.post.js"
            ],
            dest: "base-mpmb-env/magicitems.tmp"
        },
        races: {
            src: [
                "base-mpmb-env/.blobs/races.base.pre.js", 
                "base-mpmb-env/common-clean.tmp",
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsRaces.js", 
                "base-mpmb-env/.blobs/races.base.post.js"
            ],
            dest: "base-mpmb-env/races.tmp"
        },
        sources: {
            src: [
                "base-mpmb-env/.blobs/sources.base.pre.js", 
                "base-mpmb-env/common-clean.tmp",
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsSources.js", 
                "base-mpmb-env/.blobs/sources.base.post.js"
            ],
            dest: "base-mpmb-env/sources.tmp"
        },
        spells: {
            src: [
                "base-mpmb-env/.blobs/spells.base.pre.js", 
                "base-mpmb-env/common-clean.tmp", 
                "datasource/MPMB-Base/_variables/Lists.js",
                "datasource/MPMB-Base/_variables/ListsSpells.js", 
                "base-mpmb-env/.blobs/spells.base.post.js"
            ],
            dest: "base-mpmb-env/spells.tmp"
        },
        index: {
          src: [
            'base-mpmb-env/common-clean.tmp',
            'base-mpmb-env/.blobs/index.blob.js'
          ],
          dest: 'base-mpmb-env/index.js'
        }
      },
      replace: {
        pilot: {
          options: {
            patterns: [{
              match: /(?<!function )newObj\(/g,
              replacement: "npmclone("
            }]
          },
          files: [{
              src: ["base-mpmb-env/common.tmp"],
              dest: 'base-mpmb-env/common-clean.tmp'
            }]
          },
        primary: {
          options: {
            patterns: [{
              match: /(?<!function )newObj\(/g,
              replacement: "npmclone("
            }]
          },
          files: [
            {
              src: ["base-mpmb-env/spells.tmp"],
              dest: 'base-mpmb-env/lib/spells.base.js'
            },
            {
              src: ["base-mpmb-env/sources.tmp"],
              dest: 'base-mpmb-env/lib/sources.base.js'
            },
            {
              src: ["base-mpmb-env/races.tmp"],
              dest: 'base-mpmb-env/lib/races.base.js'
            },
            {
              src: ["base-mpmb-env/magicitems.tmp"],
              dest: 'base-mpmb-env/lib/magicitems.base.js'
            },
            {
              src: ["base-mpmb-env/gear.tmp"],
              dest: 'base-mpmb-env/lib/gear.base.js'
            },
            {
              src: ["base-mpmb-env/feats.tmp"],
              dest: 'base-mpmb-env/lib/feats.base.js'
            },
            {
              src: ["base-mpmb-env/creatures.tmp"],
              dest: 'base-mpmb-env/lib/creatures.base.js'
            },
            {
              src: ["base-mpmb-env/classes.tmp"],
              dest: 'base-mpmb-env/lib/classes.base.js'
            },
            {
              src: ["base-mpmb-env/backgrounds.tmp"],
              dest: 'base-mpmb-env/lib/backgrounds.base.js'
            }
          ]
        }
      },
      clean: {
        prune: ['base-mpmb-env/*.tmp']
      }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');
  
    // Default task(s).
    grunt.registerTask('default', ['concat:common', 'replace:pilot', 'concat', 'replace:primary', 'clean:prune']);
  
  };