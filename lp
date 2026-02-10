# ip 2


class Student {
    private name: string;
    private age: number;
    private subject: string;

    constructor(name: string, age: number, subject: string) {
        this.name = name;
        this.age = age;
        this.subject = subject;
    }

    info(): string {
        return ${this.name}, ${this.age}, ${this.subject};
    }
}

const student1 = new Student("Иван", 17, "math");
const student2 = new Student("Ольга", 16, "physics");

console.log(student1.info()); 
console.log(student2.info());
