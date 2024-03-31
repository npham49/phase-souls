/* eslint-disable @typescript-eslint/no-namespace */
import Phaser from "phaser";
import { getNormalization } from "../utils/vectors";

declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            knight(
                x: number,
                y: number,
                texture: string,
                frame?: string | number
            ): Knight;
        }
    }
}

enum HealthState {
    IDLE,
    DAMAGE,
    DEAD,
}

export default class Knight extends Phaser.Physics.Arcade.Sprite {
    private healthState = HealthState.IDLE;
    private damageTime = 0;

    private _health = 3;
    private _weapon = 0;

    // private knives?: Phaser.Physics.Arcade.Group;
    get health() {
        return this._health;
    }

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        super(scene, x, y, texture, frame);

        this.anims.play("knight-idle");
    }

    // setKnives(knives: Phaser.Physics.Arcade.Group) {
    //     this.knives = knives;
    // }
    setWeapon(weapon: number) {
        this._weapon = weapon;
    }

    getWeapon() {
        return this._weapon;
    }

    handleDamage(dir: Phaser.Math.Vector2) {
        if (this._health <= 0) {
            return;
        }

        if (this.healthState === HealthState.DAMAGE) {
            return;
        }

        --this._health;

        if (this._health <= 0) {
            // TODO: die
            this.healthState = HealthState.DEAD;
            this.anims.play("knight-faint");
            this.setVelocity(0, 0);
        } else {
            this.setVelocity(dir.x, dir.y);

            this.setTint(0xff0000);

            this.healthState = HealthState.DAMAGE;
            this.damageTime = 0;
        }
    }

    // private throwKnife() {
    //     if (!this.knives) {
    //         return;
    //     }

    //     const knife = this.knives.get(
    //         this.x,
    //         this.y,
    //         "knife"
    //     ) as Phaser.Physics.Arcade.Image;
    //     if (!knife) {
    //         return;
    //     }

    //     const parts = this.anims.currentAnim!.key.split("-");
    //     const direction = parts[2];

    //     const vec = new Phaser.Math.Vector2(0, 0);

    //     switch (direction) {
    //         case "up":
    //             vec.y = -1;
    //             break;

    //         case "down":
    //             vec.y = 1;
    //             break;

    //         default:
    //         case "side":
    //             if (this.scaleX < 0) {
    //                 vec.x = -1;
    //             } else {
    //                 vec.x = 1;
    //             }
    //             break;
    //     }

    //     const angle = vec.angle();

    //     knife.setActive(true);
    //     knife.setVisible(true);

    //     knife.setRotation(angle);

    //     knife.x += vec.x * 16;
    //     knife.y += vec.y * 16;

    //     knife.setVelocity(vec.x * 300, vec.y * 300);
    // }

    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);

        switch (this.healthState) {
            case HealthState.IDLE:
                break;

            case HealthState.DAMAGE:
                this.damageTime += dt;
                if (this.damageTime >= 250) {
                    this.healthState = HealthState.IDLE;
                    this.setTint(0xffffff);
                    this.damageTime = 0;
                }
                break;
        }
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        let dx = 0;
        let dy = 0;
        if (!cursors) return;
        this.setVelocity(0, 0);

        const speed = 150;
        if (cursors.left?.isDown) {
            this.setFlipX(true);
            dx = -1;
            // stops the idle animation
            // this.anims.play("knight-run-sideway", true);
        }
        if (cursors.right?.isDown) {
            this.setFlipX(false);
            dx = 1;
            // this.anims.play("knight-run-sideway", true);
        }
        if (cursors.up?.isDown) {
            this.setFlipX(false);
            dy = -1;
            // this.anims.play("knight-run-up", true);
        }
        if (cursors.down?.isDown) {
            this.setFlipX(false);
            dy = 1;
            // this.anims.play("knight-run-down", true);
        }
        // animation swicth
        if (dx !== 0) {
            if (dx === -1) {
                this.setFlipX(true);
            } else {
                this.setFlipX(false);
            }
            this.anims.play("knight-run-sideway", true);
        } else if (dy !== 0) {
            switch (dy) {
                case -1:
                    this.anims.play("knight-run-up", true);
                    break;
                case 1:
                    this.anims.play("knight-run-down", true);
                    break;
            }
        }
        if (dx === 0 && dy === 0) {
            this.anims.play("knight-idle", true);
        }

        const normalization = getNormalization(dx, dy);
        this.setVelocity(
            dx * speed * normalization,
            dy * speed * normalization
        );
    }
}

Phaser.GameObjects.GameObjectFactory.register(
    "knight",
    function (
        this: Phaser.GameObjects.GameObjectFactory,
        x: number,
        y: number,
        texture: string,
        frame?: string | number
    ) {
        // eslint-disable-next-line no-var
        var sprite = new Knight(this.scene, x, y, texture, frame);

        this.displayList.add(sprite);
        this.updateList.add(sprite);

        this.scene.physics.world.enableBody(
            sprite,
            Phaser.Physics.Arcade.DYNAMIC_BODY
        );
        // sprite.body!.setSize(sprite.width * 0.5, sprite.height * 0.8);
        sprite.body!.setSize(sprite.width * 1, sprite.height * 0.25);
        sprite.body!.setOffset(0, 20);

        return sprite;
    }
);

