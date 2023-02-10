# GSUtils
Google Sheets utilities in App Script

#### Table of Contents

<!-- TOC -->

- [Installation](#installation)
- [Usage](#usage)

## Installation
 - Copy project key `143JSCfcCQa1dV7fX6sMjhDwGE9tZkjGbiTCYGyME_YzIP9TA4Knn7lrI` and add it as a new library to your App Script project;

## Usage

Define in your App Script the utilities you want to use. Examples:
```console
const ActionUtils = GSUtils.loadActionUtils();
const FormatUtils = GSUtils.loadFormatUtils();
const CurrencyUtils = GSUtils.loadCurrencyUtils();
const EventUtils = GSUtils.loadEventUtils();
```

Get instance of those utilities. Examples:
```console
const actionUtils = ActionUtils.getInstance(spreadsheet);
const formatUtils = FormatUtils.getInstance(spreadsheet);
const eventUtils  = EventUtils.getInstance(spreadsheet);
```