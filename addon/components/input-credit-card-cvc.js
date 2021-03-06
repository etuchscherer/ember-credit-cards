import Ember from 'ember';
import hasTextSelected from 'ember-credit-cards/utils/has-text-selected';
import isDigitKeypress from 'ember-credit-cards/utils/is-digit-keypress';
import isWhitelistKeypress from 'ember-credit-cards/utils/is-whitelist-keypress';

const {TextField, computed} = Ember;

export default TextField.extend({
  classNames: ['input-credit-card-cvc'],
  autocomplete: 'off',
  placeholder: '•••',
  label: 'Expiration',

  keyPress: function(e) {
    var digit = String.fromCharCode(e.which);

    if (!isDigitKeypress(e)) {
      return false;
    }

    var el = this.$();
    if (hasTextSelected(el)) {
      return true;
    }

    var value = el.val() + digit;

    return isWhitelistKeypress(e) || value.length <= 4;
  },


  value: computed('cvc', {
    get() {
      return this.get('cvc');
    },
    set(propertyName, newValue) {
      var number = newValue.replace(/\D/g, '').slice(0, 4);
      this.set('cvc', newValue);

      return number;
    }
  })
});
