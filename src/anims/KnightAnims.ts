import Phaser from "phaser";

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: "knight-idle",
        frames: anims.generateFrameNames("knight", {
            prefix: "knight_f_idle_anim_f",
            suffix: ".png",
            start: 0,
            end: 1,
        }),
        frameRate: 4,
        repeat: -1,
    });

    anims.create({
        key: "knight-run-sideway",
        frames: anims.generateFrameNames("knight", {
            prefix: "knight_f_run_anim_f",
            suffix: ".png",
            start: 0,
            end: 3,
        }),
        frameRate: 8,
        repeat: -1,
    });

    anims.create({
        key: "knight-run-up",
        frames: anims.generateFrameNames("knight", {
            prefix: "knight_f_run_up_anim_f",
            suffix: ".png",
            start: 1,
            end: 4,
        }),
        frameRate: 8,
        repeat: -1,
    });

    anims.create({
        key: "knight-run-down",
        frames: anims.generateFrameNames("knight", {
            prefix: "knight_f_run_down_anim_f",
            suffix: ".png",
            start: 1,
            end: 4,
        }),
        frameRate: 8,
        repeat: -1,
    });
};

export { createCharacterAnims };
