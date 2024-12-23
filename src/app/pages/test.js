// let curr = 0
// const abc = ["abc", "bcd", "cde"];

// function rotate(){
//     return abc[curr++ % abc.length];

// }


// console.log(rotate());
// console.log(rotate());

// const first = [1,2,3];
// const second = [4,5,6];

// const combined = [...first, 'a', ...second, 'b'];

// console.log(combined)

// const first = { name: 'hanry' };
// const second = { job: 'programmer' };

// const combined = {...first, ...second, location:'thamel'};


// console.log(combined)


class Person{
    constructor(name){
        this.name = name;
    }

    walk(){
        console.log('walk')
    }
}

const person = new Person('Mosh');
person.walk()

console.log(person)