"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjPath {
    static valuesAtPath(path, obj) {
        const acc = [];
        this._pathHelper(acc, path, 0, obj);
        return acc;
    }
    static _pathHelper(accumulator, path, idx, subObj) {
        // current sub object is null, we are done
        if (subObj == null) {
            return;
        }
        if (path == null) {
            return;
        }
        // index is past the path, take the current object
        if (idx >= path.length) {
            accumulator.push(subObj);
            return;
        }
        if (Array.isArray(subObj)) {
            // current object is an array, apply serach for values to each value in array
            subObj.forEach(v => {
                this._pathHelper(accumulator, path, idx, v);
            });
        }
        else {
            // access the object at an index
            const pathKey = path[idx];
            const newSubObj = subObj[pathKey];
            this._pathHelper(accumulator, path, idx + 1, newSubObj);
        }
    }
}
exports.ObjPath = ObjPath;
