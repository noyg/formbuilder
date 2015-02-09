Formbuilder.registerField 'email',

  order: 40

  view: """
    <input type='text' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' value='<%= rf.get(Formbuilder.options.mappings.VALUE) %>' />
  """

  edit: """
    <%= Formbuilder.templates['edit/size']() %>
    <%= Formbuilder.templates['edit/value']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-envelope-o"></span></span> Email
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.value = ''
    attrs