/* global console */
/* global _ */
/* global ajv */
/* global Phaser */
/* global PhreakNation */
// var pmap = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
var pmap = ['D','E','E','F',8,'B','A','A',5,1,2];
var textures = {};
var inspector;
var genTilemap;
var createTexture;
var cursors;
(function() {
    'use strict';

    createTexture = function createTexture(pixel, width, height) {
        if (_.isUndefined(pixel)) pixel = pmap[_.random(0, pmap.length - 1)];
        if (_.isUndefined(width)) width = 1;
        if (_.isUndefined(height)) height = width;

        return _.times(height, function() {
            return _.times(width, function() {
                return pixel;
            });
        });
    };

    var state = function state(game) {};

    state.prototype = {
        preload: function () {
            this.game.scale.setResizeCallback(function() {
              window.adjust();
            });

            this.game.input.maxPointers = 1;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // this.game.scale.setShowAll();
            // this.game.scale.pageAlignHorizontally = true;
            // this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();
        },

        create: function () {
            var group = this.game.add.group();

            // inspector = this.game.plugins.add(Phaser.Plugin.Inspector);
            console.log('Loading Tilemap Generator...');
            genTilemap = this.game.plugins.add(PhreakNation.Plugins.TilemapGenerator);
            // this should be passed from the server or stored and retreived from some kind of location.
            var rndSeed = Math.floor((Math.random() * 8999) + 1000);
            var perlin = genTilemap.setPerlin(Perlin, rndSeed, true);
            genTilemap.setPerlinFunction(function(x, y, z) {
                // Example of passing to a function. Not actually needed for this specific library.
                return perlin.noise(x, y, z);
            });

            var gridParams = {
                height: 256,
                width: 256,
                pixel: {
                    height: 4,
                    width: 4,
                }
            };
            var rand = _.random(0, 100);

            this.game.world.setBounds(0, 0, gridParams.width * gridParams.pixel.width, gridParams.height * gridParams.pixel.height);

            var grid = genTilemap.generateGrid(null, null, function(rand, x, y) {
                // This is where you would handle the sprite generation.

                var len = pmap.length + 1;

                var s = Math.floor((len / 100) * (rand * 100) + rand);
                var index = (s % len).toString(16);
                var pixel = pmap[index];

                if (_.isUndefined(textures[s])) {
                    textures[s] = createTexture(pixel);
                    game.create.texture('pixel_' + s, textures[s], 1);
                }
                var sprite = game.add.sprite(0, 0, 'pixel_' + s);
                sprite.height = gridParams.pixel.height;
                sprite.width = gridParams.pixel.width;

                // place texture in the world
                group.add(sprite);
                return {
                    rand: rand,
                    x: x,
                    y: y,
                };
            }, {
                height: gridParams.height,
                width: gridParams.width,
            });

            cursors = this.game.input.keyboard.createCursorKeys();

            group.align(gridParams.width, gridParams.height, gridParams.pixel.width, gridParams.pixel.height);

            this.game.stage.backgroundColor = 0x444444;
            this.game.stage.backgroundColor = '#004a80';
            this.cursors = this.input.keyboard.createCursorKeys();
            this.game.input.mouse.capture = true;
        },

        update: function () {
            if (cursors.up.isDown)
                {
                    this.game.camera.y -= 16;
                }
                else if (cursors.down.isDown)
                {
                    this.game.camera.y += 16;
                }

                if (cursors.left.isDown)
                {
                    this.game.camera.x -= 16;
                }
                else if (cursors.right.isDown)
                {
                    this.game.camera.x += 16;
                }
        },

        render: function () {

        },
    };

    window.MyGame.states.TileGen = state;
})();
