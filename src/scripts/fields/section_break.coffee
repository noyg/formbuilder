Formbuilder.registerField 'section_break',

  order: 0

  type: 'non_input'

  view: """
    <hr/>
  """

  edit: """
  """

  addButton: """
    <span class='symbol'><span class='fa fa-minus'></span></span> Section Break
  """

  defaultAttributes: (attrs) ->
    attrs.label = 'Section Break'
    attrs.required = false

    attrs