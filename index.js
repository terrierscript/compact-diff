// Generate compact diff
var JsDiff = require("diff")

var pack = function(diff){
  var str = {}
  if(diff.added){
    str.added = diff.value
    return str
  }
  if(diff.removed){
    str.removed = diff.value
    return str
  }
  str.value = diff.value
  return str
}

var hasChange = function(diff){
  return diff.added || diff.removed
}

var compactDiff = function(prev, current) {
  var diff = JsDiff.diffChars(prev, current)
  var diffStruct = []
  diff.reduce(function(first, second, index, arr) {
    if (first.removed && second.added) {
      diffStruct.push({
        removed: first.value,
        added: second.value
      })
      return {}
    }
    if(first.added && !second.removed) {
      diffStruct.push(pack(first))
    }
    if(first.removed && !second.added) {
      diffStruct.push(pack(first))
    }
    if(!hasChange(second)) {
      diffStruct.push(pack(second))
    } else if(index === arr.length - 1 ){ // last
      diffStruct.push(pack(second))
    }
    return second
  }, {})
  return diffStruct
}

var reverseStr = function(str){
  return str.split("").reverse().join("")
}

var reversedCompactDiff = function(prev, current){
  var reversedPrev = reverseStr(prev)
  var reversedCurrent = reverseStr(current)
  var diff = compactDiff(reversedPrev, reversedCurrent)
  return diff.reverse().map(function(d){
    var data = {}
    var keys = ["value", "added", "removed"]
    keys.forEach(function(k){
      var val = d[k]
      if(val){
        data[k] = reverseStr(d[k])
      }
    })
    return data
  })
}

module.exports = function(prev, current){
  var diff = compactDiff(prev, current)
  return diff
}

module.exports.fromEnding = function(prev, current){
  var rev = reversedCompactDiff(prev, current)
  return rev
}
