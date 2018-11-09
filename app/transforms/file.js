import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

const { isEmpty, assign, getOwner } = Ember;
const { Transform } = DS;

/**
 * A file transform for Ember-Data.
 *
 * The will enable files to be used as an Ember Data attribute:
 *
 * ```javascript
 * // app/models/product.js
 * import Model from 'ember-data/model';
 * import attr from 'ember-data/attr';
 *
 * export default Model.extend({
 *   photo: attr('file')
 * })
 * ```
 *
 * @module app/transforms/file
 * @private
 */
export default Transform.extend({
  /**
   * Deserialize file json to a file object
   *
   * @public
   */
  deserialize: function(serialized, attributeMeta) {
    const File = getOwner(this).factoryFor('object:file');

    return File.create(assign({}, serialized, config.paperclip, attributeMeta, {
      isNew: isEmpty(serialized),
      isEmpty: isEmpty(serialized),
      attributes: Object.keys(serialized || {})
    }));
  },

  /**
   * Serialize a file object to json
   *
   * @public
   */
  serialize: function(deserialized) {
    if(!deserialized){
      return null;
    }else{
      return deserialized.serialize();
    }
  }
});
