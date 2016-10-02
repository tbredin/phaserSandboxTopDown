var StateMachine = StateMachine || {};

StateMachine.WalkingState = function (name, prefab, direction, walking_speed) {
    "use strict";
    StateMachine.State.call(this, name, prefab);

    this.walking_animation = this.prefab.animations.add("walking", [0, 1, 2, 1], 6, true);

    this.direction = direction;
    this.walking_speed = walking_speed;
};

StateMachine.WalkingState.prototype = Object.create(StateMachine.State.prototype);
StateMachine.WalkingState.prototype.constructor = StateMachine.WalkingState;

StateMachine.WalkingState.prototype.enter = function () {
    "use strict";
    // start animation and set velocity
    this.walking_animation.play();
    this.prefab.body.velocity.x = this.direction * this.walking_speed;

    if (this.direction === 1) {
        this.prefab.scale.setTo(-1, 1);
    } else {
        this.prefab.scale.setTo(1, 1);
    }
};

StateMachine.WalkingState.prototype.exit = function () {
    "use strict";
    // stop animation and set velocity to zero
    this.walking_animation.stop();
};

StateMachine.WalkingState.prototype.handle_input = function (command) {
    "use strict";
    switch (command.name) {
    case "stop":
        return "standing";
    case "jump":
        return "jumping";
    }
    StateMachine.State.prototype.handle_input.call(this, command);
};