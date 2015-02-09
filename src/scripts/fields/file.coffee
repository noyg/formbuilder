Formbuilder.registerField 'file',

  order: 40

  view: """
    <input type='file' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' />
  """

  edit: """
    <%= Formbuilder.templates['edit/size']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-file-o"></span></span> File
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.value = ''
    attrs