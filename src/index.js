/**
 * Created by numminorihsf on 03.03.16.
 */
"use strict";
var React = require('react');
var FSelect = require('react-select-fallback');

var UKSelect = React.createClass({
  getInitialState: function(){
    return {
      show: false
    }
  },

  getDefaultProps: function() {
    return {
      options:[],
      classDropDown: '',
      classButton: ''
    };
  },

  clickListener: function(e){
    if (this.state.show && e.target !== this.refs.button){
      this.setState({show: false});
    }
  },
  componentDidMount: function(){
    if (typeof document !== 'undefined'){
      if (document.addEventListener) {
        document.addEventListener('click', this.clickListener.bind(this));
      }
      else if (document.attachEvent) {
        document.attachEvent('onclick', this.clickListener.bind(this));
      }
    }
  },

  componentWillUnmount: function(){
    if (typeof document !== 'undefined'){
      if (document.addEventListener) {
        document.removeEventListener('click', this.clickListener.bind(this));
      }
      else if (document.attachEvent) {
        document.detachEvent('onclick', this.clickListener.bind(this));
      }
    }
  },

  onChange: function(val, e){
    (this.props.onChange || function(){})(val);
    this.setState({show: false});
    e.preventDefault();
    return false;
  },

  triggerShow: function(){
    this.setState({show: !this.state.show});
  },

  render: function(){
    var self = this;
    var list = this.props.options.map(function(opt, i) {
      return (<li key={i}>
        <a href="#" onClick={self.onChange.bind(self, opt.value)}>
          {opt.name || opt.value}
        </a>
      </li>);
    });
    return (<FSelect {...this.props}>
      <div className="uk-button-group">
        <button type="button"
                ref="button"
                className={'uk-button ' + this.props.classButton}
                onClick={this.triggerShow}>
          {this.props.defaultValue}
        </button>
        <div className={this.state.show ? "uk-open":""}>
          <div className="uk-dropdown uk-dropdown-small">
            <ul className={'uk-nav uk-nav-dropdown ' + this.props.classDropDown}>
              {list}
            </ul>
          </div>
        </div>
      </div>
    </FSelect>);
  }
});

module.exports = UKSelect;
