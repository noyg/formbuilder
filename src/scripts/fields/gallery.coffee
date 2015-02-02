Formbuilder.registerField 'gallery',

  order: 40

  view: """
    <input type='file' />
    <a href='#'>Gallery</a>
  """

  edit: """
    <%= Formbuilder.templates['edit/gallery_images']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-image"></span></span> Gallery
  """