
class DinnerModel {
    constructor(guests = 2) {
        this.setNumberOfGuests(guests);
    }
    setNumberOfGuests(x){
        if (x < 0) throw "invalid input:["+x+"] is a negative number";
        if (x === 0) throw "invalid input: ["+x+"] is not a valid input"; // three = is stupid
        if (!Number.isInteger(x)) throw "invalid input: ["+x+"] is not an Integer";
        this.numberOfGuests = x;
        console.log(e);
    }
}