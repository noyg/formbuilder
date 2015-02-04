Formbuilder.registerField 'price',

  order: 45

  view: """
    <div class='input-line'>
      <span class='above-line'>
        <% if (units = rf.get(Formbuilder.options.mappings.UNITS)) { %>
          <%= units %>
        <% } %>
      </span>
      <span class='dolars'>
        <input type='text' />
        <label>Dollars</label>
      </span>
      <span class='above-line'>.</span>
      <span class='cents'>
        <input type='text' />
        <label>Cents</label>
      </span>
    </div>
  """

  edit: """
    <%= Formbuilder.templates['edit/units']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-usd"></span></span> Price
  """

  defaultAttributes: (attrs) ->
    attrs.field_options.units = "$"
    attrs