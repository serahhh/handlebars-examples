define(function (require) {
    var Handlebars = require('handlebars'),
        template = require('text!templates/app.hbs'),
        examples = require('text!app/data/examples.json'),
        helpers = require('app/helpers');

    var Demo = {

        init: function (options) {
            this.$el = $(options.selector);

            this.examples = $.parseJSON(examples).examples;
            this.currentExample = this.examples[0];
            this.registerPartials();
            this.bindListeners();
            this.render();
        },

        bindListeners: function () {
            this.$el.on('click', '[data-role=example]', this.onClickExample.bind(this));
            this.$el.on('click', '[data-role=submit]', this.onClickSubmit.bind(this));
            this.$el.on('click', '[data-role=switch]', this.onClickContextSwitch.bind(this));
        },

        onClickExample: function (e) {
            var target = $(e.target || e.srcElement).closest('[data-role=example]'),
                id = target.data('id');

            this.contextToggled = false;
            this.fillExample(id);
            e.preventDefault();
        },

        onClickSubmit: function (e) {
            this.renderResult();
            e.preventDefault();
        },

        onClickContextSwitch: function (e) {
            this.switchContext();
            e.preventDefault();
        },

        renderResult: function () {
            var context = this.$contextEl.val(),
                template = this.$templateEl.val();

            context = context ? $.parseJSON(context) : context;

            this.$resultEl.empty().html(Handlebars.compile(template)(context));
        },

        switchContext: function () {
            this.contextToggled = !this.contextToggled;
            this.render();
        },

        fillExample: function (id) {
            var example;

            try {
                example = this.examples.filter(this.findById.bind(this, id))[0];
            } catch (e) {}

            if (!example) {
                throw new Error('no example by that ID');
            }

            this.currentExample = example;

            this.render();
        },

        findById: function (id, example) {
            return example.id === id;
        },

        registerPartials: function () {
            Handlebars.registerPartial('nav', require('text!templates/partials/nav.hbs'));
            Handlebars.registerPartial('code-area-template', require('text!templates/partials/code-area-template.hbs'));
            Handlebars.registerPartial('code-area-context', require('text!templates/partials/code-area-context.hbs'));
        },

        render: function () {
            this.$el.empty();

            this.$el.html(Handlebars.compile(template)({
                examples: this.examples,
                altContext: JSON.stringify(this.currentExample.altContext),
                template: this.currentExample.template,
                activeId: this.currentExample.id,
                contextToggled: this.contextToggled,
                context: JSON.stringify(this.currentExample.context)
            }));

            this.afterRender();
        },

        afterRender: function () {
            this.$contextEl = this.$el.find('[data-role=context]');
            this.$templateEl = this.$el.find('[data-role=template]');
            this.$resultEl = this.$el.find('[data-role=result]');
        }
    };

    return Demo;
});