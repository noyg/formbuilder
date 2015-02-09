Formbuilder.registerField 'range_group',

  order: 40

  view: """
    <% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>
      <div>
        <% if (rf.get(Formbuilder.options.mappings.OPTIONS)[i].min_label) { %>
            <span><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].min_label %></span>
        <% } %>
        <input type='range' value="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].value %>"
                min="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].min %>"
                max="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].max %>" />
        <% if (rf.get(Formbuilder.options.mappings.OPTIONS)[i].max_label) { %>
            <span><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].max_label %></span>
        <% } %>
      </div>
    <% } %>

  """

  edit: """
    <%= Formbuilder.templates['edit/range_group_options']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-sliders"></span><span class="fa fa-list"></span></span> Range Group
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.options = [
      min_label: "least",
      min: 0,
      max_label: "most",
      max: 10,
      value: 5,
    ,
      min_label: "min_label",
      min_label: "worst",
      min: 0,
      max_label: "best",
      max: 10,
      value: 5,
    ]

    attrs