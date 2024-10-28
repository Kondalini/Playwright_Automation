module.exports = class Person {

age =25
//location = 'Canada'
get location(){

    return 'Canada'
}
// constructor is a method which executes by default when you create object of the class
constructor(firstName,lastName){

this.firstName = firstName
this.lastName = lastName

}
//methods
fullName(){

   console.log( this.firstName + this.lastName)
}

}
//let person = new Person("Alex", "Krastev")
//let person1 = new Person("Alex", "Alex")
//console.log(person.age)
//console.log(person.location)
//console.log(person.fullName())
//console.log(person1.fullName())