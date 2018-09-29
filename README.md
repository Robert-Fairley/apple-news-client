# Apple News API Client

[![CircleCI](https://circleci.com/gh/Robert-Fairley/apple-news-client.svg?style=svg&circle-token=7e6a70dcf17b090349157248fdf5b11c31964bbc)](https://circleci.com/gh/Robert-Fairley/apple-news-client)

This is a rewrite of MicNews' API wrapper for the Apple News API.

It retains the same support for creating, reading, updating, and searching articles. It also retains support for reading and listing sections and channels.

## Changes

* **TypeScript Source and Declarations** - This rewrite was done completely in TypeScript and is compiled down to ES5 with declaration files for backwards compatibility. 
* **Bundle File Fetch Method** - The original repository utilized an HTTP GET request to pull down any bundled files, including images and fonts. This incarnation presently reads from a local file system location. In the future this will probably be extended to employ both methods based on a flag.

## Code Documentation

TBD

## Install

```shell
npm install apple-news-client
```

## Usage

TypeScript

```typescript
import { AppleNewsClient } from "apple-news-client";

const client: AppleNewsClient = new AppleNewsClient({
    apiId: "<API_ID>",
    apiSecret: "<API_SECRET>",
});
```

JavaScript

```javascript
const AppleNewsClient = require("apple-news-client");

const client = new AppleNewsClient({
    apiId: "<API_ID>",
    apiSecret: "<API_SECRET>",
});
```

## Methods

* [readChannel](#readchannel)
* [listSections](#listsections)
* [readSection](#readsection)
* [createArticle](#createarticle)
* [updateArticle](#updatearticle)
* [deleteArticle](#deletearticle)

*Note: The method code examples below are displayed in TypeScript. For ES5/ES6 JavaScript just remove the type assertions.*

### readChannel

Get the details of a specified channel.

```typescript
client.readChannel(
    { channelId: "<CHANNEL_ID>", },
    (error: Error, response: any) => {

        // Do something with the response here.
});
```

### listSections

Get a list of sections for a specified channel.

```typescript
client.listSections(
    { channelId: "<CHANNEL_ID>", },
    (error: Error, response: any) => {

        // Do something with the response here.
});
```

### readSection

Get the details of a specified section.

```typescript
client.readSection(
    { sectionId: "<SECTION_ID>", },
    (error: Error, response: any) => {

        // Do something with the response here.
});
```

### createArticle

Create an article on the specified channel.

```typescript
const channelId: string = "<CHANNEL_ID>";
const article: any = require("<PATH_TO_ARTICLE>/article.json");
const bundleFiles: any = {
    "image.jpg": "<PATH_TO_ARTICLE>/image.jpg",
    "image2.png": "<PATH_TO_ARTICLE>/image2.png",
};

client.createArticle(
    { channelId, article, bundleFiles, },
    (error: Error, response: any) => {

        // Do something with the response here.
});
```

### readArticle

Get the details for a specified article.

```typescript
client.readArticle(
    { articleId: "<ARTICLE_ID>", },
    (error: Error, response: any) => {

        // Do something with the response here.
});
```

### updateArticle

Update the specified article.

```typescript
const articleId: string = "<ARTICLE_ID>";
const revision: string = "2";
const article: any = require("<PATH_TO_ARTICLE>/article.json");

client.updateArticle(
    { articleId, revision, article, },
    (error: Error, response: any) => {

        // Do something with the response here.
});
```

### deleteArticle

Delete the specified article.

```typescript
client.deleteArticle(
    { articleId: "<PATH_TO_ARTICLE>", },
    (error: Error, response: any) => {

        // Do something with the response here.
});
```

## Build From Source

Pretty simple: clone the repository, instal the dependencies then run the build script:
```shell
git clone https://github.com/robert-fairley/apple-news-client
cd apple-news-client
npm install
npm run build
```

You can also of course optionally just copy the contents of the `src` folder into your existing TypeScript project
and import as above, but using the relative path to the `index.ts` file.

## Testing

The test script is set up to run unit tests and test coverage reports.
```shell
npm test
```

#### View Unit Test Reports

First run the tests, then you can view an HTML report of unit testing results:
```shell
npm run view:test-report
```

#### View Coverage Reports

First run the tests, then you can view an HTML report of unit test coverage:
```shell
npm run view:coverage-report
```

## License

MIT

---

Original work: https://github.com/micnews/apple-news

Modifications &copy; 2018 Robert Fairley
