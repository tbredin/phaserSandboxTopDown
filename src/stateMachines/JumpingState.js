var StateMachine = StateMachine || {};

StateMachine.JumpingState = function (name, prefab, jumping_speed) {
    "use strict";
    StateMachine.State.call(this, name, prefab);
    this.jumping_speed = jumping_speed;
};

StateMachine.JumpingState.prototype = Object.create(StateMachine.State.prototype);
StateMachine.JumpingState.prototype.constructor = StateMachine.JumpingState;

StateMachine.JumpingState.prototype.enter = function () {
    "use strict";
    // set vertical velocity
    this.prefab.body.velocity.y = -this.jumping_speed;
};

StateMachine.JumpingState.prototype.handle_input = function (command) {
    "use strict";
    switch (command.name) {
    case "fall":
        return "standing";
    }
    StateMachine.State.prototype.handle_input.call(this, command);
};