/**
 * common variables
 */
var proto = null;

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
            var thisAmount =0;

            thisAmount = this.amountFor(each);

            // add frequent renter points
            frequentRenterPoints++;

            // add bounds for a two day new release rental
            if ((each.getMovie().getPriceCode() == Movie.NEW_RELEASES) &&
                each.getDaysRented() > 1) {
                frequentRenterPoints++;
            }

            // show figures for this rental
            result += "\t" + each.getMovie().getTitle() + "\t" +
                thisAmount + "\n";

            totalAmount += thisAmount;
        }.bind(this));

        // add footer lines
        result += "Amount owed is " + totalAmount + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";

        return result;
    };

    this.amountFor = function (aRental) {
        var result = 0;
    
        switch (aRental.getMovie().getPriceCode()) {
            case Movie.REGULAR:
                result += 2;
                if (aRental.getDaysRented() > 2) {
                    result += (aRental.getDaysRented() - 2) * 1.5;
                }
                break;

            case Movie.NEW_RELEASES:
                result += aRental.getDaysRented() * 3;
                break;

            case Movie.CHILDRENS:
                result += 1.5;
                if (aRental.getDaysRented() > 3) {
                    result += (aRental.getDaysRented() - 3) * 1.5;
                }
                break;     
        }

        return result;
    };
};
