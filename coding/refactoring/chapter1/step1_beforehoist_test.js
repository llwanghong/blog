var 
    // add customers
    c1  = new Customer('Hong'),
    c2  = new Customer('Iren'),

    // add movies
    m1  = new Movie('The Redemption of ShawShank', 1),
    m2  = new Movie('Leon - The professional', 1),
    m3  = new Movie('A Chinese Odyssey - Part I', 1),
    m4  = new Movie('A Chinese Odyssey - Part II', 1),
    m5  = new Movie('Godfather Part I', 0),
    m6  = new Movie('Godfather Part II', 2),
    m7  = new Movie('Godfather Part III', 2),
    m8  = new Movie('Transformers', 0),
    m9  = new Movie('Wolverine', 1),
    m10 = new Movie('The Classic', 2),
    m11 = new Movie('Daisy', 1),

    // add rentals
    r1  = new Rental(m10, 5),
    r2  = new Rental(m1, 7),
    r3  = new Rental(m11, 2),
    r4  = new Rental(m3, 3),
    r5  = new Rental(m5, 4),
    r6  = new Rental(m1, 7),
    r7  = new Rental(m2, 1),
    r8  = new Rental(m7, 6),
    r9  = new Rental(m8, 9),
    r10 = new Rental(m3, 10),
    r11 = new Rental(m5, 2),
    r12 = new Rental(m6, 5),
    r13 = new Rental(m1, 3),
    r14 = new Rental(m1, 3);

c1.addRental(r1);
c1.addRental(r5);
c1.addRental(r10);
c1.statement();

c2.addRental(r6);
c2.addRental(r7);
c2.addRental(r14);
c2.statement();
