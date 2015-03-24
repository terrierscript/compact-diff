# compact-diff [![Circle CI](https://circleci.com/gh/suisho/compact-diff.svg?style=svg)](https://circleci.com/gh/suisho/compact-diff)

Compact result diff ([kpdecker/jsdiff](https://github.com/kpdecker/jsdiff) wrapper)


# Usage

```js
var compactDiff = require("compact-diff")
var result = compactDiff("foogesbaz", "foodorbaz")
// result = [
//   { value: "foo" },
//   { added: "dor", removed : "ges"},
//   { value: "baz" }
// ]
```

## `fromEnding`

Check diff from end of character

```js
var compactDiff = require("compact-diff")
var result = diff.fromEnd("foobazbaz", "bazbazbaz")
// result = [
//   { added: "baz", removed: "foo" },
//   { value: "bazbaz" }
// ]
```

# Output
This module output those array
- `value` : Set value if not change(added or removed)
- `added` : Set value if `added`
- `removed` : Set value if `removed`
- If `added` and `removed` is adjacenced, those output as same object