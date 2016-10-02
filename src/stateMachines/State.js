var StateMachine = StateMachine || {};

StateMachine.State = function (name, prefab) {
    "use strict";
    this.name = name;
    this.prefab = prefab;
};

StateMachine.State.prototype.enter = function () {
    "use strict";
};

StateMachine.State.prototype.exit = function () {
    "use strict";
};

StateMachine.State.prototype.handle_input = function (command) {
    "use strict";
    return this.name;
};