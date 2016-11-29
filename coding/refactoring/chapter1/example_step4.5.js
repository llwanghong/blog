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

    this.getCharge = function () {
    
        var result = 0;
    
        switch (this.getMovie().getPriceCode()) {
            case Movie.REGULAR:
                result += 2;
                if (this.getDaysRented() > 2) {
                    result += (this.getDaysRented() - 2) * 1.5;
                }
                break;

            case Movie.NEW_RELEASES:
                result += this.getDaysRented() * 3;
                break;

            case Movie.CHILDRENS:
                result += 1.5;
                if (this.getDaysRented() > 3) {
                    result += (this.getDaysRented() - 3) * 1.5;
                }
                break;     
        }

        return result;
    };

    this.getFrequentRenterPoints = function () {
        if ((this.getMovie().getPriceCode() == Movie.NEW_RELEASES)
            && this.getDaysRented() > 1) {
            return 2;
        } else {
            return 1;
        }
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
            frequentRenterPoints += each.getFrequentRenterPoints();

            // show figures for this rental
            result += "\t" + each.getMovie().getTitle() + "\t" +
                each.getCharge() + "\n";

            totalAmount += each.getCharge();
        }.bind(this));

        // add footer lines
        result += "Amount owed is " + totalAmount + "\n";
        result += "You earned " + frequentRenterPoints + " frequent renter points";

        return result;
    };
};
