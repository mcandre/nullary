'use strict';

var nullary = require('../lib/nullary'),

    assert = require('assert');

describe('nullary', function() {
    describe('set', function() {
        it('should persist data through distinct function scopes', function() {
            var expectedCount = 3,
                expectedKind = 'red delicious';

            (function() {
                var apples = {count: expectedCount, kind: expectedKind};
                nullary.set(nullary.background, 'fruit', apples);
            })();

            (function() {
                var observedFruit = nullary.get(nullary.background, 'fruit'),
                    observedCount = observedFruit.count,
                    observedKind = observedFruit.kind;

                assert.equal(expectedCount, observedCount);
                assert.equal(expectedKind, observedKind);
            })();
        });

        it('should handle custom namespaces', function() {
            var namespace = 'Hutt syndicate',
                bountyHunter = 'Boba Fett';

            nullary.set(namespace, 'henchman', bountyHunter);

            assert.equal(bountyHunter, nullary.get(namespace, 'henchman'));
        });
    });

    describe('get', function() {
        it('should indicate missing namespaces with null', function() {
            nullary.resetNamespaces();

            assert.equal(null, nullary.get('Jeopardy Categories', 'Potent Potables'));
        });

        it('should pass through missing keys', function() {
            nullary.resetNamespaces();

            assert.equal('undefined', typeof (nullary.get(nullary.background, 'anaerobic bacterium')));
        });
    });

    describe('resetNamespaces', function() {
        it('should restore default context state', function() {
            nullary.set(nullary.background, 'chip', 'arm');

            assert.equal('arm', nullary.get(nullary.background, 'chip'));

            nullary.resetNamespaces();

            assert.equal(null, nullary.get(nullary.background, 'chip'));
        });
    });

    describe('cancelNamespace', function() {
        it('should remove the given namespace', function() {
            nullary.set('coffee_shops', 'locations', 'two for every street corner');

            assert.equal('two for every street corner', nullary.get('coffee_shops', 'locations'));

            nullary.cancelNamespace('coffee_shops');

            assert.equal(null, nullary.get('coffee_shops', 'locations'));
        });

        it('should truncate the background namespace', function() {
            nullary.set(nullary.background, 'punctuation', '.');

            assert.equal('.', nullary.get(nullary.background, 'punctuation'));

            nullary.cancelNamespace(nullary.background);

            assert.equal(null, nullary.get(nullary.background, 'punctuation'));
        });
    });
});
