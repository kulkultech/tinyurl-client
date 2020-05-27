# TinyURL JavaScript Client

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