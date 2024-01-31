# Changelog

All notable changes to `Invitation Web Page` will be documented in this file.

## [Unreleased](https://github.com/ianriizky/invitation/compare/0.9.0...develop)

## [0.9.0](https://github.com/ianriizky/invitation/releases/tag/0.9.0) - 2024-01-31

## [0.8.0](https://github.com/ianriizky/invitation/releases/tag/0.8.0) - 2024-01-31

- chore: create confirm alert when delete data on event guest page by [@ianriizky](https://github.com/ianriizky) in [#866e3b1](https://github.com/ianriizky/invitation/commit/866e3b1587beb8ddb3c49d2548c67a548a0caaef).
- chore: show current page on event guest page by [@ianriizky](https://github.com/ianriizky) in [#f5ccc65](https://github.com/ianriizky/invitation/commit/f5ccc654d77939593ebd702a132c4b83f20116ce).

## [0.7.1](https://github.com/ianriizky/invitation/releases/tag/0.7.1) - 2024-01-31

- fix: create dummy for CSRF_KEY, COOKIE_KEY, SESSION_KEY, BASIC_USERNAME, and BASIC_PASSWORD on github actions by [@ianriizky](https://github.com/ianriizky) in [#a6fb084](https://github.com/ianriizky/invitation/commit/a6fb0845d09440a0cfd83a4dfc5fd10ed8d3d431).

## [0.7.0](https://github.com/ianriizky/invitation/releases/tag/0.7.0) - 2024-01-31

- fix: wrong case for test unit folder by [@ianriizky](https://github.com/ianriizky) in [#c9ade7d](https://github.com/ianriizky/invitation/commit/c9ade7d4711bc262cdf05dd3be89b8e15355d76a) and [#5e822f1](https://github.com/ianriizky/invitation/commit/5e822f1ef6ab32a915342c104e11cffa675a1694).
- refactor: remove unnecessary views template by [@ianriizky](https://github.com/ianriizky) in [#36b76a0](https://github.com/ianriizky/invitation/commit/36b76a00928b73e4156bc9729fe3cf47c18c60ab).
- refactor: change name method from findBySlug() into findByGuestSlug() by [@ianriizky](https://github.com/ianriizky) in [#782c198](https://github.com/ianriizky/invitation/commit/782c19899c140995541ad33603ab6aa3873c28a1).
- fix: remove duplicate double quote on akad layout by [@ianriizky](https://github.com/ianriizky) in [#6914a5f](https://github.com/ianriizky/invitation/commit/6914a5f0a22f5b27b5fac72bf7c8c5073853a441).
- chore: update recommendations list on vscode extensions json by [@ianriizky](https://github.com/ianriizky) in [#5645781](https://github.com/ianriizky/invitation/commit/5645781b9879ac5981b408fd948c0470307686b5).
- fix: wrong meta twitter image path by [@ianriizky](https://github.com/ianriizky) in [#5c9b1bc](https://github.com/ianriizky/invitation/commit/5c9b1bc538886d86c309d513f48381ff23752658).
- refactor: html element at kehadiran on akad layout by [@ianriizky](https://github.com/ianriizky) in [#a648418](https://github.com/ianriizky/invitation/commit/a64841838d940f50783c8212bb9314685c88a7a3).
- feat: add render() on JoiValidationException class by [@ianriizky](https://github.com/ianriizky) in [#b738ca5](https://github.com/ianriizky/invitation/commit/b738ca52a24d4c3a82b5a9952931df025d795df2).
- fix: undefined phone_number arguments on GuestRepository create by [@ianriizky](https://github.com/ianriizky) in [#547a92a](https://github.com/ianriizky/invitation/commit/547a92ac28c691093544dc9623d67e2f077becd2).
- feat: create flash message using express session by [@ianriizky](https://github.com/ianriizky) in [#24f7abe](https://github.com/ianriizky/invitation/commit/24f7abe585e2bff8af4ad53d6b1c913e213d29cb).
- fix: omit "select", "include", and "distinct" property when running repository paginate query by [@ianriizky](https://github.com/ianriizky) in [#5792d25](https://github.com/ianriizky/invitation/commit/5792d25ebc9f20bbde5044442869b89db0014c94).
- chore: increase take number on MessageRepository.findManyByEventSlug() into 50 by [@ianriizky](https://github.com/ianriizky) in [#b56d12a](https://github.com/ianriizky/invitation/commit/b56d12a43b8488711cbe223595d8cfffb569d77d).
- refactor: rename whatsapp method name from "link" into "url" by [@ianriizky](https://github.com/ianriizky) in [#c19a7ad](https://github.com/ianriizky/invitation/commit/c19a7adb4dfe2349b186977c6e3804f706dbb3d6).
- chore: add cookie configuration value by [@ianriizky](https://github.com/ianriizky) in [#0aa08fd](https://github.com/ianriizky/invitation/commit/0aa08fd919a138856c5f8ebc3f5cda7aa2c46c22).
- feat: enable HTTP verbs such as PUT or DELETE on html form by [@ianriizky](https://github.com/ianriizky) in [#4e4680e](https://github.com/ianriizky/invitation/commit/4e4680ef28858b64a19e01b167fe9493a59de569).
- feat: create event guest page to handle create and delete data by [@ianriizky](https://github.com/ianriizky) in [#403a52b](https://github.com/ianriizky/invitation/commit/403a52b30932576c3cf6f1adba7c72d5bf48e6d8).

## [0.6.0](https://github.com/ianriizky/invitation/releases/tag/0.6.0) - 2024-01-19

- chore: add CSRF_KEY on .env.example by [@ianriizky](https://github.com/ianriizky) in [#59c7e5e](https://github.com/ianriizky/invitation/commit/59c7e5e84349d109de5bcdf45986db089f472ac1).
- feat: create middleware to run basic authentication by [@ianriizky](https://github.com/ianriizky) in [#763ab69](https://github.com/ianriizky/invitation/commit/763ab6909b9e6bac33f084edc07770be645b95de).
- feat: create URL to redirect guest into the whatsapp message format by [@ianriizky](https://github.com/ianriizky) in [#395ba53](https://github.com/ianriizky/invitation/commit/395ba5362780e1c64804278e0f5d5eace4f8a72c).

## [0.5.0](https://github.com/ianriizky/invitation/releases/tag/0.5.0) - 2024-01-15

- chore: revise view akad page by [@ianriizky](https://github.com/ianriizky) in [#a99a292](https://github.com/ianriizky/invitation/commit/a99a29243f6b2ea0324a4026b78ec5e960b0994f).
- chore: change background music using Sal Priadi - Irama Laot Teduh by [@ianriizky](https://github.com/ianriizky) in [#90e2e29](https://github.com/ianriizky/invitation/commit/90e2e291cdf19ce5aa56c0f50618d6ca58595a37).

## [0.4.2](https://github.com/ianriizky/invitation/releases/tag/0.4.2) - 2024-01-14

- fix: unimport Forum font on css asset by [@ianriizky](https://github.com/ianriizky) in [#d417c7e](https://github.com/ianriizky/invitation/commit/d417c7e6f57fe05ce305975b9826951aeb056f6b).
- chore: remove event whatsapp-message routes by [@ianriizky](https://github.com/ianriizky) in [#14b5de0](https://github.com/ianriizky/invitation/commit/14b5de0d50f0ddc0ce8bc46310cf113a06d443d7).

## [0.4.1](https://github.com/ianriizky/invitation/releases/tag/0.4.1) - 2024-01-14

- fix: typo method name on MessageRepository by [@ianriizky](https://github.com/ianriizky) in [#772adbe](https://github.com/ianriizky/invitation/commit/772adbe9ba8ea3c35f4483d18c2ab6b7b335e62b).

## [0.4.0](https://github.com/ianriizky/invitation/releases/tag/0.4.0) - 2024-01-14

- chore: set scrollbar width by [@ianriizky](https://github.com/ianriizky) in [#1cf299d](https://github.com/ianriizky/invitation/commit/1cf299d128d69babdd3e720951436f3b68f49399).
- feat: finish message feature on event page by [@ianriizky](https://github.com/ianriizky) in [#f6e32e2](https://github.com/ianriizky/invitation/commit/f6e32e2c9ddf5d7786753ad341b3e801eb56e3e3).

## [0.3.0](https://github.com/ianriizky/invitation/releases/tag/0.3.0) - 2024-01-14

- fix: music not played on mobile version by [@ianriizky](https://github.com/ianriizky) in [#ca2c5dd](https://github.com/ianriizky/invitation/commit/ca2c5ddd71cc3cb801b2aa659f908ca17aa69833).
- chore: revise event page by [@ianriizky](https://github.com/ianriizky) in [#056139c](https://github.com/ianriizky/invitation/commit/056139c25d8e0bae89d44201f7baa26710833f4f).
- fix: change timezone configuration by [@ianriizky](https://github.com/ianriizky) in [#90b5bdd](https://github.com/ianriizky/invitation/commit/90b5bddcf5ec7d56a2c8a4bb517fce17040ee0c6).
- chore: remove lokasi input form by [@ianriizky](https://github.com/ianriizky) in [#5218299](https://github.com/ianriizky/invitation/commit/5218299f3cdd5e8561bcb3a749daef214f646471).
- chore: change font of title-content by [@ianriizky](https://github.com/ianriizky) in [#dc739e5](https://github.com/ianriizky/invitation/commit/dc739e55858afd0b3bc94f2c87a6345f7c20b0a5).
- chore: revise instagram profile appearance by [@ianriizky](https://github.com/ianriizky) in [#f48da7b](https://github.com/ianriizky/invitation/commit/f48da7b8d69d4d1edb1bd2444438b658fb641474).
- chore: change alt on bank-img by [@ianriizky](https://github.com/ianriizky) in [#5df8a8c](https://github.com/ianriizky/invitation/commit/5df8a8c38348587ba5d0e11a8ea9aacefe056d8f).
- chore: change font of guest name by [@ianriizky](https://github.com/ianriizky) in [#6904e15](https://github.com/ianriizky/invitation/commit/6904e15b43395589859a2852c1372484295cab3d).
- chore: change meta opengraph description by [@ianriizky](https://github.com/ianriizky) in [#d940a96](https://github.com/ianriizky/invitation/commit/d940a96973eb2b622e90948b4f7a7f428cac182a).
- feat: create gift section using modal view by [@ianriizky](https://github.com/ianriizky) in [#1b3bd65](https://github.com/ianriizky/invitation/commit/1b3bd654f0e57559d3e8226c6e2ea71010bcbd93).
- fix: set phone_number formatting on GuestRepository as optional by [@ianriizky](https://github.com/ianriizky) in [#59f0923](https://github.com/ianriizky/invitation/commit/59f0923a063e7d58b3803434cba71f60e28c4ab1).

## [0.2.0](https://github.com/ianriizky/invitation/releases/tag/0.2.0) - 2024-01-13

- chore: split view template for music and no music by [@ianriizky](https://github.com/ianriizky) in [#a7b3c30](https://github.com/ianriizky/invitation/commit/a7b3c30a070acf719f5034544125dd3ced9821dd).
- refactor: change booting way of ServiceProvider by [@ianriizky](https://github.com/ianriizky) in [#b688288](https://github.com/ianriizky/invitation/commit/b688288521952e286f8e8e6aa3ebcc9c3a765f9d).
- refactor!: redesign schema.prisma by [@ianriizky](https://github.com/ianriizky) in [#eab655c](https://github.com/ianriizky/invitation/commit/eab655c5826ce7807a6e2a9fd0df6dd3ac0aaf1f).
- refactor: change Exception.createHtmlDocument() method name into render() by [@ianriizky](https://github.com/ianriizky) in [#77b3daf](https://github.com/ianriizky/invitation/commit/77b3dafb2ab2fa55cb061d81389e20586068948b).
- chore: add logo on black color by [@ianriizky](https://github.com/ianriizky) in [#d74a3eb](https://github.com/ianriizky/invitation/commit/d74a3eb9f65c25c693882cb2fa50aa8b8c2353f0).
- chore: ignore specific file when running nodemon by [@ianriizky](https://github.com/ianriizky) in [#ff94f21](https://github.com/ianriizky/invitation/commit/ff94f2109006e47a0af6a9999ca7acbd093296f8).
- chore: add logo in wide resolution by [@ianriizky](https://github.com/ianriizky) in [#eecdc39](https://github.com/ianriizky/invitation/commit/eecdc3928bdebc454cc2bbdb9e4fe5e89e65e812).
- chore: add url on default variable view by [@ianriizky](https://github.com/ianriizky) in [#087f44e](https://github.com/ianriizky/invitation/commit/087f44e079fc9c5beca176dc9089bb167bb3421d).
- feat: finish event page by [@ianriizky](https://github.com/ianriizky) in [#b1d6fd6](https://github.com/ianriizky/invitation/commit/b1d6fd60ba5cd42188dc17899f25bbb2a81f02ee).

## [0.1.6](https://github.com/ianriizky/invitation/releases/tag/0.1.6) - 2024-01-07

- chore: set csrf token and app url as nunjucks global variable by [@ianriizky](https://github.com/ianriizky) in [#86cd85f](https://github.com/ianriizky/invitation/commit/86cd85f116c4c71ab1f4d7bad55e1b2543bb67f0).
- refactor: change middleware name for api authentication by [@ianriizky](https://github.com/ianriizky) in [#17b20b4](https://github.com/ianriizky/invitation/commit/17b20b4e32ec28465d64f9e0d8eeb7a063811200).

## [0.1.5](https://github.com/ianriizky/invitation/releases/tag/0.1.5) - 2024-01-07

- fix: set url config value based on the port by [@ianriizky](https://github.com/ianriizky) in [#a6dd702](https://github.com/ianriizky/invitation/commit/a6dd702f508375476c61c63d866ab4fe1aae5225).

## [0.1.4](https://github.com/ianriizky/invitation/releases/tag/0.1.4) - 2024-01-07

- chore: change APP_PORT env name into PORT and enable port 80 on config by [@ianriizky](https://github.com/ianriizky) in [#f9d658b](https://github.com/ianriizky/invitation/commit/f9d658b29e99a390a38dd372c02061034e6ba5d6).

## [0.1.3](https://github.com/ianriizky/invitation/releases/tag/0.1.3) - 2024-01-07

- fix: heroku node version causing 503 error by [@ianriizky](https://github.com/ianriizky) in [#b9c5c91](https://github.com/ianriizky/invitation/commit/b9c5c91acf7cd122cccd9ff64bc091ca8c49634d).

## [0.1.2](https://github.com/ianriizky/invitation/releases/tag/0.1.2) - 2024-01-07

- fix: add API_KEY on github actions env by [@ianriizky](https://github.com/ianriizky) in [#560cdf4](https://github.com/ianriizky/invitation/commit/560cdf4c01a80212870d5a3c5c5c22620183c925).

## [0.1.1](https://github.com/ianriizky/invitation/releases/tag/0.1.1) - 2024-01-07

- fix: undetected filename by [@ianriizky](https://github.com/ianriizky) in [#4677ee0](https://github.com/ianriizky/invitation/commit/4677ee0e3746eadb02a3221af5938b167e8a6174) and [#cf63e9c](https://github.com/ianriizky/invitation/commit/cf63e9ce2a62250a8a7189925a81432c483755e2).

## [0.1.0](https://github.com/ianriizky/invitation/releases/tag/0.1.0) - 2024-01-07

- initial commit by [@ianriizky](https://github.com/ianriizky) in [#0cf8bc5](https://github.com/ianriizky/invitation/commit/0cf8bc513af382d584ad997868b3d64052d65e5d).
- chore!: change tech stack from php to nodejs with expressjs by [@ianriizky](https://github.com/ianriizky) in [#109dd39](https://github.com/ianriizky/invitation/commit/109dd39c4fd9addb970e671ddc5c803259161dee).
- feat: setup css and js asset using vite by [@ianriizky](https://github.com/ianriizky) in [#f4b8150](https://github.com/ianriizky/invitation/commit/f4b8150391d9ea2119b0b45f366823c5950858aa).
- feat: finish akad page with assets css and js by [@ianriizky](https://github.com/ianriizky) in [#2b97687](https://github.com/ianriizky/invitation/commit/2b976879424e0de2063769f0ce38bf3c0d3a07ad).
- chore: add csrf protection middleware by [@ianriizky](https://github.com/ianriizky) in [#1751566](https://github.com/ianriizky/invitation/commit/1751566e59f6eaf49555e0748daa9fb7370feecf).
- chore: add music on akad page by [@ianriizky](https://github.com/ianriizky) in [#40f9255](https://github.com/ianriizky/invitation/commit/40f92550d4fbb44636282b38c66cc15fcf4ac950).
- chore: change base color into green by [@ianriizky](https://github.com/ianriizky) in [#94340a1](https://github.com/ianriizky/invitation/commit/94340a1259202381bb755a319061535bd8f266c6).
