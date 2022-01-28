controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Main.isHittingTile(CollisionDirection.Bottom)) {
        Main.vy = -5 * pixelsToMeters
        music.jumpUp.play()
    }
})
function initializeLvl1 () {
    tiles.setTilemap(tilemap`lvl1`)
    scene.setBackgroundImage(assets.image`backdrop1`)
    game.showLongText("Welcome to Viking CLash!", DialogLayout.Bottom)
    game.showLongText("Your goal is to get all chests loot! But it's not going to be easy! There will be enmies and  and traps!", DialogLayout.Bottom)
    game.showLongText("Use the wasd keys to move, and the spacebar or \"a\" to jump.", DialogLayout.Bottom)
    game.showLongText("Good luck, and have fun!", DialogLayout.Bottom)
    createPlayer()
    tiles.placeOnTile(Main, tiles.getTileLocation(1, 25))
}
function createDragon1 () {
    Enemy1 = sprites.create(assets.image`dragonEnemy1`, SpriteKind.Enemy)
    Enemy1.ay = 500
    Enemy1.vx = -50
}
function createDragon3 () {
    Enemy3 = sprites.create(assets.image`dragonEnemy3`, SpriteKind.Enemy)
    Enemy3.ay = 500
    Enemy3.vx = -50
}
function createDragon2 () {
    Enemy2 = sprites.create(assets.image`dragonEnemy1`, SpriteKind.Enemy)
    Enemy2.ay = 500
    Enemy2.vx = -50
}
function createPlayer () {
    Main = sprites.create(assets.image`Player`, SpriteKind.Player)
    Main.ay = 500
    controller.moveSprite(Main, 80, 0)
    info.setScore(0)
    info.setLife(3)
    scene.cameraFollowSprite(Main)
}
let Enemy2: Sprite = null
let Enemy3: Sprite = null
let Enemy1: Sprite = null
let Main: Sprite = null
let pixelsToMeters = 0
pixelsToMeters = 30
