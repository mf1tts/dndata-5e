module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        common: {
            src: [
              'datasource/.blobs/common.blob.js', 
              'datasource/MPMB-Base/_functions/Functions0.js', 
              'datasource/MPMB-Base/_functions/Functions1.js', 
              'datasource/MPMB-Base/_functions/Functions2.js', 
              'datasource/MPMB-Base/_functions/Functions3.js',
              "datasource/MPMB-Base/_variables/Lists.js",
              "datasource/.blobs/backgrounds.base.pre.js",
              "datasource/MPMB-Base/_variables/ListsBackgrounds.js", 
              "datasource/.blobs/classes.base.pre.js", 
              "datasource/MPMB-Base/_variables/ListsClasses.js", 
              "datasource/.blobs/creatures.base.pre.js", 
              "datasource/MPMB-Base/_variables/ListsCreatures.js", 
              "datasource/.blobs/feats.base.pre.js",
              "datasource/MPMB-Base/_variables/ListsFeats.js", 
              "datasource/.blobs/gear.base.pre.js", 
              "datasource/MPMB-Base/_variables/ListsGear.js", 
              "datasource/.blobs/magicitems.base.pre.js", 
              "datasource/MPMB-Base/_variables/ListsMagicItems.js", 
              "datasource/.blobs/races.base.pre.js",
              "datasource/MPMB-Base/_variables/ListsRaces.js", 
              "datasource/.blobs/sources.base.pre.js",
              "datasource/MPMB-Base/_variables/ListsSources.js", 
              "datasource/.blobs/spells.base.pre.js", 
              "datasource/MPMB-Base/_variables/ListsSpells.js", 
              'datasource/.blobs/libindex.blob.js'
          ],
            dest: "lib/basedata.js.dirty"
        }
      },
      replace: {
        primary: {
          options: {
            patterns: [{
              match: /(?<!function )newObj\(/g,
              replacement: "npmclone("
            }]
          },
          files: [
            {
              src: ["lib/basedata.js.dirty"],
              dest: "lib/basedata.js"
            }
          ]
        }
      },
      clean: {
        prune: ['lib/**.dirty']
      }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-replace');
  
    // Default task(s).
    grunt.registerTask('default', ['concat', 'replace', 'clean']);
  
  };