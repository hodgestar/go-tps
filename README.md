# TPS reports over USSD

A simple time sheeting application served over USSD (or anything else).

## Run tests

    $ npm install mocha vumigo_v01 jed
    $ npm test

or if you want to have a constant test check running run the following:

    $ ./node_modules/.bin/mocha -R spec --watch

## Deploying

* Create a Javascript Sandbox conversation in your Vumi Go account.
* Copy lib/go-tps.js into the Javascript source area (or paste in an
  appropriate URL from GitHub).
* Copy config.json under a configuration key named `config`.
* Activate the conversation.
* Dial the USSD number!
