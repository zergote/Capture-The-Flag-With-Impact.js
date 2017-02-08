ig.module('game.entities.projectile2')
    .requires('impact.entity')
    .defines(function () {
        EntityProjectile2 = ig.Entity.extend({
            size: { x:7, y: 7 },
            offset: { x: 10, y: 14 },
            vel: { x: 900, y: 0 },
            name: "projectile2",
            velocity: 500,
            maxVel: { x: 900, y: 900 },
            collides: ig.Entity.COLLIDES.B,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.BOTH,
            target: null,
            range: 200,
            speed: 400,
            angle: null,

            animSheet: new ig.AnimationSheet('media/lightningParticle.png', 32, 32),
            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.anims = new ig.Animation(this.animSheet, 1, [0]);
                this.currentAnim = this.anims;
                this.angle = this.angleTo(this.target);
                this.currentAnim.angle = this.angle;
            },
            update: function () {
                this.vel.x = Math.cos(this.angle) * this.speed;
                this.vel.y = Math.sin(this.angle) * this.speed;
                this.parent();
            },
            check: function (other) {
                if (other instanceof EntityPlayer) {
                    other.receiveDamage(1);
                    this.kill();
                    this.parent();
                }
                if (other.name == "Boxbreakable") {
                    other.kill();
                    this.kill();
                    this.parent();
                }
                if (other.name == "Boxmovable") {
                    this.kill();
                    this.parent();
                }
                if (other.name == "Wall") {
                    this.kill();
                    this.parent();
                }
            },
            handleMovementTrace: function (res) {
                this.parent(res);
                if (res.collision.x || res.collision.y) {
                    this.kill();
                }
            }

        })
    });



