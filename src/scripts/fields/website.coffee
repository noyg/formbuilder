Formbuilder.registerField 'website',

  order: 35

  view: """
    <input type='text' placeholder='http://' value='<%= rf.get(Formbuilder.options.mappings.VALUE) %>' />
  """

  edit: """
    <%= Formbuilder.templates['edit/value']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-link"></span></span> Website
  """
