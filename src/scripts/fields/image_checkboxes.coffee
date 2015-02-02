Formbuilder.registerField 'image_checkboxes',

  order: 10

  view: """
    <% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>
      <div>
        <label class='fb-option'>
          <img src="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].src %>" alt="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>" />
          <input type='checkbox' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick="javascript: return false;" />
          <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>
        </label>
      </div>
    <% } %>
  """

  edit: """
    <%= Formbuilder.templates['edit/image_checkboxes_options']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-check"></span><span class="fa fa-image"></span></span> Checkboxes
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.options = [
      label: "Batman",
      checked: false
      src: "https://c1.staticflickr.com/3/2122/2257283078_a22a5c7be7_b.jpg"
    ,
      label: "Superman",
      checked: false
      src: "https://c1.staticflickr.com/1/31/37271521_47df0e4547_b.jpg"
    ]

    attrs