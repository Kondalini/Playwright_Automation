const Person = require('./Basics7')
let day = 'tuesday '
console.log(day.length)
let subDay = (day.slice(0,4))
console.log(subDay)
console.log(day[1])
let splitDay = day.split("s")
console.log(splitDay[1].length)
console.log(splitDay[1].trim().length)

let date = "23"
let nextDate = "27"
let diff = parseInt(nextDate) - parseInt(date)
console.log(diff)
diff.toString()
let newQuote =  day + "Is Funday day"
console.log(newQuote)
var val = newQuote.indexOf('day',5)
console.log(val)

var val = newQuote.indexOf('day')
let count = 0
while(val!== -1){

count++
val = newQuote.indexOf('day',val+1)
}
console.log(count)

let person  = new Person("Alexander", "Alex")
console.log(person.fullName())