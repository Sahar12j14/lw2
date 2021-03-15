function validator(value) {
  let test = true;
  return {
    testValue: value,
    min(value) {
      if (test && this.testValue >= value) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    max(value) {
      if (test && this.testValue <= value) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    minLenght(value) {
      if (test && this.testValue.length > value) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    maxLenght(value) {
      if (test && this.testValue.length <= value) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    equal(value) {
      if (test && value.toString() === this.testValue.toString()) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    isString: function () {
      if (
        (test && typeof this.testValue === "string") ||
        this.testValue instanceof String
      ) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    isArray() {
      if (Array.isArray(this.testValue)) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    isNumber() {
      if (test && typeof this.testValue === "number") {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    isEmail() {
      if (
        test &&
        this.testValue.match(/^[\w-.]+@[\w-]+.[a-z]{2,4}$/i) != null
      ) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    isFloat() {
      if (
        test &&
        validator(this.testValue).isNumber() &&
        this.testValue.toString().indexOf(".") != -1
      ) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    isDate() {
      if (test && this.testValue.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/) != null) {
        this.test = true;
        return this;
      } else {
        this.test = false;
      }
      return this;
    },
    validate() {
      return this.test;
    },
  };
}

console.log("isArray isString isNumber");
console.log(validator("1").isArray().validate()); // false
console.log(validator("1").isString().validate()); // true
console.log(validator("1").isNumber().validate()); // false
  
console.log("Min Max");
console.log(validator(10).isNumber().min(10).validate()); // true
console.log(validator(10).isNumber().min(4).max(9).validate()); // false
  
console.log("isArray equal");
console.log(validator([]).isArray().equal([1, 2, 3]).validate()); // false
console.log(validator([1, 2, 3]).isArray().equal([1, 2, 3]).validate()); // true
  
console.log("isString isEmail isDate");
console.log(validator("user@m").isString().isEmail().validate()); // false
console.log(validator("user@mail.ru").isString().isEmail().validate()); // true
console.log(validator("25.12.1993").isDate().validate()); // true