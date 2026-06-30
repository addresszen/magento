# [2.0.0](https://github.com/addresszen/magento/compare/1.0.4...2.0.0) (2026-06-30)


### Bug Fixes

* **ci:** add playwright browser install step to ci-bindings workflow ([3579f92](https://github.com/addresszen/magento/commit/3579f927103d741a3a82e15265230c975d599006))
* **docker:** migrate from Elasticsearch to OpenSearch for Magento 8.2 development environment ([ff2304c](https://github.com/addresszen/magento/commit/ff2304c2d10499b93a7a1beaf69efed924e5fce6))
* **e2e:** move shared test suite to e2e support directory ([919bc4f](https://github.com/addresszen/magento/commit/919bc4fef5bc56f9f6baac5caf8243d9097610a1))
* restore cypress dependency for E2E tests ([2b21b7b](https://github.com/addresszen/magento/commit/2b21b7bbee8271144fca710c46913f1e1d5dcd79))
* use environment variable for API key in Playwright helpers ([a5b6f80](https://github.com/addresszen/magento/commit/a5b6f80546895e412cd10c480767781c441a6d5f))
* use import.meta.url for ESM-compatible __dirname in playwright config ([c279b3c](https://github.com/addresszen/magento/commit/c279b3cd67f103c4532996d5497e2fbc3965b6a4))


### Features

* sync with ideal-postcodes/magento latest changes ([6d5eee3](https://github.com/addresszen/magento/commit/6d5eee32860ab27c24c46e356c9d56c43a996799))


### BREAKING CHANGES

* Frontend no longer uses RequireJS for store initialization.
The extension now loads via a direct script tag pattern for better CSP compliance.

Co-Authored-By: Marcin Filip <marcin.filip@gmail.com>

## [1.0.3](https://github.com/addresszen/magento/compare/1.0.2...1.0.3) (2026-01-05)


### Bug Fixes

* **axios:** add ARM64 platform support and update address-finder dependency ([b11afc0](https://github.com/addresszen/magento/commit/b11afc009c15f3fe445dfba9c123dd29f4407278))
* **security:** add XSS protection for address fields and relax city validation rules ([cc0c80b](https://github.com/addresszen/magento/commit/cc0c80b50244181756862e594436ae54b99eac30))

## [1.0.2](https://github.com/addresszen/magento/compare/1.0.1...1.0.2) (2025-04-10)


### Bug Fixes

* **axios:** Security fix ([8180029](https://github.com/addresszen/magento/commit/81800292ee566991913c8024da365bc1a5a15bca))
* **labels:** Remove some artifacts and fix to US format ([8c506a3](https://github.com/addresszen/magento/commit/8c506a3b130a28d192773c56dd15a3e069532652))

## [1.0.1](https://github.com/addresszen/magento/compare/1.0.0...1.0.1) (2024-10-11)


### Bug Fixes

* **Readme:** Tested on badge update ([6bfa756](https://github.com/addresszen/magento/commit/6bfa7568f00c733733f65036fc02ef0408a15817))

# 1.0.0 (2024-10-11)


### Features

* **init:** Initial commit ([123edd9](https://github.com/addresszen/magento/commit/123edd9d879dafd4414f3b384ca6a0bd7c04e4c1))
* **Magento:** Initial release of addresszen magento extension ([976cdc6](https://github.com/addresszen/magento/commit/976cdc669ea812d2898a8564339e0bee3ec1aa21))
