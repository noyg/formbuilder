Formbuilder.registerField 'range',

  order: 40

  view: """
    <% if (rf.get(Formbuilder.options.mappings.MIN_LABEL)) { %>
        <span><%= rf.get(Formbuilder.options.mappings.MIN_LABEL) %></span>
    <% } %>
    <input type='range' value="<%= rf.get(Formbuilder.options.mappings.VALUE) %>" min="<%= rf.get(Formbuilder.options.mappings.MIN) %>" max="<%= rf.get(Formbuilder.options.mappings.MAX) %>" />
    <% if (rf.get(Formbuilder.options.mappings.MAX_LABEL)) { %>
        <span><%= rf.get(Formbuilder.options.mappings.MAX_LABEL) %></span>
    <% } %>
  """

  edit: """
    <%= Formbuilder.templates['edit/min_max']() %>
    <%= Formbuilder.templates['edit/min_max_labels']() %>
    <%= Formbuilder.templates['edit/value']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-sliders"></span></span> Range
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.min_label = "least"
    attrs.field_options.min = 0
    attrs.field_options.max_label = "most"
    attrs.field_options.max = 10
    attrs.field_options.value = 5
    attrs