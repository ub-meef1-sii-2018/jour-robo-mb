let highLevel = 0
let medLevel = 0
let lowLevel = 0
let measures: number[] = []
let tries = 0
let actualLevel = 0
let medMeasure = 0
let target = 0
let k = 0
function resetMeasure()  {
    medMeasure = 0
    measures = []
}
input.onButtonPressed(Button.B, () => {
    onValid()
})
input.onButtonPressed(Button.AB, () => {
    onGameStart()
})
input.onGesture(Gesture.Shake, () => {
    onShake()
})
input.onButtonPressed(Button.A, () => {
    led.plot(0, 0)
})
function displayMeasure()  {
    basic.clearScreen()
    if (measures.length > 0) {
        basic.showNumber(medMeasure)
    } else {
        basic.showIcon(IconNames.Sad)
        basic.pause(500)
        basic.clearScreen()
    }
}
function victory()  {
    basic.showIcon(IconNames.Yes)
    target = 0
}
function onValid()  {
    computeMedMeasure()
    displayMeasure()
    basic.pause(500)
    if (target > 0) {
        tries += 1
        checkLevelTarget()
        if (actualLevel == target) {
            victory()
        } else {
            basic.showIcon(IconNames.No)
        }
        basic.pause(500)
        basic.showNumber(tries)
        basic.pause(500)
    }
    resetMeasure()
}
function onShake()  {
    medMeasure = Math.abs(input.acceleration(Dimension.X))
    if (input.buttonIsPressed(Button.A)) {
        measures.push(medMeasure)
    }
    displayMeasureLevel()
}
function checkLevelTarget()  {
    actualLevel = 0
    if (medMeasure > lowLevel) {
        actualLevel = 1
    }
    if (medMeasure > medLevel) {
        actualLevel = 2
    }
    if (medMeasure > highLevel) {
        actualLevel = 3
    }
}
function displayMeasureLevel()  {
    basic.clearScreen()
    if (medMeasure > lowLevel) {
        for (let k = 0; k <= 4; k++) {
            led.plot(k, 4)
        }
    }
    if (medMeasure > medLevel) {
        for (let k = 0; k <= 4; k++) {
            led.plot(k, 3)
        }
    }
    if (medMeasure > highLevel) {
        for (let k = 0; k <= 4; k++) {
            led.plot(k, 2)
        }
    }
}
function onGameStart()  {
    resetMeasure()
    target = Math.random(3)
    target += 1
    basic.pause(500)
    basic.showLeds(`
        . . # . .
        # # # # .
        # # # # #
        # # # # .
        . . # . .
        `)
    if (target == 1) {
        basic.showString("L")
    }
    if (target == 2) {
        basic.showString("M")
    }
    if (target == 3) {
        basic.showString("H")
    }
    basic.pause(2500)
    basic.clearScreen()
}
function computeMedMeasure()  {
    medMeasure = 0
    for (let valeur of measures) {
        medMeasure += valeur
    }
    medMeasure = medMeasure / measures.length
}
target = 0
tries = 0
lowLevel = 100
medLevel = 650
highLevel = 1200
resetMeasure()
basic.forever(() => {
	
})
