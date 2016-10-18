define(['exports', 'react'], function (exports, _react) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });

   var _react2 = _interopRequireDefault(_react);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   exports.default = {
      name: 'article-teaser-widget',
      injections: ['axEventBus', 'axFeatures', 'axReactRender'],
      create: function create(eventBus, features, reactRender) {

         var resources = { article: null };
         var articleResource = features.article.resource;
         eventBus.subscribe('didReplace.' + articleResource, function (event) {
            resources.article = event.data;
            render();
         });

         function addToCart() {
            var actionName = features.confirmation.action;
            eventBus.publish('takeActionRequest.' + actionName, {
               action: actionName
            });
         }

         function render() {
            reactRender(_react2.default.createElement(
               'div',
               null,
               _react2.default.createElement(ArticleHeader, { isSelected: !!resources.article }),
               _react2.default.createElement(ArticleTeaser, { article: resources.article || { name: 'No article selected' } }),
               _react2.default.createElement(
                  'div',
                  { className: 'clearfix' },
                  _react2.default.createElement(
                     'button',
                     { type: 'button',
                        className: 'btn pull-right ' + (resources.article ? 'btn-info' : 'ax-disabled'),
                        onClick: addToCart },
                     _react2.default.createElement('i', { className: 'fa fa-shopping-cart' }),
                     ' Add to Cart'
                  )
               )
            ));
         }

         return { onDomAvailable: render };
      }
   };


   var ArticleHeader = _react2.default.createClass({
      render: function render() {
         var isSelected = this.props.isSelected;

         return _react2.default.createElement(
            'h3',
            { className: 'ax-function-point ' + (isSelected ? 'app-selection' : '') },
            _react2.default.createElement('i', { className: 'fa fa-search' }),
            ' Details'
         );
      }
   });

   var ArticleTeaser = _react2.default.createClass({
      render: function render() {
         var article = this.props.article;

         return _react2.default.createElement(
            'div',
            { className: 'app-teaser-wrapper clearfix' + (article.id && ' app-selection') },
            _react2.default.createElement(
               'h4',
               { className: article.id || 'app-no-selection' },
               article.name
            ),
            _react2.default.createElement(
               'div',
               { className: 'row' },
               _react2.default.createElement(
                  'div',
                  { className: 'col col-md-6' },
                  _react2.default.createElement(
                     'dl',
                     { className: 'dl-horizontal' },
                     _react2.default.createElement(
                        'dt',
                        { className: article.id || 'ax-disabled' },
                        'Art. ID'
                     ),
                     _react2.default.createElement(
                        'dd',
                        null,
                        article.id
                     ),
                     _react2.default.createElement(
                        'dt',
                        { className: article.id || 'ax-disabled' },
                        'Description'
                     ),
                     _react2.default.createElement('dd', { dangerouslySetInnerHTML: { __html: article.htmlDescription } }),
                     _react2.default.createElement(
                        'dt',
                        { className: article.id || 'ax-disabled' },
                        'Price'
                     ),
                     _react2.default.createElement(
                        'dd',
                        null,
                        this.formattedPrice(article.price)
                     )
                  )
               ),
               _react2.default.createElement(
                  'div',
                  { className: 'col col-md-6 app-teaser-image-wrapper' },
                  article.pictureUrl && _react2.default.createElement('img', { className: 'app-teaser-image', src: article.pictureUrl })
               )
            )
         );
      },
      formattedPrice: function formattedPrice(price) {
         return price == null ? null : '€ ' + price.toFixed(2);
      }
   });

   return exports.default;
});
