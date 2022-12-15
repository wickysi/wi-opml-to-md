# wi-opml-to-md
opml to md

## Installation

``` sh
npm install wi-opml-to-md -g
```

## Usage

``` sh
$ opml-to-markdown -h
Usage: cmd [options]

  -h, --help            displays help
  -e, --entry String    opml file path
  -o, --outfile String  output to file path
  --require String      builder module(like build-slide-markdown.js) path
```

``` sh
$ opml-to-markdown test/fixtures/header-list-note/test.opml
```

``` xml
<?xml version="1.0" encoding="utf-8"?>
<opml version="1.0">
  <head>
    <title>title</title>
    <expansionState>0,2</expansionState>
  </head>
  <body>
    <outline text="H1">
      <outline text="H2 Text"/>
      <outline text="H2">
        <outline text="text"/>
      </outline>
    </outline>
    <outline text="H1 text" _note="note\nnote"/>
  </body>
</opml>
```

to

```markdown
title: title
--

# H1

## H2 Text
## H2
    ### text

--

# H1 text

note
note
```
