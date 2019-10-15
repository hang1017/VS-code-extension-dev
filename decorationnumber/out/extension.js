"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DecorationNumber_1 = require("./DecorationNumber");
function activate(context) {
    let decorationNumber = new DecorationNumber_1.DecorationNumber();
    context.subscriptions.push(decorationNumber);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map