Formbuilder.registerField 'gallery',

  order: 40

  view: """
    <input type='file' />
    <button href='#'>Gallery</button>
    <div>
      <% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>
        <img src="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].src %>" alt="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>" width="100"/>
      <% } %>
    </div>
  """

  edit: """
    <%= Formbuilder.templates['edit/gallery_images']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-image"></span></span> Gallery
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.uploaded_image_value = ''
    attrs.field_options.options = [
      label: "GRUPOIMPULSA",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery1.jpg"
    ,
      label: "ONLY",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery2.jpg"
    ,
      label: "JAMES GEORGE",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery3.jpg"
    ,
      label: "MOXI",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery4.jpg"
    ,
      label: "NOOR ARCHITECT STUDIO",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery5.jpg"
    ,
      label: "BOCANA",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery6.jpg"
    ,
      label: "LAAND",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery7.jpg"
    ,
      label: "ECO CHEFS",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery8.jpg"
    ,
      label: "SCHHOL OF FASHION INDUSTRY",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery9.jpg"
    ,
      label: "Sparkling Brain",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery10.jpg"
    ,
      label: "TEA BAR",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery11.jpg"
    ,
      label: "BLUE BLUE BERRY",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery12.jpg"
    ,
      label: "WHITE BUDDHA",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery13.jpg"
    ,
      label: "little wren",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery14.jpg"
    ,
      label: "24TH SINGAPORE INTERNATIONAL FILM FESTIVAL",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery15.jpg"
    ,
      label: "ENFANT",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery16.jpg"
    ,
      label: "Sample Logo",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery17.jpg"
    ,
      label: "SAN ANTONIO TENNIS ASSOCIATION",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery18.jpg"
    ,
      label: "ATE NEO",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery19.jpg"
    ,
      label: "WINE after COFFEE",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery20.jpg"
    ,
      label: "MO TEZ",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery21.jpg"
    ,
      label: "Upp",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery22.jpg"
    ,
      label: "MARK",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery23.jpg"
    ,
      label: "BOOSTER",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery24.jpg"
    ,
      label: "STORM FOUNDRY",
      checked: false
      src: "http://marquee.me/images/logo_samples/logo_gallery25.jpg"
    ]
    attrs