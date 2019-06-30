//% weight=0 color=#3CB371 icon="\uf1b3" block="RGB Color Sensor"

namespace RGBcolorsensor {

    /* G54 TCS34725 RGBC color sensor addr 0x29 return boolean */
    //% blockId="RGBStart" block="RGB Start"
    //% blockGap=2 weight=90
    export function RGBStart(): boolean {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)

	pins.i2cWriteNumber(41,146,NumberFormat.UInt8LE,false)
	basic.pause(200)
	if (pins.i2cReadNumber(41, NumberFormat.UInt8LE, false) !=68) {
		return false
	}
	basic.pause(200)
	/* G54 TCS34725 RGBC color sensor Enable write addr 0x29 register 0x00 command 0x80 */
	/* write 0x8003 */
	pins.i2cWriteNumber(41,32771,NumberFormat.UInt16BE,false)
	basic.pause(200)
	/* G54 TCS34725 RGBC color sensor Enable read addr 0x29 register 0x00 command 0x80 */
	/* check for 0x03 */
	pins.i2cWriteNumber(41,128,NumberFormat.UInt8LE,false)
	basic.pause(200)
	if (pins.i2cReadNumber(41, NumberFormat.UInt8LE, false) !=3) {
		return false
	}
	basic.pause(200)
	/* G54 TCS34725 RGBC color sensor Status addr 0x29 register 0x13 command 0x93 */
	/* check for 0x11 */
	pins.i2cWriteNumber(41,147,NumberFormat.UInt8LE,false)
	basic.pause(200)
	if (pins.i2cReadNumber(41, NumberFormat.UInt8LE, false) !=17) {
		return false
	}
	return true
    }

    /* G54 TCS34725 RGBC color sensor addr 0x29 register 0x00 command 0x80 return byte */
/*
    //% blockId="G54enable" block="G54 Enable"
    //% blockGap=2 weight=89
    export function G54enable() {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)
	pins.i2cWriteNumber(41,128,NumberFormat.UInt8LE,false)
	basic.pause(200)
	pins.i2cWriteNumber(41,3,NumberFormat.UInt8LE,false)
    }
*/
    /* G54 TCS34725 RGBC color sensor addr 0x29 register 0x12 command 0x92 return byte */
/*
    //% blockId="G54getIDno" block="G54 get IDno"
    //% blockGap=2 weight=88
    export function G54getIDno(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)
	pins.i2cWriteNumber(41,146,NumberFormat.UInt8LE,false)
	basic.pause(200)
	let IDno = pins.i2cReadNumber(41, NumberFormat.UInt8LE, false)
        return IDno
    }
*/
    /* G54 TCS34725 RGBC color sensor addr 0x29 register 0x13 command 0x93 return byte */
/*
    //% blockId="G54getStatus" block="G54 get Status"
    //% blockGap=2 weight=87
    export function G54getStatus(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)
	pins.i2cWriteNumber(41,147,NumberFormat.UInt8LE,false)
	basic.pause(200)
	let Status = pins.i2cReadNumber(41, NumberFormat.UInt8LE, false)
        return Status
    }
*/
    /* G54 TCS34725 RGBC color sensor addr 0x29 register 0x14-15 command 0x94-95 return byte */
    //% blockId="RGBgetClear" block="RGB get Clear Light"
    //% blockGap=2 weight=86
    export function RGBgetClear(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)
	pins.i2cWriteNumber(41,180,NumberFormat.UInt8LE,false)
	basic.pause(200)
	let Clrdata = pins.i2cReadNumber(41, NumberFormat.UInt16LE, false)
        return Clrdata
    }

    /* G54 TCS34725 RGBC color sensor addr 0x29 register 0x16-17 command 0x96-97 return byte */
    //% blockId="RGBgetRed" block="RGB get Red"
    //% blockGap=2 weight=85
    export function RGBgetRed(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)
	pins.i2cWriteNumber(41,182,NumberFormat.UInt8LE,false)
	basic.pause(200)
	let Red = pins.i2cReadNumber(41, NumberFormat.UInt16LE, false)
        return Red
    }

    /* G54 TCS34725 RGBC color sensor addr 0x29 register 0x18-19 command 0x98-99 return byte */
    //% blockId="RGBgetGreen" block="RGB get Green"
    //% blockGap=2 weight=84
    export function RGBgetGreen(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)
	pins.i2cWriteNumber(41,184,NumberFormat.UInt8LE,false)
	basic.pause(200)
	let Green = pins.i2cReadNumber(41, NumberFormat.UInt16LE, false)
        return Green
    }

    /* G54 TCS34725 RGBC color sensor addr 0x29 register 0x1A-1B command 0x9A-9B return byte */
    //% blockId="RGBgetBlue" block="RGB get Blue"
    //% blockGap=2 weight=83
    export function RGBgetBlue(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)
	pins.i2cWriteNumber(41,186,NumberFormat.UInt8LE,false)
	basic.pause(200)
	let Blue = pins.i2cReadNumber(41, NumberFormat.UInt16LE, false)
        return Blue
   }

}
