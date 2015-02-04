Formbuilder.registerField 'number',

  order: 30

  view: """
    <input type='number' value="<%= rf.get(Formbuilder.options.mappings.DEFAULT_VALUE) %>"
      min="<%= rf.get(Formbuilder.options.mappings.MIN) %>"
      max="<%= rf.get(Formbuilder.options.mappings.MAX) %>"
      step="<%= rf.get(Formbuilder.options.mappings.STEP) %>" />
    <% if (units = rf.get(Formbuilder.options.mappings.UNITS)) { %>
      <%= units %>
    <% } %>
  """

  edit: """
    <%= Formbuilder.templates['edit/min_max']() %>
    <%= Formbuilder.templates['edit/units']() %>
    <%= Formbuilder.templates['edit/default_value']() %>
    <%= Formbuilder.templates['edit/step']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-number">123</span></span> Number
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.min = 0
    attrs.field_options.max = 10000
    attrs.field_options.default_value = 0
    attrs.field_options.units = ""
    attrs.field_options.step = 0.01
    attrs