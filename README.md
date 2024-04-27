# FlatBuffer translations

A proof of work of [FlatBuffers](https://flatbuffers.dev/) on [Solid.js](https://solidjs.com) with [TypeScript](https://www.typescriptlang.org/) running on [Vite](https://vitejs.dev) used to translate content.

## Why

I wanted to learn Solid, plus I wanted to find out if FlatBuffers were a feasible way to store data like translations or, more generically, single-layer-objects. Spoiler: it's not worth it.

## Requirements

- PNPM - if you don't have it:
    - You can go into the `page` project and just run `npm i`, `npm run dev`, `npm run build`
    - Run flatbuffers submodule scripts manually

## Build

Check out [package.json](./package.json) scripts.

First things first, cmake and make the `flatc` compiler, then build the binarys and the typescript code:
```
pnpm run translations:flatc
pnpm run translations:bin
pnpm run translations:ts
```

If/when you delete the "source" json you can generate them back from binary with `pnpm run translations:json`

## Data transfer

File size (in bytes) using `wc -c`:

|#|.json|.bin|
|--:|--:|--:|
hello_world | 146 | 132 |
languages |  95 |  96 |
test |  61 |  76 |
total | 302 | 304 |

The json files has 2 spaces as indention and `\u`-escaped unicode characters.

However if we were to remove any indention and use actual unicode:
|#|.json|.bin|
|--:|--:|--:|
hello_world | 146 | 132 |
languages |  72 |  96 |
test |  53 |  76 |
total | 228 | 304 |

## Caveats

Since I'm not using an enum in the schemas I had to create a `Language` object with the `Language` type as key, in order to be able to iterate over it in the `LanguageSelection` component. If any language gets added one must remember to add it to the object (tsc will error if keys are missing, or aren't a language - also, don't forget to compile the schema to typescript)

## Conclusions, future tests

It might be better to just use json, or perhaps optimize the FlatBuffer schemas:
1. Allow dev to perform a single request to the server and retireve multiple translations at once (either all, or a more sophisticated `?keys=languages,hello_world` query)
2. Scrap idea of "key" indexing, just go for "language" indexing (`eng.json`/`eng.bin`)
3. Usage of an `enum Language : ubyte` (solves `Language` object caveat)
