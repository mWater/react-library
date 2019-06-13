React = require 'react'
ReactDOM = require 'react-dom'
R = React.createElement

# React component that asynchronously loads something into state from the props
# Handles the common case of wanting to load something but having to deal with the complexities
# of multiple updates, unmounting, componentWillReceiveProps vs componentDidMount, etc.
# To use, override isLoadNeeded to determine if a prop change requires a load
# and load to perform load and call setState with callback value.
# Sets state of loading to true/false appropriately
# DO NOT call @setState or reference @props in load
module.exports = class AsyncLoadComponent extends React.Component
  constructor: ->
    @state = { 
      loading: false
    }

    # Keep track if mounted
    @_mounted = false

    # Keep track of load number started and completed to ignore old ones
    @_loadSeqStarted = 0
    @_loadSeqCompleted = 0

  isLoading: => @state.loading

  # Override to determine if a load is needed. Not called on mounting
  isLoadNeeded: (newProps, oldProps) -> throw new Error("Not implemented")

  # Call callback with state changes
  load: (props, prevProps, callback) -> throw new Error("Not implemented")

  # Call to force load
  forceLoad: ->
    @_performLoad(@props, @props)

  _performLoad: (newProps, oldProps) ->
    @_loadSeqStarted += 1

    seq = @_loadSeqStarted

    # Create callback
    callback = (state) =>
      # Check if unmounted
      if not @_mounted
        return

      # Check if out of date
      if seq < @_loadSeqCompleted
        return

      @_loadSeqCompleted = seq 

      # Apply state
      @setState(state)
  
      # Check if latest
      if seq == @_loadSeqStarted
        @setState(loading: false)

    @setState(loading: true, =>
      @load(newProps, oldProps, callback)
    )

  componentWillMount: ->
    @_mounted = true
    @_performLoad(@props, {})

  componentWillReceiveProps: (nextProps) ->
    if @isLoadNeeded(nextProps, @props)
      @_performLoad(nextProps, @props)

  componentWillUnmount: ->
    @_mounted = false