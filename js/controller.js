document.body.onload = () => {
    var control = new AirConsoleWrapper("controller"); 
    
    /* options = {
    zone: document.getElementById("some-id"),                  // active zone
    color: "whatever",
    mode: "static/semi/dynamic",
    size: Integer,
    threshold: Float,               // before triggering a directional event
    fadeTime: Integer,              // transition time
    multitouch: Boolean,
    maxNumberOfNipples: Number,     // when multitouch, what is too many?
    dataOnly: Boolean,              // no dom element whatsoever
    position: Object,               // preset position for 'static' mode
    mode: String,                   // 'dynamic', 'static' or 'semi'
    restOpacity: Number,            // opacity when not 'dynamic' and rested
    catchDistance: Number           // distance to recycle previous joystick in
                      */                // 'semi' mode

var manager = nipplejs.create({
        zone: document.getElementById('joystick-zone'),
        mode: 'static',
        position: {left: '50%', top: '30%'},
        color: 'red'
    });
manager.on('move', function(evt, joystick) {
  if (joystick) {
    console.log("sending following package")
    console.log(joystick)
    control.talkToScreen({joystickData: joystick})
  }
})

document.getElementById("fire-button").onclick =
function() {
    control.talkToScreen("fire! by-"+control.airconsole.convertDeviceIdToPlayerNumber(control.airconsole.getDeviceId()))
}

}



