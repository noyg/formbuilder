Formbuilder.registerField 'price',

  order: 45

  view: """
    <% if (units = rf.get(Formbuilder.options.mappings.UNITS)) { %>
      <%= units %>
    <% } %>
    <input type='number' value='<%= rf.get(Formbuilder.options.mappings.VALUE) %>'/>
  """

  edit: """
    <%= Formbuilder.templates['edit/units']() %>
    <%= Formbuilder.templates['edit/value']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-usd"></span></span> Price
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.units = "$"
    attrs.field_options.value = ''
    attrs