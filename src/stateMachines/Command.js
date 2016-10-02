var StateMachine = StateMachine || {};

StateMachine.Command = function (name, properties) {
    "use strict";
    var property;
    this.name = name;
    for (property in properties) {
        if (properties.hasOwnProperty(property)) {
            this[property] = properties[property];
        }
    }
};
