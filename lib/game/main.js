ig.module(
    'game.main'
)
    .requires(
    'impact.game',
    'impact.font',
    //Entities
    'game.entities.player',
    'game.entities.enemy',
    'game.entities.healthpack',
    'game.entities.projectilespack',
    'game.entities.projectile1',
    'game.entities.projectile2',
    'game.entities.baseplayer1',
    'game.entities.baseplayer3',
    'game.entities.boxbreakable',
    'game.entities.boxmovable',
    'game.entities.flagred',
    'game.entities.radioactivebox',
    'game.entities.wall',
    'game.entities.evadepoint',
    /* level transition entities */
    /*levels*/
    'game.levels.level1',
    //plugins
    //'plugins.astar-for-entities-debug',
    'plugins.astar-for-entities'
    //ImpactJS debugger
    //'impact.debug.debug'

    )
    .defines(function () {

        GameInfo = new function () {
            this.team1Score = 0;
            this.team2Score = 0;
            this.resetCollisionBoxMovable = new ig.Timer();
            this.randomHealthPackTimer = new ig.Timer();
            this.randomProjectilesPackTimer = new ig.Timer();
            this.randomRadioactiveBoxTimer = new ig.Timer();
            this.timeWhithTheFlag = new ig.Timer();
            this.time = new ig.Timer();
            this.winTime = new ig.Timer();
            this.winTeam = "";
            this.win = false;
        },

            MyGame = ig.Game.extend({
                // Load a font
                font: new ig.Font('media/font2.png'),
                fontWin: new ig.Font('media/fontwin.png'),
                fontFlag: new ig.Font('media/fontflag.png'),
                gravity: 0,
                player: null,
                enemy: null,
                flag: null,
                projectilePack: null,
                healthPack: null,
                radiactiveBox: null,
                flagSpawn: null,
                base1: null,
                base3: null,

                init: function () {
                    // Initialize your game here; bind keys etc.
                    this.loadLevel(LevelLevel1);

                    // move your character
                    ig.input.bind(ig.KEY.UP_ARROW, 'up');
                    ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
                    ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                    ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                    ig.input.bind(ig.KEY.W, 'up');
                    ig.input.bind(ig.KEY.S, 'down');
                    ig.input.bind(ig.KEY.A, 'left');
                    ig.input.bind(ig.KEY.D, 'right');
                    ig.input.bind(ig.KEY.MOUSE1, 'attack');
                    ig.input.bind(ig.KEY.SPACE, 'attack');

                    //Sets timers
                    GameInfo.randomProjectilesPackTimer.set(15);
                    GameInfo.randomHealthPackTimer.set(15);
                    GameInfo.randomRadioactiveBoxTimer.set(15);
                },

                update: function () {
                    // Update all entities and backgroundMaps
                    this.parent();
                    var gameviewport = ig.game.screen;
                    var gamecanvas = ig.system;

                    //Asignar objetos a variables
                    this.player = this.getEntitiesByType(EntityPlayer)[0];
                    this.enemy = this.getEntitiesByType(EntityEnemy)[0];
                    this.flag = this.getEntitiesByType(EntityFlagblue)[0];
                    this.flagSpawn = this.getEntitiesByType(EntityFlagspawn)[0];
                    this.base1 = this.getEntitiesByType(EntityBaseplayer1)[0];
                    this.base3 = this.getEntitiesByType(EntityBaseplayer3)[0];
                    this.evadePoint = this.getEntitiesByType(EntityEvadepoint)[0];

                    //Ajustar camara
                    if (this.player) {
                        gameviewport.x = this.player.pos.x - gamecanvas.width / 2;
                        gameviewport.y = this.player.pos.y - gamecanvas.height / 2;
                    }

                    //Reload cooling
                    var projectile1 = this.getEntitiesByType(EntityProjectile1)[0];
                    if (this.player) {
                        if (!projectile1 && this.player.cooling == 0) {
                            this.player.cooling++;
                        }
                    }
                    var projectile2 = this.getEntitiesByType(EntityProjectile2)[0];
                    if (this.enemy) {
                        if (!projectile2 && this.enemy.cooling == 0) {
                            this.enemy.cooling++;
                        }
                    }

                    //Random projectile pack
                    if (GameInfo.randomProjectilesPackTimer.delta() > 0) {
                        this.projectilePack = this.getEntitiesByType(EntityProjectilespack)[0];
                        if (this.projectilePack) {
                            if (GameInfo.randomProjectilesPackTimer.delta() > 0) {
                                this.projectilePack.kill();
                                this.projectilePack = null;
                                GameInfo.randomProjectilesPackTimer.set(60);
                            }
                        } else {
                            // var x = Math.round(Math.random() * 940) + 1;
                            // var y = Math.round(Math.random() * 780) + 1;
                            var x = 32 * Math.floor(Math.random() * (30 - 1)) + 1;
                            var y = 32 * Math.floor(Math.random() * (25 - 1)) + 1;
                            ig.game.spawnEntity(EntityProjectilespack, x, y);
                            this.projectilePack = this.getEntitiesByType(EntityProjectilespack)[0];

                            GameInfo.randomProjectilesPackTimer.set(15);
                        }
                    }

                    //Random health pack
                    if (GameInfo.randomHealthPackTimer.delta() > 0) {
                        this.healthPack = this.getEntitiesByType(EntityHealthpack)[0];
                        if (this.healthPack) {
                            if (GameInfo.randomHealthPackTimer.delta() > 0) {
                                this.healthPack.kill();
                                this.healthPack = null;
                                GameInfo.randomHealthPackTimer.set(60);
                            }
                        } else {
                            var x = 32 * (Math.floor(Math.random() * (30 - 2)) + 2);
                            var y = 32 * (Math.floor(Math.random() * (25 - 2)) + 2);
                            ig.game.spawnEntity(EntityHealthpack, x, y);
                            this.healthPack = this.getEntitiesByType(EntityHealthpack)[0];
                            GameInfo.randomHealthPackTimer.set(15);
                        }
                    }

                    //Random radioactive box
                    if (GameInfo.randomRadioactiveBoxTimer.delta() > 0) {
                        this.radiactiveBox = this.getEntitiesByType(EntityRadioactivebox)[0];
                        if (this.radiactiveBox) {
                            if (GameInfo.randomRadioactiveBoxTimer.delta() > 0) {
                                this.radiactiveBox.kill();
                                GameInfo.randomRadioactiveBoxTimer.set(60);
                            }
                        } else {
                            var x = 32 * Math.floor(Math.random() * (30 - 2)) + 2;
                            var y = 32 * Math.floor(Math.random() * (25 - 2)) + 2;
                            ig.game.spawnEntity(EntityRadioactivebox, x, y);
                            GameInfo.randomRadioactiveBoxTimer.set(30);
                        }
                    }

                    //Random evadepoint
                    if (this.getEntitiesByType(EntityEvadepoint).length < 10) {
                        var x = 32 * Math.floor(Math.random() * (30 - 2)) + 2;
                        var y = 32 * Math.floor(Math.random() * (25 - 2)) + 2;
                        ig.game.spawnEntity(EntityEvadepoint, x, y);
                    }

                    //win
                    if (this.player) {
                        if (this.player.flag == true && GameInfo.timeWhithTheFlag.delta() > 1) {
                            GameInfo.timeWhithTheFlag.set(15);
                        }
                        if (this.player.flag == true && GameInfo.timeWhithTheFlag.delta() > -1) {
                            GameInfo.team1Score++;
                            this.nextBattle();
                        }
                    }
                    if (this.enemy) {
                        if (this.enemy.flag == true && GameInfo.timeWhithTheFlag.delta() > 1) {
                            GameInfo.timeWhithTheFlag.set(15);
                        }
                        if (this.enemy.flag == true && GameInfo.timeWhithTheFlag.delta() > -1) {
                            GameInfo.team2Score++;
                            this.nextBattle();
                        }
                    }
                    if (!this.player) {
                        GameInfo.team2Score++;
                        this.nextBattle();
                    }
                    if (!this.enemy) {
                        GameInfo.team1Score++;
                        this.nextBattle();
                    }
                    if (GameInfo.team1Score == 3) {
                        GameInfo.win = true;
                        GameInfo.winTeam = "Jugador Gana";
                        GameInfo.winTime.set(3);
                        this.newBattle();
                    }
                    if (GameInfo.team2Score == 3) {
                        GameInfo.win = true;
                        GameInfo.winTeam = "IA Gana";
                        GameInfo.winTime.set(3);
                        this.newBattle();
                    }
                    if (GameInfo.winTime.delta() > -1) {
                        GameInfo.win = false;
                        GameInfo.winTeam = "";
                    }
                },
                nextBattle: function () {
                    //Reset global time
                    GameInfo.time.set(0);
                    //Cargar mapa
                    this.loadLevel(LevelLevel1);
                    //Reset time flag
                    GameInfo.timeWhithTheFlag.set(0);

                    //projectile pack random
                    this.projectilePack = this.getEntitiesByType(EntityProjectilespack)[0];
                    if (this.projectilePack) {
                        this.projectilePack.kill();
                        this.projectilePack = null;
                    }
                    var x = Math.round(Math.random() * 940) + 1;
                    var y = Math.round(Math.random() * 780) + 1;
                    ig.game.spawnEntity(EntityProjectilespack, x, y);
                    GameInfo.randomProjectilesPackTimer.set(15);

                    //health pack random
                    this.healthPack = this.getEntitiesByType(EntityHealthpack)[0];
                    if (this.healthPack) {
                        this.healthPack.kill();
                        this.healthPack = null;
                    }
                    var x = Math.round(Math.random() * 940) + 1;
                    var y = Math.round(Math.random() * 780) + 1;
                    ig.game.spawnEntity(EntityHealthpack, x, y);
                    GameInfo.randomHealthPackTimer.set(15);

                    //Random radioactive box
                    this.radiactiveBox = this.getEntitiesByType(EntityRadioactivebox)[0];
                    if (this.radiactiveBox) {
                        this.radiactiveBox.kill();
                    }
                    var x = Math.round(Math.random() * 940) + 1;
                    var y = Math.round(Math.random() * 780) + 1;
                    ig.game.spawnEntity(EntityRadioactivebox, x, y);
                    GameInfo.randomRadioactiveBoxTimer.set(15);

                    //Reset dinamics entities
                    this.player = this.getEntitiesByType(EntityPlayer)[0];
                    this.enemy = this.getEntitiesByType(EntityEnemy)[0];
                    this.flag = this.getEntitiesByType(EntityFlagblue)[0];

                    if (this.player) {
                        this.player.flag = false;
                        this.player.kill();
                    }
                    if (this.enemy) {
                        this.enemy.flag = false;
                        this.enemy.kill();
                    }
                    if (this.flag) {
                        this.flag.kill();
                    }
                    var flagSpawn = this.getEntitiesByType(EntityFlagspawn)[0];
                    ig.game.spawnEntity(EntityFlagblue, flagSpawn.pos.x + 13, flagSpawn.pos.y);

                    var base1 = this.getEntitiesByType(EntityBaseplayer1)[0];
                    ig.game.spawnEntity(EntityPlayer, base1.pos.x - 5, base1.pos.y - 4);
                    // var base2 = this.getEntitiesByType(EntityBaseplayer2)[0];
                    // ig.game.spawnEntity(EntityPlayer2, base2.pos.x - 5, base2.pos.y - 4);
                    var base3 = this.getEntitiesByType(EntityBaseplayer3)[0];
                    ig.game.spawnEntity(EntityEnemy, base3.pos.x, base3.pos.y - 4);
                    // var base4 = this.getEntitiesByType(EntityBaseplayer4)[0];
                    // ig.game.spawnEntity(EntityPlayer4, base4.pos.x, base4.pos.y - 4);
                    this.player = this.getEntitiesByType(EntityPlayer)[0];
                    this.enemy = this.getEntitiesByType(EntityEnemy)[0];
                    this.flag = this.getEntitiesByType(EntityFlagblue)[0];

                },
                newBattle: function () {
                    this.loadLevel(LevelLevel1);
                    this.nextBattle();
                    GameInfo.team1Score = 0;
                    GameInfo.team2Score = 0;


                },
                draw: function () {
                    // Draw all entities and backgroundMaps
                    this.parent();
                    this.font.draw("Jugador: " + GameInfo.team1Score, 20, 90, ig.Font.ALIGN.LEFT);
                    this.font.draw("PC [IA]: " + GameInfo.team2Score, 850, 90, ig.Font.ALIGN.LEFT);
                    this.font.draw(GameInfo.time.delta().toFixed(), 480, 90, ig.Font.ALIGN.CENTER);
                    if (GameInfo.timeWhithTheFlag.delta() < -1) {
                        this.fontFlag.draw("Captura " + -GameInfo.timeWhithTheFlag.delta().toFixed(), 480, 600, ig.Font.ALIGN.CENTER);
                    }
                    if (GameInfo.win == true) {
                        this.fontWin.draw(GameInfo.winTeam, 480, 400, ig.Font.ALIGN.CENTER);
                    }
                },
                increaseScore: function (points) {
                    //increase score by certain amount of points
                    GameInfo.score += points;
                },

            });
        // Start the Game with 60fps, a resolution of 320x240, scaled
        // up by a factor of 2
        ig.main('#canvas', MyGame, 60, 960, 800, 1);
    });