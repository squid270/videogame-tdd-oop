// const { expect } = require('chai');

// const Device = require("../problems/device.js");
// const Laptop = require("../problems/laptop.js");
// const GamingLaptop = require("../problems/gaming-laptop.js");
// const Application = require("../problems/application.js");
// const User = require("../problems/user.js");

describe('Classes, Constructors, and Inheritance', function () {

    it('DEVICE: should set brand, model, and price attributes on creation', function () {
        let device1 = new Device("Apple", "iPhone 13", 799);
        expect(device1.brand).to.equal("Apple");
        expect(device1.model).to.equal("iPhone 13");
        expect(device1.price).to.equal(799);

        let device2 = new Device("Samsung", "Galaxy S21", 999);
        expect(device2.brand).to.equal("Samsung");
        expect(device2.model).to.equal("Galaxy S21");
        expect(device2.price).to.equal(999);
    });

    it('LAPTOP: should be a subclass of Device', function () {
        let laptop = new Laptop("Dell", "XPS 15", 1500, "15 inches", "Intel i7");
        expect(laptop instanceof Device).to.be.true;
    });

    it('LAPTOP: should have screen size and processor attributes', function () {
        let laptop1 = new Laptop("Dell", "XPS 15", 1500, "15 inches", "Intel i7");
        expect(laptop1).to.haveOwnProperty("screenSize");
        expect(laptop1).to.haveOwnProperty("processor");
        expect(laptop1.screenSize).to.equal("15 inches");
        expect(laptop1.processor).to.equal("Intel i7");
    });

    it('GAMING LAPTOP: should be a subclass of Laptop', function () {
        let gamingLaptop = new GamingLaptop("Alienware", "m15 R4", 2200, "15.6 inches", "Intel i9", "NVIDIA RTX 3080");
        expect(gamingLaptop instanceof Laptop).to.be.true;
        expect(gamingLaptop instanceof Device).to.be.true;
    });

    it('GAMING LAPTOP: should have GPU attribute', function () {
        let gamingLaptop = new GamingLaptop("Alienware", "m15 R4", 2200, "15.6 inches", "Intel i9", "NVIDIA RTX 3080");
        expect(gamingLaptop).to.haveOwnProperty("GPU");
        expect(gamingLaptop.GPU).to.equal("NVIDIA RTX 3080");
    });

    it('APPLICATION: should set name, version, and license attributes on creation', function () {
        let app1 = new Application("Photoshop", "2021.2.0", "Paid");
        expect(app1.name).to.equal("Photoshop");
        expect(app1.version).to.equal("2021.2.0");
        expect(app1.license).to.equal("Paid");
    });

    it('USER: should set name and empty array of devices on creation', function () {
        let user1 = new User("Alex Johnson");
        expect(user1.name).to.equal("Alex Johnson");
        expect(user1.devices).to.be.an('array');
        expect(user1.devices).to.be.empty;
    });

});

describe('Validating Data', function () {

    it("Laptop should not be valid unless the brand, model, and price have been set", function () {
        let validLaptop = new Laptop("Lenovo", "ThinkPad X1", 1800, "14 inches", "Intel i5");
        let invalidLaptop = new Laptop();
        expect(validLaptop.validate()).to.be.true;
        expect(invalidLaptop.validate()).to.be.false;
    });

});

describe('Updating Data and Handling Errors', function () {

    it('can update multiple details for a laptop at once', function () {
        let laptop1 = new Laptop("HP", "Pavilion", 800, "15.6 inches", "AMD Ryzen 5");
        laptop1.update("HP", "Pavilion", 850, "15.6 inches", "AMD Ryzen 7");
        expect(laptop1.price).to.equal(850);
        expect(laptop1.processor).to.equal("AMD Ryzen 7");
    });

    it("should throw an error and not update if price is not valid", function () {
        let laptop = new Laptop("HP", "Pavilion", 800, "15.6 inches", "AMD Ryzen 5");
        expect(laptop.update.bind(laptop, "HP", "Pavilion", -100, "15.6 inches", "AMD Ryzen 5")).to.throw(Error, "Price must be greater than 0");
        expect(laptop.price).to.equal(800);
    });

});

describe('Data Manipulation - Instance and Static Methods', function () {

    it('should return a summary of a laptop\'s details', function () {
        let laptop1 = new Laptop("Dell", "XPS 13", 1000, "13 inches", "Intel i5");
        expect(laptop1.getDetails()).to.equal("The Dell XPS 13 with a 13 inches screen and Intel i5 processor costs $1000.");
    });

});

describe('Class Interactions - Installing Applications', function () {

    it('user can install applications on a valid device', function () {
        let user = new User("Elena Morris");
        let laptop = new Laptop("Dell", "XPS 15", 1500, "15 inches", "Intel i7");
        let app = new Application("Visual Studio Code", "1.56", "Free");

        let installSuccess = user.installApplication(laptop, app);
        expect(installSuccess).to.be.true;
        expect(laptop.applications).to.include(app);
    });

    it('installation should fail if device is not valid', function () {
        let user = new User("Elena Morris");
        let invalidDevice = new Device(); // Missing attributes
        let app = new Application("Visual Studio Code", "1.56", "Free");

        expect(user.installApplication.bind(user, invalidDevice, app)).to.throw(Error, "Device is not valid for installation.");
    });

});
