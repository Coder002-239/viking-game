controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Main.isHittingTile(CollisionDirection.Bottom)) {
        Main.vy = -5 * pixelsToMeters
        music.smallCrash.play()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.left.isPressed()) {
        projectile = sprites.createProjectileFromSprite(assets.image`vikingStar`, Main, -100, 5)
    } else {
        projectile = sprites.createProjectileFromSprite(assets.image`vikingStar`, Main, 100, 5)
    }
    music.pewPew.play()
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava0, function (sprite, location) {
    info.changeScoreBy(70)
    music.powerDown.play()
    tiles.placeOnTile(Main, tiles.getTileLocation(1, 25))
})
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.hazardLava1, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        sprite.vy = -5 * pixelsToMeters
    }
})
function initializeLvl2 () {
    scene.setBackgroundImage(assets.image`backdrop2`)
    tiles.setTilemap(tilemap`lvl2`)
    tiles.placeOnTile(Main, tiles.getTileLocation(1, 25))
    info.setLife(3)
    createDragon1()
    tiles.placeOnTile(Enemy1, tiles.getTileLocation(21, 15))
    createDragon2()
    tiles.placeOnTile(Enemy2, tiles.getTileLocation(30, 21))
}
function initializeLvl3 () {
    scene.setBackgroundImage(assets.image`backdrop3`)
    tiles.setTilemap(tilemap`lvl3`)
    tiles.placeOnTile(Main, tiles.getTileLocation(1, 25))
    info.setLife(3)
    createDragon1()
    tiles.placeOnTile(Enemy1, tiles.getTileLocation(11, 18))
    createDragon2()
    tiles.placeOnTile(Enemy2, tiles.getTileLocation(26, 21))
    createDragon3()
    tiles.placeOnTile(Enemy3, tiles.getTileLocation(39, 26))
}
scene.onOverlapTile(SpriteKind.Enemy, sprites.dungeon.hazardLava0, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        sprite.vy = -5 * pixelsToMeters
    }
})
function initializeLvl1 () {
    scene.setBackgroundImage(assets.image`backdrop1`)
    tiles.setTilemap(tilemap`lvl1`)
    game.showLongText("Welcome to Viking CLash!", DialogLayout.Bottom)
    game.showLongText("Your goal is to get all chests loot! But it's not going to be easy! There will be enmies and  and traps!", DialogLayout.Bottom)
    game.showLongText("Use the arrow keys to move and jump!", DialogLayout.Bottom)
    game.showLongText("Good luck, and have fun!", DialogLayout.Bottom)
    createPlayer()
    tiles.placeOnTile(Main, tiles.getTileLocation(1, 25))
    info.setLife(3)
    createDragon1()
    tiles.placeOnTile(Enemy1, tiles.getTileLocation(16, 19))
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Chat1`, function (sprite, location) {
    music.baDing.play()
    game.showLongText("Watch out for lava! If you fall into it you will lose a life and have to respawn at the beginning of the level.", DialogLayout.Bottom)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Left)) {
        sprite.vx = 50
    }
    if (sprite.isHittingTile(CollisionDirection.Right)) {
        sprite.vx = -50
    }
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.hazardLava1, function (sprite, location) {
    info.changeLifeBy(-1)
    music.powerDown.play()
    tiles.placeOnTile(Main, tiles.getTileLocation(1, 25))
})
function createDragon1 () {
    Enemy1 = sprites.create(assets.image`dragonEnemy1`, SpriteKind.Enemy)
    Enemy1.ay = 500
    Enemy1.vx = -50
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`battleStar`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(70)
    music.powerUp.play()
})
function createDragon3 () {
    Enemy3 = sprites.create(assets.image`dragonEnemy3`, SpriteKind.Enemy)
    Enemy3.ay = 500
    Enemy3.vx = -50
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest2`, function (sprite, location) {
    game.showLongText("Great job! You have gotten a treasure chest.", DialogLayout.Bottom)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Chat3`, function (sprite, location) {
    music.baDing.play()
    game.showLongText("Watch out for the dragons! If it hits you, you will lose a life!", DialogLayout.Bottom)
    game.showLongText("Press the spacebar or \"a\" to throw a viking star and eliminate them!", DialogLayout.Bottom)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
function createDragon2 () {
    Enemy2 = sprites.create(assets.image`dragonEnemy1`, SpriteKind.Enemy)
    Enemy2.ay = 500
    Enemy2.vx = -50
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`chat2`, function (sprite, location) {
    music.baDing.play()
    game.showLongText("Here is the special battle-star, which can be found in each level! Acquiring this will give you 70 extra points.", DialogLayout.Bottom)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`chest1`, function (sprite, location) {
    game.showLongText("Great job! You have gotten a treasure chest.", DialogLayout.Bottom)
    initializeLvl2()
})
function createPlayer () {
    Main = sprites.create(assets.image`Player`, SpriteKind.Player)
    Main.ay = 500
    controller.moveSprite(Main, 80, 0)
    info.setScore(0)
    scene.cameraFollowSprite(Main)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 500)
    sprite.destroy(effects.coolRadial, 500)
    music.zapped.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    timer.throttle("action", 500, function () {
        music.powerDown.play()
        info.changeLifeBy(-1)
        scene.cameraShake(4, 500)
    })
})
let Enemy3: Sprite = null
let Enemy2: Sprite = null
let Enemy1: Sprite = null
let projectile: Sprite = null
let Main: Sprite = null
let pixelsToMeters = 0
pixelsToMeters = 30
initializeLvl1()
