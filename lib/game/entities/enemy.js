ig.module('game.entities.enemy')

    .requires(
    'impact.entity'
    )
    .defines(function () {

        EntityEnemy = ig.Entity.extend({

            collides: ig.Entity.COLLIDES.ACTIVE,
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.BOTH,
            health: 3,
            maxHealth: 3,
            size: { x: 23, y: 23 },
            offset: { x: 8, y: 8 },
            speed: 250,
            maxVel: { x: 900, y: 900 },
            zIndex: 9,
            lastpressed: 'up',
            flag: false,
            cooling: 1,
            projectiles: 5,
            maxProjectiles: 5,
            resetCollisionOther: null,
            pathTimer: null,
            animSheet: new ig.AnimationSheet('media/Player_c.png', 32, 32),
            idleposition: 0,
            accion: null,
            accionInicial: null,
            evadePointLocal: null,
            timerActionChange: new ig.Timer(15),
            // Activate nicerPath!
            nicerPath: true,

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                // Add the animations
                this.addAnim('idle', 1, [0]);
                this.addAnim('down', 1, [1]);
                this.addAnim('left', 1, [3]);
                this.addAnim('right', 1, [2]);
                this.addAnim('up', 1, [0]);
                this.pathTimer = new ig.Timer(3);
                this.resetCollisionOther = new ig.Timer(1);
                accionInicial = Math.floor(Math.random() * (3 - 1)) + 1;
            },
            restoreHealth: function () {
                this.health = 3;
            },
            update: function () {
                //Enemy Animations
                if (this.vel.y < 0) {
                    this.currentAnim = this.anims.up;
                    this.lastpressed = 'up';
                    this.idleposition = 0;
                    this.addAnim('idle', 1, [this.idleposition]);
                }
                else if (this.vel.y > 0) {
                    this.currentAnim = this.anims.down;
                    this.lastpressed = 'down';
                    this.idleposition = 1;
                    this.addAnim('idle', 1, [this.idleposition]);
                }
                else if (this.vel.x < 0) {
                    this.currentAnim = this.anims.left;
                    this.lastpressed = 'left';
                    this.idleposition = 3;
                    this.addAnim('idle', 1, [this.idleposition]);
                }
                else if (this.vel.x > 0) {
                    this.currentAnim = this.anims.right;
                    this.lastpressed = 'right';
                    this.idleposition = 2;
                    this.addAnim('idle', 1, [this.idleposition]);
                }
                else {
                    this.vel.y = 0;
                    this.vel.x = 0;
                    //this.currentAnim = this.anims.idle;
                }
                if (this.flag == true) {
                    this.addAnim('idle', 1, [this.idleposition + 4]);
                    this.addAnim('down', 1, [this.idleposition + 4]);
                    this.addAnim('left', 1, [this.idleposition + 4]);
                    this.addAnim('right', 1, [this.idleposition + 4]);
                    this.addAnim('up', 1, [this.idleposition + 4]);
                }
                else {
                    this.addAnim('idle', 1, [this.idleposition]);
                    this.addAnim('down', 1, [this.idleposition]);
                    this.addAnim('left', 1, [this.idleposition]);
                    this.addAnim('right', 1, [this.idleposition]);
                    this.addAnim('up', 1, [this.idleposition]);
                }
                //Direccionar proyectil
                if (ig.game.player) {
                    if (this.pos.y > ig.game.player.pos.y) {
                        this.currentAnim = this.anims.up;
                        this.lastpressed = 'up';
                    }
                    else if (this.pos.y < ig.game.player.pos.y) {
                        this.currentAnim = this.anims.down;
                        this.lastpressed = 'down';
                    }
                    else if (this.pos.x > ig.game.player.pos.x) {
                        this.currentAnim = this.anims.left;
                        this.lastpressed = 'left';
                    }
                    else if (this.pos.x < ig.game.player.pos.x) {
                        this.currentAnim = this.anims.rigth;
                        this.lastpressed = 'right';
                    }
                }
                //Acciones de IA en el switch
                switch (this.accion) {
                    case "CapturarBandera":
                        //Rutina de captura de bandera
                        if (ig.game.flag) {
                            this.getPath(ig.game.flag.pos.x + 12.5, ig.game.flag.pos.y + 12.5, true, ['EntityWall', 'EntityBoxmovable', 'EntityBoxbreakable', 'EntityRadioactivebox']);
                            if (!this.path) {
                                this.getPath(ig.game.flag.pos.x + 12.5, ig.game.flag.pos.y + 12.5, true, ['EntityWall', 'EntityBoxmovable', 'EntityRadioactivebox']);
                                if (!this.path) {
                                    this.getPath(ig.game.flag.pos.x + 12.5, ig.game.flag.pos.y + 12.5, true, ['EntityWall', 'EntityRadioactivebox']);
                                }
                            }
                        }
                        break;
                    case "Evadir":
                        this.evadePointLocal = ig.game.getEntitiesByType(EntityEvadepoint)[0];
                        var i;
                        for (i = 1; i < 10; i++) {
                            if (ig.game.getEntitiesByType(EntityEvadepoint)[i].distanceTo(ig.game.player) > this.evadePointLocal.distanceTo(ig.game.player)) {
                                this.evadePointLocal = null;
                                this.evadePointLocal = ig.game.getEntitiesByType(EntityEvadepoint)[i];
                                console.log(this.evadePointLocal.distanceTo(ig.game.player));
                            }
                        }
                        i = 0;
                        this.getPath(this.evadePointLocal.pos.x + 2, this.evadePointLocal.pos.y + 3, true, ['EntityWall', 'EntityBoxmovable', 'EntityBoxbreakable', 'EntityRadioactivebox']);
                        this.accion = ""
                        if (this.distanceTo(ig.game.player) < 150 && this.projectiles > 0) {
                            this.attack();
                        }
                        if (this.projectiles == 0) {
                            this.accion = "RecargarBalas";
                        }
                        if (this.health < 2) {
                            this.accion = "RecargarVida";
                        }
                        break;
                    case "RecargarVida":
                        if (ig.game.healthPack && GameInfo.randomHealthPackTimer.delta() > -10) {
                            this.getPath(ig.game.healthPack.pos.x + 2, ig.game.healthPack.pos.y + 3, true, ['EntityWall', 'EntityBoxbreakable', 'EntityRadioactivebox']);
                        }
                        break;
                    case "RecargarBalas":
                        if (ig.game.projectilePack && GameInfo.randomProjectilesPackTimer.delta() > -10) {
                            this.getPath(ig.game.projectilePack.pos.x + 3, ig.game.projectilePack.pos.y + 3, true, ['EntityWall', 'EntityBoxbreakable', 'EntityRadioactivebox']);
                        } else {
                            this.getPath(ig.game.base3.pos.x + 4, ig.game.base3.pos.y + 3, true, ['EntityWall', 'EntityBoxmovable', 'EntityBoxbreakable', 'EntityRadioactivebox']);
                        }
                        break;
                    case "AsediarEnemigo":
                        if (ig.game.player) {
                            this.getPath(ig.game.player.pos.x + 12.5, ig.game.player.pos.y + 12.5, true, ['EntityWall', 'EntityBoxmovable', 'EntityBoxbreakable', 'EntityRadioactivebox']);
                            if (this.path) {
                                if (this.path.length < 2) {
                                    this.attack();
                                }
                            }
                        }
                        break;
                    case "MoveCajas":

                        break;
                    case "RomperCajas":
                        //Poner accion aleatoria para el nuevo camino
                        this.path = null;
                        break;

                    default:
                        break;
                }

                // Walk the path
                if (this.path) {
                    this.followPath(this.speed, true);
                    this.pathTimer.reset();
                }
                //######## Bloques de toma de desiciones ########
                // Implementar algo en caso de quedarse quieto mucho tiempo
                if (this.pathTimer.delta() < -2) {
                    //cuando tiene mucho tiempo con un camino y esta trancado.
                }

                //Rutina para modo asedio con recarga de vida y balas
                if (this.health >= 2) {
                    if (ig.game.player) {
                        if (this.projectiles > 0 && ig.game.player.flag == true) {
                            this.accion = "AsediarEnemigo";
                        }
                    }
                }
                if (this.projectiles == 0) {
                    this.accion = "RecargarBalas";
                }
                if (this.health < 2 && ig.game.healthPack) {
                    this.accion = "RecargarVida";
                }
                //Accion inicial Aleatoria Buscar Bandera o asediar agresivamente; 1 para ir por la bandera y 2 para asediar
                if (this.timerActionChange.delta() > 0) {
                    this.accionInicial = Math.floor(Math.random() * (3 - 1)) + 1;
                }
                if (accionInicial == 1) {
                    if (ig.game.flag) {
                        this.accion = "CapturarBandera";
                        this.accionInicial = null;
                    }
                } else {
                    if (this.projectiles > 0 && this.health > 1) {
                        this.accion = "AsediarEnemigo";
                    }
                    this.accionInicial = null;
                }
                //Rutina para la evasion cuanto tiene la bandera
                if (this.flag && this.distanceTo(ig.game.player) < 200) {
                    this.evadePointLocal = null;
                    this.accion = "Evadir";
                }
                //Rutina de evasion para cuando tiene poca vida y no hay packs de vida
                if (this.health < 2 && !ig.game.healthPack) {
                    this.accion = "Evadir";
                }

                //######## Fin de bloques de toma de desiciones ########

                //Resetear la velocidad 
                // if (this.resetCollisionOther.delta() > 0) {
                //     this.speed = 300;
                //     this.maxVel.x = 900;
                //     this.maxVel.y = 900;
                // }

                this.parent();
            },
            draw: function () {
                // border/background health
                ig.system.context.fillStyle = "rgb(0,0,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x - 9) * ig.system.scale,
                    (this.pos.y - ig.game.screen.y - 18) * ig.system.scale,
                    this.size.x + 10 * ig.system.scale, 4 * ig.system.scale);
                ig.system.context.closePath();
                ig.system.context.fill();
                // health bar
                ig.system.context.fillStyle = "rgb(255,0,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x - 8) * ig.system.scale,
                    (this.pos.y - ig.game.screen.y - 17) * ig.system.scale,
                    ((this.size.x + 8) * (this.health / this.maxHealth)) * ig.system.scale, 2 * ig.system.scale);
                ig.system.context.closePath();
                ig.system.context.fill();

                //Con dos barras da no se ve la imagen en el editor de niveles.
                // border/background projectile
                ig.system.context.fillStyle = "rgb(0,0,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x - 9) * ig.system.scale,
                    (this.pos.y - ig.game.screen.y - 15) * ig.system.scale,
                    this.size.x + 10 * ig.system.scale, 4 * ig.system.scale);
                ig.system.context.closePath();
                ig.system.context.fill();

                // projectile bar
                ig.system.context.fillStyle = "rgb(0,255,0)";
                ig.system.context.beginPath();
                ig.system.context.rect(
                    (this.pos.x - ig.game.screen.x - 8) * ig.system.scale,
                    (this.pos.y - ig.game.screen.y - 14) * ig.system.scale,
                    ((this.size.x + 8) * (this.projectiles / this.maxProjectiles)) * ig.system.scale, 2 * ig.system.scale);
                ig.system.context.closePath();
                ig.system.context.fill();
                // if (!ig.global.wm) {
                //     // Draw the path ...
                //     this.drawPath(255, 0, 0, 0.5);
                // }

                this.parent();
            },
            addProjectiles: function (numbers_Projectiles) {
                //add one projectile when you find one
                if (this.projectiles < 5) {
                    if ((this.projectiles + numbers_Projectiles) >= 5) {
                        this.projectiles = 5;
                    }
                    else {
                        this.projectiles += numbers_Projectiles;
                    }
                }
            },
            substractProjectile: function () {
                //add one projectile when you find one
                this.projectiles -= 1;
            },
            //Disparo
            attack: function () {
                if (this.cooling > 0 && this.projectiles > 0) {
                    ig.game.spawnEntity('EntityProjectile2', this.pos.x + 12.5, this.pos.y + 12.5, { target: ig.game.player });
                    this.cooling--;
                    this.substractProjectile();
                }
            },
            check: function (other) {
                if (other instanceof EntityBoxbreakable) {
                    if (this.cooling > 0 && this.projectiles > 0) {
                        ig.game.spawnEntity('EntityProjectile2', this.pos.x + 12.5, this.pos.y + 12.5, { target: other });
                        this.cooling--;
                        this.substractProjectile();
                    }
                }
                if (other instanceof EntityBoxmovable) {
                    //no se que hacer aca
                }
                // if (other instanceof EntityPlayer) {
                //     this.speed = 0;
                //     this.maxVel.x = 0;
                //     this.maxVel.y = 0;
                //     this.resetCollisionOther.reset();
                //     this.attack();
                // }
                this.parent();
            },

        });
    });
