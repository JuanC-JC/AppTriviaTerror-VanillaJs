class timer{

    constructor(time){
        this.time = time;
        this.chronometer = undefined;;
    }



    initTimer() {
        this.chronometer = setInterval(() => {
            console.log(this.time--)
            if(this.time < 10){
                clearInterval(this.timer)
            }
        }, 1000 )
    }
}




var pepe = new timer(20)


pepe.initTimer()

