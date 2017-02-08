ig.module('game.entities.flagred')
    .requires('impact.entity')
    .defines(function() {
        EntityFlagred = ig.Entity.extend({
            size: { x: 25, y: 25 },
            offset: { x: 5, y: 5 },
            name: "Flagred",
            collides: ig.Entity.COLLIDES.NONE,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),
            zIndex: 1,

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [1]);
            },
            check: function(other) {
                if (other instanceof EntityPlayer || other instanceof EntityEnemy) {
                    other.flag = true;
                    this.kill();
                }
                this.parent();
            }
        })
    });