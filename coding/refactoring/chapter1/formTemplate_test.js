// test code
var m1 = new Movie('ShawShank Redemption', 1);
var m2 = new Movie('Godfather', 2);
var m3 = new Movie('Once Upon a Time in America', 0);

var r1 = new Rental(m1, 5);
var r2 = new Rental(m2, 2);
var r3 = new Rental(m1, 3);
var r4 = new Rental(m3, 2);
var r5 = new Rental(m2, 8);
var r6 = new Rental(m3, 5);

var c1 = new Customer('Jane');
var c2 = new Customer('Geoffrey');

c1.addRental(r1);
c1.addRental(r4);
c1.addRental(r5);
c2.addRental(r2);
c2.addRental(r3);
c2.addRental(r6);

c1.statement();
c1.htmlStatement();
