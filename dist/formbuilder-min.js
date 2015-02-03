(function(){rivets.binders.input={publishes:!0,routine:rivets.binders.value.routine,bind:function(a){return $(a).bind("input.rivets",this.publish)},unbind:function(a){return $(a).unbind("input.rivets")}},rivets.configure({prefix:"rv",adapter:{subscribe:function(a,b,c){return c.wrapped=function(a,b){return c(b)},a.on("change:"+b,c.wrapped)},unsubscribe:function(a,b,c){return a.off("change:"+b,c.wrapped)},read:function(a,b){return"cid"===b?a.cid:a.get(b)},publish:function(a,b,c){return a.cid?a.set(b,c):a[b]=c}}})}).call(this),function(){var a,b,c,d,e,f,g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};e=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return h(b,a),b.prototype.sync=function(){},b.prototype.indexInDOM=function(){var a;return a=$(".fb-field-wrapper").filter(function(a){return function(b,c){return $(c).data("cid")===a.cid}}(this)),$(".fb-field-wrapper").index(a)},b.prototype.is_input=function(){return null!=c.inputFields[this.get(c.options.mappings.FIELD_TYPE)]},b}(Backbone.DeepModel),d=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return h(b,a),b.prototype.initialize=function(){return this.on("add",this.copyCidToModel)},b.prototype.model=e,b.prototype.comparator=function(a){return a.indexInDOM()},b.prototype.copyCidToModel=function(a){return a.attributes.cid=a.cid},b}(Backbone.Collection),f=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return h(b,a),b.prototype.className="fb-field-wrapper",b.prototype.events={"click .subtemplate-wrapper":"focusEditView","click .js-duplicate":"duplicate","click .js-clear":"clear"},b.prototype.initialize=function(a){return this.parentView=a.parentView,this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove)},b.prototype.render=function(){return this.$el.addClass("response-field-"+this.model.get(c.options.mappings.FIELD_TYPE)).data("cid",this.model.cid).html(c.templates["view/base"+(this.model.is_input()?"":"_non_input")]({rf:this.model})),this},b.prototype.focusEditView=function(){return this.parentView.createAndShowEditView(this.model)},b.prototype.clear=function(a){var b,d;switch(a.preventDefault(),a.stopPropagation(),b=function(a){return function(){return a.parentView.handleFormUpdate(),a.model.destroy()}}(this),d=c.options.CLEAR_FIELD_CONFIRM,typeof d){case"string":if(confirm(d))return b();break;case"function":return d(b);default:return b()}},b.prototype.duplicate=function(){var a;return a=_.clone(this.model.attributes),delete a.id,a.label+=" Copy",this.parentView.createField(a,{position:this.model.indexInDOM()+1})},b}(Backbone.View),b=function(a){function b(){return b.__super__.constructor.apply(this,arguments)}return h(b,a),b.prototype.className="edit-response-field",b.prototype.events={"click .js-add-option":"addOption","click .js-remove-option":"removeOption","click .js-default-updated":"defaultUpdated","input .option-label-input":"forceRender"},b.prototype.initialize=function(a){return this.parentView=a.parentView,this.listenTo(this.model,"destroy",this.remove)},b.prototype.render=function(){return this.$el.html(c.templates["edit/base"+(this.model.is_input()?"":"_non_input")]({rf:this.model})),rivets.bind(this.$el,{model:this.model}),this},b.prototype.remove=function(){return this.parentView.editView=void 0,this.parentView.$el.find('[data-target="#addField"]').click(),b.__super__.remove.apply(this,arguments)},b.prototype.addOption=function(a){var b,d,e,f;return b=$(a.currentTarget),d=this.$el.find(".option").index(b.closest(".option")),f=this.model.get(c.options.mappings.OPTIONS)||[],e={label:"",checked:!1},d>-1?f.splice(d+1,0,e):f.push(e),this.model.set(c.options.mappings.OPTIONS,f),this.model.trigger("change:"+c.options.mappings.OPTIONS),this.forceRender()},b.prototype.removeOption=function(a){var b,d,e;return b=$(a.currentTarget),d=this.$el.find(".js-remove-option").index(b),e=this.model.get(c.options.mappings.OPTIONS),e.splice(d,1),this.model.set(c.options.mappings.OPTIONS,e),this.model.trigger("change:"+c.options.mappings.OPTIONS),this.forceRender()},b.prototype.defaultUpdated=function(a){var b;return b=$(a.currentTarget),"checkboxes"!==this.model.get(c.options.mappings.FIELD_TYPE)&&this.$el.find(".js-default-updated").not(b).attr("checked",!1).trigger("change"),this.forceRender()},b.prototype.forceRender=function(){return this.model.trigger("change")},b}(Backbone.View),a=function(a){function e(){return e.__super__.constructor.apply(this,arguments)}return h(e,a),e.prototype.SUBVIEWS=[],e.prototype.events={"click .js-save-form":"saveForm","click .fb-tabs a":"showTab","click .fb-add-field-types a":"addField","mouseover .fb-add-field-types":"lockLeftWrapper","mouseout .fb-add-field-types":"unlockLeftWrapper"},e.prototype.initialize=function(a){var b;return b=a.selector,this.formBuilder=a.formBuilder,this.bootstrapData=a.bootstrapData,null!=b&&this.setElement($(b)),this.collection=new d,this.collection.bind("add",this.addOne,this),this.collection.bind("reset",this.reset,this),this.collection.bind("change",this.handleFormUpdate,this),this.collection.bind("destroy add reset",this.hideShowNoResponseFields,this),this.collection.bind("destroy",this.ensureEditViewScrolled,this),this.render(),this.collection.reset(this.bootstrapData),this.bindSaveEvent()},e.prototype.bindSaveEvent=function(){return this.formSaved=!0,this.saveFormButton=this.$el.find(".js-save-form"),this.saveFormButton.attr("disabled",!0).text(c.options.dict.ALL_CHANGES_SAVED),c.options.AUTOSAVE&&setInterval(function(a){return function(){return a.saveForm.call(a)}}(this),5e3),$(window).bind("beforeunload",function(a){return function(){return a.formSaved?void 0:c.options.dict.UNSAVED_CHANGES}}(this))},e.prototype.reset=function(){return this.$responseFields.html(""),this.addAll()},e.prototype.render=function(){var a,b,d,e;for(this.$el.html(c.templates.page()),this.$fbLeft=this.$el.find(".fb-left"),this.$responseFields=this.$el.find(".fb-response-fields"),this.bindWindowScrollEvent(),this.hideShowNoResponseFields(),e=this.SUBVIEWS,b=0,d=e.length;d>b;b++)a=e[b],new a({parentView:this}).render();return this},e.prototype.bindWindowScrollEvent=function(){return $(window).on("scroll",function(a){return function(){var b,c;if(a.$fbLeft.data("locked")!==!0)return c=Math.max(0,$(window).scrollTop()-a.$el.offset().top),b=a.$responseFields.height(),a.$fbLeft.css({"margin-top":Math.min(b,c)})}}(this))},e.prototype.showTab=function(a){var b,c,d;return b=$(a.currentTarget),d=b.data("target"),b.closest("li").addClass("active").siblings("li").removeClass("active"),$(d).addClass("active").siblings(".fb-tab-pane").removeClass("active"),"#editField"!==d&&this.unlockLeftWrapper(),"#editField"===d&&!this.editView&&(c=this.collection.models[0])?this.createAndShowEditView(c):void 0},e.prototype.addOne=function(a,b,c){var d,e;return e=new f({model:a,parentView:this}),null!=c.$replaceEl?c.$replaceEl.replaceWith(e.render().el):null==c.position||-1===c.position?this.$responseFields.append(e.render().el):0===c.position?this.$responseFields.prepend(e.render().el):(d=this.$responseFields.find(".fb-field-wrapper").eq(c.position))[0]?d.before(e.render().el):this.$responseFields.append(e.render().el)},e.prototype.setSortable=function(){return this.$responseFields.hasClass("ui-sortable")&&this.$responseFields.sortable("destroy"),this.$responseFields.sortable({forcePlaceholderSize:!0,placeholder:"sortable-placeholder",stop:function(a){return function(b,d){var e;return d.item.data("field-type")&&(e=a.collection.create(c.helpers.defaultFieldAttrs(d.item.data("field-type")),{$replaceEl:d.item}),a.createAndShowEditView(e)),a.handleFormUpdate(),!0}}(this),update:function(a){return function(b,c){return c.item.data("field-type")?void 0:a.ensureEditViewScrolled()}}(this)}),this.setDraggable()},e.prototype.setDraggable=function(){var a;return a=this.$el.find("[data-field-type]"),a.draggable({connectToSortable:this.$responseFields,helper:function(a){return function(){var b;return b=$("<div class='response-field-draggable-helper' />"),b.css({width:a.$responseFields.width(),height:"80px"}),b}}(this)})},e.prototype.addAll=function(){return this.collection.each(this.addOne,this),this.setSortable()},e.prototype.hideShowNoResponseFields=function(){return this.$el.find(".fb-no-response-fields")[this.collection.length>0?"hide":"show"]()},e.prototype.addField=function(a){var b;return b=$(a.currentTarget).data("field-type"),this.createField(c.helpers.defaultFieldAttrs(b))},e.prototype.createField=function(a,b){var c;return c=this.collection.create(a,b),this.createAndShowEditView(c),this.handleFormUpdate()},e.prototype.createAndShowEditView=function(a){var c,d;if(d=this.$el.find(".fb-field-wrapper").filter(function(){return $(this).data("cid")===a.cid}),d.addClass("editing").siblings(".fb-field-wrapper").removeClass("editing"),this.editView){if(this.editView.model.cid===a.cid)return this.$el.find('.fb-tabs a[data-target="#editField"]').click(),void this.scrollLeftWrapper(d);this.editView.remove()}return this.editView=new b({model:a,parentView:this}),c=this.editView.render().$el,this.$el.find(".fb-edit-field-wrapper").html(c),this.$el.find('.fb-tabs a[data-target="#editField"]').click(),this.scrollLeftWrapper(d),this},e.prototype.ensureEditViewScrolled=function(){return this.editView?this.scrollLeftWrapper($(".fb-field-wrapper.editing")):void 0},e.prototype.scrollLeftWrapper=function(a){return this.unlockLeftWrapper(),a[0]?$.scrollWindowTo(this.$el.offset().top+a.offset().top-this.$responseFields.offset().top,200,function(a){return function(){return a.lockLeftWrapper()}}(this)):void 0},e.prototype.lockLeftWrapper=function(){return this.$fbLeft.data("locked",!0)},e.prototype.unlockLeftWrapper=function(){return this.$fbLeft.data("locked",!1)},e.prototype.handleFormUpdate=function(){return this.updatingBatch?void 0:(this.formSaved=!1,this.saveFormButton.removeAttr("disabled").text(c.options.dict.SAVE_FORM))},e.prototype.saveForm=function(){var a;if(!this.formSaved)return this.formSaved=!0,this.saveFormButton.attr("disabled",!0).text(c.options.dict.ALL_CHANGES_SAVED),this.collection.sort(),a=JSON.stringify({fields:this.collection.toJSON()}),c.options.HTTP_ENDPOINT&&this.doAjaxSave(a),this.formBuilder.trigger("save",a)},e.prototype.doAjaxSave=function(a){return $.ajax({url:c.options.HTTP_ENDPOINT,type:c.options.HTTP_METHOD,data:a,contentType:"application/json",success:function(a){return function(b){var c,d,e,f;for(a.updatingBatch=!0,d=0,e=b.length;e>d;d++)c=b[d],null!=(f=a.collection.get(c.cid))&&f.set({id:c.id}),a.collection.trigger("sync");return a.updatingBatch=void 0}}(this)})},e}(Backbone.View),c=function(){function b(b){var c;null==b&&(b={}),_.extend(this,Backbone.Events),c=_.extend(b,{formBuilder:this}),this.mainView=new a(c)}return b.helpers={defaultFieldAttrs:function(a){var c,d;return c={},c[b.options.mappings.LABEL]="Untitled",c[b.options.mappings.FIELD_TYPE]=a,c[b.options.mappings.REQUIRED]=!0,c.field_options={},("function"==typeof(d=b.fields[a]).defaultAttributes?d.defaultAttributes(c):void 0)||c},simple_format:function(a){return null!=a?a.replace(/\n/g,"<br />"):void 0}},b.options={BUTTON_CLASS:"fb-button",HTTP_ENDPOINT:"",HTTP_METHOD:"POST",AUTOSAVE:!0,CLEAR_FIELD_CONFIRM:!1,mappings:{SIZE:"field_options.size",UNITS:"field_options.units",LABEL:"label",FIELD_TYPE:"field_type",REQUIRED:"required",ADMIN_ONLY:"admin_only",OPTIONS:"field_options.options",DESCRIPTION:"field_options.description",INCLUDE_OTHER:"field_options.include_other_option",INCLUDE_BLANK:"field_options.include_blank_option",INTEGER_ONLY:"field_options.integer_only",MIN:"field_options.min",MAX:"field_options.max",MINLENGTH:"field_options.minlength",MAXLENGTH:"field_options.maxlength",LENGTH_UNITS:"field_options.min_max_length_units",MIN_LABEL:"field_options.min_label",MAX_LABEL:"field_options.max_label",DEFAULT_VALUE:"field_options.default_value",STEP:"field_options.step",SRC:"field_options.src"},dict:{ALL_CHANGES_SAVED:"All changes saved",SAVE_FORM:"Save form",UNSAVED_CHANGES:"You have unsaved changes. If you leave this page, you will lose those changes!"}},b.fields={},b.inputFields={},b.nonInputFields={},b.registerField=function(a,c){var d,e,f,g;for(g=["view","edit"],e=0,f=g.length;f>e;e++)d=g[e],c[d]=_.template(c[d]);return c.field_type=a,b.fields[a]=c,"non_input"===c.type?b.nonInputFields[a]=c:b.inputFields[a]=c},b}(),window.Formbuilder=c,"undefined"!=typeof module&&null!==module?module.exports=c:window.Formbuilder=c}.call(this),function(){Formbuilder.registerField("address",{order:50,view:"<div class='input-line'>\n  <span class='street'>\n    <input type='text' />\n    <label>Address</label>\n  </span>\n</div>\n\n<div class='input-line'>\n  <span class='city'>\n    <input type='text' />\n    <label>City</label>\n  </span>\n\n  <span class='state'>\n    <input type='text' />\n    <label>State / Province / Region</label>\n  </span>\n</div>\n\n<div class='input-line'>\n  <span class='zip'>\n    <input type='text' />\n    <label>Zipcode</label>\n  </span>\n\n  <span class='country'>\n    <select><option>United States</option></select>\n    <label>Country</label>\n  </span>\n</div>",edit:"",addButton:'<span class="symbol"><span class="fa fa-home"></span></span> Address'})}.call(this),function(){Formbuilder.registerField("checkboxes",{order:10,view:"<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <input type='checkbox' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </label>\n  </div>\n<% } %>\n\n<% if (rf.get(Formbuilder.options.mappings.INCLUDE_OTHER)) { %>\n  <div class='other-option'>\n    <label class='fb-option'>\n      <input type='checkbox' />\n      Other\n    </label>\n\n    <input type='text' />\n  </div>\n<% } %>",edit:"<%= Formbuilder.templates['edit/options']({ includeOther: true }) %>",addButton:'<span class="symbol"><span class="fa fa-square-o"></span></span> Checkboxes',defaultAttributes:function(a){return a.field_options.options=[{label:"",checked:!1},{label:"",checked:!1}],a}})}.call(this),function(){Formbuilder.registerField("date",{order:20,view:"<div class='input-line'>\n  <span class='month'>\n    <input type=\"text\" />\n    <label>MM</label>\n  </span>\n\n  <span class='above-line'>/</span>\n\n  <span class='day'>\n    <input type=\"text\" />\n    <label>DD</label>\n  </span>\n\n  <span class='above-line'>/</span>\n\n  <span class='year'>\n    <input type=\"text\" />\n    <label>YYYY</label>\n  </span>\n</div>",edit:"",addButton:'<span class="symbol"><span class="fa fa-calendar"></span></span> Date'})}.call(this),function(){Formbuilder.registerField("dropdown",{order:24,view:"<select>\n  <% if (rf.get(Formbuilder.options.mappings.INCLUDE_BLANK)) { %>\n    <option value=''></option>\n  <% } %>\n\n  <% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n    <option <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'selected' %>>\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </option>\n  <% } %>\n</select>",edit:"<%= Formbuilder.templates['edit/options']({ includeBlank: true }) %>",addButton:'<span class="symbol"><span class="fa fa-caret-down"></span></span> Dropdown',defaultAttributes:function(a){return a.field_options.options=[{label:"",checked:!1},{label:"",checked:!1}],a.field_options.include_blank_option=!1,a}})}.call(this),function(){Formbuilder.registerField("email",{order:40,view:"<input type='text' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' />",edit:"<%= Formbuilder.templates['edit/size']() %>",addButton:'<span class="symbol"><span class="fa fa-envelope-o"></span></span> Email'})}.call(this),function(){Formbuilder.registerField("file",{order:40,view:"<input type='file' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' />",edit:"<%= Formbuilder.templates['edit/size']() %>",addButton:'<span class="symbol"><span class="fa fa-file-o"></span></span> File'})}.call(this),function(){Formbuilder.registerField("gallery",{order:40,view:"<input type='file' />\n<a href='#'>Gallery</a>",edit:"<%= Formbuilder.templates['edit/gallery_images']() %>",addButton:'<span class="symbol"><span class="fa fa-image"></span></span> Gallery'})}.call(this),function(){Formbuilder.registerField("image_checkboxes",{order:10,view:"<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <img src=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].src %>\" alt=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\" />\n      <input type='checkbox' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </label>\n  </div>\n<% } %>",edit:"<%= Formbuilder.templates['edit/image_checkboxes_options']() %>",addButton:'<span class="symbol"><span class="fa fa-check"></span><span class="fa fa-image"></span></span> Img Checkbox',defaultAttributes:function(a){return a.field_options.options=[{label:"Batman",checked:!1,src:"https://c1.staticflickr.com/3/2122/2257283078_a22a5c7be7_b.jpg"},{label:"Superman",checked:!1,src:"https://c1.staticflickr.com/1/31/37271521_47df0e4547_b.jpg"}],a}})}.call(this),function(){Formbuilder.registerField("number",{order:30,view:"<input type='text' />\n<% if (units = rf.get(Formbuilder.options.mappings.UNITS)) { %>\n  <%= units %>\n<% } %>",edit:"<%= Formbuilder.templates['edit/min_max']() %>\n<%= Formbuilder.templates['edit/units']() %>\n<%= Formbuilder.templates['edit/integer_only']() %>",addButton:'<span class="symbol"><span class="fa fa-number">123</span></span> Number'})}.call(this),function(){Formbuilder.registerField("paragraph",{order:5,view:"<textarea class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>'></textarea>",edit:"<%= Formbuilder.templates['edit/size']() %>\n<%= Formbuilder.templates['edit/min_max_length']() %>",addButton:'<span class="symbol">&#182;</span> Paragraph',defaultAttributes:function(a){return a.field_options.size="small",a}})}.call(this),function(){Formbuilder.registerField("price",{order:45,view:"<div class='input-line'>\n  <span class='above-line'>$</span>\n  <span class='dolars'>\n    <input type='text' />\n    <label>Dollars</label>\n  </span>\n  <span class='above-line'>.</span>\n  <span class='cents'>\n    <input type='text' />\n    <label>Cents</label>\n  </span>\n</div>",edit:"",addButton:'<span class="symbol"><span class="fa fa-usd"></span></span> Price'})}.call(this),function(){Formbuilder.registerField("radio",{order:15,view:"<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <input type='radio' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </label>\n  </div>\n<% } %>\n\n<% if (rf.get(Formbuilder.options.mappings.INCLUDE_OTHER)) { %>\n  <div class='other-option'>\n    <label class='fb-option'>\n      <input type='radio' />\n      Other\n    </label>\n\n    <input type='text' />\n  </div>\n<% } %>",edit:"<%= Formbuilder.templates['edit/options']({ includeOther: true }) %>",addButton:'<span class="symbol"><span class="fa fa-circle-o"></span></span> Multiple Choice',defaultAttributes:function(a){return a.field_options.options=[{label:"",checked:!1},{label:"",checked:!1}],a}})}.call(this),function(){Formbuilder.registerField("range",{order:40,view:'<% if (rf.get(Formbuilder.options.mappings.MIN_LABEL)) { %>\n    <span><%= rf.get(Formbuilder.options.mappings.MIN_LABEL) %></span>\n<% } %>\n<input type=\'range\' value="<%= rf.get(Formbuilder.options.mappings.DEFAULT_VALUE) %>" min="<%= rf.get(Formbuilder.options.mappings.MIN) %>" max="<%= rf.get(Formbuilder.options.mappings.MAX) %>" />\n<% if (rf.get(Formbuilder.options.mappings.MAX_LABEL)) { %>\n    <span><%= rf.get(Formbuilder.options.mappings.MAX_LABEL) %></span>\n<% } %>',edit:"<%= Formbuilder.templates['edit/min_max']() %>\n<%= Formbuilder.templates['edit/min_max_labels']() %>\n<%= Formbuilder.templates['edit/default_value']() %>",addButton:'<span class="symbol"><span class="fa fa-sliders"></span></span> Range',defaultAttributes:function(a){return a.field_options.min_label="least",a.field_options.min=0,a.field_options.max_label="most",a.field_options.max=10,a.field_options.default_value=5,a}})}.call(this),function(){Formbuilder.registerField("range_group",{order:40,view:'<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <% if (rf.get(Formbuilder.options.mappings.OPTIONS)[i].min_label) { %>\n        <span><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].min_label %></span>\n    <% } %>\n    <input type=\'range\' value="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].default_value %>"\n            min="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].min %>"\n            max="<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].max %>" />\n    <% if (rf.get(Formbuilder.options.mappings.OPTIONS)[i].max_label) { %>\n        <span><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].max_label %></span>\n    <% } %>\n  </div>\n<% } %>\n',edit:"<%= Formbuilder.templates['edit/range_group_options']() %>",addButton:'<span class="symbol"><span class="fa fa-sliders"></span><span class="fa fa-list"></span></span> Range Group',defaultAttributes:function(a){return a.field_options.options=[{min_label:"least",min:0,max_label:"most",max:10,default_value:5},{min_label:"min_label",min_label:"worst",min:0,max_label:"best",max:10,default_value:5}],a}})}.call(this),function(){Formbuilder.registerField("section_break",{order:0,type:"non_input",view:"<label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>\n<p><%= rf.get(Formbuilder.options.mappings.DESCRIPTION) %></p>",edit:"<div class='fb-edit-section-header'>Label</div>\n<input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />\n<textarea data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'\n  placeholder='Add a longer description to this field'></textarea>",addButton:"<span class='symbol'><span class='fa fa-minus'></span></span> Section Break"})}.call(this),function(){Formbuilder.registerField("text",{order:0,view:"<input type='text' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' />",edit:"<%= Formbuilder.templates['edit/size']() %>\n<%= Formbuilder.templates['edit/min_max_length']() %>",addButton:"<span class='symbol'><span class='fa fa-font'></span></span> Text",defaultAttributes:function(a){return a.field_options.size="small",a}})}.call(this),function(){Formbuilder.registerField("time",{order:25,view:"<div class='input-line'>\n  <span class='hours'>\n    <input type=\"text\" />\n    <label>HH</label>\n  </span>\n\n  <span class='above-line'>:</span>\n\n  <span class='minutes'>\n    <input type=\"text\" />\n    <label>MM</label>\n  </span>\n\n  <span class='above-line'>:</span>\n\n  <span class='seconds'>\n    <input type=\"text\" />\n    <label>SS</label>\n  </span>\n\n  <span class='am_pm'>\n    <select>\n      <option>AM</option>\n      <option>PM</option>\n    </select>\n  </span>\n</div>",edit:"",addButton:'<span class="symbol"><span class="fa fa-clock-o"></span></span> Time'})}.call(this),function(){Formbuilder.registerField("number",{order:30,view:'<input type=\'number\' value="<%= rf.get(Formbuilder.options.mappings.DEFAULT_VALUE) %>"\n  min="<%= rf.get(Formbuilder.options.mappings.MIN) %>"\n  max="<%= rf.get(Formbuilder.options.mappings.MAX) %>"\n  step="<%= rf.get(Formbuilder.options.mappings.STEP) %>"\n  />\n<% if (units = rf.get(Formbuilder.options.mappings.UNITS)) { %>\n  <%= units %>\n<% } %>',edit:"<%= Formbuilder.templates['edit/min_max']() %>\n<%= Formbuilder.templates['edit/units']() %>\n<%= Formbuilder.templates['edit/default_value']() %>\n<%= Formbuilder.templates['edit/step']() %>",addButton:'<span class="symbol"><span class="fa fa-sort"></span></span> Unit',defaultAttributes:function(a){return a.field_options.min=0,a.field_options.max=1e3,a.field_options.default_value=0,a.field_options.step=1,a}})}.call(this),function(){Formbuilder.registerField("website",{order:35,view:"<input type='text' placeholder='http://' />",edit:"",addButton:'<span class="symbol"><span class="fa fa-link"></span></span> Website'})}.call(this),this.Formbuilder=this.Formbuilder||{},this.Formbuilder.templates=this.Formbuilder.templates||{},this.Formbuilder.templates["edit/base"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+=(null==(__t=Formbuilder.templates["edit/base_header"]())?"":__t)+"\r\n"+(null==(__t=Formbuilder.templates["edit/common"]())?"":__t)+"\r\n"+(null==(__t=Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].edit({rf:rf}))?"":__t)+"\r\n";return __p},this.Formbuilder.templates["edit/base_header"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-field-label'>\r\n  <span data-rv-text=\"model."+(null==(__t=Formbuilder.options.mappings.LABEL)?"":__t)+"\"></span>\r\n  <code class='field-type' data-rv-text='model."+(null==(__t=Formbuilder.options.mappings.FIELD_TYPE)?"":__t)+"'></code>\r\n  <span class='fa fa-arrow-right pull-right'></span>\r\n</div>";return __p},this.Formbuilder.templates["edit/base_non_input"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+=(null==(__t=Formbuilder.templates["edit/base_header"]())?"":__t)+"\r\n"+(null==(__t=Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].edit({rf:rf}))?"":__t)+"\r\n";return __p},this.Formbuilder.templates["edit/checkboxes"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<label>\r\n  <input type='checkbox' data-rv-checked='model."+(null==(__t=Formbuilder.options.mappings.REQUIRED)?"":__t)+"' />\r\n  Required\r\n</label>\r\n<!-- label>\r\n  <input type='checkbox' data-rv-checked='model."+(null==(__t=Formbuilder.options.mappings.ADMIN_ONLY)?"":__t)+"' />\r\n  Admin only\r\n</label -->";return __p},this.Formbuilder.templates["edit/common"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-edit-section-header'>Label</div>\r\n\r\n<div class='fb-common-wrapper'>\r\n  <div class='fb-label-description'>\r\n    "+(null==(__t=Formbuilder.templates["edit/label_description"]())?"":__t)+"\r\n  </div>\r\n  <div class='fb-common-checkboxes'>\r\n    "+(null==(__t=Formbuilder.templates["edit/checkboxes"]())?"":__t)+"\r\n  </div>\r\n  <div class='fb-clear'></div>\r\n</div>\r\n";return __p},this.Formbuilder.templates["edit/default_value"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-edit-section-header'>Default value</div>\r\n<input type='text' data-rv-input='model."+(null==(__t=Formbuilder.options.mappings.DEFAULT_VALUE)?"":__t)+"' />";return __p},this.Formbuilder.templates["edit/gallery_images"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-edit-section-header'>Images</div>\r\n\r\n<div class='option' data-rv-each-option='model."+(null==(__t=Formbuilder.options.mappings.OPTIONS)?"":__t)+'\'>\r\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked" />\r\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\' />\r\n  <a class="js-add-option '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'" title="Add Option"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-remove-option '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+"\" title=\"Remove Option\"><i class='fa fa-minus-circle'></i></a>\r\n</div>\r\n\r\n<div class='fb-bottom-add'>\r\n  <a class=\"js-add-option "+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'">Add image</a>\r\n</div>\r\n';return __p},this.Formbuilder.templates["edit/image_checkboxes_options"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-edit-section-header'>Options</div>\r\n\r\n<div class='option' data-rv-each-option='model."+(null==(__t=Formbuilder.options.mappings.OPTIONS)?"":__t)+'\'>\r\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked" />\r\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\' />\r\n  <input type="url" data-rv-input="option:src" class=\'option-src-input\' />\r\n  <a class="js-add-option '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'" title="Add Option"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-remove-option '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+"\" title=\"Remove Option\"><i class='fa fa-minus-circle'></i></a>\r\n</div>\r\n\r\n<div class='fb-bottom-add'>\r\n  <a class=\"js-add-option "+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'">Add option</a>\r\n</div>\r\n';return __p},this.Formbuilder.templates["edit/integer_only"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-edit-section-header'>Integer only</div>\r\n<label>\r\n  <input type='checkbox' data-rv-checked='model."+(null==(__t=Formbuilder.options.mappings.INTEGER_ONLY)?"":__t)+"' />\r\n  Only accept integers\r\n</label>\r\n";return __p},this.Formbuilder.templates["edit/label_description"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<input type='text' data-rv-input='model."+(null==(__t=Formbuilder.options.mappings.LABEL)?"":__t)+"' />\r\n<textarea data-rv-input='model."+(null==(__t=Formbuilder.options.mappings.DESCRIPTION)?"":__t)+"'\r\n  placeholder='Add a longer description to this field'></textarea>";return __p},this.Formbuilder.templates["edit/min_max"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<div class=\'fb-edit-section-header\'>Minimum / Maximum</div>\r\n\r\nAbove\r\n<input type="text" data-rv-input="model.'+(null==(__t=Formbuilder.options.mappings.MIN)?"":__t)+'" style="width: 30px" />\r\n\r\n&nbsp;&nbsp;\r\n\r\nBelow\r\n<input type="text" data-rv-input="model.'+(null==(__t=Formbuilder.options.mappings.MAX)?"":__t)+'" style="width: 30px" />\r\n';return __p},this.Formbuilder.templates["edit/min_max_labels"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<div class=\'fb-edit-section-header\'>Minimum / Maximum</div>\r\n\r\nAbove label\r\n<input type="text" data-rv-input="model.'+(null==(__t=Formbuilder.options.mappings.MIN_LABEL)?"":__t)+'" style="width: 30px" />\r\n\r\n&nbsp;&nbsp;\r\n\r\nBelow label\r\n<input type="text" data-rv-input="model.'+(null==(__t=Formbuilder.options.mappings.MAX_LABEL)?"":__t)+'" style="width: 30px" />\r\n';return __p},this.Formbuilder.templates["edit/min_max_length"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<div class=\'fb-edit-section-header\'>Length Limit</div>\r\n\r\nMin\r\n<input type="text" data-rv-input="model.'+(null==(__t=Formbuilder.options.mappings.MINLENGTH)?"":__t)+'" style="width: 30px" />\r\n\r\n&nbsp;&nbsp;\r\n\r\nMax\r\n<input type="text" data-rv-input="model.'+(null==(__t=Formbuilder.options.mappings.MAXLENGTH)?"":__t)+'" style="width: 30px" />\r\n\r\n&nbsp;&nbsp;\r\n\r\n<select data-rv-value="model.'+(null==(__t=Formbuilder.options.mappings.LENGTH_UNITS)?"":__t)+'" style="width: auto;">\r\n  <option value="characters">characters</option>\r\n  <option value="words">words</option>\r\n</select>\r\n';return __p},this.Formbuilder.templates["edit/options"]=function(obj){obj||(obj={});{var __t,__p="";_.escape,Array.prototype.join}with(obj)__p+="<div class='fb-edit-section-header'>Options</div>\r\n\r\n","undefined"!=typeof includeBlank&&(__p+="\r\n  <label>\r\n    <input type='checkbox' data-rv-checked='model."+(null==(__t=Formbuilder.options.mappings.INCLUDE_BLANK)?"":__t)+"' />\r\n    Include blank\r\n  </label>\r\n"),__p+="\r\n\r\n<div class='option' data-rv-each-option='model."+(null==(__t=Formbuilder.options.mappings.OPTIONS)?"":__t)+'\'>\r\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked" />\r\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\' />\r\n  <a class="js-add-option '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'" title="Add Option"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-remove-option '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'" title="Remove Option"><i class=\'fa fa-minus-circle\'></i></a>\r\n</div>\r\n\r\n',"undefined"!=typeof includeOther&&(__p+="\r\n  <label>\r\n    <input type='checkbox' data-rv-checked='model."+(null==(__t=Formbuilder.options.mappings.INCLUDE_OTHER)?"":__t)+'\' />\r\n    Include "other"\r\n  </label>\r\n'),__p+="\r\n\r\n<div class='fb-bottom-add'>\r\n  <a class=\"js-add-option "+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'">Add option</a>\r\n</div>\r\n';
return __p},this.Formbuilder.templates["edit/range_group_options"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-edit-section-header'>Ranges</div>\r\n\r\n<div class='option' data-rv-each-option='model."+(null==(__t=Formbuilder.options.mappings.OPTIONS)?"":__t)+'\'>\r\n  Min: <input type="text" data-rv-input="option:min" class=\'option-label-input\' /><br/>\r\n  Label: <input type="text" data-rv-input="option:min_label" class=\'option-label-input\' /><br/>\r\n  Max: <input type="text" data-rv-input="option:max" class=\'option-label-input\' /><br/>\r\n  Label: <input type="text" data-rv-input="option:max_label" class=\'option-label-input\' /><br/>\r\n  Value: <input type="text" data-rv-input="option:default_value" class=\'option-label-input\' /><br/>\r\n  <a class="js-add-option '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'" title="Add Range"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-remove-option '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+"\" title=\"Remove Range\"><i class='fa fa-minus-circle'></i></a>\r\n</div>\r\n\r\n<div class='fb-bottom-add'>\r\n  <a class=\"js-add-option "+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'">Add range</a>\r\n</div>';return __p},this.Formbuilder.templates["edit/size"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-edit-section-header'>Size</div>\r\n<select data-rv-value=\"model."+(null==(__t=Formbuilder.options.mappings.SIZE)?"":__t)+'">\r\n  <option value="small">Small</option>\r\n  <option value="medium">Medium</option>\r\n  <option value="large">Large</option>\r\n</select>\r\n';return __p},this.Formbuilder.templates["edit/step"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-edit-section-header'>Step</div>\r\n<input type='text' data-rv-input='model."+(null==(__t=Formbuilder.options.mappings.STEP)?"":__t)+"' />";return __p},this.Formbuilder.templates["edit/units"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+='<div class=\'fb-edit-section-header\'>Units</div>\r\n<input type="text" data-rv-input="model.'+(null==(__t=Formbuilder.options.mappings.UNITS)?"":__t)+'" />\r\n';return __p},this.Formbuilder.templates.page=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+=(null==(__t=Formbuilder.templates["partials/save_button"]())?"":__t)+"\r\n"+(null==(__t=Formbuilder.templates["partials/left_side"]())?"":__t)+"\r\n"+(null==(__t=Formbuilder.templates["partials/right_side"]())?"":__t)+"\r\n<div class='fb-clear'></div>";return __p},this.Formbuilder.templates["partials/add_field"]=function(obj){obj||(obj={});{var __t,__p="";_.escape,Array.prototype.join}with(obj)__p+="<div class='fb-tab-pane active' id='addField'>\r\n  <div class='fb-add-field-types'>\r\n    <div class='section'>\r\n      ",_.each(_.sortBy(Formbuilder.inputFields,"order"),function(a){__p+='\r\n        <a data-field-type="'+(null==(__t=a.field_type)?"":__t)+'" class="'+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'">\r\n          '+(null==(__t=a.addButton)?"":__t)+"\r\n        </a>\r\n      "}),__p+="\r\n    </div>\r\n\r\n    <div class='section'>\r\n      ",_.each(_.sortBy(Formbuilder.nonInputFields,"order"),function(a){__p+='\r\n        <a data-field-type="'+(null==(__t=a.field_type)?"":__t)+'" class="'+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'">\r\n          '+(null==(__t=a.addButton)?"":__t)+"\r\n        </a>\r\n      "}),__p+="\r\n    </div>\r\n  </div>\r\n</div>\r\n";return __p},this.Formbuilder.templates["partials/edit_field"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+="<div class='fb-tab-pane' id='editField'>\r\n  <div class='fb-edit-field-wrapper'></div>\r\n</div>\r\n";return __p},this.Formbuilder.templates["partials/left_side"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-left'>\r\n  <ul class='fb-tabs'>\r\n    <li class='active'><a data-target='#addField'>Add new field</a></li>\r\n    <li><a data-target='#editField'>Edit field</a></li>\r\n  </ul>\r\n\r\n  <div class='fb-tab-content'>\r\n    "+(null==(__t=Formbuilder.templates["partials/add_field"]())?"":__t)+"\r\n    "+(null==(__t=Formbuilder.templates["partials/edit_field"]())?"":__t)+"\r\n  </div>\r\n</div>";return __p},this.Formbuilder.templates["partials/right_side"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+="<div class='fb-right'>\r\n  <div class='fb-no-response-fields'>No response fields</div>\r\n  <div class='fb-response-fields'></div>\r\n</div>\r\n";return __p},this.Formbuilder.templates["partials/save_button"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='fb-save-wrapper'>\r\n  <button class='js-save-form "+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+"'></button>\r\n</div>";return __p},this.Formbuilder.templates["view/base"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='subtemplate-wrapper'>\r\n  <div class='cover'></div>\r\n  "+(null==(__t=Formbuilder.templates["view/label"]({rf:rf}))?"":__t)+"\r\n\r\n  "+(null==(__t=Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].view({rf:rf}))?"":__t)+"\r\n\r\n  "+(null==(__t=Formbuilder.templates["view/description"]({rf:rf}))?"":__t)+"\r\n  "+(null==(__t=Formbuilder.templates["view/duplicate_remove"]({rf:rf}))?"":__t)+"\r\n</div>\r\n";return __p},this.Formbuilder.templates["view/base_non_input"]=function(obj){obj||(obj={});{var __p="";_.escape}with(obj)__p+="";return __p},this.Formbuilder.templates["view/description"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<span class='help-block'>\r\n  "+(null==(__t=Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.DESCRIPTION)))?"":__t)+"\r\n</span>\r\n";return __p},this.Formbuilder.templates["view/duplicate_remove"]=function(obj){obj||(obj={});{var __t,__p="";_.escape}with(obj)__p+="<div class='actions-wrapper'>\r\n  <a class=\"js-duplicate "+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'" title="Duplicate Field"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-clear '+(null==(__t=Formbuilder.options.BUTTON_CLASS)?"":__t)+'" title="Remove Field"><i class=\'fa fa-minus-circle\'></i></a>\r\n</div>';return __p},this.Formbuilder.templates["view/label"]=function(obj){obj||(obj={});{var __t,__p="";_.escape,Array.prototype.join}with(obj)__p+="<label>\r\n  <span>"+(null==(__t=Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.LABEL)))?"":__t)+"\r\n  ",rf.get(Formbuilder.options.mappings.REQUIRED)&&(__p+="\r\n    <abbr title='required'>*</abbr>\r\n  "),__p+="\r\n</label>\r\n";return __p};