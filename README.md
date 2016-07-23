# This repository contains a react component designed to render a visual dial chart (speedometer)

## Prerequisites

[node.js](http://nodejs.org/)  

### Getting started

To use the source, you will need to install node.js, to test or demo the compoent, it requires only this to be globally installed, the remainder of its dependencies are installed locally when required.

To run unit tests, run `npm test` from the root directory.

To demo the component, run `npm start` from the `demo` directory, once ready, the command window will report that the web application can be accessed via the following local address: http://localhost:9001

# Worklog

-  0-10  mins - setup of basic webpack + karma + enzyme
- 10-15  mins - R&D into options for locale formatting (currency string from number and currency type)
- 15-20  mins - add in Intl shim to polyfill Intl support during testing
- 20-60  mins - writing unit tests and (unstyled, dom only) implementation to assert rendered dom aspects (labels)
- 60-105 mins - unit tests and (unstyled, dom only) implementation for pointer positioning and validation of valid property combinations
- 105-125 mins - finish property validation and unit tests for property changes and component creation
- 125-210 mins - implementation of demo view
- 210-240 mins - document and commit

# What to work on next
- inline documentation for speedometer component
- coverage reports and further unit tests
- automated testing that is based on visual rendering acuity 
- establish rules for how the widget might resize, how would that affect the UI
- consider a standard approach for locale based formatting (currency)
- more elegant css layout approach
- better animation of labels
- error handling
