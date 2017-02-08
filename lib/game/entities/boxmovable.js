ig.module(
    'game.entities.boxmovable'
)
    .requires(
    'impact.entity'
    )
    .defines(function() {
        EntityBoxmovable = ig.Entity.extend({
            size: { x: 32, y: 32 },
            name: "Boxmovable",
            friction: { x: 999, y: 999 },
            collides: ig.Entity.COLLIDES.PASSIVE,
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.B,
            animSheet: new ig.AnimationSheet('media/tileset.png', 32, 32),
            zIndex: 1,
            init: function(x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [4])
            },
            update: function() {
                this.parent();
                if (GameInfo.resetCollisionBoxMovable.delta() > 0) {
                    this.collides = ig.Entity.COLLIDES.PASSIVE;
                }
            },
            check: function(other) {
                if (other.name == "Boxmovable") {
                    this.collides = ig.Entity.COLLIDES.FIXED;
                    GameInfo.resetCollisionBoxMovable.set(2);
                }
                this.parent();
            }
        })
    })