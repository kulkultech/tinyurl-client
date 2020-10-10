# TinyURL JavaScript Client

[![Contact me on Codementor](https://cdn.codementor.io/badges/contact_me_github.svg)](https://www.codementor.io/amappuji?utm_source=github&utm_medium=button&utm_term=amappuji&utm_campaign=github)
[![Made in Indonesia](https://made-in-indonesia.github.io/made-in-indonesia.svg)](https://github.com/made-in-indonesia/made-in-indonesia)
[![Build Status](https://travis-ci.org/kulkultech/tinyurl-client.svg?branch=master)](https://travis-ci.org/kulkultech/tinyurl-client)

Easily use TinyURL in your browser.

# Getting Started

1. Install it

        $ npm install @kulkul/tinyurl-client

2. Use it

```javascript
import shortenUrl from "@kulkul/tinyurl-client";

shortenUrl("https://kulkul.tech").then((result) => {
    console.log({ result }); // https://tinyurl.com/<slug>
});
```

To use it using alias you can do the following

```javascript
import shortenUrl from "@kulkul/tinyurl-client";

shortenUrl("https://kulkul.tech", "shorted-kulkul").then((result) => {
    console.log({ result }); // https://tinyurl.com/shorted-kulkul
});
```
