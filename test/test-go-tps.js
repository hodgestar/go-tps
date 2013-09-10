var fs = require("fs");
var assert = require("assert");
var vumigo = require("vumigo_v01");
var app = require("../lib/go-tps");


describe("sandbox app.api", function() {
    // checks app was attached to api correctly
    it("should exist", function() {
        assert.ok(app.api);
    });
    it("should have an on_inbound_message method", function() {
        assert.ok(app.api.on_inbound_message);
    });
    it("should have an on_inbound_event method", function() {
        assert.ok(app.api.on_inbound_event);
    });
});


describe("TPS", function() {
    var tester;

    beforeEach(function() {
        tester = new vumigo.test_utils.ImTester(app.api, {
            async: true
        });
    });

    it("should display intro to new users", function (done) {
        var p = tester.check_state({
            user: null,
            content: null,
            next_state: "first_name",
            response: "^Welcome to TPS! Please enter your first name:$"
        });
        p.then(done, done);
    });

    it("should prompt for surname", function (done) {
        var user = {
            current_state: 'first_name'
        };
        var p = tester.check_state({
            user: user,
            content: "Bob",
            next_state: "surname",
            response: "^Hi Bob. Please enter your surname:"
        });
        p.then(done, done);
    });

    it("should berate people who aren't working", function (done) {
        var user = {
            current_state: 'surname',
            answers: {
                first_name: 'Bob'
            }
        };
        var p = tester.check_state({
            user: user,
            content: "Smith",
            next_state: "current_activity",
            response: "^Bob, you are not working. What" +
                      " are you going to work on next?$"
        });
        p.then(done, done);
    });
});
