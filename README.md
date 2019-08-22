# nullary: Zero-argument processing

# ABOUT

nullary provides a [Go context](https://golang.org/pkg/context/)-like dependency injection API for passing arguments into a function, independent of the function's arguments.

# EXAMPLE

```javascript
var nullary = require('nullary');

(function() {
    var apples = { count: 3, kind: 'red delicious' };
    nullary.set(nullary.background, 'fruit', apples);
})();

(function() {
    var apples = nullary.get(nullary.background, 'fruit');
    console.log(apples);
})();

// => { count: 3, kind: 'red delicious' }
```

# NPM

https://www.npmjs.com/package/nullary

# REQUIREMENTS

* [Node.js](https://nodejs.org/) 8.16.0+

## Recommended

* [GNU findutils](https://www.gnu.org/software/findutils/) (e.g., see `brew info findutils`)

# LICENSE

FreeBSD

# DEVELOPMENT

## Test (all)

```console
$ grunt test
```

# Test (unit)

```console
$ npm test
```

## Lint

```console
$ grunt lint
```
