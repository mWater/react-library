_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement

# require '../src/index.css'

storiesOf = require('@storybook/react').storiesOf
action = require('@storybook/addon-actions').action;
# {linkTo} = require('@storybook/addon-links');
AsyncReactSelectCompat = require('../src/AsyncReactSelectCompat')

valueSelected = action('value-selected')

escapeRegex = (s) ->
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

InjectState = (Wrapped) ->
  return class StateContainer extends React.Component
    constructor: (props)->
      super(props)
      @state = { value: props.value }

    render: ->
      onChange = (v) =>
        valueSelected v
        @setState(value: v)
      props = _.assign({}, @props, {value: @state.value, onChange: onChange})
      R Wrapped, props

storiesOf('React Select Compat', module)
  .add "Async Select", => (
    R InjectState(AsyncReactSelectCompat),
      value: ["user:broncha"]
      multiple: true
      loadOptions: (query, callback) =>
        ajax = $.getJSON("https://api.mwater.co/v3/" + "users", { regex: "^" + escapeRegex(query), limit: 10, search_names: true })
        ajax.done (users) =>
          # users = _.filter users, (u)=> return excludesList.indexOf("user:#{u._id}") == -1
          callback(null, {
            options: _.map(users, (u) ->
              return { value: "user:#{u._id}", label: u.username, givenName: u.givenName, familyName: u.familyName }
            )
          })
        ajax.fail((error) -> throw error)

  )

