const heroes = [
    {
        name: 'Wizard',
        type: 'spellcaster',
        damage: 5,
        health: 100,
        gold: 50,
        level: 1
    },
    {
        name: 'Knight',
        type: 'man',
        damage: 10,
        health: 100,
        gold: 50,
        level: 1
    },
]

const boss = [
    {
        name: `Satan's Right Hand`,
        health: 100,
        maxHealth: 100,
        damage: 5,
        level: 1,
    },
]

function drawKnight() {
    const knightHealthElem = document.getElementById("healthForKnight")
    const knightGoldElem = document.getElementById("goldForKnight")
    const knightLevelElem = document.getElementById("XPForKnight")
    console.log(knightGoldElem, knightHealthElem, knightLevelElem)
    const knightObject = heroes.find((Hero) => Hero.name == 'Knight')
    // @ts-ignore
    knightHealthElem.innerText = `${knightObject?.health}`
    // @ts-ignore
    knightGoldElem.innerText = `${knightObject?.gold}`
    // @ts-ignore
    knightLevelElem.innerText = `${knightObject?.level}`
    console.log(knightObject)
}

function drawWizard() {
    const wizardHealthElem = document.getElementById("healthForWizard")
    const wizardGoldElem = document.getElementById("goldForWizard")
    const wizardLevelElem = document.getElementById("XPForWizard")
    const wizardObject = heroes.find((Hero) => Hero.name == "Wizard")
    // @ts-ignore
    wizardHealthElem.innerText = `${wizardObject.health}`
    // @ts-ignore
    wizardGoldElem.innerText = `${wizardObject.gold}`
    // @ts-ignore
    wizardLevelElem.innerText = `${wizardObject.level}`
    console.log(wizardObject)
}

function attackBoss() {
    let wizardDamage = heroes.find((Wizard) => Wizard.name == 'Wizard')
    let knightDamage = heroes.find((Knight) => Knight.name == 'Knight')
    const bossHealthElem = document.getElementById('healthForBoss')
    const bossKillCountelem = document.getElementById('bossKillCount')
    const bossObject = boss.find((Boss) => Boss.name == `Satan's Right Hand`)
    bossObject.health -= (wizardDamage.damage + knightDamage.damage)
    //NOTE Clamp down on health to make sure it cant go below zero
    if (bossObject.health < 0) {
        bossObject.health = 0
    }
    bossLevelUp()
    bossHealthElem.innerText = `${bossObject.health}`
    bossKillCountelem.innerText = `${bossObject.level - 1}`
    console.log(bossObject)
}

function attackPlayers() {
    let bossDamage = boss.find((Boss) => Boss.name == `Satan's Right Hand`)
    const knightHealthElem = document.getElementById("healthForKnight")
    const wizardHealthElem = document.getElementById("healthForWizard")
    let knightHealth = heroes.find((Knight) => Knight.name == 'Knight')
    let wizardHealth = heroes.find((Wizard) => Wizard.name == 'Wizard')
    wizardHealth.health = wizardHealth.health -= bossDamage.damage
    knightHealth.health = knightHealth.health -= bossDamage.damage
    if (wizardHealth?.health && knightHealth.health < 0) {
        wizardHealth.health = 0
        knightHealth.health = 0
    }
    console.log('This is the wizards Health', wizardHealth.health)
    drawKnight()
    drawWizard()
    checkIfBothHeroesAreDead()
}

function checkIfBothHeroesAreDead() {
    let wizardDamage = heroes.find((Wizard) => Wizard.name == 'Wizard')
    let knightDamage = heroes.find((Knight) => Knight.name == 'Knight')

    if (wizardDamage.health == 0 && knightDamage.health == 0) {
        location.reload()
    }
}
function bossLevelUp() {
    const bossObject = boss.find((Boss) => Boss.name == `Satan's Right Hand`)
    if (bossObject.health <= 0) {
        bossObject.level += 1
        bossObject.maxHealth = (100 + (bossObject?.level * 25))
        bossObject.health = bossObject?.maxHealth
    }
    // let totalBossHealth = bossObject?.maxHealth + (bossObject.level * 25)
    // console.log(totalBossHealth)

}

function heroesLevelUp() {
    const wizardObject = heroes.find((Hero) => Hero.name == "Wizard")
    const knightObject = heroes.find((Hero) => Hero.name == 'Knight')
    const bossObject = boss.find((Boss) => Boss.name == `Satan's Right Hand`)

    if (bossObject.health <= 0) {
        wizardObject.level += 1
        wizardObject.gold = (50 + (wizardObject.level * 50))
        knightObject.level += 1
        knightObject.gold = (50 + (knightObject.level * 50))
        wizardObject.damage += 2
        knightObject.damage += 1
        wizardObject.health += 15
        knightObject.health += 15

    }

}
// ANCHOR Auto Run Function


drawKnight()
drawWizard()
checkIfBothHeroesAreDead()
// setInterval(attackPlayers, 500)