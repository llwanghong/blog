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
};

var ChildrenPrice = function () {
    // implemented method
    this.getPriceCode = function () {
        return Movie.CHILDRENS;
    };
};

ChildrenPrice = new Price();

var NewReleasePrice = function () {
    // implemented method
    this.getPriceCode = function () {
        return Movie.NEW_RELEASE;
    };
};

NewReleasePrice = new Price();

var RegularPrice = function () {
    // implemented method
    this.getPriceCode = function () {
        return Movie.REGULAR;
    };
};

RegularPrice = new Price();


/**
 * Movie Class
 */

var Movie = function (title, priceCode) {
    // private properties
    var _title, _priceCode;

    _title = title;
    _priceCode = priceCode;

    // instance method
    this.getPriceCode = function () {
        return _priceCode;
    };

    this.setPriceCode = function (arg) {
        _priceCode = arg;
    };

    this.getTitle = function () {
        return _title;
    }; 

    this.getCharge = function (daysRented) {
    
        var result = 0;
    
        switch (this.getPriceCode()) {
            case Movie.REGULAR:
                result += 2;
                if (daysRented > 2) {
                    result += (daysRented - 2) * 1.5;
                }
                break;

            case Movie.NEW_RELEASES:
                result += daysRented * 3;
                break;

            case Movie.CHILDRENS:
                result += 1.5;
                if (daysRented > 3) {
                    result += (daysRented - 3) * 1.5;
                }
                break;     
        }

        return result;
    };

    this.getFrequentRenterPoints = function (daysRented) {
        // add bounds for a two day new release rental
        if ((this.getPriceCode() == Movie.NEW_RELEASES) &&
            daysRented > 1) {
            return 2;
        } else {
	    return 1;
	}
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
