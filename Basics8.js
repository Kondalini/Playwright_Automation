//Inheritance is the mail pillar in object oriented programing
// one class can inherit/acqire the properties,Methods of another class
// The class which inherits the properties ot the other is known as subclass(child,derived class)
// the class whose properties are inherited is knowm as superclass ot parent class

const Person = require("./Basics7");

class Pet extends Person{

get location(){

    return 'BlueCross'
}
constructor(firstName,lastName){
    //call parent class constructor 
super(firstName,lastName)

}

}
let pet = new Pet ('Sam','Sam')
pet.fullName()
console.log(pet.location)