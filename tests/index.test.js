import * as axios from "axios";
import * as chai from "chai";
import cheerio from "cheerio";
import sinon from "sinon";
import shortenUrl from "../src";

const { expect } = chai;

describe("Shorten URL", () => {
  let tinyUrlResponseStub;
  const tinyUrlResponse = (alias = "ydyofn2z") =>
    "<!DOCTYPE html>\n" +
    '<html lang="en">\n' +
    "<head>\n" +
    '    <meta charset="UTF-8">\n' +
    "<!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->\n" +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n' +
    "<title>TinyURL.com - shorten that long URL into a tiny URL</title>\n" +
    '<base href="https://tinyurl.com/">\n' +
    '<meta name="description" content="TinyURL.com is the original URL shortener that shortens your unwieldly links into more manageable and useable URLs.">\n' +
    '<meta name="keywords" content="tinyurl url save share shorten analyze">\n' +
    '<link rel="shortcut icon" href="https://tinyurl.com/favicon.ico" type="image/gif">    <meta name="robots" content="nofollow">\n' +
    "\n" +
    "\n" +
    '    <link href="https://tinyurl.com/css/legacy/app.css" rel="stylesheet" type="text/css" />\n' +
    '    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>\n' +
    '    <script type="text/javascript">\n' +
    "        document.write('<script async type=\"text/javascript\" src=\"https://tinyurl.com/siteresources/js/common.js\"></sc'+'ript>');\n" +
    "    </script>\n" +
    "\n" +
    '    <script src="//tags-cdn.deployads.com/a/tinyurl.com.js" async ></script>\n' +
    "\n" +
    "<!-- Facebook Pixel Code -->\n" +
    "<script>\n" +
    "    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n" +
    "        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;\n" +
    "        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;\n" +
    "        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,\n" +
    "        document,'script','https://connect.facebook.net/en_US/fbevents.js');\n" +
    "    fbq('init', '196261077476671');\n" +
    "    fbq('track', 'PageView');\n" +
    "</script>\n" +
    '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=196261077476671&ev=PageView&noscript=1"/></noscript>\n' +
    "<!-- DO NOT MODIFY -->\n" +
    "<!-- End Facebook Pixel Code --><!-- Repixel Code -->\n" +
    "<script>\n" +
    "  (function(w, d, s, id, src){\n" +
    "  w.Repixel = r = {\n" +
    "    init: function(id) {\n" +
    "      w.repixelId = id;\n" +
    "    }\n" +
    "  };\n" +
    "  var js, fjs = d.getElementsByTagName(s)[0];\n" +
    "  if (d.getElementById(id)){ return; }\n" +
    "  js = d.createElement(s); \n" +
    "  js.id = id;\n" +
    "  js.async = true;\n" +
    "  js.onload = function(){\n" +
    "      Repixel.init(w.repixelId);\n" +
    "  };\n" +
    "  js.src = src;\n" +
    "  fjs.parentNode.insertBefore(js, fjs);\n" +
    "  }(window, document, 'script', 'repixel', \n" +
    "  'https://sdk.repixel.co/r.js'));\n" +
    "  Repixel.init('5cefdb1c7e39460007a3db07');\n" +
    "</script>\n" +
    "<!-- END Repixel Code -->\n" +
    "<!-- Widgetly pixel --> <script src='https://pixel.widgetly.com/static/track.js?acc=ad0e0a2e5a30b8c6cf75dfe9baa73f5a43faa0' async=''></script> <!--END Widgetly pixel --></head>\n" +
    "\n" +
    "<body>\n" +
    '    <script type="text/javascript">\n' +
    "\n" +
    "    var _gaq = _gaq || [];\n" +
    "    _gaq.push(['_setAccount', 'UA-6779119-1']);\n" +
    "    _gaq.push(['_trackPageview']);\n" +
    "\n" +
    "    (function() {\n" +
    "        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;\n" +
    "        ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';\n" +
    "        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);\n" +
    "    })();\n" +
    "\n" +
    '</script>    <div id="alert_new_ui">\n' +
    '        Try <a href="https://tinyurl.com/app">new UI</a>\n' +
    "    </div>\n" +
    '    <div class="wrapper">\n' +
    '        <div class="header">\n' +
    "            <h1>\n" +
    '                <a class="baselink" href="https://tinyurl.com">\n' +
    '                    <img src="https://tinyurl.com/siteresources/images/tinyurl_logo.png" alt="TinyURL.com"/>\n' +
    "                </a>\n" +
    "            </h1>\n" +
    "            Making over a billion long URLs usable! Serving billions of redirects per month.        </div>\n" +
    '        <div class="body">\n' +
    '            <div class="leftpane">\n' +
    '    <div class="sidebar">\n' +
    '        <div><a class="baselink" href="https://tinyurl.com">Home</a></div>\n' +
    '        <div><a href="/#example">Example</a></div>\n' +
    '        <div><a href="/#toolbar">Make Toolbar Button</a></div>\n' +
    '        <div><a href="/#redirect">Redirection</a></div>\n' +
    '        <div><a href="/preview.php">Preview Feature</a><sup><small style="font-weight: bold">cool!</small></sup></div>\n' +
    '        <div><a href="/#link">Link to Us!</a></div>\n' +
    '        <div><a href="/#terms">Terms of use</a></div>\n' +
    '        <div><a href="/articles/index.html">Articles</a></div>\n' +
    '        <div><a href="/cdn-cgi/l/email-protection#05767075756a777145716c6b7c7077692b666a68">Contact Us!</a></div>\n' +
    "    </div>\n" +
    '    <div class="ad-tag" data-ad-name="Sortable Left Sidebar" data-ad-size="160x600" data-ad-demand=\'!g\' data-ad-refresh="user time 30s"></div>\n' +
    '<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script src="//tags-cdn.deployads.com/a/tinyurl.com.js" async ></script>\n' +
    "<script>(deployads = window.deployads || []).push({});</script></div>\n" +
    '            <div class="mainpane">\n' +
    '                <div class="topbanner">\n' +
    '                    <div class="ad-tag"  data-ad-name="Sortable Leaderboard" data-ad-size="728x90" data-ad-demand="!g" data-ad-refresh="user time 30s" ></div>\n' +
    '    <script src="//tags-cdn.deployads.com/a/tinyurl.com.js" async ></script>\n' +
    "    <script>(deployads = window.deployads || []).push({});</script>\n" +
    "                </div>\n" +
    '                <div class="maincontent">\n' +
    '                    <div class="rightad">\n' +
    '                        <div class="ad-tag"  data-ad-name="Sortable_Right_Sidebar" data-ad-size="300x250" data-ad-demand="!g" data-ad-refresh="user time 30s" ></div>\n' +
    '    <script src="//tags-cdn.deployads.com/a/tinyurl.com.js" async ></script>\n' +
    "    <script>(deployads = window.deployads || []).push({});</script>\n" +
    "<br><br>\n" +
    "<div class='widgetlyOnPageSnippet' id='widgetlyOP-765-929' style=\"width: 300px;padding: 0px;\"></div>\n" +
    "                    </div>\n" +
    '                    <div id="contentcontainer">\n' +
    "                                    <h1>TinyURL was created!</h1>\n" +
    "                    <p>The following URL:</p>\n" +
    '        <div class="indent longurl">\n' +
    "            <b>https://kulkul.tech</b>\n" +
    "        </div>\n" +
    "        has a length of 19 characters and resulted in the following TinyURL which has a length of 28 characters:\n" +
    `        <div class="indent"><b>https://tinyurl.com/${alias}</b><div id="success"></div><br><small>[<a href="https://tinyurl.com/${alias}" target="_blank" rel="nofollow">Open in new window</a>]</small><a id="copy_div" href="https://tinyurl.com/${alias}" onclick="return false;" data-clipboard-text="https://tinyurl.com/${alias}"><small>[Copy to clipboard]</small></a></div>\n` +
    "        Or, give your recipients confidence with a preview TinyURL:\n" +
    `        <div class="indent"><b>https://preview.tinyurl.com/${alias}</b><br>\n` +
    `            <small>[<a href="https://preview.tinyurl.com/${alias}" target="_blank">Open in new window</a>]</small>\n` +
    "        </div><p></p>\n" +
    `        <div class="copyinfo" data-clipboard-text="https://tinyurl.com/${alias}"><i><b>How to copy and paste the TinyURL:</b> To copy the TinyURL to your clipboard, right click the link under the TinyURL and select the copy link location option. To paste the TinyURL into a document, press Ctrl and V on your keyboard, or select "paste" from the edit menu of the program you are using.</i></div>\n` +
    "\n" +
    "        \n" +
    '        <form action="https://tinyurl.com/create.php" method="get" name="f" id="f" class="create-form">\n' +
    "    <b>Enter a long URL to make tiny:</b><br />\n" +
    '    <input type="hidden" id="source" name="source" value="create">\n' +
    '    <input type="text" id="url" name="url" value="">\n' +
    '    <input type="submit" value="Make TinyURL!">\n' +
    "    <hr>Custom alias (optional):<br />\n" +
    '    <tt class="basecontent">https://tinyurl.com/</tt>\n' +
    '    <input type="text" id="alias" name="alias"  value="" maxlength="30"><br />\n' +
    "    <small>May contain letters, numbers, and dashes.</small>\n" +
    "</form>\n" +
    "    <div class='widgetlyOnPageSnippet' id='widgetlyOP-766-932'></div><div class='widgetlyOnPageSnippet' id='widgetlyOP-766-931'></div><div class='widgetlyOnPageSnippet' id='widgetlyOP-766-930'></div>\n" +
    "                    </div>\n" +
    '                    <div style="clear:both"></div>\n' +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    '        <div class="push"></div>\n' +
    "    </div>\n" +
    "\n" +
    '    <div class="footer">\n' +
    '        <div class="privacy"><a id="privacy" href="https://tinyurl.com/privaicy.php">Privacy policy</a></div>\n' +
    '        <div id="copyright">Copyright © 2002-2020 TinyURL, LLC. All rights reserved.<br> TinyURL is a trademark of TinyURL, LLC.</div>\n' +
    "    </div>\n" +
    "    <script>\n" +
    "        var cookies = document.cookie ? document.cookie.split('; ') : [];\n" +
    "        for (var i = 0; i < cookies.length; i++) {\n" +
    "            var parts = cookies[i].split('=');\n" +
    "            if(parts[0] === 'invite') {\n" +
    "                $('#alert_new_ui').show();\n" +
    "            }\n" +
    "        }\n" +
    "    </script>\n" +
    '        <script src="/js/legacy/app.js?id=688d20dfacce6c0c0d40"></script>\n' +
    "</body>\n" +
    "</html>";

  describe("Create short URL without alias", () => {
    before(() => {
      // stubs the document object
      global.document = {
        createElement: () =>
          Object.create({
            innerHTML: "",
            querySelector: function () {
              const $ = cheerio.load(this.innerHTML);
              const href = $("#copy_div").attr("href");
              return { href };
            },
          }),
      };

      tinyUrlResponseStub = sinon
        .stub(axios, "get")
        .returns({ data: tinyUrlResponse() });
    });

    after(() => {
      global.document = undefined;
      tinyUrlResponseStub.restore();
    });
    it("should be able to shorten url using TinyURL", async () => {
      const url = "https://kulkul.tech";
      const response = await shortenUrl(url);
      expect(response).to.be.equal("https://tinyurl.com/ydyofn2z");
    });
  });

  describe("Create short URL with alias", () => {
    before(() => {
      // stubs the document object
      global.document = {
        createElement: () =>
          Object.create({
            innerHTML: "",
            querySelector: function () {
              const $ = cheerio.load(this.innerHTML);
              const href = $("#copy_div").attr("href");
              return { href };
            },
          }),
      };

      tinyUrlResponseStub = sinon
        .stub(axios, "get")
        .returns({ data: tinyUrlResponse("shorted-kulkul") });
    });

    after(() => {
      global.document = undefined;
      tinyUrlResponseStub.restore();
    });
    it("should be able to shorten url using TinyURL", async () => {
      const url = "https://kulkul.tech";
      const response = await shortenUrl(url, "shorted-kulkul");
      expect(response).to.be.equal("https://tinyurl.com/shorted-kulkul");
    });
  });
});
