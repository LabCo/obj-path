import {ObjPath} from "../lib"
import {} from "jest"

describe("obj path", () => {

  const testObj = { 
    key1: "value1",
    key2: "value2",
    key3: {
      sKey1: "sValue1",
      sKey2: {
        ssKey1: "ssValue1",
        ssKey2: "ssValue2",
        ssKey3: "ssValue3"
      }
    }
  }

  const testWithArrayObj = { 
    key1: "value1",
    key2: "value2",
    enrollment: {
      sKey2: {
        ssKey1: "ssValue1",
        ssKey2: "ssValue2",
        ssKey3: "ssValue3"
      },
      wizards:[
        { 
          name: "bob", 
          abilities: ["sleep", "eat", "snore"],
          location: {
            city: "boston",
            street:" boylston street"
          }
        },
        { 
          name: "george",
          abilities: ["eat", "magic", "pranks" ],
          location: {
            city: "london",
            street: "shack"
          }
        },
        { 
          name: "harry",
          abilities: [ "eat", "magic" ],
          location: {
            city: "london",
            street: "privet drive"
          }
        },
      ]
    }
  }

  it("should succeed on an empty object", () => {
    const obj = {}
    const path = ["foo", "fi", "fee"]
    expect( ObjPath.valuesAtPath(path, obj) ).toEqual([])
  })

  it("should succeed on an empty path", () => {
    const obj = { key: "value" }
    const path:string[] = []
    expect( ObjPath.valuesAtPath(path, obj) ).toEqual([obj])
  })

  it("should succeed on an null object", () => {
    const obj = null
    const path:string[] = []
    expect( ObjPath.valuesAtPath(path, obj) ).toEqual([])
  })

  it("should succeed on a null path", () => {
    const obj = { key: "value" }
    expect( ObjPath.valuesAtPath(<any>null, obj) ).toEqual([])
  })


  it("should extract a value when the path is too long", () => {
    const obj = { 
      key1: "value1",
      key2: "value2",
      key3: {
        subKey1: "subValue1",
        subKey2: "subValue2"
      }
    }
    const path = ["key3", "subKey1", "subSubKey2"]
    expect( ObjPath.valuesAtPath(path, obj) ).toEqual([])
  })

  it("should extract a value when the path is short", () => {
    const path = ["key3", "sKey2"]
    const expected = {
      ssKey1: "ssValue1",
      ssKey2: "ssValue2",
      ssKey3: "ssValue3"
    }

    expect( ObjPath.valuesAtPath(path, testObj) ).toEqual([expected])
  })

  it("should extract a value when the object has an array", () => {
    const path = ["enrollment", "wizards", "name"]
    const expected = ["bob", "george", "harry"]
    expect( ObjPath.valuesAtPath(path, testWithArrayObj) ).toEqual(expected)
  })

  it("should extract a deep value when the object has an array", () => {
    const path = ["enrollment", "wizards", "location", "city"]
    const expected = ["boston", "london", "london"]
    expect( ObjPath.valuesAtPath(path, testWithArrayObj) ).toEqual(expected)
  })

})