(function() {
  rivets.binders.input = {
    publishes: true,
    routine: rivets.binders.value.routine,
    bind: function(el) {
      return $(el).bind('input.rivets', this.publish);
    },
    unbind: function(el) {
      return $(el).unbind('input.rivets');
    }
  };

  rivets.configure({
    prefix: "rv",
    adapter: {
      subscribe: function(obj, keypath, callback) {
        callback.wrapped = function(m, v) {
          return callback(v);
        };
        return obj.on('change:' + keypath, callback.wrapped);
      },
      unsubscribe: function(obj, keypath, callback) {
        return obj.off('change:' + keypath, callback.wrapped);
      },
      read: function(obj, keypath) {
        if (keypath === "cid") {
          return obj.cid;
        }
        return obj.get(keypath);
      },
      publish: function(obj, keypath, value) {
        if (obj.cid) {
          return obj.set(keypath, value);
        } else {
          return obj[keypath] = value;
        }
      }
    }
  });

}).call(this);

(function() {
  var BuilderView, EditFieldView, Formbuilder, FormbuilderCollection, FormbuilderModel, ViewFieldView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FormbuilderModel = (function(_super) {
    __extends(FormbuilderModel, _super);

    function FormbuilderModel() {
      return FormbuilderModel.__super__.constructor.apply(this, arguments);
    }

    FormbuilderModel.prototype.sync = function() {};

    FormbuilderModel.prototype.indexInDOM = function() {
      var $wrapper;
      $wrapper = $(".fb-field-wrapper").filter(((function(_this) {
        return function(_, el) {
          return $(el).data('cid') === _this.cid;
        };
      })(this)));
      return $(".fb-field-wrapper").index($wrapper);
    };

    FormbuilderModel.prototype.is_input = function() {
      return Formbuilder.inputFields[this.get(Formbuilder.options.mappings.FIELD_TYPE)] != null;
    };

    return FormbuilderModel;

  })(Backbone.DeepModel);

  FormbuilderCollection = (function(_super) {
    __extends(FormbuilderCollection, _super);

    function FormbuilderCollection() {
      return FormbuilderCollection.__super__.constructor.apply(this, arguments);
    }

    FormbuilderCollection.prototype.initialize = function() {
      return this.on('add', this.copyCidToModel);
    };

    FormbuilderCollection.prototype.model = FormbuilderModel;

    FormbuilderCollection.prototype.comparator = function(model) {
      return model.indexInDOM();
    };

    FormbuilderCollection.prototype.copyCidToModel = function(model) {
      return model.attributes.cid = model.cid;
    };

    return FormbuilderCollection;

  })(Backbone.Collection);

  ViewFieldView = (function(_super) {
    __extends(ViewFieldView, _super);

    function ViewFieldView() {
      return ViewFieldView.__super__.constructor.apply(this, arguments);
    }

    ViewFieldView.prototype.className = "fb-field-wrapper";

    ViewFieldView.prototype.events = {
      'click .subtemplate-wrapper': 'focusEditView',
      'click .js-duplicate': 'duplicate',
      'click .js-clear': 'clear'
    };

    ViewFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      this.listenTo(this.model, "change", this.render);
      return this.listenTo(this.model, "destroy", this.remove);
    };

    ViewFieldView.prototype.render = function() {
      this.$el.addClass('response-field-' + this.model.get(Formbuilder.options.mappings.FIELD_TYPE)).data('cid', this.model.cid).html(Formbuilder.templates["view/base" + (!this.model.is_input() ? '_non_input' : '')]({
        rf: this.model
      }));
      return this;
    };

    ViewFieldView.prototype.focusEditView = function() {
      return this.parentView.createAndShowEditView(this.model);
    };

    ViewFieldView.prototype.clear = function(e) {
      var cb, x;
      e.preventDefault();
      e.stopPropagation();
      cb = (function(_this) {
        return function() {
          _this.parentView.handleFormUpdate();
          return _this.model.destroy();
        };
      })(this);
      x = Formbuilder.options.CLEAR_FIELD_CONFIRM;
      switch (typeof x) {
        case 'string':
          if (confirm(x)) {
            return cb();
          }
          break;
        case 'function':
          return x(cb);
        default:
          return cb();
      }
    };

    ViewFieldView.prototype.duplicate = function() {
      var attrs;
      attrs = _.clone(this.model.attributes);
      delete attrs['id'];
      attrs['label'] += ' Copy';
      return this.parentView.createField(attrs, {
        position: this.model.indexInDOM() + 1
      });
    };

    return ViewFieldView;

  })(Backbone.View);

  EditFieldView = (function(_super) {
    __extends(EditFieldView, _super);

    function EditFieldView() {
      return EditFieldView.__super__.constructor.apply(this, arguments);
    }

    EditFieldView.prototype.className = "edit-response-field";

    EditFieldView.prototype.events = {
      'click .js-add-option': 'addOption',
      'click .js-remove-option': 'removeOption',
      'click .js-default-updated': 'defaultUpdated',
      'input .option-label-input': 'forceRender'
    };

    EditFieldView.prototype.initialize = function(options) {
      this.parentView = options.parentView;
      return this.listenTo(this.model, "destroy", this.remove);
    };

    EditFieldView.prototype.render = function() {
      this.$el.html(Formbuilder.templates["edit/base" + (!this.model.is_input() ? '_non_input' : '')]({
        rf: this.model
      }));
      rivets.bind(this.$el, {
        model: this.model
      });
      return this;
    };

    EditFieldView.prototype.remove = function() {
      this.parentView.editView = void 0;
      this.parentView.$el.find("[data-target=\"#addField\"]").click();
      return EditFieldView.__super__.remove.apply(this, arguments);
    };

    EditFieldView.prototype.addOption = function(e) {
      var $el, i, newOption, options;
      $el = $(e.currentTarget);
      i = this.$el.find('.option').index($el.closest('.option'));
      options = this.model.get(Formbuilder.options.mappings.OPTIONS) || [];
      newOption = {
        label: "",
        checked: false
      };
      if (i > -1) {
        options.splice(i + 1, 0, newOption);
      } else {
        options.push(newOption);
      }
      this.model.set(Formbuilder.options.mappings.OPTIONS, options);
      this.model.trigger("change:" + Formbuilder.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.removeOption = function(e) {
      var $el, index, options;
      $el = $(e.currentTarget);
      index = this.$el.find(".js-remove-option").index($el);
      options = this.model.get(Formbuilder.options.mappings.OPTIONS);
      options.splice(index, 1);
      this.model.set(Formbuilder.options.mappings.OPTIONS, options);
      this.model.trigger("change:" + Formbuilder.options.mappings.OPTIONS);
      return this.forceRender();
    };

    EditFieldView.prototype.defaultUpdated = function(e) {
      var $el, _ref;
      $el = $(e.currentTarget);
      if ((_ref = this.model.get(Formbuilder.options.mappings.FIELD_TYPE)) !== 'checkboxes' && _ref !== 'image_checkboxes' && _ref !== 'gallery') {
        this.$el.find(".js-default-updated").not($el).attr('checked', false).trigger('change');
      }
      return this.forceRender();
    };

    EditFieldView.prototype.forceRender = function() {
      return this.model.trigger('change');
    };

    return EditFieldView;

  })(Backbone.View);

  BuilderView = (function(_super) {
    __extends(BuilderView, _super);

    function BuilderView() {
      return BuilderView.__super__.constructor.apply(this, arguments);
    }

    BuilderView.prototype.SUBVIEWS = [];

    BuilderView.prototype.events = {
      'click .js-save-form': 'saveForm',
      'click .fb-tabs a': 'showTab',
      'click .fb-add-field-types a': 'addField',
      'mouseover .fb-add-field-types': 'lockLeftWrapper',
      'mouseout .fb-add-field-types': 'unlockLeftWrapper'
    };

    BuilderView.prototype.initialize = function(options) {
      var selector;
      selector = options.selector, this.formBuilder = options.formBuilder, this.bootstrapData = options.bootstrapData;
      if (selector != null) {
        this.setElement($(selector));
      }
      this.collection = new FormbuilderCollection;
      this.collection.bind('add', this.addOne, this);
      this.collection.bind('reset', this.reset, this);
      this.collection.bind('change', this.handleFormUpdate, this);
      this.collection.bind('destroy add reset', this.hideShowNoResponseFields, this);
      this.collection.bind('destroy', this.ensureEditViewScrolled, this);
      this.render();
      this.collection.reset(this.bootstrapData);
      return this.bindSaveEvent();
    };

    BuilderView.prototype.bindSaveEvent = function() {
      this.formSaved = true;
      this.saveFormButton = this.$el.find(".js-save-form");
      this.saveFormButton.attr('disabled', true).text(Formbuilder.options.dict.ALL_CHANGES_SAVED);
      if (!!Formbuilder.options.AUTOSAVE) {
        setInterval((function(_this) {
          return function() {
            return _this.saveForm.call(_this);
          };
        })(this), 5000);
      }
      return $(window).bind('beforeunload', (function(_this) {
        return function() {
          if (_this.formSaved) {
            return void 0;
          } else {
            return Formbuilder.options.dict.UNSAVED_CHANGES;
          }
        };
      })(this));
    };

    BuilderView.prototype.reset = function() {
      this.$responseFields.html('');
      return this.addAll();
    };

    BuilderView.prototype.render = function() {
      var subview, _i, _len, _ref;
      this.$el.html(Formbuilder.templates['page']());
      this.$fbLeft = this.$el.find('.fb-left');
      this.$responseFields = this.$el.find('.fb-response-fields');
      this.bindWindowScrollEvent();
      this.hideShowNoResponseFields();
      _ref = this.SUBVIEWS;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subview = _ref[_i];
        new subview({
          parentView: this
        }).render();
      }
      return this;
    };

    BuilderView.prototype.bindWindowScrollEvent = function() {
      return $(window).on('scroll', (function(_this) {
        return function() {
          var maxMargin, newMargin;
          if (_this.$fbLeft.data('locked') === true) {
            return;
          }
          newMargin = Math.max(0, $(window).scrollTop() - _this.$el.offset().top);
          maxMargin = _this.$responseFields.height();
          return _this.$fbLeft.css({
            'margin-top': Math.min(maxMargin, newMargin)
          });
        };
      })(this));
    };

    BuilderView.prototype.showTab = function(e) {
      var $el, first_model, target;
      $el = $(e.currentTarget);
      target = $el.data('target');
      $el.closest('li').addClass('active').siblings('li').removeClass('active');
      $(target).addClass('active').siblings('.fb-tab-pane').removeClass('active');
      if (target !== '#editField') {
        this.unlockLeftWrapper();
      }
      if (target === '#editField' && !this.editView && (first_model = this.collection.models[0])) {
        return this.createAndShowEditView(first_model);
      }
    };

    BuilderView.prototype.addOne = function(responseField, _, options) {
      var $replacePosition, view;
      view = new ViewFieldView({
        model: responseField,
        parentView: this
      });
      if (options.$replaceEl != null) {
        return options.$replaceEl.replaceWith(view.render().el);
      } else if ((options.position == null) || options.position === -1) {
        return this.$responseFields.append(view.render().el);
      } else if (options.position === 0) {
        return this.$responseFields.prepend(view.render().el);
      } else if (($replacePosition = this.$responseFields.find(".fb-field-wrapper").eq(options.position))[0]) {
        return $replacePosition.before(view.render().el);
      } else {
        return this.$responseFields.append(view.render().el);
      }
    };

    BuilderView.prototype.setSortable = function() {
      if (this.$responseFields.hasClass('ui-sortable')) {
        this.$responseFields.sortable('destroy');
      }
      this.$responseFields.sortable({
        forcePlaceholderSize: true,
        placeholder: 'sortable-placeholder',
        stop: (function(_this) {
          return function(e, ui) {
            var rf;
            if (ui.item.data('field-type')) {
              rf = _this.collection.create(Formbuilder.helpers.defaultFieldAttrs(ui.item.data('field-type')), {
                $replaceEl: ui.item
              });
              _this.createAndShowEditView(rf);
            }
            _this.handleFormUpdate();
            return true;
          };
        })(this),
        update: (function(_this) {
          return function(e, ui) {
            if (!ui.item.data('field-type')) {
              return _this.ensureEditViewScrolled();
            }
          };
        })(this)
      });
      return this.setDraggable();
    };

    BuilderView.prototype.setDraggable = function() {
      var $addFieldButtons;
      $addFieldButtons = this.$el.find("[data-field-type]");
      return $addFieldButtons.draggable({
        connectToSortable: this.$responseFields,
        helper: (function(_this) {
          return function() {
            var $helper;
            $helper = $("<div class='response-field-draggable-helper' />");
            $helper.css({
              width: _this.$responseFields.width(),
              height: '80px'
            });
            return $helper;
          };
        })(this)
      });
    };

    BuilderView.prototype.addAll = function() {
      this.collection.each(this.addOne, this);
      return this.setSortable();
    };

    BuilderView.prototype.hideShowNoResponseFields = function() {
      return this.$el.find(".fb-no-response-fields")[this.collection.length > 0 ? 'hide' : 'show']();
    };

    BuilderView.prototype.addField = function(e) {
      var field_type;
      field_type = $(e.currentTarget).data('field-type');
      return this.createField(Formbuilder.helpers.defaultFieldAttrs(field_type));
    };

    BuilderView.prototype.createField = function(attrs, options) {
      var rf;
      rf = this.collection.create(attrs, options);
      this.createAndShowEditView(rf);
      return this.handleFormUpdate();
    };

    BuilderView.prototype.createAndShowEditView = function(model) {
      var $newEditEl, $responseFieldEl;
      $responseFieldEl = this.$el.find(".fb-field-wrapper").filter(function() {
        return $(this).data('cid') === model.cid;
      });
      $responseFieldEl.addClass('editing').siblings('.fb-field-wrapper').removeClass('editing');
      if (this.editView) {
        if (this.editView.model.cid === model.cid) {
          this.$el.find(".fb-tabs a[data-target=\"#editField\"]").click();
          this.scrollLeftWrapper($responseFieldEl);
          return;
        }
        this.editView.remove();
      }
      this.editView = new EditFieldView({
        model: model,
        parentView: this
      });
      $newEditEl = this.editView.render().$el;
      this.$el.find(".fb-edit-field-wrapper").html($newEditEl);
      this.$el.find(".fb-tabs a[data-target=\"#editField\"]").click();
      this.scrollLeftWrapper($responseFieldEl);
      return this;
    };

    BuilderView.prototype.ensureEditViewScrolled = function() {
      if (!this.editView) {
        return;
      }
      return this.scrollLeftWrapper($(".fb-field-wrapper.editing"));
    };

    BuilderView.prototype.scrollLeftWrapper = function($responseFieldEl) {
      this.unlockLeftWrapper();
      if (!$responseFieldEl[0]) {
        return;
      }
      return $.scrollWindowTo((this.$el.offset().top + $responseFieldEl.offset().top) - this.$responseFields.offset().top, 200, (function(_this) {
        return function() {
          return _this.lockLeftWrapper();
        };
      })(this));
    };

    BuilderView.prototype.lockLeftWrapper = function() {
      return this.$fbLeft.data('locked', true);
    };

    BuilderView.prototype.unlockLeftWrapper = function() {
      return this.$fbLeft.data('locked', false);
    };

    BuilderView.prototype.handleFormUpdate = function() {
      if (this.updatingBatch) {
        return;
      }
      this.formSaved = false;
      return this.saveFormButton.removeAttr('disabled').text(Formbuilder.options.dict.SAVE_FORM);
    };

    BuilderView.prototype.saveForm = function(e) {
      var payload;
      if (this.formSaved) {
        return;
      }
      this.formSaved = true;
      this.saveFormButton.attr('disabled', true).text(Formbuilder.options.dict.ALL_CHANGES_SAVED);
      this.collection.sort();
      payload = JSON.stringify({
        fields: this.collection.toJSON()
      });
      if (Formbuilder.options.HTTP_ENDPOINT) {
        this.doAjaxSave(payload);
      }
      return this.formBuilder.trigger('save', payload);
    };

    BuilderView.prototype.doAjaxSave = function(payload) {
      return $.ajax({
        url: Formbuilder.options.HTTP_ENDPOINT,
        type: Formbuilder.options.HTTP_METHOD,
        data: payload,
        contentType: "application/json",
        success: (function(_this) {
          return function(data) {
            var datum, _i, _len, _ref;
            _this.updatingBatch = true;
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              datum = data[_i];
              if ((_ref = _this.collection.get(datum.cid)) != null) {
                _ref.set({
                  id: datum.id
                });
              }
              _this.collection.trigger('sync');
            }
            return _this.updatingBatch = void 0;
          };
        })(this)
      });
    };

    return BuilderView;

  })(Backbone.View);

  Formbuilder = (function() {
    Formbuilder.helpers = {
      defaultFieldAttrs: function(field_type) {
        var attrs, _base;
        attrs = {};
        attrs[Formbuilder.options.mappings.LABEL] = 'Question';
        attrs[Formbuilder.options.mappings.FIELD_TYPE] = field_type;
        attrs[Formbuilder.options.mappings.REQUIRED] = true;
        attrs['field_options'] = {};
        return (typeof (_base = Formbuilder.fields[field_type]).defaultAttributes === "function" ? _base.defaultAttributes(attrs) : void 0) || attrs;
      },
      simple_format: function(x) {
        return x != null ? x.replace(/\n/g, '<br />') : void 0;
      }
    };

    Formbuilder.options = {
      BUTTON_CLASS: 'fb-button',
      HTTP_ENDPOINT: '',
      HTTP_METHOD: 'POST',
      AUTOSAVE: true,
      CLEAR_FIELD_CONFIRM: false,
      mappings: {
        SIZE: 'field_options.size',
        UNITS: 'field_options.units',
        LABEL: 'label',
        FIELD_TYPE: 'field_type',
        REQUIRED: 'required',
        ADMIN_ONLY: 'admin_only',
        OPTIONS: 'field_options.options',
        DESCRIPTION: 'field_options.description',
        INCLUDE_OTHER: 'field_options.include_other_option',
        INCLUDE_BLANK: 'field_options.include_blank_option',
        MIN: 'field_options.min',
        MAX: 'field_options.max',
        MINLENGTH: 'field_options.minlength',
        MAXLENGTH: 'field_options.maxlength',
        LENGTH_UNITS: 'field_options.min_max_length_units',
        MIN_LABEL: 'field_options.min_label',
        MAX_LABEL: 'field_options.max_label',
        VALUE: 'field_options.value',
        STEP: 'field_options.step',
        SRC: 'field_options.src',
        VALUE_NOW: 'field_options.value_now',
        INCLUDE_OTHER_VALUE: 'field_options.include_other_option_value',
        ADDRESS_VALUE: 'field_options.address_value',
        CITY_VALUE: 'field_options.city_value',
        STATE_VALUE: 'field_options.state_value',
        ZIPCODE_VALUE: 'field_options.zipcode_value',
        COUNTRY_VALUE: 'field_options.country_value',
        INCLUDE_OTHER_CHECKED: 'field_options.include_other_option_checked',
        UPLOADED_IMAGE_VALUE: 'field_options.uploaded_image_value'
      },
      dict: {
        ALL_CHANGES_SAVED: 'All changes saved',
        SAVE_FORM: 'Save form',
        UNSAVED_CHANGES: 'You have unsaved changes. If you leave this page, you will lose those changes!'
      }
    };

    Formbuilder.fields = {};

    Formbuilder.inputFields = {};

    Formbuilder.nonInputFields = {};

    Formbuilder.registerField = function(name, opts) {
      var x, _i, _len, _ref;
      _ref = ['view', 'edit'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        x = _ref[_i];
        opts[x] = _.template(opts[x]);
      }
      opts.field_type = name;
      Formbuilder.fields[name] = opts;
      if (opts.type === 'non_input') {
        return Formbuilder.nonInputFields[name] = opts;
      } else {
        return Formbuilder.inputFields[name] = opts;
      }
    };

    function Formbuilder(opts) {
      var args;
      if (opts == null) {
        opts = {};
      }
      _.extend(this, Backbone.Events);
      args = _.extend(opts, {
        formBuilder: this
      });
      this.mainView = new BuilderView(args);
    }

    return Formbuilder;

  })();

  window.Formbuilder = Formbuilder;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Formbuilder;
  } else {
    window.Formbuilder = Formbuilder;
  }

}).call(this);

(function() {
  Formbuilder.registerField('address', {
    order: 50,
    view: "<div class='input-line'>\n  <span class='street'>\n    <input type='text' value='<%= rf.get(Formbuilder.options.mappings.ADDRESS_VALUE) %>' />\n    <label>Address</label>\n  </span>\n</div>\n\n<div class='input-line'>\n  <span class='city'>\n    <input type='text' value='<%= rf.get(Formbuilder.options.mappings.CITY_VALUE) %>' />\n    <label>City</label>\n  </span>\n\n  <span class='state'>\n    <input type='text' value='<%= rf.get(Formbuilder.options.mappings.STATE_VALUE) %>' />\n    <label>State / Province / Region</label>\n  </span>\n</div>\n\n<div class='input-line'>\n  <span class='zip'>\n    <input type='text' value='<%= rf.get(Formbuilder.options.mappings.ZIPCODE_VALUE) %>' />\n    <label>Zipcode</label>\n  </span>\n\n  <span class='country'>\n    <select>\n      <option value='' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == '') ? 'selected=\"selected\"' : ''%>></option>\n      <option value='AFG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AFG') ? 'selected=\"selected\"' : '' %>>Afghanistan</option>\n      <option value='ALA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ALA') ? 'selected=\"selected\"' : '' %>>Åland Islands</option>\n      <option value='ALB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ALB') ? 'selected=\"selected\"' : '' %>>Albania</option>\n      <option value='DZA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DZA') ? 'selected=\"selected\"' : '' %>>Algeria</option>\n      <option value='ASM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ASM') ? 'selected=\"selected\"' : '' %>>American Samoa</option>\n      <option value='AND' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AND') ? 'selected=\"selected\"' : '' %>>Andorra</option>\n      <option value='AGO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AGO') ? 'selected=\"selected\"' : '' %>>Angola</option>\n      <option value='AIA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AIA') ? 'selected=\"selected\"' : '' %>>Anguilla</option>\n      <option value='ATA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ATA') ? 'selected=\"selected\"' : '' %>>Antarctica</option>\n      <option value='ATG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ATG') ? 'selected=\"selected\"' : '' %>>Antigua and Barbuda</option>\n      <option value='ARG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ARG') ? 'selected=\"selected\"' : '' %>>Argentina</option>\n      <option value='ARM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ARM') ? 'selected=\"selected\"' : '' %>>Armenia</option>\n      <option value='ABW' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ABW') ? 'selected=\"selected\"' : '' %>>Aruba</option>\n      <option value='AUS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AUS') ? 'selected=\"selected\"' : '' %>>Australia</option>\n      <option value='AUT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AUT') ? 'selected=\"selected\"' : '' %>>Austria</option>\n      <option value='AZE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'AZE') ? 'selected=\"selected\"' : '' %>>Azerbaijan</option>\n      <option value='BHS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BHS') ? 'selected=\"selected\"' : '' %>>Bahamas</option>\n      <option value='BHR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BHR') ? 'selected=\"selected\"' : '' %>>Bahrain</option>\n      <option value='BGD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BGD') ? 'selected=\"selected\"' : '' %>>Bangladesh</option>\n      <option value='BRB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BRB') ? 'selected=\"selected\"' : '' %>>Barbados</option>\n      <option value='BLR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BLR') ? 'selected=\"selected\"' : '' %>>Belarus</option>\n      <option value='BEL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BEL') ? 'selected=\"selected\"' : '' %>>Belgium</option>\n      <option value='BLZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BLZ') ? 'selected=\"selected\"' : '' %>>Belize</option>\n      <option value='BEN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BEN') ? 'selected=\"selected\"' : '' %>>Benin</option>\n      <option value='BMU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BMU') ? 'selected=\"selected\"' : '' %>>Bermuda</option>\n      <option value='BTN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BTN') ? 'selected=\"selected\"' : '' %>>Bhutan</option>\n      <option value='BOL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BOL') ? 'selected=\"selected\"' : '' %>>Bolivia, Plurinational State of</option>\n      <option value='BES' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BES') ? 'selected=\"selected\"' : '' %>>Bonaire, Sint Eustatius and Saba</option>\n      <option value='BIH' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BIH') ? 'selected=\"selected\"' : '' %>>Bosnia and Herzegovina</option>\n      <option value='BWA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BWA') ? 'selected=\"selected\"' : '' %>>Botswana</option>\n      <option value='BVT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BVT') ? 'selected=\"selected\"' : '' %>>Bouvet Island</option>\n      <option value='BRA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BRA') ? 'selected=\"selected\"' : '' %>>Brazil</option>\n      <option value='IOT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IOT') ? 'selected=\"selected\"' : '' %>>British Indian Ocean Territory</option>\n      <option value='BRN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BRN') ? 'selected=\"selected\"' : '' %>>Brunei Darussalam</option>\n      <option value='BGR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BGR') ? 'selected=\"selected\"' : '' %>>Bulgaria</option>\n      <option value='BFA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BFA') ? 'selected=\"selected\"' : '' %>>Burkina Faso</option>\n      <option value='BDI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BDI') ? 'selected=\"selected\"' : '' %>>Burundi</option>\n      <option value='KHM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KHM') ? 'selected=\"selected\"' : '' %>>Cambodia</option>\n      <option value='CMR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CMR') ? 'selected=\"selected\"' : '' %>>Cameroon</option>\n      <option value='CAN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CAN') ? 'selected=\"selected\"' : '' %>>Canada</option>\n      <option value='CPV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CPV') ? 'selected=\"selected\"' : '' %>>Cape Verde</option>\n      <option value='CYM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CYM') ? 'selected=\"selected\"' : '' %>>Cayman Islands</option>\n      <option value='CAF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CAF') ? 'selected=\"selected\"' : '' %>>Central African Republic</option>\n      <option value='TCD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TCD') ? 'selected=\"selected\"' : '' %>>Chad</option>\n      <option value='CHL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CHL') ? 'selected=\"selected\"' : '' %>>Chile</option>\n      <option value='CHN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CHN') ? 'selected=\"selected\"' : '' %>>China</option>\n      <option value='CXR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CXR') ? 'selected=\"selected\"' : '' %>>Christmas Island</option>\n      <option value='CCK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CCK') ? 'selected=\"selected\"' : '' %>>Cocos (Keeling) Islands</option>\n      <option value='COL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COL') ? 'selected=\"selected\"' : '' %>>Colombia</option>\n      <option value='COM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COM') ? 'selected=\"selected\"' : '' %>>Comoros</option>\n      <option value='COG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COG') ? 'selected=\"selected\"' : '' %>>Congo</option>\n      <option value='COD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COD') ? 'selected=\"selected\"' : '' %>>Congo, the Democratic Republic of the</option>\n      <option value='COK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'COK') ? 'selected=\"selected\"' : '' %>>Cook Islands</option>\n      <option value='CRI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CRI') ? 'selected=\"selected\"' : '' %>>Costa Rica</option>\n      <option value='CIV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CIV') ? 'selected=\"selected\"' : '' %>>Côte d'Ivoire</option>\n      <option value='HRV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HRV') ? 'selected=\"selected\"' : '' %>>Croatia</option>\n      <option value='CUB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CUB') ? 'selected=\"selected\"' : '' %>>Cuba</option>\n      <option value='CUW' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CUW') ? 'selected=\"selected\"' : '' %>>Curaçao</option>\n      <option value='CYP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CYP') ? 'selected=\"selected\"' : '' %>>Cyprus</option>\n      <option value='CZE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CZE') ? 'selected=\"selected\"' : '' %>>Czech Republic</option>\n      <option value='DNK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DNK') ? 'selected=\"selected\"' : '' %>>Denmark</option>\n      <option value='DJI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DJI') ? 'selected=\"selected\"' : '' %>>Djibouti</option>\n      <option value='DMA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DMA') ? 'selected=\"selected\"' : '' %>>Dominica</option>\n      <option value='DOM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DOM') ? 'selected=\"selected\"' : '' %>>Dominican Republic</option>\n      <option value='ECU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ECU') ? 'selected=\"selected\"' : '' %>>Ecuador</option>\n      <option value='EGY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'EGY') ? 'selected=\"selected\"' : '' %>>Egypt</option>\n      <option value='SLV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SLV') ? 'selected=\"selected\"' : '' %>>El Salvador</option>\n      <option value='GNQ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GNQ') ? 'selected=\"selected\"' : '' %>>Equatorial Guinea</option>\n      <option value='ERI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ERI') ? 'selected=\"selected\"' : '' %>>Eritrea</option>\n      <option value='EST' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'EST') ? 'selected=\"selected\"' : '' %>>Estonia</option>\n      <option value='ETH' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ETH') ? 'selected=\"selected\"' : '' %>>Ethiopia</option>\n      <option value='FLK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FLK') ? 'selected=\"selected\"' : '' %>>Falkland Islands (Malvinas)</option>\n      <option value='FRO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FRO') ? 'selected=\"selected\"' : '' %>>Faroe Islands</option>\n      <option value='FJI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FJI') ? 'selected=\"selected\"' : '' %>>Fiji</option>\n      <option value='FIN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FIN') ? 'selected=\"selected\"' : '' %>>Finland</option>\n      <option value='FRA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FRA') ? 'selected=\"selected\"' : '' %>>France</option>\n      <option value='GUF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GUF') ? 'selected=\"selected\"' : '' %>>French Guiana</option>\n      <option value='PYF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PYF') ? 'selected=\"selected\"' : '' %>>French Polynesia</option>\n      <option value='ATF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ATF') ? 'selected=\"selected\"' : '' %>>French Southern Territories</option>\n      <option value='GAB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GAB') ? 'selected=\"selected\"' : '' %>>Gabon</option>\n      <option value='GMB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GMB') ? 'selected=\"selected\"' : '' %>>Gambia</option>\n      <option value='GEO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GEO') ? 'selected=\"selected\"' : '' %>>Georgia</option>\n      <option value='DEU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'DEU') ? 'selected=\"selected\"' : '' %>>Germany</option>\n      <option value='GHA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GHA') ? 'selected=\"selected\"' : '' %>>Ghana</option>\n      <option value='GIB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GIB') ? 'selected=\"selected\"' : '' %>>Gibraltar</option>\n      <option value='GRC' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GRC') ? 'selected=\"selected\"' : '' %>>Greece</option>\n      <option value='GRL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GRL') ? 'selected=\"selected\"' : '' %>>Greenland</option>\n      <option value='GRD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GRD') ? 'selected=\"selected\"' : '' %>>Grenada</option>\n      <option value='GLP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GLP') ? 'selected=\"selected\"' : '' %>>Guadeloupe</option>\n      <option value='GUM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GUM') ? 'selected=\"selected\"' : '' %>>Guam</option>\n      <option value='GTM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GTM') ? 'selected=\"selected\"' : '' %>>Guatemala</option>\n      <option value='GGY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GGY') ? 'selected=\"selected\"' : '' %>>Guernsey</option>\n      <option value='GIN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GIN') ? 'selected=\"selected\"' : '' %>>Guinea</option>\n      <option value='GNB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GNB') ? 'selected=\"selected\"' : '' %>>Guinea-Bissau</option>\n      <option value='GUY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GUY') ? 'selected=\"selected\"' : '' %>>Guyana</option>\n      <option value='HTI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HTI') ? 'selected=\"selected\"' : '' %>>Haiti</option>\n      <option value='HMD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HMD') ? 'selected=\"selected\"' : '' %>>Heard Island and McDonald Islands</option>\n      <option value='VAT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VAT') ? 'selected=\"selected\"' : '' %>>Holy See (Vatican City State)</option>\n      <option value='HND' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HND') ? 'selected=\"selected\"' : '' %>>Honduras</option>\n      <option value='HKG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HKG') ? 'selected=\"selected\"' : '' %>>Hong Kong</option>\n      <option value='HUN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'HUN') ? 'selected=\"selected\"' : '' %>>Hungary</option>\n      <option value='ISL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ISL') ? 'selected=\"selected\"' : '' %>>Iceland</option>\n      <option value='IND' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IND') ? 'selected=\"selected\"' : '' %>>India</option>\n      <option value='IDN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IDN') ? 'selected=\"selected\"' : '' %>>Indonesia</option>\n      <option value='IRN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IRN') ? 'selected=\"selected\"' : '' %>>Iran, Islamic Republic of</option>\n      <option value='IRQ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IRQ') ? 'selected=\"selected\"' : '' %>>Iraq</option>\n      <option value='IRL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IRL') ? 'selected=\"selected\"' : '' %>>Ireland</option>\n      <option value='IMN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'IMN') ? 'selected=\"selected\"' : '' %>>Isle of Man</option>\n      <option value='ISR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ISR') ? 'selected=\"selected\"' : '' %>>Israel</option>\n      <option value='ITA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ITA') ? 'selected=\"selected\"' : '' %>>Italy</option>\n      <option value='JAM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'JAM') ? 'selected=\"selected\"' : '' %>>Jamaica</option>\n      <option value='JPN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'JPN') ? 'selected=\"selected\"' : '' %>>Japan</option>\n      <option value='JEY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'JEY') ? 'selected=\"selected\"' : '' %>>Jersey</option>\n      <option value='JOR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'JOR') ? 'selected=\"selected\"' : '' %>>Jordan</option>\n      <option value='KAZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KAZ') ? 'selected=\"selected\"' : '' %>>Kazakhstan</option>\n      <option value='KEN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KEN') ? 'selected=\"selected\"' : '' %>>Kenya</option>\n      <option value='KIR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KIR') ? 'selected=\"selected\"' : '' %>>Kiribati</option>\n      <option value='PRK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PRK') ? 'selected=\"selected\"' : '' %>>Korea, Democratic People's Republic of</option>\n      <option value='KOR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KOR') ? 'selected=\"selected\"' : '' %>>Korea, Republic of</option>\n      <option value='KWT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KWT') ? 'selected=\"selected\"' : '' %>>Kuwait</option>\n      <option value='KGZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KGZ') ? 'selected=\"selected\"' : '' %>>Kyrgyzstan</option>\n      <option value='LAO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LAO') ? 'selected=\"selected\"' : '' %>>Lao People's Democratic Republic</option>\n      <option value='LVA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LVA') ? 'selected=\"selected\"' : '' %>>Latvia</option>\n      <option value='LBN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LBN') ? 'selected=\"selected\"' : '' %>>Lebanon</option>\n      <option value='LSO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LSO') ? 'selected=\"selected\"' : '' %>>Lesotho</option>\n      <option value='LBR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LBR') ? 'selected=\"selected\"' : '' %>>Liberia</option>\n      <option value='LBY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LBY') ? 'selected=\"selected\"' : '' %>>Libya</option>\n      <option value='LIE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LIE') ? 'selected=\"selected\"' : '' %>>Liechtenstein</option>\n      <option value='LTU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LTU') ? 'selected=\"selected\"' : '' %>>Lithuania</option>\n      <option value='LUX' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LUX') ? 'selected=\"selected\"' : '' %>>Luxembourg</option>\n      <option value='MAC' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MAC') ? 'selected=\"selected\"' : '' %>>Macao</option>\n      <option value='MKD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MKD') ? 'selected=\"selected\"' : '' %>>Macedonia, the former Yugoslav Republic of</option>\n      <option value='MDG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MDG') ? 'selected=\"selected\"' : '' %>>Madagascar</option>\n      <option value='MWI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MWI') ? 'selected=\"selected\"' : '' %>>Malawi</option>\n      <option value='MYS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MYS') ? 'selected=\"selected\"' : '' %>>Malaysia</option>\n      <option value='MDV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MDV') ? 'selected=\"selected\"' : '' %>>Maldives</option>\n      <option value='MLI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MLI') ? 'selected=\"selected\"' : '' %>>Mali</option>\n      <option value='MLT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MLT') ? 'selected=\"selected\"' : '' %>>Malta</option>\n      <option value='MHL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MHL') ? 'selected=\"selected\"' : '' %>>Marshall Islands</option>\n      <option value='MTQ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MTQ') ? 'selected=\"selected\"' : '' %>>Martinique</option>\n      <option value='MRT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MRT') ? 'selected=\"selected\"' : '' %>>Mauritania</option>\n      <option value='MUS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MUS') ? 'selected=\"selected\"' : '' %>>Mauritius</option>\n      <option value='MYT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MYT') ? 'selected=\"selected\"' : '' %>>Mayotte</option>\n      <option value='MEX' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MEX') ? 'selected=\"selected\"' : '' %>>Mexico</option>\n      <option value='FSM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'FSM') ? 'selected=\"selected\"' : '' %>>Micronesia, Federated States of</option>\n      <option value='MDA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MDA') ? 'selected=\"selected\"' : '' %>>Moldova, Republic of</option>\n      <option value='MCO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MCO') ? 'selected=\"selected\"' : '' %>>Monaco</option>\n      <option value='MNG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MNG') ? 'selected=\"selected\"' : '' %>>Mongolia</option>\n      <option value='MNE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MNE') ? 'selected=\"selected\"' : '' %>>Montenegro</option>\n      <option value='MSR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MSR') ? 'selected=\"selected\"' : '' %>>Montserrat</option>\n      <option value='MAR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MAR') ? 'selected=\"selected\"' : '' %>>Morocco</option>\n      <option value='MOZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MOZ') ? 'selected=\"selected\"' : '' %>>Mozambique</option>\n      <option value='MMR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MMR') ? 'selected=\"selected\"' : '' %>>Myanmar</option>\n      <option value='NAM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NAM') ? 'selected=\"selected\"' : '' %>>Namibia</option>\n      <option value='NRU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NRU') ? 'selected=\"selected\"' : '' %>>Nauru</option>\n      <option value='NPL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NPL') ? 'selected=\"selected\"' : '' %>>Nepal</option>\n      <option value='NLD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NLD') ? 'selected=\"selected\"' : '' %>>Netherlands</option>\n      <option value='NCL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NCL') ? 'selected=\"selected\"' : '' %>>New Caledonia</option>\n      <option value='NZL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NZL') ? 'selected=\"selected\"' : '' %>>New Zealand</option>\n      <option value='NIC' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NIC') ? 'selected=\"selected\"' : '' %>>Nicaragua</option>\n      <option value='NER' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NER') ? 'selected=\"selected\"' : '' %>>Niger</option>\n      <option value='NGA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NGA') ? 'selected=\"selected\"' : '' %>>Nigeria</option>\n      <option value='NIU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NIU') ? 'selected=\"selected\"' : '' %>>Niue</option>\n      <option value='NFK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NFK') ? 'selected=\"selected\"' : '' %>>Norfolk Island</option>\n      <option value='MNP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MNP') ? 'selected=\"selected\"' : '' %>>Northern Mariana Islands</option>\n      <option value='NOR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'NOR') ? 'selected=\"selected\"' : '' %>>Norway</option>\n      <option value='OMN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'OMN') ? 'selected=\"selected\"' : '' %>>Oman</option>\n      <option value='PAK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PAK') ? 'selected=\"selected\"' : '' %>>Pakistan</option>\n      <option value='PLW' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PLW') ? 'selected=\"selected\"' : '' %>>Palau</option>\n      <option value='PSE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PSE') ? 'selected=\"selected\"' : '' %>>Palestinian Territory, Occupied</option>\n      <option value='PAN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PAN') ? 'selected=\"selected\"' : '' %>>Panama</option>\n      <option value='PNG' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PNG') ? 'selected=\"selected\"' : '' %>>Papua New Guinea</option>\n      <option value='PRY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PRY') ? 'selected=\"selected\"' : '' %>>Paraguay</option>\n      <option value='PER' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PER') ? 'selected=\"selected\"' : '' %>>Peru</option>\n      <option value='PHL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PHL') ? 'selected=\"selected\"' : '' %>>Philippines</option>\n      <option value='PCN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PCN') ? 'selected=\"selected\"' : '' %>>Pitcairn</option>\n      <option value='POL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'POL') ? 'selected=\"selected\"' : '' %>>Poland</option>\n      <option value='PRT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PRT') ? 'selected=\"selected\"' : '' %>>Portugal</option>\n      <option value='PRI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'PRI') ? 'selected=\"selected\"' : '' %>>Puerto Rico</option>\n      <option value='QAT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'QAT') ? 'selected=\"selected\"' : '' %>>Qatar</option>\n      <option value='REU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'REU') ? 'selected=\"selected\"' : '' %>>Réunion</option>\n      <option value='ROU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ROU') ? 'selected=\"selected\"' : '' %>>Romania</option>\n      <option value='RUS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'RUS') ? 'selected=\"selected\"' : '' %>>Russian Federation</option>\n      <option value='RWA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'RWA') ? 'selected=\"selected\"' : '' %>>Rwanda</option>\n      <option value='BLM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'BLM') ? 'selected=\"selected\"' : '' %>>Saint Barthélemy</option>\n      <option value='SHN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SHN') ? 'selected=\"selected\"' : '' %>>Saint Helena, Ascension and Tristan da Cunha</option>\n      <option value='KNA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'KNA') ? 'selected=\"selected\"' : '' %>>Saint Kitts and Nevis</option>\n      <option value='LCA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LCA') ? 'selected=\"selected\"' : '' %>>Saint Lucia</option>\n      <option value='MAF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'MAF') ? 'selected=\"selected\"' : '' %>>Saint Martin (French part)</option>\n      <option value='SPM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SPM') ? 'selected=\"selected\"' : '' %>>Saint Pierre and Miquelon</option>\n      <option value='VCT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VCT') ? 'selected=\"selected\"' : '' %>>Saint Vincent and the Grenadines</option>\n      <option value='WSM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'WSM') ? 'selected=\"selected\"' : '' %>>Samoa</option>\n      <option value='SMR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SMR') ? 'selected=\"selected\"' : '' %>>San Marino</option>\n      <option value='STP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'STP') ? 'selected=\"selected\"' : '' %>>Sao Tome and Principe</option>\n      <option value='SAU' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SAU') ? 'selected=\"selected\"' : '' %>>Saudi Arabia</option>\n      <option value='SEN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SEN') ? 'selected=\"selected\"' : '' %>>Senegal</option>\n      <option value='SRB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SRB') ? 'selected=\"selected\"' : '' %>>Serbia</option>\n      <option value='SYC' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SYC') ? 'selected=\"selected\"' : '' %>>Seychelles</option>\n      <option value='SLE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SLE') ? 'selected=\"selected\"' : '' %>>Sierra Leone</option>\n      <option value='SGP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SGP') ? 'selected=\"selected\"' : '' %>>Singapore</option>\n      <option value='SXM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SXM') ? 'selected=\"selected\"' : '' %>>Sint Maarten (Dutch part)</option>\n      <option value='SVK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SVK') ? 'selected=\"selected\"' : '' %>>Slovakia</option>\n      <option value='SVN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SVN') ? 'selected=\"selected\"' : '' %>>Slovenia</option>\n      <option value='SLB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SLB') ? 'selected=\"selected\"' : '' %>>Solomon Islands</option>\n      <option value='SOM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SOM') ? 'selected=\"selected\"' : '' %>>Somalia</option>\n      <option value='ZAF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ZAF') ? 'selected=\"selected\"' : '' %>>South Africa</option>\n      <option value='SGS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SGS') ? 'selected=\"selected\"' : '' %>>South Georgia and the South Sandwich Islands</option>\n      <option value='SSD' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SSD') ? 'selected=\"selected\"' : '' %>>South Sudan</option>\n      <option value='ESP' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ESP') ? 'selected=\"selected\"' : '' %>>Spain</option>\n      <option value='LKA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'LKA') ? 'selected=\"selected\"' : '' %>>Sri Lanka</option>\n      <option value='SDN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SDN') ? 'selected=\"selected\"' : '' %>>Sudan</option>\n      <option value='SUR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SUR') ? 'selected=\"selected\"' : '' %>>Suriname</option>\n      <option value='SJM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SJM') ? 'selected=\"selected\"' : '' %>>Svalbard and Jan Mayen</option>\n      <option value='SWZ' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SWZ') ? 'selected=\"selected\"' : '' %>>Swaziland</option>\n      <option value='SWE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SWE') ? 'selected=\"selected\"' : '' %>>Sweden</option>\n      <option value='CHE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'CHE') ? 'selected=\"selected\"' : '' %>>Switzerland</option>\n      <option value='SYR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'SYR') ? 'selected=\"selected\"' : '' %>>Syrian Arab Republic</option>\n      <option value='TWN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TWN') ? 'selected=\"selected\"' : '' %>>Taiwan, Province of China</option>\n      <option value='TJK' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TJK') ? 'selected=\"selected\"' : '' %>>Tajikistan</option>\n      <option value='TZA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TZA') ? 'selected=\"selected\"' : '' %>>Tanzania, United Republic of</option>\n      <option value='THA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'THA') ? 'selected=\"selected\"' : '' %>>Thailand</option>\n      <option value='TLS' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TLS') ? 'selected=\"selected\"' : '' %>>Timor-Leste</option>\n      <option value='TGO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TGO') ? 'selected=\"selected\"' : '' %>>Togo</option>\n      <option value='TKL' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TKL') ? 'selected=\"selected\"' : '' %>>Tokelau</option>\n      <option value='TON' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TON') ? 'selected=\"selected\"' : '' %>>Tonga</option>\n      <option value='TTO' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TTO') ? 'selected=\"selected\"' : '' %>>Trinidad and Tobago</option>\n      <option value='TUN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TUN') ? 'selected=\"selected\"' : '' %>>Tunisia</option>\n      <option value='TUR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TUR') ? 'selected=\"selected\"' : '' %>>Turkey</option>\n      <option value='TKM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TKM') ? 'selected=\"selected\"' : '' %>>Turkmenistan</option>\n      <option value='TCA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TCA') ? 'selected=\"selected\"' : '' %>>Turks and Caicos Islands</option>\n      <option value='TUV' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'TUV') ? 'selected=\"selected\"' : '' %>>Tuvalu</option>\n      <option value='UGA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'UGA') ? 'selected=\"selected\"' : '' %>>Uganda</option>\n      <option value='UKR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'UKR') ? 'selected=\"selected\"' : '' %>>Ukraine</option>\n      <option value='ARE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ARE') ? 'selected=\"selected\"' : '' %>>United Arab Emirates</option>\n      <option value='GBR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'GBR') ? 'selected=\"selected\"' : '' %>>United Kingdom</option>\n      <option value='USA' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'USA') ? 'selected=\"selected\"' : '' %>>United States</option>\n      <option value='UMI' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'UMI') ? 'selected=\"selected\"' : '' %>>United States Minor Outlying Islands</option>\n      <option value='URY' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'URY') ? 'selected=\"selected\"' : '' %>>Uruguay</option>\n      <option value='UZB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'UZB') ? 'selected=\"selected\"' : '' %>>Uzbekistan</option>\n      <option value='VUT' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VUT') ? 'selected=\"selected\"' : '' %>>Vanuatu</option>\n      <option value='VEN' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VEN') ? 'selected=\"selected\"' : '' %>>Venezuela, Bolivarian Republic of</option>\n      <option value='VNM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VNM') ? 'selected=\"selected\"' : '' %>>Viet Nam</option>\n      <option value='VGB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VGB') ? 'selected=\"selected\"' : '' %>>Virgin Islands, British</option>\n      <option value='VIR' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'VIR') ? 'selected=\"selected\"' : '' %>>Virgin Islands, U.S.</option>\n      <option value='WLF' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'WLF') ? 'selected=\"selected\"' : '' %>>Wallis and Futuna</option>\n      <option value='ESH' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ESH') ? 'selected=\"selected\"' : '' %>>Western Sahara</option>\n      <option value='YEM' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'YEM') ? 'selected=\"selected\"' : '' %>>Yemen</option>\n      <option value='ZMB' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ZMB') ? 'selected=\"selected\"' : '' %>>Zambia</option>\n      <option value='ZWE' <%=(rf.get(Formbuilder.options.mappings.COUNTRY_VALUE) == 'ZWE') ? 'selected=\"selected\"' : '' %>>Zimbabwe</option>\n    </select>\n    <label>Country</label>\n  </span>\n</div>",
    edit: "<%= Formbuilder.templates['edit/address_values']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-home\"></span></span> Address"
  });

}).call(this);

(function() {
  Formbuilder.registerField('checkboxes', {
    order: 10,
    view: "<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <input type='checkbox' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </label>\n  </div>\n<% } %>\n\n<% if (rf.get(Formbuilder.options.mappings.INCLUDE_OTHER)) { %>\n  <div class='other-option'>\n    <label class='fb-option'>\n      <input type='checkbox' <%= rf.get(Formbuilder.options.mappings.INCLUDE_OTHER_CHECKED) && 'checked' %> />\n      Other\n    </label>\n\n    <input type='text' value='<%= rf.get(Formbuilder.options.mappings.INCLUDE_OTHER_VALUE) %>'/>\n  </div>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/options']({ includeOther: true }) %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-square-o\"></span></span> Multiple Choice",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: "",
          checked: false
        }, {
          label: "",
          checked: false
        }
      ];
      attrs.field_options.include_other_option_value = '';
      attrs.field_options.include_other_option_checked = false;
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('date', {
    order: 20,
    view: "<% var date = rf.get(Formbuilder.options.mappings.VALUE), dateparts = date.split('|'); %>\n<div class='input-line'>\n  <span class='month'>\n    <input type=\"text\" value='<%= (dateparts[0] > 12 || dateparts[0] < 1) ? ((dateparts[0] > 12) ? '12' : '1') : dateparts[0] %>'/>\n    <label>MM</label>\n  </span>\n\n  <span class='above-line'>/</span>\n\n  <span class='day'>\n    <input type=\"text\" value=\"<%= (dateparts[1] > 31 || dateparts[1] < 1) ? ((dateparts[1] > 31) ? '31' : '1') : dateparts[1] %>\"/>\n    <label>DD</label>\n  </span>\n\n  <span class='above-line'>/</span>\n\n  <span class='year'>\n    <input type=\"text\" value=\"<%= (dateparts[2] < 1) ? '1' : dateparts[2] %>\"/>\n    <label>YY</label>\n  </span>\n</div>",
    edit: "<%= Formbuilder.templates['edit/value']() %>\n<%= Formbuilder.templates['edit/value_now']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-calendar\"></span></span> Date",
    defaultAttributes: function(attrs) {
      attrs.field_options.value = 'MM | DD | YY';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('dropdown', {
    order: 24,
    view: "<select>\n  <% if (rf.get(Formbuilder.options.mappings.INCLUDE_BLANK)) { %>\n    <option value=''></option>\n  <% } %>\n\n  <% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n    <option <%= (rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked ? 'selected=\"selected\"' : '') %>>\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </option>\n  <% } %>\n</select>",
    edit: "<%= Formbuilder.templates['edit/options']({ includeBlank: true }) %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-caret-down\"></span></span> Dropdown",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: "",
          checked: false
        }, {
          label: "",
          checked: false
        }
      ];
      attrs.field_options.include_blank_option = false;
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('email', {
    order: 40,
    view: "<input type='text' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' value='<%= rf.get(Formbuilder.options.mappings.VALUE) %>' />",
    edit: "<%= Formbuilder.templates['edit/value']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-envelope-o\"></span></span> Email",
    defaultAttributes: function(attrs) {
      attrs.field_options.value = '';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('file', {
    order: 40,
    view: "<input type='file' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' />",
    edit: "",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-file-o\"></span></span> File",
    defaultAttributes: function(attrs) {
      attrs.field_options.value = '';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('gallery', {
    order: 40,
    view: "<input type='file' />\n<button href='#'>Gallery</button>\n<div>\n  <% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n    <img src=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].src %>\" alt=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\" width=\"100\"/>\n  <% } %>\n</div>",
    edit: "<%= Formbuilder.templates['edit/gallery_images']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-image\"></span></span> Gallery",
    defaultAttributes: function(attrs) {
      attrs.field_options.uploaded_image_value = '';
      attrs.field_options.options = [
        {
          label: "GRUPOIMPULSA",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery1.jpg"
        }, {
          label: "ONLY",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery2.jpg"
        }, {
          label: "JAMES GEORGE",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery3.jpg"
        }, {
          label: "MOXI",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery4.jpg"
        }, {
          label: "NOOR ARCHITECT STUDIO",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery5.jpg"
        }, {
          label: "BOCANA",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery6.jpg"
        }, {
          label: "LAAND",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery7.jpg"
        }, {
          label: "ECO CHEFS",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery8.jpg"
        }, {
          label: "SCHHOL OF FASHION INDUSTRY",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery9.jpg"
        }, {
          label: "Sparkling Brain",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery10.jpg"
        }, {
          label: "TEA BAR",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery11.jpg"
        }, {
          label: "BLUE BLUE BERRY",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery12.jpg"
        }, {
          label: "WHITE BUDDHA",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery13.jpg"
        }, {
          label: "little wren",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery14.jpg"
        }, {
          label: "24TH SINGAPORE INTERNATIONAL FILM FESTIVAL",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery15.jpg"
        }, {
          label: "ENFANT",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery16.jpg"
        }, {
          label: "Sample Logo",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery17.jpg"
        }, {
          label: "SAN ANTONIO TENNIS ASSOCIATION",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery18.jpg"
        }, {
          label: "ATE NEO",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery19.jpg"
        }, {
          label: "WINE after COFFEE",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery20.jpg"
        }, {
          label: "MO TEZ",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery21.jpg"
        }, {
          label: "Upp",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery22.jpg"
        }, {
          label: "MARK",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery23.jpg"
        }, {
          label: "BOOSTER",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery24.jpg"
        }, {
          label: "STORM FOUNDRY",
          checked: false,
          src: "http://marquee.me/images/logo_samples/logo_gallery25.jpg"
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('image_checkboxes', {
    order: 10,
    view: "<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <img src=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].src %>\" alt=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\" />\n      <input type='checkbox' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </label>\n  </div>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/image_checkboxes_options']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-th\"></span></span> Image Question",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: "Batman",
          checked: false,
          src: "https://c1.staticflickr.com/3/2122/2257283078_a22a5c7be7_b.jpg"
        }, {
          label: "Superman",
          checked: false,
          src: "https://c1.staticflickr.com/1/31/37271521_47df0e4547_b.jpg"
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('number', {
    order: 30,
    view: "<input type='number' value=\"<%= rf.get(Formbuilder.options.mappings.VALUE) %>\"\n  min=\"<%= rf.get(Formbuilder.options.mappings.MIN) %>\"\n  max=\"<%= rf.get(Formbuilder.options.mappings.MAX) %>\"\n  step=\"<%= rf.get(Formbuilder.options.mappings.STEP) %>\" />\n<% if (units = rf.get(Formbuilder.options.mappings.UNITS)) { %>\n  <%= units %>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/min_max']() %>\n<%= Formbuilder.templates['edit/units']() %>\n<%= Formbuilder.templates['edit/value']() %>\n<%= Formbuilder.templates['edit/step']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-number\">123</span></span> Number",
    defaultAttributes: function(attrs) {
      attrs.field_options.min = 0;
      attrs.field_options.max = 10000;
      attrs.field_options.value = 0;
      attrs.field_options.units = '';
      attrs.field_options.step = 0.01;
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('paragraph', {
    order: 5,
    view: "<textarea class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>'><%= rf.get(Formbuilder.options.mappings.VALUE) %></textarea>",
    edit: "<%= Formbuilder.templates['edit/min_max_length']() %>\n<%= Formbuilder.templates['edit/value']() %>",
    addButton: "<span class=\"symbol\">&#182;</span> Long Answer",
    defaultAttributes: function(attrs) {
      attrs.field_options.value = '';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('price', {
    order: 45,
    view: "<% if (units = rf.get(Formbuilder.options.mappings.UNITS)) { %>\n  <%= units %>\n<% } %>\n<input type='number' value='<%= rf.get(Formbuilder.options.mappings.VALUE) %>'/>",
    edit: "<%= Formbuilder.templates['edit/units']() %>\n<%= Formbuilder.templates['edit/value']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-usd\"></span></span> Price",
    defaultAttributes: function(attrs) {
      attrs.field_options.units = "$";
      attrs.field_options.value = '';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('radio', {
    order: 15,
    view: "<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <label class='fb-option'>\n      <input type='radio' <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].checked && 'checked' %> onclick=\"javascript: return false;\" />\n      <%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].label %>\n    </label>\n  </div>\n<% } %>\n\n<% if (rf.get(Formbuilder.options.mappings.INCLUDE_OTHER)) { %>\n  <div class='other-option'>\n    <label class='fb-option'>\n      <input type='radio'  <%= rf.get(Formbuilder.options.mappings.INCLUDE_OTHER_CHECKED) && 'checked' %> />\n      Other\n    </label>\n\n    <input type='text' value='<%= rf.get(Formbuilder.options.mappings.INCLUDE_OTHER_VALUE) %>'/>\n  </div>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/options']({ includeOther: true }) %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-circle-o\"></span></span> Multiple Choice",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          label: "",
          checked: false
        }, {
          label: "",
          checked: false
        }
      ];
      attrs.field_options.include_other_option_value = '';
      attrs.field_options.include_other_option_checked = false;
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('range', {
    order: 40,
    view: "<% if (rf.get(Formbuilder.options.mappings.MIN_LABEL)) { %>\n    <span><%= rf.get(Formbuilder.options.mappings.MIN_LABEL) %></span>\n<% } %>\n<input type='range' value=\"<%= rf.get(Formbuilder.options.mappings.VALUE) %>\" min=\"<%= rf.get(Formbuilder.options.mappings.MIN) %>\" max=\"<%= rf.get(Formbuilder.options.mappings.MAX) %>\" />\n<% if (rf.get(Formbuilder.options.mappings.MAX_LABEL)) { %>\n    <span><%= rf.get(Formbuilder.options.mappings.MAX_LABEL) %></span>\n<% } %>",
    edit: "<%= Formbuilder.templates['edit/min_max']() %>\n<%= Formbuilder.templates['edit/min_max_labels']() %>\n<%= Formbuilder.templates['edit/value']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-arrows-h\"></span></span> Range",
    defaultAttributes: function(attrs) {
      attrs.field_options.min_label = "least";
      attrs.field_options.min = 0;
      attrs.field_options.max_label = "most";
      attrs.field_options.max = 10;
      attrs.field_options.value = 5;
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('range_group', {
    order: 40,
    view: "<% for (i in (rf.get(Formbuilder.options.mappings.OPTIONS) || [])) { %>\n  <div>\n    <% if (rf.get(Formbuilder.options.mappings.OPTIONS)[i].min_label) { %>\n        <span><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].min_label %></span>\n    <% } %>\n    <input type='range' value=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].value %>\"\n            min=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].min %>\"\n            max=\"<%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].max %>\" />\n    <% if (rf.get(Formbuilder.options.mappings.OPTIONS)[i].max_label) { %>\n        <span><%= rf.get(Formbuilder.options.mappings.OPTIONS)[i].max_label %></span>\n    <% } %>\n  </div>\n<% } %>\n",
    edit: "<%= Formbuilder.templates['edit/range_group_options']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-sliders\"></span></span> Range Group",
    defaultAttributes: function(attrs) {
      attrs.field_options.options = [
        {
          min_label: "least",
          min: 0,
          max_label: "most",
          max: 10,
          value: 5
        }, {
          min_label: "min_label",
          min_label: "worst",
          min: 0,
          max_label: "best",
          max: 10,
          value: 5
        }
      ];
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('section_break', {
    order: 0,
    type: 'non_input',
    view: "<hr/>",
    edit: "",
    addButton: "<span class='symbol'><span class='fa fa-minus'></span></span> Section Break",
    defaultAttributes: function(attrs) {
      attrs.label = 'Section Break';
      attrs.required = false;
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('text', {
    order: 0,
    view: "<input type='text' class='rf-size-<%= rf.get(Formbuilder.options.mappings.SIZE) %>' value='<%= rf.get(Formbuilder.options.mappings.VALUE) %>' />",
    edit: "<%= Formbuilder.templates['edit/size']() %>\n<%= Formbuilder.templates['edit/value']() %>\n<%= Formbuilder.templates['edit/min_max_length']() %>",
    addButton: "<span class='symbol'><span class='fa fa-font'></span></span> Short Answer",
    defaultAttributes: function(attrs) {
      attrs.field_options.size = 'small';
      attrs.field_options.value = '';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('time', {
    order: 25,
    view: "<% var time = rf.get(Formbuilder.options.mappings.VALUE), timeparts = time.split(/[ :]+/); %>\n<div class='input-line'>\n  <span class='hours'>\n    <input type=\"text\" value='<%= (timeparts[0] > 12 || timeparts[0] < 1) ? ((timeparts[0] > 12) ? '12' : '1') : timeparts[0] %>'/>\n    <label>HH</label>\n  </span>\n\n  <span class='above-line'>:</span>\n\n  <span class='minutes'>\n    <input type=\"text\" value='<%= (timeparts[1] > 60 || timeparts[1] < 0) ? ((timeparts[1] > 60) ? '60' : '0') : timeparts[1] %>'/>\n    <label>MM</label>\n  </span>\n\n  <span class='above-line'>:</span>\n\n  <span class='seconds'>\n    <input type=\"text\" value='<%= (timeparts[2] > 60 || timeparts[2] < 0) ? ((timeparts[2] > 60) ? '60' : '0') : timeparts[2] %>'/>\n    <label>SS</label>\n  </span>\n\n  <span class='am_pm'>\n    <select>\n      <option <%= (timeparts[3] == 'AM') ? 'selected=\"selected\"' : '' %> >AM</option>\n      <option <%= (timeparts[3] == 'PM') ? 'selected=\"selected\"' : '' %> >PM</option>\n    </select>\n  </span>\n</div>",
    edit: "<%= Formbuilder.templates['edit/value']() %>\n<%= Formbuilder.templates['edit/value_now']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-clock-o\"></span></span> Time",
    defaultAttributes: function(attrs) {
      attrs.field_options.value = 'HH:MM:SS AA';
      return attrs;
    }
  });

}).call(this);

(function() {
  Formbuilder.registerField('website', {
    order: 35,
    view: "<input type='text' placeholder='http://' value='<%= rf.get(Formbuilder.options.mappings.VALUE) %>' />",
    edit: "<%= Formbuilder.templates['edit/value']() %>",
    addButton: "<span class=\"symbol\"><span class=\"fa fa-link\"></span></span> Website"
  });

}).call(this);

this["Formbuilder"] = this["Formbuilder"] || {};
this["Formbuilder"]["templates"] = this["Formbuilder"]["templates"] || {};

this["Formbuilder"]["templates"]["edit/address_values"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Default values</div>\r\n\r\n<div>\r\n    <label>Address</label>\r\n    <input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.ADDRESS_VALUE )) == null ? '' : __t) +
'" />\r\n</div>\r\n\r\n<div>\r\n    <label>City</label>\r\n    <input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.CITY_VALUE )) == null ? '' : __t) +
'" />\r\n</div>\r\n\r\n<div>\r\n    <label>State</label>\r\n    <input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.STATE_VALUE )) == null ? '' : __t) +
'" />\r\n</div>\r\n\r\n<div>\r\n    <label>Zipcode</label>\r\n    <input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.ZIPCODE_VALUE )) == null ? '' : __t) +
'" />\r\n</div>\r\n\r\n<div>\r\n    <label>Country</label>\r\n    <select data-rv-value="model.' +
((__t = ( Formbuilder.options.mappings.COUNTRY_VALUE )) == null ? '' : __t) +
'">\r\n        <option value=""></option>\r\n        <option value="AFG">Afghanistan</option>\r\n        <option value="ALA">Åland Islands</option>\r\n        <option value="ALB">Albania</option>\r\n        <option value="DZA">Algeria</option>\r\n        <option value="ASM">American Samoa</option>\r\n        <option value="AND">Andorra</option>\r\n        <option value="AGO">Angola</option>\r\n        <option value="AIA">Anguilla</option>\r\n        <option value="ATA">Antarctica</option>\r\n        <option value="ATG">Antigua and Barbuda</option>\r\n        <option value="ARG">Argentina</option>\r\n        <option value="ARM">Armenia</option>\r\n        <option value="ABW">Aruba</option>\r\n        <option value="AUS">Australia</option>\r\n        <option value="AUT">Austria</option>\r\n        <option value="AZE">Azerbaijan</option>\r\n        <option value="BHS">Bahamas</option>\r\n        <option value="BHR">Bahrain</option>\r\n        <option value="BGD">Bangladesh</option>\r\n        <option value="BRB">Barbados</option>\r\n        <option value="BLR">Belarus</option>\r\n        <option value="BEL">Belgium</option>\r\n        <option value="BLZ">Belize</option>\r\n        <option value="BEN">Benin</option>\r\n        <option value="BMU">Bermuda</option>\r\n        <option value="BTN">Bhutan</option>\r\n        <option value="BOL">Bolivia, Plurinational State of</option>\r\n        <option value="BES">Bonaire, Sint Eustatius and Saba</option>\r\n        <option value="BIH">Bosnia and Herzegovina</option>\r\n        <option value="BWA">Botswana</option>\r\n        <option value="BVT">Bouvet Island</option>\r\n        <option value="BRA">Brazil</option>\r\n        <option value="IOT">British Indian Ocean Territory</option>\r\n        <option value="BRN">Brunei Darussalam</option>\r\n        <option value="BGR">Bulgaria</option>\r\n        <option value="BFA">Burkina Faso</option>\r\n        <option value="BDI">Burundi</option>\r\n        <option value="KHM">Cambodia</option>\r\n        <option value="CMR">Cameroon</option>\r\n        <option value="CAN">Canada</option>\r\n        <option value="CPV">Cape Verde</option>\r\n        <option value="CYM">Cayman Islands</option>\r\n        <option value="CAF">Central African Republic</option>\r\n        <option value="TCD">Chad</option>\r\n        <option value="CHL">Chile</option>\r\n        <option value="CHN">China</option>\r\n        <option value="CXR">Christmas Island</option>\r\n        <option value="CCK">Cocos (Keeling) Islands</option>\r\n        <option value="COL">Colombia</option>\r\n        <option value="COM">Comoros</option>\r\n        <option value="COG">Congo</option>\r\n        <option value="COD">Congo, the Democratic Republic of the</option>\r\n        <option value="COK">Cook Islands</option>\r\n        <option value="CRI">Costa Rica</option>\r\n        <option value="CIV">Côte d\'Ivoire</option>\r\n        <option value="HRV">Croatia</option>\r\n        <option value="CUB">Cuba</option>\r\n        <option value="CUW">Curaçao</option>\r\n        <option value="CYP">Cyprus</option>\r\n        <option value="CZE">Czech Republic</option>\r\n        <option value="DNK">Denmark</option>\r\n        <option value="DJI">Djibouti</option>\r\n        <option value="DMA">Dominica</option>\r\n        <option value="DOM">Dominican Republic</option>\r\n        <option value="ECU">Ecuador</option>\r\n        <option value="EGY">Egypt</option>\r\n        <option value="SLV">El Salvador</option>\r\n        <option value="GNQ">Equatorial Guinea</option>\r\n        <option value="ERI">Eritrea</option>\r\n        <option value="EST">Estonia</option>\r\n        <option value="ETH">Ethiopia</option>\r\n        <option value="FLK">Falkland Islands (Malvinas)</option>\r\n        <option value="FRO">Faroe Islands</option>\r\n        <option value="FJI">Fiji</option>\r\n        <option value="FIN">Finland</option>\r\n        <option value="FRA">France</option>\r\n        <option value="GUF">French Guiana</option>\r\n        <option value="PYF">French Polynesia</option>\r\n        <option value="ATF">French Southern Territories</option>\r\n        <option value="GAB">Gabon</option>\r\n        <option value="GMB">Gambia</option>\r\n        <option value="GEO">Georgia</option>\r\n        <option value="DEU">Germany</option>\r\n        <option value="GHA">Ghana</option>\r\n        <option value="GIB">Gibraltar</option>\r\n        <option value="GRC">Greece</option>\r\n        <option value="GRL">Greenland</option>\r\n        <option value="GRD">Grenada</option>\r\n        <option value="GLP">Guadeloupe</option>\r\n        <option value="GUM">Guam</option>\r\n        <option value="GTM">Guatemala</option>\r\n        <option value="GGY">Guernsey</option>\r\n        <option value="GIN">Guinea</option>\r\n        <option value="GNB">Guinea-Bissau</option>\r\n        <option value="GUY">Guyana</option>\r\n        <option value="HTI">Haiti</option>\r\n        <option value="HMD">Heard Island and McDonald Islands</option>\r\n        <option value="VAT">Holy See (Vatican City State)</option>\r\n        <option value="HND">Honduras</option>\r\n        <option value="HKG">Hong Kong</option>\r\n        <option value="HUN">Hungary</option>\r\n        <option value="ISL">Iceland</option>\r\n        <option value="IND">India</option>\r\n        <option value="IDN">Indonesia</option>\r\n        <option value="IRN">Iran, Islamic Republic of</option>\r\n        <option value="IRQ">Iraq</option>\r\n        <option value="IRL">Ireland</option>\r\n        <option value="IMN">Isle of Man</option>\r\n        <option value="ISR">Israel</option>\r\n        <option value="ITA">Italy</option>\r\n        <option value="JAM">Jamaica</option>\r\n        <option value="JPN">Japan</option>\r\n        <option value="JEY">Jersey</option>\r\n        <option value="JOR">Jordan</option>\r\n        <option value="KAZ">Kazakhstan</option>\r\n        <option value="KEN">Kenya</option>\r\n        <option value="KIR">Kiribati</option>\r\n        <option value="PRK">Korea, Democratic People\'s Republic of</option>\r\n        <option value="KOR">Korea, Republic of</option>\r\n        <option value="KWT">Kuwait</option>\r\n        <option value="KGZ">Kyrgyzstan</option>\r\n        <option value="LAO">Lao People\'s Democratic Republic</option>\r\n        <option value="LVA">Latvia</option>\r\n        <option value="LBN">Lebanon</option>\r\n        <option value="LSO">Lesotho</option>\r\n        <option value="LBR">Liberia</option>\r\n        <option value="LBY">Libya</option>\r\n        <option value="LIE">Liechtenstein</option>\r\n        <option value="LTU">Lithuania</option>\r\n        <option value="LUX">Luxembourg</option>\r\n        <option value="MAC">Macao</option>\r\n        <option value="MKD">Macedonia, the former Yugoslav Republic of</option>\r\n        <option value="MDG">Madagascar</option>\r\n        <option value="MWI">Malawi</option>\r\n        <option value="MYS">Malaysia</option>\r\n        <option value="MDV">Maldives</option>\r\n        <option value="MLI">Mali</option>\r\n        <option value="MLT">Malta</option>\r\n        <option value="MHL">Marshall Islands</option>\r\n        <option value="MTQ">Martinique</option>\r\n        <option value="MRT">Mauritania</option>\r\n        <option value="MUS">Mauritius</option>\r\n        <option value="MYT">Mayotte</option>\r\n        <option value="MEX">Mexico</option>\r\n        <option value="FSM">Micronesia, Federated States of</option>\r\n        <option value="MDA">Moldova, Republic of</option>\r\n        <option value="MCO">Monaco</option>\r\n        <option value="MNG">Mongolia</option>\r\n        <option value="MNE">Montenegro</option>\r\n        <option value="MSR">Montserrat</option>\r\n        <option value="MAR">Morocco</option>\r\n        <option value="MOZ">Mozambique</option>\r\n        <option value="MMR">Myanmar</option>\r\n        <option value="NAM">Namibia</option>\r\n        <option value="NRU">Nauru</option>\r\n        <option value="NPL">Nepal</option>\r\n        <option value="NLD">Netherlands</option>\r\n        <option value="NCL">New Caledonia</option>\r\n        <option value="NZL">New Zealand</option>\r\n        <option value="NIC">Nicaragua</option>\r\n        <option value="NER">Niger</option>\r\n        <option value="NGA">Nigeria</option>\r\n        <option value="NIU">Niue</option>\r\n        <option value="NFK">Norfolk Island</option>\r\n        <option value="MNP">Northern Mariana Islands</option>\r\n        <option value="NOR">Norway</option>\r\n        <option value="OMN">Oman</option>\r\n        <option value="PAK">Pakistan</option>\r\n        <option value="PLW">Palau</option>\r\n        <option value="PSE">Palestinian Territory, Occupied</option>\r\n        <option value="PAN">Panama</option>\r\n        <option value="PNG">Papua New Guinea</option>\r\n        <option value="PRY">Paraguay</option>\r\n        <option value="PER">Peru</option>\r\n        <option value="PHL">Philippines</option>\r\n        <option value="PCN">Pitcairn</option>\r\n        <option value="POL">Poland</option>\r\n        <option value="PRT">Portugal</option>\r\n        <option value="PRI">Puerto Rico</option>\r\n        <option value="QAT">Qatar</option>\r\n        <option value="REU">Réunion</option>\r\n        <option value="ROU">Romania</option>\r\n        <option value="RUS">Russian Federation</option>\r\n        <option value="RWA">Rwanda</option>\r\n        <option value="BLM">Saint Barthélemy</option>\r\n        <option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>\r\n        <option value="KNA">Saint Kitts and Nevis</option>\r\n        <option value="LCA">Saint Lucia</option>\r\n        <option value="MAF">Saint Martin (French part)</option>\r\n        <option value="SPM">Saint Pierre and Miquelon</option>\r\n        <option value="VCT">Saint Vincent and the Grenadines</option>\r\n        <option value="WSM">Samoa</option>\r\n        <option value="SMR">San Marino</option>\r\n        <option value="STP">Sao Tome and Principe</option>\r\n        <option value="SAU">Saudi Arabia</option>\r\n        <option value="SEN">Senegal</option>\r\n        <option value="SRB">Serbia</option>\r\n        <option value="SYC">Seychelles</option>\r\n        <option value="SLE">Sierra Leone</option>\r\n        <option value="SGP">Singapore</option>\r\n        <option value="SXM">Sint Maarten (Dutch part)</option>\r\n        <option value="SVK">Slovakia</option>\r\n        <option value="SVN">Slovenia</option>\r\n        <option value="SLB">Solomon Islands</option>\r\n        <option value="SOM">Somalia</option>\r\n        <option value="ZAF">South Africa</option>\r\n        <option value="SGS">South Georgia and the South Sandwich Islands</option>\r\n        <option value="SSD">South Sudan</option>\r\n        <option value="ESP">Spain</option>\r\n        <option value="LKA">Sri Lanka</option>\r\n        <option value="SDN">Sudan</option>\r\n        <option value="SUR">Suriname</option>\r\n        <option value="SJM">Svalbard and Jan Mayen</option>\r\n        <option value="SWZ">Swaziland</option>\r\n        <option value="SWE">Sweden</option>\r\n        <option value="CHE">Switzerland</option>\r\n        <option value="SYR">Syrian Arab Republic</option>\r\n        <option value="TWN">Taiwan, Province of China</option>\r\n        <option value="TJK">Tajikistan</option>\r\n        <option value="TZA">Tanzania, United Republic of</option>\r\n        <option value="THA">Thailand</option>\r\n        <option value="TLS">Timor-Leste</option>\r\n        <option value="TGO">Togo</option>\r\n        <option value="TKL">Tokelau</option>\r\n        <option value="TON">Tonga</option>\r\n        <option value="TTO">Trinidad and Tobago</option>\r\n        <option value="TUN">Tunisia</option>\r\n        <option value="TUR">Turkey</option>\r\n        <option value="TKM">Turkmenistan</option>\r\n        <option value="TCA">Turks and Caicos Islands</option>\r\n        <option value="TUV">Tuvalu</option>\r\n        <option value="UGA">Uganda</option>\r\n        <option value="UKR">Ukraine</option>\r\n        <option value="ARE">United Arab Emirates</option>\r\n        <option value="GBR">United Kingdom</option>\r\n        <option value="USA">United States</option>\r\n        <option value="UMI">United States Minor Outlying Islands</option>\r\n        <option value="URY">Uruguay</option>\r\n        <option value="UZB">Uzbekistan</option>\r\n        <option value="VUT">Vanuatu</option>\r\n        <option value="VEN">Venezuela, Bolivarian Republic of</option>\r\n        <option value="VNM">Viet Nam</option>\r\n        <option value="VGB">Virgin Islands, British</option>\r\n        <option value="VIR">Virgin Islands, U.S.</option>\r\n        <option value="WLF">Wallis and Futuna</option>\r\n        <option value="ESH">Western Sahara</option>\r\n        <option value="YEM">Yemen</option>\r\n        <option value="ZMB">Zambia</option>\r\n        <option value="ZWE">Zimbabwe</option>\r\n    </select>\r\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["edit/base"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( Formbuilder.templates['edit/base_header']() )) == null ? '' : __t) +
'\r\n' +
((__t = ( Formbuilder.templates['edit/common']() )) == null ? '' : __t) +
'\r\n' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].edit({rf: rf}) )) == null ? '' : __t) +
'\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/base_header"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-field-label\'>\r\n  <span data-rv-text="model.' +
((__t = ( Formbuilder.options.mappings.LABEL )) == null ? '' : __t) +
'"></span>\r\n  <code class=\'field-type\' data-rv-text=\'model.' +
((__t = ( Formbuilder.options.mappings.FIELD_TYPE )) == null ? '' : __t) +
'\'></code>\r\n  <span class=\'fa fa-arrow-right pull-right\'></span>\r\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["edit/base_non_input"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( Formbuilder.templates['edit/base_header']() )) == null ? '' : __t) +
'\r\n' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].edit({rf: rf}) )) == null ? '' : __t) +
'\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/checkboxes"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<label>\r\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.REQUIRED )) == null ? '' : __t) +
'\' />\r\n  Required\r\n</label>';

}
return __p
};

this["Formbuilder"]["templates"]["edit/common"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Question</div>\r\n\r\n<div class=\'fb-common-wrapper\'>\r\n  <div class=\'fb-label-description\'>\r\n    ' +
((__t = ( Formbuilder.templates['edit/label_description']() )) == null ? '' : __t) +
'\r\n  </div>\r\n  <div class=\'fb-common-checkboxes\'>\r\n    ' +
((__t = ( Formbuilder.templates['edit/checkboxes']() )) == null ? '' : __t) +
'\r\n  </div>\r\n  <div class=\'fb-clear\'></div>\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/gallery_images"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Images</div>\r\n\r\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\r\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked"  placeholder="Is Selected by Default?" />\r\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\'  placeholder="Image Label"/>\r\n  <input type="url" data-rv-input="option:src" class=\'option-src-input\' placeholder="Image URL"/>\r\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Add Option"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-remove-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Option"><i class=\'fa fa-minus-circle\'></i></a>\r\n</div>\r\n\r\n<div class=\'fb-bottom-add\'>\r\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">Add image</a>\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/image_checkboxes_options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Options</div>\r\n\r\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\r\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked"  placeholder="Is Selected by Default?" />\r\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\'  placeholder="Image title"/>\r\n  <input type="url" data-rv-input="option:src" class=\'option-src-input\' placeholder="Image URL"/>\r\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Add Option"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-remove-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Option"><i class=\'fa fa-minus-circle\'></i></a>\r\n</div>\r\n\r\n<div class=\'fb-bottom-add\'>\r\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">Add option</a>\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/integer_only"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Integer only</div>\r\n<label>\r\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INTEGER_ONLY )) == null ? '' : __t) +
'\' />\r\n  Only accept integers\r\n</label>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/label_description"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<input type=\'text\' data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.LABEL )) == null ? '' : __t) +
'\' placeholder=\'Question\'/>\r\n<textarea data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.DESCRIPTION )) == null ? '' : __t) +
'\'\r\n  placeholder=\'Add a description\'></textarea>';

}
return __p
};

this["Formbuilder"]["templates"]["edit/min_max"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Minimum / Maximum</div>\r\n\r\nAbove\r\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MIN )) == null ? '' : __t) +
'" style="width: 60px" />\r\n\r\n&nbsp;&nbsp;\r\n\r\nBelow\r\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MAX )) == null ? '' : __t) +
'" style="width: 60px" />\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/min_max_labels"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Minimum / Maximum</div>\r\n\r\nAbove label\r\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MIN_LABEL )) == null ? '' : __t) +
'" style="width: 30px" />\r\n\r\n&nbsp;&nbsp;\r\n\r\nBelow label\r\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MAX_LABEL )) == null ? '' : __t) +
'" style="width: 30px" />\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/min_max_length"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Length Limit</div>\r\n\r\nMin\r\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MINLENGTH )) == null ? '' : __t) +
'" style="width: 30px" />\r\n\r\n&nbsp;&nbsp;\r\n\r\nMax\r\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.MAXLENGTH )) == null ? '' : __t) +
'" style="width: 30px" />\r\n\r\n&nbsp;&nbsp;\r\n\r\n<select data-rv-value="model.' +
((__t = ( Formbuilder.options.mappings.LENGTH_UNITS )) == null ? '' : __t) +
'" style="width: auto;">\r\n  <option value="characters">characters</option>\r\n  <option value="words">words</option>\r\n</select>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Options</div>\r\n\r\n';
 if (typeof includeBlank !== 'undefined'){ ;
__p += '\r\n  <label>\r\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_BLANK )) == null ? '' : __t) +
'\' />\r\n    Include blank\r\n  </label>\r\n';
 } ;
__p += '\r\n\r\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\r\n  <input type="checkbox" class=\'js-default-updated\' data-rv-checked="option:checked"  placeholder="Is Selected by Default?" />\r\n  <input type="text" data-rv-input="option:label" class=\'option-label-input\'  placeholder="Label"/>\r\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Add Option"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-remove-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Option"><i class=\'fa fa-minus-circle\'></i></a>\r\n</div>\r\n\r\n';
 if (typeof includeOther !== 'undefined'){ ;
__p += '\r\n  <label>\r\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_OTHER )) == null ? '' : __t) +
'\' />\r\n    Include "other"\r\n  </label>\r\n  <input type=\'text\' data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_OTHER_VALUE )) == null ? '' : __t) +
'\' />\r\n  <label>\r\n    <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.INCLUDE_OTHER_CHECKED )) == null ? '' : __t) +
'\' />\r\n    Other is checked by default\r\n  </label>\r\n';
 } ;
__p += '\r\n\r\n<div class=\'fb-bottom-add\'>\r\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">Add option</a>\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/range_group_options"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Ranges</div>\r\n\r\n<div class=\'option\' data-rv-each-option=\'model.' +
((__t = ( Formbuilder.options.mappings.OPTIONS )) == null ? '' : __t) +
'\'>\r\n  Min: <input type="text" data-rv-input="option:min" class=\'option-label-input\' placeholder="Min Value" /><br/>\r\n  Label: <input type="text" data-rv-input="option:min_label" class=\'option-label-input\' placeholder="Min Value Label" /><br/>\r\n  Max: <input type="text" data-rv-input="option:max" class=\'option-label-input\' placeholder="Max Value" /><br/>\r\n  Label: <input type="text" data-rv-input="option:max_label" class=\'option-label-input\' placeholder="Max Value Label" /><br/>\r\n  Value: <input type="text" data-rv-input="option:value" class=\'option-label-input\' placeholder="Default Value" /><br/>\r\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Add Range"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-remove-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Range"><i class=\'fa fa-minus-circle\'></i></a>\r\n</div>\r\n\r\n<div class=\'fb-bottom-add\'>\r\n  <a class="js-add-option ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">Add range</a>\r\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["edit/size"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Answer box size</div>\r\n<select data-rv-value="model.' +
((__t = ( Formbuilder.options.mappings.SIZE )) == null ? '' : __t) +
'">\r\n  <option value="small">Small</option>\r\n  <option value="medium">Medium</option>\r\n  <option value="large">Large</option>\r\n</select>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/step"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Step</div>\r\n<input type=\'text\' data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.STEP )) == null ? '' : __t) +
'\' />';

}
return __p
};

this["Formbuilder"]["templates"]["edit/units"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Units</div>\r\n<input type="text" data-rv-input="model.' +
((__t = ( Formbuilder.options.mappings.UNITS )) == null ? '' : __t) +
'" />\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["edit/value"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Initial value</div>\r\n<input type=\'text\' data-rv-input=\'model.' +
((__t = ( Formbuilder.options.mappings.VALUE )) == null ? '' : __t) +
'\' />';

}
return __p
};

this["Formbuilder"]["templates"]["edit/value_now"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-edit-section-header\'>Now default value</div>\r\n<label>\r\n  <input type=\'checkbox\' data-rv-checked=\'model.' +
((__t = ( Formbuilder.options.mappings.VALUE_NOW )) == null ? '' : __t) +
'\' />\r\n  Set "now" as the default value\r\n</label>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["page"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p +=
((__t = ( Formbuilder.templates['partials/save_button']() )) == null ? '' : __t) +
'\r\n' +
((__t = ( Formbuilder.templates['partials/left_side']() )) == null ? '' : __t) +
'\r\n' +
((__t = ( Formbuilder.templates['partials/right_side']() )) == null ? '' : __t) +
'\r\n<div class=\'fb-clear\'></div>';

}
return __p
};

this["Formbuilder"]["templates"]["partials/add_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class=\'fb-tab-pane active\' id=\'addField\'>\r\n  <div class=\'fb-add-field-types\'>\r\n    <div class=\'section\'>\r\n      ';
 _.each(_.sortBy(Formbuilder.inputFields, 'order'), function(f){ ;
__p += '\r\n        <a data-field-type="' +
((__t = ( f.field_type )) == null ? '' : __t) +
'" class="' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">\r\n          ' +
((__t = ( f.addButton )) == null ? '' : __t) +
'\r\n        </a>\r\n      ';
 }); ;
__p += '\r\n    </div>\r\n\r\n    <div class=\'section\'>\r\n      ';
 _.each(_.sortBy(Formbuilder.nonInputFields, 'order'), function(f){ ;
__p += '\r\n        <a data-field-type="' +
((__t = ( f.field_type )) == null ? '' : __t) +
'" class="' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'">\r\n          ' +
((__t = ( f.addButton )) == null ? '' : __t) +
'\r\n        </a>\r\n      ';
 }); ;
__p += '\r\n    </div>\r\n  </div>\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/edit_field"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-tab-pane\' id=\'editField\'>\r\n  <div class=\'fb-edit-field-wrapper\'></div>\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/left_side"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-left\'>\r\n  <ul class=\'fb-tabs\'>\r\n    <li class=\'active\'><a data-target=\'#addField\'>Add Question</a></li>\r\n    <li><a data-target=\'#editField\'>Edit Question</a></li>\r\n  </ul>\r\n\r\n  <div class=\'fb-tab-content\'>\r\n    ' +
((__t = ( Formbuilder.templates['partials/add_field']() )) == null ? '' : __t) +
'\r\n    ' +
((__t = ( Formbuilder.templates['partials/edit_field']() )) == null ? '' : __t) +
'\r\n  </div>\r\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["partials/right_side"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-right\'>\r\n  <div class=\'fb-no-response-fields\'>No response fields</div>\r\n  <div class=\'fb-response-fields\'></div>\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["partials/save_button"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'fb-save-wrapper\'>\r\n  <button class=\'js-save-form ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'\'></button>\r\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["view/base"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'subtemplate-wrapper\'>\r\n  <div class=\'cover\'></div>\r\n  ' +
((__t = ( Formbuilder.templates['view/label']({rf: rf}) )) == null ? '' : __t) +
'\r\n\r\n  ' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].view({rf: rf}) )) == null ? '' : __t) +
'\r\n\r\n  ' +
((__t = ( Formbuilder.templates['view/description']({rf: rf}) )) == null ? '' : __t) +
'\r\n  ' +
((__t = ( Formbuilder.templates['view/duplicate_remove']({rf: rf}) )) == null ? '' : __t) +
'\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/base_non_input"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'subtemplate-wrapper\'>\r\n    ' +
((__t = ( Formbuilder.templates['view/label']({rf: rf}) )) == null ? '' : __t) +
'\r\n\r\n    ' +
((__t = ( Formbuilder.fields[rf.get(Formbuilder.options.mappings.FIELD_TYPE)].view({rf: rf}) )) == null ? '' : __t) +
'\r\n\r\n    ' +
((__t = ( Formbuilder.templates['view/description']({rf: rf}) )) == null ? '' : __t) +
'\r\n    ' +
((__t = ( Formbuilder.templates['view/duplicate_remove']({rf: rf}) )) == null ? '' : __t) +
'\r\n</div>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/description"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span class=\'help-block\'>\r\n  ' +
((__t = ( Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.DESCRIPTION)) )) == null ? '' : __t) +
'\r\n</span>\r\n';

}
return __p
};

this["Formbuilder"]["templates"]["view/duplicate_remove"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class=\'actions-wrapper\'>\r\n  <a class="js-duplicate ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Duplicate Field"><i class=\'fa fa-plus-circle\'></i></a>\r\n  <a class="js-clear ' +
((__t = ( Formbuilder.options.BUTTON_CLASS )) == null ? '' : __t) +
'" title="Remove Field"><i class=\'fa fa-minus-circle\'></i></a>\r\n</div>';

}
return __p
};

this["Formbuilder"]["templates"]["view/label"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<label>\r\n  <span>' +
((__t = ( Formbuilder.helpers.simple_format(rf.get(Formbuilder.options.mappings.LABEL)) )) == null ? '' : __t) +
'\r\n  ';
 if (rf.get(Formbuilder.options.mappings.REQUIRED)) { ;
__p += '\r\n    <abbr title=\'required\'>*</abbr>\r\n  ';
 } ;
__p += '\r\n</label>\r\n';

}
return __p
};