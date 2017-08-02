_ = require 'lodash'
React = require 'react'
H = React.DOM
R = React.createElement
ReactSelect = require 'react-select'
PropTypes = require('prop-types')

# A compat layer for react-select
# React select now only supports values as an object with keys label and value and returns object
# We need to be able to pass in scalar values and get scalar values
module.exports = class AsyncReactSelectCompat extends React.Component
  @propTypes:
    onChange: PropTypes.func.isRequired  # Called on change with list of subjects
    value: PropTypes.any # Current list of subjects or single subject
    multiple: PropTypes.bool # True to allow multiple selection
    loadOptions: PropTypes.func # function to load the options from
    allowClear: PropTypes.bool # True to allow clearing
    placeholder: PropTypes.string # placeholder text to use
    optionRenderer: PropTypes.func # Function to render options
    valueRenderer: PropTypes.func # Function to render value
    disabled: PropTypes.bool # True to disable the control
    readOnly: PropTypes.bool # True to make the control readonly

  handleChange: (value) =>
    if(@props.multiple)
      @props.onChange(value.map((sel) -> sel.value))
    else
      @props.onChange(if value then value.value else value)

  render: ->
    autoload = not @props.value? or @props.value.length == 0 or @props.value == ''
    val = @props.value

    if @props.value? or @props.value == ''
      val = {label: @props.value, value: @props.value}

    if @props.multiple and @props.value?
      val = @props.value.map((val) -> {value: val})

    return R ReactSelect.Async, {
      value: val
      cacheAsyncResults: false
      multi: @props.multiple || false
      clearable: @props.allowClear
      placeholder: if @props.placeholder? then @props.placeholder else "Select..."
      onChange: @handleChange
      loadOptions: @props.loadOptions
      optionRenderer: @props.optionRenderer
      valueRenderer: @props.valueRenderer
      filterOption: () -> return true
      # Filtering currently selected values
      filterOptions: (options, filter, currentValues) =>
        options = options or []
        if not @props.value? or @props.value.length == 0 or @props.value == ''
          return options

        if @props.multiple
          return _.filter(options, (o) =>
            return @props.value.indexOf(o.value) < 0
          )
        else
          return _.filter(options, (o) =>
            return @props.value != o.value
          )
      # This is a HACK. The spinner is not stopping when an initial value is passed
      # Autoload is not necessary anyway, since they will trigger a query
      # autoload: autoload
      disabled: @props.disabled
      inputProps: {readOnly: @props.readOnly}
    }
