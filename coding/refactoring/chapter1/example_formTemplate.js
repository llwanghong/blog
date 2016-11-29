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
        // add bounds for a two day new release rental
        if ((this.getMovie().getPriceCode() == Movie.NEW_RELEASES) &&
            this.getDaysRented() > 1) {
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

    this.getRentals = function () {
        return _rentals;
    };

    this.getName = function () {
        return _name;
    };

    this.statement = function () {
        return new TextStatement().value(this);
    };

    this.htmlStatement = function () {
        return new HtmlStatement().value(this);
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


/**
 * Statment Class
 */
var Statement = function () {
    this.value = function (customer) {
        var result = this.headString(customer);

        customer.getRentals().forEach(function (each, index) {
            // show figures for this rental
            result += this.eachRentalString(each);
        }.bind(this));

        // add footer lines
        result += this.footerString(customer)

        return result;
    };

    // abstract interface
    this.headString = function (customer) {};
    this.eachRentalString = function (rental) {};
    this.footerString = function (customer) {};
};

/**
 * TextStatment Class
 */
var TextStatement = function () {
    this.headString = function (customer) {
        return "Rental Record for " + customer.getName() + "\n";
    };

    this.eachRentalString = function (rental) {
        return "\t" + rental.getMovie().getTitle() + "\t" +
            rental.getCharge() + "\n";
    };

    this.footerString = function (customer) {
        return "Amount owed is " + customer.getTotalCharge() + "\n" +
                "You earned " + customer.getTotalFrequentRenterPoints() + " frequent renter points";
    };
};

TextStatement.prototype = new Statement();

/**
 * HtmlStatment Class
 */
var HtmlStatement = function () {
    this.headString = function (customer) {
        return "<h1>Rental Record for <em>" + customer.getName() + "</em></h1><p>\n";
    };

    this.eachRentalString = function (rental) {
        return rental.getMovie().getTitle() + ": " +
            rental.getCharge() + "<br>\n";
    };

    this.footerString = function (customer) {
        return "<p>You owe <em>" + customer.getTotalCharge() + "</em><p>\n" +
                "On this rental you earned <em>" + customer.getTotalFrequentRenterPoints() + "</em> frequent renter points<p>";
    };
};

HtmlStatement.prototype = new Statement();