class AirConsoleWrapper {
    constructor(type) {
        if (type == "screen") {
            console.log("made the screen");
            this.airconsole = new AirConsole();
            this.players = new Array();
            this.airconsole.onConnect = (deviceId) => {
                console.log("Does it connect?");
                this.players.push(deviceId);
                this.atLeastTwoPlayers();
                var playerNum = this.airconsole.convertDeviceIdToPlayerNumber(deviceId)
                this.talkToPlayer(playerNum, {content: "Hello from Screen, you are player-"+playerNum})
            }
            this.airconsole.onDisconnect = (deviceId) => {
            var player = this.airconsole.convertDeviceIdToPlayerNumber(deviceId);
                if (player != undefined) {
                    console.log("players array: "+this.players.content)
                    this.players.splice(players.indexOf(deviceId), 1)    
                }
                this.atLeastTwoPlayers();
            }
            
            // Called when SCREEN recieves data from CONTROLLER
            this.airconsole.onMessage = (deviceId, data) => {
                var player = this.airconsole.convertDeviceIdToPlayerNumber(deviceId)
                console.log("screen received message")
                if (player != undefined) {
                    if (data.content !== undefined) {
                        // data is an object that holds stuff, you can set what you want inside
                        // code
                        console.log("screen received message: WE'RE IN")
                        if (this.players.length == 1) {
                            document.getElementById("data").innerHTML = data.content
                        }
                        else {
                            document.getElementById("data").innerHTML += ", "
                            document.getElementById("data").innerHTML += data.content
                        }
                    }
                    if (data.joystickData !== undefined) {
                        document.getElementById("data").innerHTML = "Player Num:" + player + "Position: " +  data.joystickData.position + "Angle: " + data.joystickData.angle
                    }
                    if (data.fireData !== undefined) {
                        console.log("fired?- "+data.fireData+" from player"+player)
                    }
                }
            }
            
        }
        
        else if (type == "controller") {
            this.airconsole = new AirConsole({"orientation": "landscape"}) //or landscape
                    
            // Called when CONTROLLER recieves data from SCREEN (but you can technically also recieve from another controller)
            this.airconsole.onMessage = (deviceId, data) => {
                console.log("controller received message from: "+deviceId.content+" and data "+data.content)
                //if (deviceId == this.airconsole.SCREEN && data.content != undefined) {
                    // code
                    // cool way to vibrate the phone - navigator.vibrate(timeInMs)
                    console.log("controller received message: WE'RE IN")
                    document.getElementById("data").innerHTML = data.content
                    this.talkToScreen({content: "Hi there, my name is "+this.airconsole.getDeviceId()})
                //}
            }
        }
        
    }
    
    // Call this when the SCREEN wants to talk to the CONTROLLER
    talkToPlayer(playerNumber, data) {
        //device id = The device ID to send the message to. If "device_id" is undefined, the message is sent to all devices (except this one).
        var deviceId = this.airconsole.convertPlayerNumberToDeviceId(playerNumber)
        //for (var j = 0; j < this.players.length; j++) {
        //    if (this.airconsole.convertDeviceIdToPlayerNumber(this.players[j]) == playerNumber) {
        //        deviceId = this.players[j]
        //    }
        //}
        console.log("playerNumber: "+playerNumber+", deviceId: "+deviceId+", data: "+data.content)
        this.airconsole.message(deviceId, data)
    }
    
    talkToScreen(data) {
        this.airconsole.message(0, data)
    }
    
    atLeastTwoPlayers() {
        //if (this.players.length < 2) {
        //    this.airconsole.setActivePlayers(0);
        //}
        //else {
            this.airconsole.setActivePlayers(this.players.length);
        //}
    }

}