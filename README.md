# Invitation Web Page

[![Build Status][build-status-image]][build-status-url]
[![Coverage Status][coverage-status-image]][coverage-status-url]
[![License][license-image]][license-url]

Share your happiest day to all of your friends through the power of web 😁.

## Table of Contents

-   [Invitation Web Page](#invitation-web-page)
    -   [Table of Contents](#table-of-contents)
    -   [Requirement](#requirement)
    -   [Instalation](#instalation)
    -   [Running in Development Environment](#running-in-development-environment)
    -   [Testing](#testing)
    -   [Changelog](#changelog)
    -   [Contributing](#contributing)
    -   [License](#license)
    -   [Credits](#credits)

## Requirement

-   PHP ^8.3
-   MySQL ^8.2.0

## Instalation

You can install the project by clone it via GitHub :

```bash
git clone https://github.com/ianriizky/invitation.git
composer install
cp .env.example .env
php artisan migrate
```

## Running in Development Environment

You can run this application lively by running this script :

```bash
php artisan serve
```

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

## License

The MIT License (MIT). Please see [License File][license-url] for more information.

## Credits

| Role   | Name                                                     |
| ------ | -------------------------------------------------------- |
| Author | [Septianata Rizky Pratama](https://github.com/ianriizky) |

[build-status-image]: https://github.com/ianriizky/invitation/actions/workflows/tests.yml/badge.svg
[build-status-url]: https://github.com/ianriizky/invitation/actions/workflows/tests.yml
[coverage-status-image]: https://codecov.io/gh/ianriizky/invitation/branch/main/graph/badge.svg
[coverage-status-url]: https://codecov.io/gh/ianriizky/invitation
[license-image]: https://badgen.net/github/license/ianriizky/invitation
[license-url]: LICENSE.md
