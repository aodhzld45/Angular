class Person {

    private name : String;

    constructor(name : string) {
        this.name = name;
    }

    sayHello() {
        return "안녕하세요?" + this.name + "입니다.";
    }
}

let person = new Person('서현석');
console.log(person.sayHello);
