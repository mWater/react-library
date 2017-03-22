# react-library

To get started, `npm install` and `bower install`

Then run `gulp demo`. (you might need to `npm install gulp-cli -g`)

Open demo.html in demo/ folder.

## React components

There is a new way to build react components!

Includes:

```
ui = require 'react-library/lib/bootstrap'
update = require 'react-library/lib/update'

```

Define update function:

```
  update: => update(@props.value, @props.onChange, arguments)

```

Create ui components:


```
  R ui.FormGroup, key: "styling", label: "Styling",
    R ui.Check, key: "bold", inline: true, value: @props.value.bold, onChange: @update("bold"), "Bold"
    R ui.Check, key: "italic", inline: true, value: @props.value.italic, onChange: @update("italic"), "Italic"
```

Can also be used to update multiple values (properties of value):

```
  @update({ bold: true, italic: false })
```

Can also be used to update deep properties

```
  @update("styling.bold")
```

