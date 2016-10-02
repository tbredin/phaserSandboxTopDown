var StateMachine = StateMachine || {};

StateMachine.StandingState = function (name, prefab, frame) {
    "use strict";
    StateMachine.State.call(this, name, prefab);
    this.frame = frame;
};

StateMachine.StandingState.prototype = Object.create(StateMachine.State.prototype);
StateMachine.StandingState.prototype.constructor = StateMachine.StandingState;

StateMachine.StandingState.prototype.enter = function () {
    "use strict";
    // set standing frame and velocity to 0
    this.prefab.frame = this.frame;
    this.prefab.body.velocity.x = 0;
};

StateMachine.StandingState.prototype.handle_input = function (command) {
    "use strict";
    switch (command.name) {
    case "walk":
        if (command.direction === "left") {
            return "walking_left";
        } else {
            return "walking_right";
        }
    case "jump":
        return "jumping";
    }
    StateMachine.State.prototype.handle_input.call(this, command);
};