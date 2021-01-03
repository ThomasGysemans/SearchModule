# SearchModule

Creates a basic search bar for one HTML page that filters the possible results according to their keywords. 

## Get started

First of all, look at the `src` folder and import the source code (`SearchModule.js`):

```
<script src="SearchModule.js">
```

The SearchModule needs to be instantiated like this:

```
var searchModule = new SearchModule({
    input: "#js-searchbar", // the id of the input (the search bar)
    items: ".item", // we are searching among .item
    defaultDisplay: "flex", // the results that don't correspond disppear (display:none), so in order to make them reappear...
    oninput: function(value, results) { // every time that the user writes in the input, we get the value and a bool "results"
        var search_sentence = document.querySelector("#js-search-sentence");
        if (value.length > 0) {
            if (results === false) {
                search_sentence.innerHTML = 'No result for "' + value + '". Try another more general keyword.';
            } else {
                search_sentence.innerHTML = 'Here are the articles about "' + value + '" :';
            }
        } else {
            search_sentence.innerHTML = '';
        }
    }
});
```

Here a table recapitulating the possible parameters to pass to `SearchModule`:

|Name|Default|Type|Description|
|----|-------|----|-----------|
|input|_required_|string|The query selector of the input (needs to be an ID)|
|items|_required_|string|The query selector of the items to filter (needs to be a class)|
|defaultDisplay|"block"|string|When an element doesn't correspond to what the user wrote, the element disppear (display:none), we need to make it reappear if the user changes something|
|oninput|_null_|function(v:string, results:bool)|This function is called every time that the user writes in the input. Thanks to `results`, you can know if there are no more results (_false_). Take a look at the example.|