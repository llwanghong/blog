/**
 * common variables
 */
var proto = null;

/**
 * Price Class
 */
var Price = function () {
    // abstract method
    this.getPriceCode = function () {};

    this.getCharge = function (daysRented) {};

    this.getFrequentRenterPoints = function (daysRented) {
	return 1;
    };
};

var ChildrensPrice = function () {
    // implemented method
    this.getPriceCode = function () {
        return Movie.CHILDRENS;
    };

    this.getCharge = function (daysRented) {
        var result = 1.5;
        if (daysRented > 3) {
            result += (daysRented - 3) * 1.5;
        }
        
	return result;
    };
};

ChildrensPrice.prototype = new Price();

var NewReleasePrice = function () {
    // implemented method
    this.getPriceCode = function () {
        return Movie.NEW_RELEASES;
    };

    this.getCharge = function (daysRented) {
        return daysRented * 3;
    };

    this.getFrequentRenterPoints = function (daysRented) {
        return (daysRented > 1) ? 2 : 1;
    };
};

NewReleasePrice.prototype = new Price();

var RegularPrice = function () {
    // implemented method
    this.getPriceCode = function () {
        return Movie.REGULAR;
    };

    this.getCharge = function (daysRented) {
        var result = 2;
        if (daysRented > 2) {
            result += (daysRented - 2) * 1.5;
        }

	return result;
    };
};

RegularPrice.prototype = new Price();


/**
 * Movie Class
 */

var Movie = function (title, price) {
    // private properties
    var _title, _price;

    _title = title;
    _price = price;

    // instance method
    this.getPriceCode = function () {
        return _price.getPriceCode();
    };

    this.setPriceCode = function (arg) {
        switch (arg) {
            case Movie.REGULAR:
	        _price = new RegularPrice();
                break;

            case Movie.NEW_RELEASES:
	        _price = new NewReleasePrice();
                break;

            case Movie.CHILDRENS:
	        _price = new ChildrensPrice();
                break;     
        }

    };

    this.getTitle = function () {
        return _title;
    }; 

    this.getCharge = function (daysRented) {
	return _price.getCharge(daysRented);
    };

    this.getFrequentRenterPoints = function (daysRented) {
        return _price.getFrequentRenterPoints(daysRented);
    };
};

/**
 * Static Properties
 */
Movie.CHILDRENS    = 2;
Movie.REGULAR      = 0;
Movie.NEW_RELEASES = 1;


/**
 * Rental Class
 */
var Rental = function (movie, daysRented) {
    // private properties
    var _movie, _daysRented;

    _movie = movie;
    _daysRented = daysRented;

    // instance method
    this.getDaysRented = function () {
        return _daysRented;
    };

    this.getMovie = function () {
        return _movie;
    };

    this.getCharge = function () {
	return _movie.getCharge(_daysRented);
    };

    this.getFrequentRenterPoints = function () {
	return _movie.getFrequentRenterPoints(_daysRented);
    };
};


/**
 * Customer Class
 */
var Customer = function (name) {
    // instance properties
    var _name, _rentals = [];

    _name = name;

    // instance methods
    this.addRental = function (arg) {
        _rentals.push(arg);
    };

    this.getName = function () {
        return _name;
    };

    this.statement = function () {
        var totalAmount = 0,
            frequentRenterPoints = 0,
            result = "Rental Record for " + this.getName() + "\n";

        _rentals.forEach(function (each, index) {

            // show figures for this rental
            result += "\t" + each.getMovie().getTitle() + "\t" +
                each.getCharge() + "\n";

        }.bind(this));

        // add footer lines
        result += "Amount owed is " + this.getTotalCharge() + "\n";
        result += "You earned " + this.getTotalFrequentRenterPoints() + " frequent renter points";

        return result;
    };

    this.htmlStatement = function () {
        var result = "<h1>Rental Record for <em>" + this.getName() + "</em></h1><p>\n";

        _rentals.forEach(function (each, index) {

            // show figures for this rental
            result += each.getMovie().getTitle() + ": " +
                each.getCharge() + "<br>\n";

        }.bind(this));

        // add footer lines
        result += "<p>You owe <em>" + this.getTotalCharge() + "</em><p>\n";
        result += "On this rental you earned <em>" + this.getTotalFrequentRenterPoints() + "</em> frequent renter points<p>";

        return result;
    };

    this.getTotalCharge = function () {
        var result = 0;

        _rentals.forEach(function (each, index) {
            result += each.getCharge();
        }.bind(this));

	return result;
    };

    this.getTotalFrequentRenterPoints = function () {
        var result = 0;

        _rentals.forEach(function (each, index) {
	    result += each.getFrequentRenterPoints();
        }.bind(this));

	return result;
    };
};
