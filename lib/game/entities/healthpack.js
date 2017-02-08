ig.module('game.entities.healthpack')
    .requires('impact.entity')
    .defines(function() {
        EntityHealthpack = ig.Entity.extend({
            size: { x: 25, y: 25 },
            offset: { x: 5, y: 5 },
            name: "Healthpack",
            collides: ig.Entity.COLLIDES.NONE,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.BOTH,
            animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),

            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [17]);
            },
            check: function(other) {
                if (other instanceof EntityPlayer || other instanceof EntityEnemy) {
                    other.restoreHealth();
                    ig.game.healthPack = null;
                    this.kill();
                    GameInfo.randomHealthPackTimer.set(60);
                }
                if (other instanceof EntityBoxmovable || other instanceof EntityWall || other instanceof EntityBoxbreakable || other instanceof EntityFlagblue || other instanceof EntityFlagred || other instanceof EntityProjectilespack || other instanceof EntityRadioactivebox || other instanceof EntityBaseplayer1 || other instanceof EntityBaseplayer3) {
                    this.kill();
                    GameInfo.randomHealthPackTimer.set(0);
                }
            }
        })
    });