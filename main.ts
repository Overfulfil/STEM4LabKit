enum BME280_I2C_ADDRESS {
    //% block="0x76"
    ADDR_0x76 = 0x76,
    //% block="0x77"
    ADDR_0x77 = 0x77
}

enum BME280_T {
    //% block="C"
    T_C = 0,
    //% block="F"
    T_F = 1
}

enum BME280_P {
    //% block="Pa"
    Pa = 0,
    //% block="hPa"
    hPa = 1
}

//% weight=0 color=#3CB371 icon="\uf1b3" block="STEM For Lab Kit"
//% groups=['Color', 'Gas', 'Pressure', 'Pressure', 'Moisture', 'others']
namespace STEMLab {

    /* G54 TCS34725 RGBC color sensor addr 0x29 return boolean */
    //% blockId="RGBStart" block="RGB Start"
    //% blockGap=2 weight=90
    //% group="Color"
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

    /* G54 TCS34725 RGBC color sensor addr 0x29 register 0x14-15 command 0x94-95 return byte */
    //% blockId="RGBgetClear" block="RGB get Clear Light"
    //% blockGap=2 weight=86
    //% group="Color"
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
    //% group="Color"
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
    //% group="Color"
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
    //% group="Color"
    export function RGBgetBlue(): number {
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)
	pins.i2cWriteNumber(41,186,NumberFormat.UInt8LE,false)
	basic.pause(200)
	let Blue = pins.i2cReadNumber(41, NumberFormat.UInt16LE, false)
        return Blue
   }
	

/*BME280*/
    let BME280_I2C_ADDR = BME280_I2C_ADDRESS.ADDR_0x76

    function setreg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(BME280_I2C_ADDR, buf);
    }

    function getreg(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.UInt8BE);
    }

    function getInt8LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.Int8LE);
    }

    function getUInt16LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.UInt16LE);
    }

    function getInt16LE(reg: number): number {
        pins.i2cWriteNumber(BME280_I2C_ADDR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(BME280_I2C_ADDR, NumberFormat.Int16LE);
    }

    let dig_T1 = getUInt16LE(0x88)
    let dig_T2 = getInt16LE(0x8A)
    let dig_T3 = getInt16LE(0x8C)
    let dig_P1 = getUInt16LE(0x8E)
    let dig_P2 = getInt16LE(0x90)
    let dig_P3 = getInt16LE(0x92)
    let dig_P4 = getInt16LE(0x94)
    let dig_P5 = getInt16LE(0x96)
    let dig_P6 = getInt16LE(0x98)
    let dig_P7 = getInt16LE(0x9A)
    let dig_P8 = getInt16LE(0x9C)
    let dig_P9 = getInt16LE(0x9E)
    let dig_H1 = getreg(0xA1)
    let dig_H2 = getInt16LE(0xE1)
    let dig_H3 = getreg(0xE3)
    let a = getreg(0xE5)
    let dig_H4 = (getreg(0xE4) << 4) + (a % 16)
    let dig_H5 = (getreg(0xE6) << 4) + (a >> 4)
    let dig_H6 = getInt8LE(0xE7)
    setreg(0xF2, 0x04)
    setreg(0xF4, 0x2F)
    setreg(0xF5, 0x0C)
    let T = 0
    let P = 0
    let H = 0

    function get(): void {
        let adc_T = (getreg(0xFA) << 12) + (getreg(0xFB) << 4) + (getreg(0xFC) >> 4)
        let var1 = (((adc_T >> 3) - (dig_T1 << 1)) * dig_T2) >> 11
        let var2 = (((((adc_T >> 4) - dig_T1) * ((adc_T >> 4) - dig_T1)) >> 12) * dig_T3) >> 14
        let t = var1 + var2
        T = Math.idiv((t * 5 + 128) >> 8, 100)
        var1 = (t >> 1) - 64000
        var2 = (((var1 >> 2) * (var1 >> 2)) >> 11) * dig_P6
        var2 = var2 + ((var1 * dig_P5) << 1)
        var2 = (var2 >> 2) + (dig_P4 << 16)
        var1 = (((dig_P3 * ((var1 >> 2) * (var1 >> 2)) >> 13) >> 3) + (((dig_P2) * var1) >> 1)) >> 18
        var1 = ((32768 + var1) * dig_P1) >> 15
        if (var1 == 0)
            return; // avoid exception caused by division by zero
        let adc_P = (getreg(0xF7) << 12) + (getreg(0xF8) << 4) + (getreg(0xF9) >> 4)
        let _p = ((1048576 - adc_P) - (var2 >> 12)) * 3125
        _p = Math.idiv(_p, var1) * 2;
        var1 = (dig_P9 * (((_p >> 3) * (_p >> 3)) >> 13)) >> 12
        var2 = (((_p >> 2)) * dig_P8) >> 13
        P = _p + ((var1 + var2 + dig_P7) >> 4)
        let adc_H = (getreg(0xFD) << 8) + getreg(0xFE)
        var1 = t - 76800
        var2 = (((adc_H << 14) - (dig_H4 << 20) - (dig_H5 * var1)) + 16384) >> 15
        var1 = var2 * (((((((var1 * dig_H6) >> 10) * (((var1 * dig_H3) >> 11) + 32768)) >> 10) + 2097152) * dig_H2 + 8192) >> 14)
        var2 = var1 - (((((var1 >> 15) * (var1 >> 15)) >> 7) * dig_H1) >> 4)
        if (var2 < 0) var2 = 0
        if (var2 > 419430400) var2 = 419430400
        H = (var2 >> 12) >> 10
    }

    /**
     * get pressure
     */
    //% blockId="BME280_GET_PRESSURE" block="pressure %u"
    //% weight=80 blockGap=8
    //% group="Pressure"
    export function pressure(u: BME280_P): number {
        get();
        if (u == BME280_P.Pa) return P;
        else return Math.idiv(P, 100)
    }

    /**
     * get temperature
     */
    //% blockId="BME280_GET_TEMPERATURE" block="temperature %u"
    //% weight=80 blockGap=8
    //% group="Pressure"
    export function temperature(u: BME280_T): number {
        get();
        if (u == BME280_T.T_C) return T;
        else return 32 + Math.idiv(T * 9, 5)
    }

    /**
     * get humidity
     */
    //% blockId="BME280_GET_HUMIDITY" block="humidity"
    //% weight=80 blockGap=8
    //% group="Pressure"
    export function humidity(): number {
        get();
        return H;
    }

    /**
     * power on
     */
    //% blockId="BME280_POWER_ON" block="Power On"
    //% weight=22 blockGap=8
    //% group="Pressure"
    export function PowerOn() {
        setreg(0xF4, 0x2F)
    }

    /**
     * power off
     */
    //% blockId="BME280_POWER_OFF" block="Power Off"
    //% weight=21 blockGap=8
    //% group="Pressure"
    export function PowerOff() {
        setreg(0xF4, 0)
    }

    /**
     * Calculate Dewpoint
     */
    //% block="Dewpoint"
    //% weight=60 blockGap=8
    //% group="Pressure"
    export function Dewpoint(): number {
        get();
        return T - Math.idiv(100 - H, 5)
    }

    /**
     * Pressure below Event
     */
    //% block="Pressure below than %dat" dat.defl=100000
    //% group="Pressure"
    export function PressureBelowThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (P < dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    /**
     * Pressure higher Event
     */
    //% block="Pressure higher than %dat" dat.defl=100000
    //% group="Pressure"
    export function PressureHigherThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (P > dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    /**
     * humidity below Event
     */
    //% block="Humidity below than %dat" dat.defl=10
    export function HumidityBelowThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (H < dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    /**
     * humidity higher Event
     */
    //% block="Humidity higher than %dat" dat.defl=50
    //% group="Pressure"
    export function HumidityHigherThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (H > dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    /**
     * temperature below Event
     */
    //% block="Temperature below than %dat" dat.defl=10
    //% group="Pressure"
    export function TemperatureBelowThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (T < dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    /**
     * temperature higher Event
     */
    //% block="Temperature higher than %dat" dat.defl=30
    //% group="Pressure"
    export function TemperatureHigherThan(dat: number, body: () => void): void {
        control.inBackground(function () {
            while (true) {
                get()
                if (T > dat) {
                    body()
                }
                basic.pause(1000)
            }
        })
    }

    /**
     * set I2C address
     */
    //% blockId="BME280_SET_ADDRESS" block="set address %addr"
    //% weight=20 blockGap=8
    //% group="Pressure"
    export function Address(addr: BME280_I2C_ADDRESS) {
        BME280_I2C_ADDR = addr
    }
	
/*Soil*/
    //% blockId="readMoisture" block="Soil Moisture (0-4096)"
    //% blockGap=2 weight=79
    export function readMoisture(): number {
   	pins.i2cWriteNumber(81,0,NumberFormat.Int8LE,false)
	return (4096 - pins.i2cReadNumber(81, NumberFormat.UInt16BE, false))    
    }
	
    //% blockId="soilTooDry" block="Soil too dry?"
    //% blockGap=2 weight=79
    export function soilTooDry(): boolean {
   	pins.i2cWriteNumber(81,0,NumberFormat.Int8LE,false)
	if ((4096 - pins.i2cReadNumber(81, NumberFormat.UInt16BE, false)) < 100) {
		return true    
	}
	return false
    }

    //% blockId="soilTooWet" block="Soil too Wet?"
    //% blockGap=2 weight=79
    export function soilTooWet(): boolean {
   	pins.i2cWriteNumber(81,0,NumberFormat.Int8LE,false)
	if ((4096 - pins.i2cReadNumber(81, NumberFormat.UInt16BE, false)) > 3000) {
		return true    
	}
	return false
    }

/* TVOC*/
    //% blockId="indenvStart" block="IndEnv Sensor Start"
    //% blockGap=2 weight=79
    export function indenvStart(): boolean {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    basic.pause(200)
	    /* CJMCU-8118 CCS811 addr 0x5A reg 0x20 Read Device ID = 0x81 */
	    pins.i2cWriteNumber(90,32,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    if (pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) != 129) {
		    return false
	    }
	    basic.pause(200)
	    /* CJMCU-8118 AppStart CCS811 addr 0x5A register 0xF4 */
	    pins.i2cWriteNumber(90,244,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    /* CJMCU-8118 CCS811 Driving Mode 1 addr 0x5A register 0x01 0x0110 */
	    pins.i2cWriteNumber(90,272,NumberFormat.UInt16BE,false)
	    basic.pause(200)
	    /* CJMCU-8118 CCS811 Status addr 0x5A register 0x00 return 1 byte */	    
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    if (pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) %2 !=0) {
		    return false
	    }
	    basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    if (Math.idiv(pins.i2cReadNumber(90, NumberFormat.UInt8LE, false), 16) !=9) {
		    return false
	    }
	    basic.pause(200)
	    return true
    }
	

    //% blockId="indenvgeteCO2" block="IndEnv get eCO2"
    //% blockGap=2 weight=76
    export function indenvgeteCO2(): number {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    pins.i2cWriteNumber(90,2,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    return pins.i2cReadNumber(90, NumberFormat.UInt16BE, false)
    }

    //% blockId="indenvgetTVOC" block="IndEnv get TVOC"
    //% blockGap=2 weight=75
    export function indenvgetTVOC(): number {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    pins.i2cWriteNumber(90,2,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    return (pins.i2cReadNumber(90, NumberFormat.UInt32BE, false) % 65536)
    }


    //% blockId="indenvGasStatus" block="IndEnv Gas Status"
    //% blockGap=2 weight=74
    export function indenvGasStatus(): number {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    let GasStatus = pins.i2cReadNumber(90, NumberFormat.UInt8LE, false)
	    basic.pause(200)
	    return GasStatus
    }

    //% blockId="indenvGasReady" block="IndEnv Gas Data Ready"
    //% blockGap=2 weight=73
    export function indenvGasReady(): boolean {
	    pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,false)
	    basic.pause(200)
	    if ((pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) % 16) !=8) {
		    return false
	    }
	    return true
    }


}
