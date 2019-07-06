module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        backgrounds: {
          src: [
            'base-mpmb-env/.blobs/backgrounds.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsBackgrounds.js', 
            'base-mpmb-env/.blobs/backgrounds.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/backgrounds.base.js'
        },
        classes: {
          src: [
            'base-mpmb-env/.blobs/classes.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsClasses.js', 
            'base-mpmb-env/.blobs/classes.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/classes.base.js'
        },
        creatures: {
          src: [
            'base-mpmb-env/.blobs/creatures.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsCreatures.js', 
            'base-mpmb-env/.blobs/creatures.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/creatures.base.js'
        },
        feats: {
          src: [
            'base-mpmb-env/.blobs/feats.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsFeats.js', 
            'base-mpmb-env/.blobs/feats.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/feats.base.js'
        },
        gear: {
          src: [
            'base-mpmb-env/.blobs/gear.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsGear.js', 
            'base-mpmb-env/.blobs/gear.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/gear.base.js'
        },
        magicitems: {
          src: [
            'base-mpmb-env/.blobs/magicitems.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsMagicItems.js', 
            'base-mpmb-env/.blobs/magicitems.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/magicitems.base.js'
        },
        races: {
          src: [
            'base-mpmb-env/.blobs/races.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsRaces.js', 
            'base-mpmb-env/.blobs/races.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/races.base.js'
        },
        sources: {
          src: [
            'base-mpmb-env/.blobs/sources.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsSources.js', 
            'base-mpmb-env/.blobs/sources.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/sources.base.js'
        },
        spells: {
          src: [
            'base-mpmb-env/.blobs/spells.base.pre.js', 
            'datasource/MPMB-Base/_variables/ListsSpells.js', 
            'base-mpmb-env/.blobs/spells.base.post.js'
          ],
          dest: 'base-mpmb-env/lib/spells.base.js'
        }
      },
      shell: {
        
      }
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-shell');
  
    // Default task(s).
    grunt.registerTask('default', ['concat', 'shell']);
  
  };