var assert = require("power-assert")
var diff = require("./index")
describe("Compact diff", function(){
  it("first", function(){
    var result = diff("", "some")
    var expect = [
      { added: "some" }
    ]
    assert.deepEqual(result, expect)
  })
  it("convert", function(){
    var result = diff("foobaz", "foodoo")
    var expect = [
      { value: "foo" },
      { added: "doo", removed: "baz" }
    ]
    assert.deepEqual(result, expect)
  })
  it("delete", function(){
    var result = diff("foobaz", "foo")
    var expect = [
      { value: "foo"},
      { removed: "baz"}
    ]
    assert.deepEqual(result, expect)
  })
  it("add first", function(){
    var result = diff("baz", "foobaz")
    var expect = [
      { added: "foo"},
      { value: "baz"}
    ]
    assert.deepEqual(result, expect)
  })
  it("insert", function(){
    var result = diff("foobaz", "foodorbaz")
    var expect = [
      { value: "foo" },
      { added: "dor"},
      { value: "baz" }
    ]
    assert.deepEqual(result, expect)
  })
})
