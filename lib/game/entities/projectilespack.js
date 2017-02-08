ig.module('game.entities.projectilespack')
    .requires('impact.entity')
    .defines(function() {
        EntityProjectilespack = ig.Entity.extend({
            size: { x: 20, y: 18 },
            offset: { x: 5, y: 7 },
            collides: ig.Entity.COLLIDES.NONE,
            type: ig.Entity.TYPE.B,
            name: "Projectilespack",
            checkAgainst: ig.Entity.TYPE.BOTH,
            animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),
            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [18]);
            },
            check: function(other) {
                if (other instanceof EntityPlayer || other instanceof EntityEnemy) {
                    other.addProjectiles(5);
                    GameInfo.randomProjectilesPackTimer.set(15);
                    ig.game.projectilePack = null;
                    this.kill();
                }
                if (other instanceof EntityBoxmovable || other instanceof EntityWall || other instanceof EntityBoxbreakable || other instanceof EntityFlagblue || other instanceof EntityFlagred || other instanceof EntityHealthpack || other instanceof EntityRadioactivebox || other instanceof EntityBaseplayer1 || other instanceof EntityBaseplayer3) {
                    this.kill();
                    GameInfo.randomProjectilesPackTimer.set(0);
                }
            }
        })
    });