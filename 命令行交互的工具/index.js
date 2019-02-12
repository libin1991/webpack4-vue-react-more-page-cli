/**
 * Checkbox Plus
 * 
 * @author Mohammad Fares <faressoft.com@gmail.com>
 */
 
'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var cliCursor = require('cli-cursor');
var figures = require('figures');
var Base = require('inquirer/lib/prompts/base');
var Choices = require('inquirer/lib/objects/choices');
var observe = require('inquirer/lib/utils/events');
var Paginator = require('inquirer/lib/utils/paginator');

/**
 * CheckboxPlusPrompt
 */
class CheckboxPlusPrompt extends Base {

  /**
   * Initialize the prompt
   * 
   * @param  {Object} questions
   * @param  {Object} rl
   * @param  {Object} answers
   */
  constructor(questions, rl, answers) {

    super(questions, rl, answers);

    // Default value for the highlight option
    if (typeof this.opt.highlight == 'undefined') {
      this.opt.highlight = false;
    }

    // Default value for the searchable option
    if (typeof this.opt.searchable == 'undefined') {
      this.opt.searchable = false;
    }

    // Default value for the default option
    if (typeof this.opt.default == 'undefined') {
      this.opt.default = null;
    }

    // Doesn't have source option
    if (!this.opt.source) {
      this.throwParamError('source');
    }

    // Init
    this.pointer = 0;
    this.firstSourceLoading = true;
    this.choices = new Choices([], answers);
    this.checkedChoices = [];
    this.value = [];
    this.lastQuery = null;
    this.searching = false;
    this.lastSourcePromise = null;
    this.default = this.opt.default;
    this.opt.default = null;

    this.paginator = new Paginator(this.screen);

  }

  /**
   * Start the Inquiry session
   * 
   * @param  {Function} callback callback when prompt is done
   * @return {this}
   */
  _run(callback) {

    var self = this;

    this.done = callback;

    this.executeSource().then(function(result) {

      var events = observe(self.rl);

      var validation = self.handleSubmitEvents(
        events.line.map(self.getCurrentValue.bind(self))
      );

      validation.success.forEach(self.onEnd.bind(self));
      validation.error.forEach(self.onError.bind(self));

      events.normalizedUpKey.takeUntil(validation.success).forEach(self.onUpKey.bind(self));
      events.normalizedDownKey.takeUntil(validation.success).forEach(self.onDownKey.bind(self));
      events.spaceKey.takeUntil(validation.success).forEach(self.onSpaceKey.bind(self));

      // If the search is enabled
      if (!self.opt.searchable) {

        events.numberKey.takeUntil(validation.success).forEach(self.onNumberKey.bind(self));
        events.aKey.takeUntil(validation.success).forEach(self.onAllKey.bind(self));
        events.iKey.takeUntil(validation.success).forEach(self.onInverseKey.bind(self));

      } else {

        events.keypress.takeUntil(validation.success).forEach(self.onKeypress.bind(self));

      }

      if (self.rl.line) {
        self.onKeypress();
      }

      // Init the prompt
      cliCursor.hide();
      self.render();

    });
    
    return this;

  }

  /**
   * Execute the source function to get the choices and render them
   */
  executeSource() {

    var self = this;
    var sourcePromise = null;

    // Remove spaces
    this.rl.line = _.trim(this.rl.line);

    // Same last search query that already loaded
    if (this.rl.line === this.lastQuery) {
      return;
    }

    // If the search is enabled
    if (this.opt.searchable) {
      sourcePromise = this.opt.source(this.answers, this.rl.line);
    } else {
      sourcePromise = this.opt.source(this.answers, null);
    }

    this.lastQuery = this.rl.line;
    this.lastSourcePromise = sourcePromise;
    this.searching = true;

    sourcePromise.then(function(choices) {
      
      // Is not the last issued promise
      if (self.lastSourcePromise !== sourcePromise) {
        return;
      }

      // Reset the searching status
      self.searching = false;

      // Save the new choices
      self.choices = new Choices(choices, self.answers);

      // Foreach choice
      self.choices.forEach(function(choice) {

        // Is the current choice included in the current checked choices
        if (_.findIndex(self.value, _.isEqual.bind(null, choice.value)) != -1) {
          self.toggleChoice(choice, true);
        } else {
          self.toggleChoice(choice, false);
        }

        // The default is not applied yet
        if (self.default) {

          // Is the current choice included in the default values
          if (_.findIndex(self.default, _.isEqual.bind(null, choice.value)) != -1) {
            self.toggleChoice(choice, true);
          }

        }

      });

      // Reset the pointer to select the first choice
      self.pointer = 0;
      self.render();
      self.default = null;
      self.firstSourceLoading = false;


    });

    return sourcePromise;

  }

  /**
   * Render the prompt
   * 
   * @param  {Object} error
   */
  render(error) {

    // Render question
    var message = this.getQuestion();
    var bottomContent = '';

    // Answered
    if (this.status === 'answered') {

      message += chalk.cyan(this.selection.join(', '));
      return this.screen.render(message, bottomContent);

    }

    // No search query is entered before
    if (this.firstSourceLoading) {

      // If the search is enabled
      if (this.opt.searchable) {

        message +=
          '(Press ' +
          chalk.cyan.bold('<space>') +
          ' to select, ' +
          'or type anything to filter the list)';
        
      } else {

        message +=
          '(Press ' +
          chalk.cyan.bold('<space>') +
          ' to select, ' +
          chalk.cyan.bold('<a>') +
          ' to toggle all, ' +
          chalk.cyan.bold('<i>') +
          ' to invert selection)';
        
      }

    }

    // If the search is enabled
    if (this.opt.searchable) {

      // Print the current search query
      message += this.rl.line;

    }

    // Searching mode
    if (this.searching) {

      message += '\n  ' + chalk.cyan('Searching...');

    // No choices
    } else if (!this.choices.length) {

      message += '\n  ' + chalk.yellow('No results...');

    // Has choices
    } else {

      var choicesStr = this.renderChoices(this.choices, this.pointer);

      var indexPosition = this.choices.indexOf(
        this.choices.getChoice(this.pointer)
      );

      message += '\n' + this.paginator.paginate(choicesStr, indexPosition, this.opt.pageSize);

    }

    if (error) {
      bottomContent = chalk.red('>> ') + error;
    }

    this.screen.render(message, bottomContent);

  }

  /**
   * A callback function for the event:
   * When the user press `Enter` key
   * 
   * @param {Object} state
   */
  onEnd(state) {

    this.status = 'answered';

    // Rerender prompt (and clean subline error)
    this.render();

    this.screen.done();
    cliCursor.show();
    this.done(state.value);

  }

  /**
   * A callback function for the event:
   * When something wrong happen
   * 
   * @param {Object} state
   */
  onError(state) {
    this.render(state.isValid);
  }

  /**
   * Get the current values of the selected choices
   * 
   * @return {Array}
   */
  getCurrentValue() {

    this.selection = _.map(this.checkedChoices, 'short');
    return _.map(this.checkedChoices, 'value');

  }

  /**
   * A callback function for the event:
   * When the user press `Up` key
   */
  onUpKey() {

    var len = this.choices.realLength;
    this.pointer = this.pointer > 0 ? this.pointer - 1 : len - 1;
    this.render();

  }

  /**
   * A callback function for the event:
   * When the user press `Down` key
   */
  onDownKey() {

    var len = this.choices.realLength;
    this.pointer = this.pointer < len - 1 ? this.pointer + 1 : 0;
    this.render();

  }

  /**
   * A callback function for the event:
   * When the user press a number key
   */
  onNumberKey(input) {

    if (input <= this.choices.realLength) {
      this.pointer = input - 1;
      this.toggleChoice(this.choices.getChoice(this.pointer));
    }

    this.render();

  }

  /**
   * A callback function for the event:
   * When the user press `Space` key
   */
  onSpaceKey() {

    // When called no results
    if (!this.choices.getChoice(this.pointer)) {
      return;
    }

    this.toggleChoice(this.choices.getChoice(this.pointer));
    this.render();

  }

  /**
   * A callback function for the event:
   * When the user press 'a' key
   */
  onAllKey() {

    var shouldBeChecked = Boolean(
      this.choices.find(function(choice) {
        return choice.type !== 'separator' && !choice.checked;
      })
    );

    this.choices.forEach(function(choice) {
      if (choice.type !== 'separator') {
        choice.checked = shouldBeChecked;
      }
    });

    this.render();

  }

  /**
   * A callback function for the event:
   * When the user press `i` key
   */
  onInverseKey() {

    this.choices.forEach(function(choice) {
      if (choice.type !== 'separator') {
        choice.checked = !choice.checked;
      }
    });

    this.render();

  }

  /**
   * A callback function for the event:
   * When the user press any key
   */
  onKeypress() {

    this.executeSource();
    this.render();

  }

  /**
   * Toggle (check/uncheck) a specific choice
   *
   * @param {Boolean} checked if not specified the status will be toggled
   * @param {Object}  choice
   */
  toggleChoice(choice, checked) {

    // Default value for checked
    if (typeof checked === 'undefined') {
      checked = !choice.checked;
    }

    // Remove the choice's value from the checked values
    _.remove(this.value, _.isEqual.bind(null, choice.value));

    // Remove the checkedChoices with the value of the current choice
    _.remove(this.checkedChoices, function(checkedChoice) {
      return _.isEqual(choice.value, checkedChoice.value);
    });

    choice.checked = false;

    // Is the choice checked
    if (checked) {
      this.value.push(choice.value);
      this.checkedChoices.push(choice);
      choice.checked = true;
    }

  }

  /**
   * Get the checkbox figure (sign)
   * 
   * @param  {Boolean} checked
   * @return {String}
   */
  getCheckboxFigure(checked) {

    return checked ? chalk.green(figures.radioOn) : figures.radioOff;

  }

  /**
   * Render the checkbox choices
   * 
   * @param  {Array}  choices
   * @param  {Number} pointer the position of the pointer
   * @return {String} rendered content
   */
  renderChoices(choices, pointer) {

    var self = this;
    var output = '';
    var separatorOffset = 0;

    // Foreach choice
    choices.forEach(function(choice, index) {

      // Is a separator
      if (choice.type === 'separator') {

        separatorOffset++;
        output += ' ' + choice + '\n';
        return;

      }

      // Is the choice disabled
      if (choice.disabled) {

        separatorOffset++;
        output += ' - ' + choice.name;
        output += ' (' + (_.isString(choice.disabled) ? choice.disabled : 'Disabled') + ')';
        output += '\n';
        return;

      }

      // Is the current choice is the selected choice
      if (index - separatorOffset === pointer) {

        output += chalk.cyan(figures.pointer);
        output += self.getCheckboxFigure(choice.checked) + ' ';
        output += self.opt.highlight ? chalk.gray(choice.name) : choice.name;

      } else {

        output += ' ' + self.getCheckboxFigure(choice.checked) + ' ' + choice.name;

      }

      output += '\n';


    });

    return output.replace(/\n$/, '');

  }

}

module.exports = CheckboxPlusPrompt;
