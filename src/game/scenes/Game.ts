import { Scene } from "phaser";
import { getNormalization } from "../../utils/vectors";

export class Game extends Scene {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private knight!: Phaser.Physics.Arcade.Sprite;

    constructor() {
        super("Game");
    }

    preload() {
        this.cursors = this.input.keyboard!.createCursorKeys();
    }
    create() {
        const map = this.make.tilemap({ key: "dungeon" });
        const tileset = map.addTilesetImage("atlas_floor-16x16", "tiles");
        const walltileslow = map.addTilesetImage(
            "atlas_walls_low-16x16",
            "walltileslow"
        );
        const walltileshigh = map.addTilesetImage(
            "atlas_walls_high-16x32",
            "walltileshigh"
        );
        map.createLayer(
            "Ground",
            [
                tileset as Phaser.Tilemaps.Tileset,
                walltileslow as Phaser.Tilemaps.Tileset,
                walltileshigh as Phaser.Tilemaps.Tileset,
            ],
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer;
        const wallsLayer = map.createLayer(
            "Walls",
            [
                tileset as Phaser.Tilemaps.Tileset,
                walltileslow as Phaser.Tilemaps.Tileset,
                walltileshigh as Phaser.Tilemaps.Tileset,
            ],
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer;
        const textureLayer = map.createLayer(
            "Texture",
            [
                tileset as Phaser.Tilemaps.Tileset,
                walltileslow as Phaser.Tilemaps.Tileset,
                walltileshigh as Phaser.Tilemaps.Tileset,
            ],
            0,
            0
        ) as Phaser.Tilemaps.TilemapLayer;

        wallsLayer.setCollisionByProperty({ collides: true });
        textureLayer.setCollisionByProperty({ collides: true });

        // Debug collision
        const debugGraphics = this.add.graphics().setAlpha(0.7);
        console.log(debugGraphics.clear());
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Colliding face edges
        });
        textureLayer.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Colliding face edges
        });

        this.knight = this.physics.add.sprite(
            342,
            42,
            "knight",
            "knight_f_idle_anim_f1.png"
        );
        this.knight.body!.setSize(
            this.knight.width * 1,
            this.knight.height * 0.25
        );
        this.knight.body!.setOffset(0, 20);

        this.anims.create({
            key: "knight-idle",
            frames: this.anims.generateFrameNames("knight", {
                prefix: "knight_f_idle_anim_f",
                suffix: ".png",
                start: 0,
                end: 1,
            }),
            frameRate: 4,
            repeat: -1,
        });

        this.anims.create({
            key: "knight-run-sideway",
            frames: this.anims.generateFrameNames("knight", {
                prefix: "knight_f_run_anim_f",
                suffix: ".png",
                start: 0,
                end: 3,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "knight-run-up",
            frames: this.anims.generateFrameNames("knight", {
                prefix: "knight_f_run_up_anim_f",
                suffix: ".png",
                start: 1,
                end: 4,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "knight-run-down",
            frames: this.anims.generateFrameNames("knight", {
                prefix: "knight_f_run_down_anim_f",
                suffix: ".png",
                start: 1,
                end: 4,
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.knight.play("knight-idle");

        this.physics.add.collider(this.knight, wallsLayer);
        this.physics.add.collider(this.knight, textureLayer);
    }
    update() {
        let dx = 0;
        let dy = 0;
        if (!this.cursors || !this.knight) return;
        this.knight.setVelocity(0, 0);
        // this.knight.anims.play(`knight-idle`, true);
        this.cameras.main.startFollow(this.knight);

        const speed = 150;
        if (this.cursors.left?.isDown) {
            this.knight.setFlipX(true);
            dx = -1;
            // stops the idle animation
            this.knight.anims.play("knight-run-sideway", true);
        } else
        if (this.cursors.right?.isDown) {
            this.knight.setFlipX(false);
            dx = 1;
            this.knight.anims.play("knight-run-sideway", true);
        }
        if (this.cursors.up?.isDown) {
            this.knight.setFlipX(false);
            dy = -1;
            this.knight.anims.play("knight-run-up", true);
        } else
        if (this.cursors.down?.isDown) {
            this.knight.setFlipX(false);
            dy = 1;
            this.knight.anims.play("knight-run-down", true);
        }
        if (dx === 0 && dy === 0) {
            this.knight.anims.play("knight-idle", true);
        }

        const normalization = getNormalization(dx, dy);
        this.knight.setVelocity(dx * speed * normalization, dy * speed * normalization);
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}

