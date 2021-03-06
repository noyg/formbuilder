Formbuilder.registerField 'paragraph',

  order: 5

  view: """
    <textarea class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>'><%= rf.get(Formbuilder.options.mappings.VALUE) %></textarea>
  """

  edit: """
    <%= Formbuilder.templates['edit/min_max_length']() %>
    <%= Formbuilder.templates['edit/value']() %>
  """

  addButton: """
    <span class="symbol">&#182;</span> Long Answer
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.value = ''
    attrs
