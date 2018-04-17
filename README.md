# DV - Data Viewer CLI Tool
Friendly viewer for local or online JSON files

## INSTALLATION
`npm i -g dvcli`

## USAGE
```
Usage:
    dv [options]

Options:
    -f PATH, --file PATH              absolute path of json file
    -u URL, --url URL                 url of online json file
    [-q PATH, --query]                specify path to an array inside response object
    [-p BOOL, --paging BOOL]          toggle table paging (default: true)
    [-o BOOL, --ordering BOOL]        toggle table ordering (default: true)
    [-i BOOL, --info BOOL]            toggle table information (default: true)
    [-s BOOL, --searching BOOL]       toggle table search (default: true)
    [-x BOOL, --scrollX BOOL]         enable horizontal scrolling (default: false)
    [-y HEIGHT, --scrollY HEIGHT]     enable vertical scrolling and set table max height (default: false)
    [-t TITLE, --title TITLE]         set results page title
    [-h, --help]                      display help
```

## EXAMPLES
* `dv -u https://jsonplaceholder.typicode.com/posts -t "Posts Lists"`
* `dv -u http://api.plos.org/search?q=title:Drosophila&wt=json&indent=on -p false -q response.docs -y 70vh`