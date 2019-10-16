# secrets

snippets/secrets.liquid is an untracked required file.
snippets/secrets.liquid is a place to keep keys without exposing them to the repo.

hmac_sha256_secret is used to hash and unhash data using Shopify's hmac_sha256 string filter.
```
{% assign hmac_sha256_secret = 'secret_string_goes_here' %}
```