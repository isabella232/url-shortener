url-shortener
====

Serves redirects based on a ConfigMap.

Create a ConfigMap with `hort_name = https://target-url.com` entries in it and mount it at `/src/config`.  Publish port 8080.  Season with TLS to taste.
