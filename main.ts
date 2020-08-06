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
//% groups=['Color', 'Gas', 'Pressure', 'Pressure', 'Moisture', 'OLED', 'EEPROM', "ThingSpeak"'others']
namespace STEMLab {

    let RGB_OK = true
    let Pressure_OK = true
    let TVOC_OK = true
    let Moisture_OK = true
	
    /**
     * Color sensor Start
     */
    //% blockId="RGBStart" block="Color sensor Start"
    //% blockGap=2 weight=100
    //% subcategory="Color" weight=90
    //% group="Color"
    export function RGBStart() : void {
	RGB_OK = true
	pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	basic.pause(200)

	pins.i2cWriteNumber(41,146,NumberFormat.UInt8LE,false)
	basic.pause(200)
	if (pins.i2cReadNumber(41, NumberFormat.UInt8LE, false) !=68) {
		RGB_OK = false
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
		RGB_OK = false
	}
	basic.pause(200)
	/* G54 TCS34725 RGBC color sensor Status addr 0x29 register 0x13 command 0x93 */
	/* check for 0x11 */
	pins.i2cWriteNumber(41,147,NumberFormat.UInt8LE,false)
	basic.pause(200)
	if (pins.i2cReadNumber(41, NumberFormat.UInt8LE, false) !=17) {
		RGB_OK = false
	}
    }

    /**
     * Read Red color
     */
    //% blockId="RGBgetRed" block="Red"
    //% blockGap=2 weight=85    
    //% subcategory="Color" weight=90
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

    /**
     * Read Green color
     */
    //% blockId="RGBgetGreen" block="Green"
    //% blockGap=2 weight=84    
    //% subcategory="Color" weight=90
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

    /**
     * Read Blue color
     */
    //% blockId="RGBgetBlue" block="Blue"
    //% blockGap=2 weight=83    
    //% subcategory="Color" weight=90
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
     * Read pressure
     */
    //% blockId="BME280_GET_PRESSURE" block="pressure %u"
    //% weight=80 blockGap=8
    //% subcategory="Pressure" weight=90
    //% group="Pressure"
    export function pressure(u: BME280_P): number {
        get();
        if (u == BME280_P.Pa) return P;
        else return Math.idiv(P, 100)
    }

    /**
     * Read temperature
     */
    //% blockId="BME280_GET_TEMPERATURE" block="temperature %u"
    //% weight=80 blockGap=8
    //% subcategory="Pressure" weight=90
    //% group="Pressure"
    export function temperature(u: BME280_T): number {
        get();
        if (u == BME280_T.T_C) return T;
        else return 32 + Math.idiv(T * 9, 5)
    }

    /**
     * Read humidity
     */
    //% blockId="BME280_GET_HUMIDITY" block="humidity"
    //% weight=80 blockGap=8
    //% subcategory="Pressure" weight=90
    //% group="Pressure"
    export function humidity(): number {
        get();
        return H;
    }

    /**
     * Pressure Sensor Start
     */
    //% blockId="BME280_POWER_ON" block="Pressure Sensor Start"
    //% weight=22 blockGap=8
    //% subcategory="Pressure" weight=90
    //% group="Pressure"
    export function PowerOn() {
        setreg(0xF4, 0x2F)
    }


/*Soil*/
    /**
    * Read Soil Moisture (0-4096)
    */	
    //% blockId="readMoisture" block="Soil Moisture (0-4096)"
    //% blockGap=2 weight=79 
    //% subcategory="Soil Moisture" weight=90
    //% group="Moisture"
    export function readMoisture(): number {
   	pins.i2cWriteNumber(81,0,NumberFormat.Int8LE,false)
	return (4096 - pins.i2cReadNumber(81, NumberFormat.UInt16BE, false))    
    }
	
/* TVOC*/	
    function indenvGasStatus(): number {
	    //pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    //pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    //basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,true)
	    //basic.pause(200)
	    let GasStatus = pins.i2cReadNumber(90, NumberFormat.UInt8LE, false)
	    //basic.pause(200)
	    return GasStatus
    }

    function indenvGasReady(): boolean {
	    if (TVOC_OK != true){
	           return false
	    }
	    //pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    //pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    //basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,true)
	    //basic.pause(200)
	    if ((pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) % 16) !=8) {
		    return false
	    }
	    return true
    }	

    /**
    * Gas sensor Start
    */		
    //% blockId="indenvStart" block="Gas Sensor Start"
    //% blockGap=2 weight=79 
    //% subcategory="Gas" weight=90
    //% group="Gas"
    export function indenvStart(): void {
	    TVOC_OK = true
	    //pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    //pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    //basic.pause(200)
	    //basic.pause(200)
	    /* CJMCU-8118 CCS811 addr 0x5A reg 0x20 Read Device ID = 0x81 */
	    pins.i2cWriteNumber(90,32,NumberFormat.UInt8LE,true)
	    //basic.pause(200)
	    if (pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) != 129) {
		    TVOC_OK = false
	    }
	    basic.pause(200)
	    /* CJMCU-8118 AppStart CCS811 addr 0x5A register 0xF4 */
	    pins.i2cWriteNumber(90,244,NumberFormat.UInt8LE,false)
	    //basic.pause(200)
	    /* CJMCU-8118 CCS811 Driving Mode 1 addr 0x5A register 0x01 0x0110 */
	    pins.i2cWriteNumber(90,272,NumberFormat.UInt16BE,false)
	    basic.pause(200)
	    /* CJMCU-8118 CCS811 Status addr 0x5A register 0x00 return 1 byte */	    
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,true)
	    //basic.pause(200)
	    if (pins.i2cReadNumber(90, NumberFormat.UInt8LE, false) %2 !=0) {
		    TVOC_OK = false
	    }
	    basic.pause(200)
	    pins.i2cWriteNumber(90,0,NumberFormat.UInt8LE,true)
	    //basic.pause(200)
	    if (Math.idiv(pins.i2cReadNumber(90, NumberFormat.UInt8LE, false), 16) !=9) {
		    TVOC_OK = false
	    }
	    basic.pause(200)
    }
	
    /**
    * Read estimated CO2
    */	
    //% blockId="indenvgeteCO2" block="Estimated CO2"
    //% blockGap=2 weight=76 
    //% subcategory="Gas" weight=90
    //% group="Gas"
    export function indenvgeteCO2(): number {
	    
	    let i 
	    
	    i = 0
	    
	    while (indenvGasReady() != true){
		    basic.pause(200)
		    i = i+1
		    if(i >= 10 )
			return -1;
	    }
	    //pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    //pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    //basic.pause(200)
	    pins.i2cWriteNumber(90,2,NumberFormat.UInt8LE,true)
	    //basic.pause(200)
	    return pins.i2cReadNumber(90, NumberFormat.UInt16BE, false)
    }

    /**
    * Read Total VOC
    */		
    //% blockId="indenvgetTVOC" block="TVOC"
    //% blockGap=2 weight=75 
    //% subcategory="Gas" weight=90
    //% group="Gas"
    export function indenvgetTVOC(): number {

	    let i 
	    
	    i = 0
	    
	    while (indenvGasReady() != true){
		    basic.pause(200)
		    i = i+1
		    if(i >= 10 )
			return -1;
	    }
	    //pins.setPull(DigitalPin.P19, PinPullMode.PullUp)
	    //pins.setPull(DigitalPin.P20, PinPullMode.PullUp)
	    //basic.pause(200)
	    pins.i2cWriteNumber(90,2,NumberFormat.UInt8LE,true)
	    //basic.pause(200)
	    return (pins.i2cReadNumber(90, NumberFormat.UInt32BE, false) % 65536)
    }

    let font: number[] = [];
    font[0] = 0x0022d422;
    font[1] = 0x0022d422;
    font[2] = 0x0022d422;
    font[3] = 0x0022d422;
    font[4] = 0x0022d422;
    font[5] = 0x0022d422;
    font[6] = 0x0022d422;
    font[7] = 0x0022d422;
    font[8] = 0x0022d422;
    font[9] = 0x0022d422;
    font[10] = 0x0022d422;
    font[11] = 0x0022d422;
    font[12] = 0x0022d422;
    font[13] = 0x0022d422;
    font[14] = 0x0022d422;
    font[15] = 0x0022d422;
    font[16] = 0x0022d422;
    font[17] = 0x0022d422;
    font[18] = 0x0022d422;
    font[19] = 0x0022d422;
    font[20] = 0x0022d422;
    font[21] = 0x0022d422;
    font[22] = 0x0022d422;
    font[23] = 0x0022d422;
    font[24] = 0x0022d422;
    font[25] = 0x0022d422;
    font[26] = 0x0022d422;
    font[27] = 0x0022d422;
    font[28] = 0x0022d422;
    font[29] = 0x0022d422;
    font[30] = 0x0022d422;
    font[31] = 0x0022d422;
    font[32] = 0x00000000;
    font[33] = 0x000002e0;
    font[34] = 0x00018060;
    font[35] = 0x00afabea;
    font[36] = 0x00aed6ea;
    font[37] = 0x01991133;
    font[38] = 0x010556aa;
    font[39] = 0x00000060;
    font[40] = 0x000045c0;
    font[41] = 0x00003a20;
    font[42] = 0x00051140;
    font[43] = 0x00023880;
    font[44] = 0x00002200;
    font[45] = 0x00021080;
    font[46] = 0x00000100;
    font[47] = 0x00111110;
    font[48] = 0x0007462e;
    font[49] = 0x00087e40;
    font[50] = 0x000956b9;
    font[51] = 0x0005d629;
    font[52] = 0x008fa54c;
    font[53] = 0x009ad6b7;
    font[54] = 0x008ada88;
    font[55] = 0x00119531;
    font[56] = 0x00aad6aa;
    font[57] = 0x0022b6a2;
    font[58] = 0x00000140;
    font[59] = 0x00002a00;
    font[60] = 0x0008a880;
    font[61] = 0x00052940;
    font[62] = 0x00022a20;
    font[63] = 0x0022d422;
    font[64] = 0x00e4d62e;
    font[65] = 0x000f14be;
    font[66] = 0x000556bf;
    font[67] = 0x0008c62e;
    font[68] = 0x0007463f;
    font[69] = 0x0008d6bf;
    font[70] = 0x000094bf;
    font[71] = 0x00cac62e;
    font[72] = 0x000f909f;
    font[73] = 0x000047f1;
    font[74] = 0x0017c629;
    font[75] = 0x0008a89f;
    font[76] = 0x0008421f;
    font[77] = 0x01f1105f;
    font[78] = 0x01f4105f;
    font[79] = 0x0007462e;
    font[80] = 0x000114bf;
    font[81] = 0x000b6526;
    font[82] = 0x010514bf;
    font[83] = 0x0004d6b2;
    font[84] = 0x0010fc21;
    font[85] = 0x0007c20f;
    font[86] = 0x00744107;
    font[87] = 0x01f4111f;
    font[88] = 0x000d909b;
    font[89] = 0x00117041;
    font[90] = 0x0008ceb9;
    font[91] = 0x0008c7e0;
    font[92] = 0x01041041;
    font[93] = 0x000fc620;
    font[94] = 0x00010440;
    font[95] = 0x01084210;
    font[96] = 0x00000820;
    font[97] = 0x010f4a4c;
    font[98] = 0x0004529f;
    font[99] = 0x00094a4c;
    font[100] = 0x000fd288;
    font[101] = 0x000956ae;
    font[102] = 0x000097c4;
    font[103] = 0x0007d6a2;
    font[104] = 0x000c109f;
    font[105] = 0x000003a0;
    font[106] = 0x0006c200;
    font[107] = 0x0008289f;
    font[108] = 0x000841e0;
    font[109] = 0x01e1105e;
    font[110] = 0x000e085e;
    font[111] = 0x00064a4c;
    font[112] = 0x0002295e;
    font[113] = 0x000f2944;
    font[114] = 0x0001085c;
    font[115] = 0x00012a90;
    font[116] = 0x010a51e0;
    font[117] = 0x010f420e;
    font[118] = 0x00644106;
    font[119] = 0x01e8221e;
    font[120] = 0x00093192;
    font[121] = 0x00222292;
    font[122] = 0x00095b52;
    font[123] = 0x0008fc80;
    font[124] = 0x000003e0;
    font[125] = 0x000013f1;
    font[126] = 0x00841080;
    font[127] = 0x0022d422;

    let _I2CAddr = 0;
    let _screen = pins.createBuffer(1025);
    let _buf2 = pins.createBuffer(2);
    let _buf3 = pins.createBuffer(3);
    let _buf4 = pins.createBuffer(4);
    let _ZOOM = 1;

    function cmd1(d: number) {
        let n = d % 256;
        pins.i2cWriteNumber(_I2CAddr, n, NumberFormat.UInt16BE);
    }

    function cmd2(d1: number, d2: number) {
        _buf3[0] = 0;
        _buf3[1] = d1;
        _buf3[2] = d2;
        pins.i2cWriteBuffer(_I2CAddr, _buf3);
    }

    function cmd3(d1: number, d2: number, d3: number) {
        _buf4[0] = 0;
        _buf4[1] = d1;
        _buf4[2] = d2;
        _buf4[3] = d3;
        pins.i2cWriteBuffer(_I2CAddr, _buf4);
    }

    function set_pos(col: number = 0, page: number = 0) {
        cmd1(0xb0 | page) // page number
        let c = col * (_ZOOM + 1)
        cmd1(0x00 | (c % 16)) // lower start column address
        cmd1(0x10 | (c >> 4)) // upper start column address    
    }

    // clear bit
    function clrbit(d: number, b: number): number {
        if (d & (1 << b))
            d -= (1 << b)
        return d
    }

    /**
     * set pixel in OLED
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     */
    //% blockId="OLED12864_I2C_PIXEL" block="set pixel at x %x|y %y"
    //% weight=70 blockGap=8 
    //% subcategory="OLED" weight=90
    //% group="OLED"
    export function pixel(x: number, y: number, color: number = 1) {
        let page = y >> 3
        let shift_page = y % 8
        let ind = x * (_ZOOM + 1) + page * 128 + 1
        let b = (color) ? (_screen[ind] | (1 << shift_page)) : clrbit(_screen[ind], shift_page)
        _screen[ind] = b
        set_pos(x, page)
        if (_ZOOM) {
            _screen[ind + 1] = b
            _buf3[0] = 0x40
            _buf3[1] = _buf3[2] = b
            pins.i2cWriteBuffer(_I2CAddr, _buf3)
        }
        else {
            _buf2[0] = 0x40
            _buf2[1] = b
            pins.i2cWriteBuffer(_I2CAddr, _buf2)
        }
    }

    /**
     * show text in OLED
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param s is the text will be show, eg: 'Hello!'
     */
    //% blockId="OLED12864_I2C_SHOWSTRING" block="show string at colume %x row %y text %s"
    //% weight=80 blockGap=8 
    //% subcategory="OLED" weight=90
    //% group="OLED"
    export function showString(x: number, y: number, s: string, color: number = 1) {
        let col = 0
        let p = 0
        let ind = 0
        for (let n = 0; n < s.length; n++) {
            p = font[s.charCodeAt(n)]
            for (let i = 0; i < 5; i++) {
                col = 0
                for (let j = 0; j < 5; j++) {
                    if (p & (1 << (5 * i + j)))
                        col |= (1 << (j + 1))
                }
                ind = (x + n) * 5 * (_ZOOM + 1) + y * 128 + i * (_ZOOM + 1) + 1
                if (color == 0)
                    col = 255 - col
                _screen[ind] = col
                if (_ZOOM)
                    _screen[ind + 1] = col
            }
        }
        set_pos(x * 5, y)
        let ind0 = x * 5 * (_ZOOM + 1) + y * 128
        let buf = _screen.slice(ind0, ind + 1)
        buf[0] = 0x40
        pins.i2cWriteBuffer(_I2CAddr, buf)
    }

    /**
     * show a number in OLED
     * @param x is X alis, eg: 0
     * @param y is Y alis, eg: 0
     * @param num is the number will be show, eg: 12
     */
    //% blockId="OLED12864_I2C_NUMBER" block="show a Number at colume %x row %y number %num"
    //% weight=80 blockGap=8 
    //% subcategory="OLED" weight=90
    //% group="OLED"
    export function showNumber(x: number, y: number, num: number, color: number = 1) {
        showString(x, y, num.toString(), color)
    }

    function hline(x: number, y: number, len: number, color: number = 1) {
        for (let i = x; i < (x + len); i++)
            pixel(i, y, color)
    }

    function vline(x: number, y: number, len: number, color: number = 1) {
        for (let i = y; i < (y + len); i++)
            pixel(x, i, color)
    }

    /**
     * draw a rectangle
     * @param x1 is X alis, eg: 0
     * @param y1 is Y alis, eg: 0
     * @param x2 is X alis, eg: 60
     * @param y2 is Y alis, eg: 30
     */
    //% blockId="OLED12864_I2C_RECT" block="draw a rectangle at x1 %x1|y1 %y1|x2 %x2|y2 %y2"
    //% weight=73 blockGap=8 
    //% subcategory="OLED" weight=90
    //% group="OLED"
    export function rect(x1: number, y1: number, x2: number, y2: number, color: number = 1) {
        if (x1 > x2)
            x1 = [x2, x2 = x1][0];
        if (y1 > y2)
            y1 = [y2, y2 = y1][0];
        hline(x1, y1, x2 - x1 + 1, color)
        hline(x1, y2, x2 - x1 + 1, color)
        vline(x1, y1, y2 - y1 + 1, color)
        vline(x2, y1, y2 - y1 + 1, color)
    }

    function draw() {
        set_pos()
        pins.i2cWriteBuffer(_I2CAddr, _screen)
    }

    /**
     * clear screen
     */
    //% blockId="OLED12864_I2C_CLEAR" block="clear"
    //% weight=63 blockGap=8 
    //% subcategory="OLED" weight=90
    //% group="OLED"
    export function clear() {
        _screen.fill(0)
        _screen[0] = 0x40
        draw()
    }


    function on() {
        cmd1(0xAF)
    }

    function off() {
        cmd1(0xAE)
    }

    function zoom(d: boolean = true) {
        _ZOOM = (d) ? 1 : 0
        cmd2(0xd6, _ZOOM)
    }

    /**
     * OLED Start
     */
    //% blockId="OLED12864_I2C_init" block="OLED Start"
    //% weight=100 blockGap=8 
    //% subcategory="OLED" weight=90
    //% group="OLED"
    export function init() {
        _I2CAddr = 60
        cmd1(0xAE)       // SSD1306_DISPLAYOFF
        cmd1(0xA4)       // SSD1306_DISPLAYALLON_RESUME
        cmd2(0xD5, 0xF0) // SSD1306_SETDISPLAYCLOCKDIV
        cmd2(0xA8, 0x3F) // SSD1306_SETMULTIPLEX
        cmd2(0xD3, 0x00) // SSD1306_SETDISPLAYOFFSET
        cmd1(0 | 0x0)    // line #SSD1306_SETSTARTLINE
        cmd2(0x8D, 0x14) // SSD1306_CHARGEPUMP
        cmd2(0x20, 0x00) // SSD1306_MEMORYMODE
        cmd3(0x21, 0, 127) // SSD1306_COLUMNADDR
        cmd3(0x22, 0, 63)  // SSD1306_PAGEADDR
        cmd1(0xa0 | 0x1) // SSD1306_SEGREMAP
        cmd1(0xc8)       // SSD1306_COMSCANDEC
        cmd2(0xDA, 0x12) // SSD1306_SETCOMPINS
        cmd2(0x81, 0xCF) // SSD1306_SETCONTRAST
        cmd2(0xd9, 0xF1) // SSD1306_SETPRECHARGE
        cmd2(0xDB, 0x40) // SSD1306_SETVCOMDETECT
        cmd1(0xA6)       // SSD1306_NORMALDISPLAY
        cmd2(0xD6, 1)    // zoom on
        cmd1(0xAF)       // SSD1306_DISPLAYON
        clear()
        _ZOOM = 1
    }	

    /**
    * Write 1 Byte to EEPROM 
    */
    //% blockId="EEPROMWriteByte" block="EEPROM Write Byte address %address|content %content"
    //% blockGap=2 weight=76 
    //% subcategory="EEPROM" weight=90
    //% group="EEPROM"
    export function EEPROMWriteByte(address: number = 2, content: number = 100): void {
    	let ret	
	let buf = pins.createBuffer(2);
	buf[0] = address
    	buf[1] = content
    	pins.i2cWriteBuffer(80, buf, false)
	basic.pause(100)
    }

    /**
    * Write 1 Word (2Byte) to EEPROM 
    */
    //% blockId="EEPROMWriteWord" block="EEPROM Write Word address %address |data %content"
    //% blockGap=2 weight=76 
    //% subcategory="EEPROM" weight=90
    //% group="EEPROM"
    export function EEPROMWriteWord(address: number = 2, content: number = 1000): void {
    	let ret3
	let buf2 = pins.createBuffer(3);
	buf2[0] = address
    	buf2[1] = content >> 8
    	buf2[2] = content & 0xFF
    	pins.i2cWriteBuffer(80, buf2, false)
	basic.pause(100)
    }

    /**
    * Read 1 Byte to EEPROM 
    */	
    //% blockId="EEPROMReadByte" block="EEPROM Read Byte address %address"
    //% blockGap=2 weight=76 
    //% subcategory="EEPROM" weight=90
    //% group="EEPROM"
    export function EEPROMReadByte(address: number = 2): NumberFormat.UInt8BE {
    	let ret2
	pins.i2cWriteNumber(80, address, NumberFormat.UInt8BE, true)
    	ret2 = pins.i2cReadNumber(80, NumberFormat.Int8BE, false)
    	basic.pause(100)
    	return ret2
    }

    /**
    * Read 1 Word (2Byte) to EEPROM 
    */
    //% blockId="EEPROMReadWord" block="EEPROM Read Word address %address"
    //% blockGap=2 weight=76 
    //% subcategory="EEPROM" weight=90
    //% group="EEPROM"
    export function EEPROMReadWord(address: number = 2): NumberFormat.Int16BE {
    	let ret22
	pins.i2cWriteNumber(80, address, NumberFormat.UInt8BE, true)
    	ret22 = pins.i2cReadNumber(80, NumberFormat.Int16BE, false)
    	basic.pause(100)
    	return ret22
    }

    let wifi_connected: boolean = false
    let thingspeak_connected: boolean = false
    let last_upload_successful: boolean = false

    // write AT command with CR+LF ending
    function sendAT(command: string, wait: number = 100) {
        serial.writeString(command + "\u000D\u000A")
        basic.pause(wait)
    }

    // wait for certain response from ESP8266
    function waitResponse(): boolean {
        let serial_str: string = ""
        let result: boolean = false
        let time: number = input.runningTime()
        while (true) {
            serial_str += serial.readString()
            if (serial_str.length > 200) serial_str = serial_str.substr(serial_str.length - 200)
            if (serial_str.includes("OK") || serial_str.includes("ALREADY CONNECTED")) {
                result = true
                break
            } else if (serial_str.includes("ERROR") || serial_str.includes("SEND FAIL")) {
                break
            }
            if (input.runningTime() - time > 30000) break
        }
        return result
    }

    /**
    * Initialize ESP8266 module and connect it to Wifi router
    */
    //% block="Initialize ESP8266|Baud rate %baudrate|Wifi SSID = %ssid|Wifi PW = %pw"
    //% ssid.defl=your_ssid
    //% pw.defl=your_pw
    //% subcategory="ThingSpeak" weight=100
    //% group="ThingSpeak"
    export function connectWifi(ssid: string, pw: string) {
	let tx = SerialPin.P8
	let rx = SerialPin.P16
	let BaudRate = 115200
        wifi_connected = false
        thingspeak_connected = false
        serial.redirect(
            tx,
            rx,
            baudrate
        )
        sendAT("AT+RESTORE", 1000) // restore to factory settings
        sendAT("AT+CWMODE=1") // set to STA mode
        sendAT("AT+RST", 1000) // reset
        sendAT("AT+CWJAP=\"" + ssid + "\",\"" + pw + "\"", 0) // connect to Wifi router
        wifi_connected = waitResponse()
        basic.pause(100)
    }

    /**
    * Connect to ThingSpeak and upload data. It would not upload anything if it failed to connect to Wifi or ThingSpeak.
    */
    //% block="Upload data to ThingSpeak|URL/IP = %ip|Write API key = %write_api_key|Field 1 = %n1|Field 2 = %n2|Field 3 = %n3|Field 4 = %n4|Field 5 = %n5|Field 6 = %n6|Field 7 = %n7|Field 8 = %n8"
    //% ip.defl=api.thingspeak.com
    //% write_api_key.defl=your_write_api_key
    //% subcategory="ThingSpeak" weight=90
    //% group="ThingSpeak"
    export function connectThingSpeak(ip: string, write_api_key: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) {
        if (wifi_connected && write_api_key != "") {
            thingspeak_connected = false
            sendAT("AT+CIPSTART=\"TCP\",\"" + ip + "\",80", 0) // connect to website server
            thingspeak_connected = waitResponse()
            basic.pause(100)
            if (thingspeak_connected) {
                last_upload_successful = false
                let str: string = "GET /update?api_key=" + write_api_key + "&field1=" + n1 + "&field2=" + n2 + "&field3=" + n3 + "&field4=" + n4 + "&field5=" + n5 + "&field6=" + n6 + "&field7=" + n7 + "&field8=" + n8
                sendAT("AT+CIPSEND=" + (str.length + 2))
                sendAT(str, 0) // upload data
                last_upload_successful = waitResponse()
                basic.pause(100)
            }
        }
    }


    function wait(delay: number) {
        if (delay > 0) basic.pause(delay)
    }

    /**
    * Check if ESP8266 successfully connected to Wifi
    */
    //% block="Wifi connected ?"
    //% subcategory="ThingSpeak" weight=60
    //% group="ThingSpeak"
    export function isWifiConnected() {
        return wifi_connected
    }

    /**
    * Check if ESP8266 successfully connected to ThingSpeak
    */
    //% block="ThingSpeak connected ?"
    //% subcategory="ThingSpeak" weight=50
    //% group="ThingSpeak"
    export function isThingSpeakConnected() {
        return thingspeak_connected
    }

    /**
    * Check if ESP8266 successfully uploaded data to ThingSpeak
    */
    //% block="Last data upload successful ?"
    //% subcategory="ThingSpeak" weight=40
    //% group="ThingSpeak"
    export function isLastUploadSuccessful() {
        return last_upload_successful
    }
}
