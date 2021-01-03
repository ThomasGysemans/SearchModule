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
|items|_required_|string|The query selector of the items to filter (needs to be a class)|
|defaultDisplay|"block"|string|When an element doesn't correspond to what the user wrote, the element disppear (display:none). We need to make it reappear if the user changes something.|
|oninput|_null_|function(v:string, results:bool)|This function is called every time that the user writes in the input. Thanks to `results`, you can know if there are no more results (_false_). Take a look at the example.|

Don't forget to add `oninput` attribute to the input:

```
<input type="search" oninput="searchModule.search(this)" class="searchbar" maxlength="20" autocapitalize="off" autocomplete="off" placeholder="Search with a keyword...">
```

## Thanks to what the search bar filters the elements ?

If we keep the above example, we search among the elements that have the class "item". In order for the search bar to work properly, you absolutely need to add a specific attribute to each HTML element that has this class. If you don't do this, an exception will be thrown. This attribute is: `data-keywords`. In this attribute you can write the list of keywords that correspond to each item.

If an element doesn't have the attribute, an error will be thrown in the console (via `console.error()`). Therefore, this element will always be displayed whereas it does'nt correspond to what the user is looking at.

For example, we have a list of fruits:

```
<div class="list-items">
    <div class="item" data-keywords="Banana">Banana</div>
    <div class="item" data-keywords="Strawberry, framboise">Strawberry</div>
    <div class="item" data-keywords="Raspberry">Raspberry</div>
    <div class="item" data-keywords="Cherry">Cherry</div>
    <div class="item" data-keywords="Orange">Orange</div>
    <div class="item" data-keywords="Apple">Apple</div>
</div>
```

Therefore, if the user writes "apple", only the last item will be displayed. However, if the user writes "framboise" or "strawberry", then the second element will be displayed.

For a concrete example, I invite you to look at the example provided in the `src` folder.

## License

MIT License.