'use strict';

var background = 'background';

exports.background = background;

var contexts;

function resetNamespaces() {
    contexts = {
        background: {}
    };
}

resetNamespaces();

exports.resetNamespaces = resetNamespaces;

function cancelNamespace(namespace) {
    if (namespace === background) {
        contexts[background] = {};
        return;
    }

    delete contexts[namespace];
}

exports.cancelNamespace = cancelNamespace;

function set(namespace, key, value) {
    if (!(namespace in contexts)) {
        contexts[namespace] = {};
    }

    contexts[namespace][key] = value;
}

exports.set = set;

function get(namespace, key) {
    if (!(namespace in contexts)) {
        return null;
    }

    return contexts[namespace][key];
}

exports.get = get;
