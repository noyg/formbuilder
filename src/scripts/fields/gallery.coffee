Formbuilder.registerField 'gallery',

  order: 40

  view: """
    <input type='file' />
    <button href='#'>Gallery</button>
    <div>
      <% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>
        <img src="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].src %>" alt="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>" width="30"/>
      <% } %>
    </div>
  """

  edit: """
    <%= Formbuilder.templates['edit/gallery_images']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-image"></span></span> Gallery
  """