import AddButton from 'react-jsonschema-form/lib/components/AddButton';
import React from 'react';

import { getUiOptions } from 'react-jsonschema-form/lib/utils';
import classNames from 'classnames';

export default class ObjectFieldTemplate extends React.Component {
  state = { collapsed: true };
  handleExpand() {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }
  componentDidMount() {
    const collapsible = this.props.uiSchema['ui:collapsible'];
    if (collapsible) {
      this.setState({
        collapsed: typeof collapsible === 'object' ? collapsible.collapsed : false
      });
    }
  }

  render() {
    const props = this.props;
    const canExpand = function canExpand() {
      const { formData, schema, uiSchema } = props;
      if (!schema.additionalProperties) {
        return false;
      }
      const { expandable } = getUiOptions(uiSchema);
      if (expandable === false) {
        return expandable;
      }
      // if ui:options.expandable was not explicitly set to false, we can add
      // another property if we have not exceeded maxProperties yet
      if (schema.maxProperties !== undefined) {
        return Object.keys(formData).length < schema.maxProperties;
      }
      return true;
    };

    const isColapsible = function canExpand() {
      return props.uiSchema['ui:collapsible'];
    };

    const { TitleField, DescriptionField } = props;
    return (
      <div className="object-field-template" id={props.idSchema.$id}>
        {isColapsible() && (
          <legend onClick={this.handleExpand.bind(this)}>
            {props.title || props.uiSchema['ui:title']}{' '}
            <a
              href={`#${props.idSchema.$id}`}
              className={classNames('collapsible-button', {
                collapsed: this.state.collapsed,
                expanded: !this.state.collapsed
              })}
            >
              <i
                className={classNames('fa', {
                  'fa-arrow-circle-down': this.state.collapsed,
                  'fa-arrow-circle-up': !this.state.collapsed
                })}
              />
              {this.state.collapsed ? 'SHOW' : 'HIDE'}
            </a>
          </legend>
        )}

        {!isColapsible() && (
          <>
            {(props.uiSchema['ui:title'] || props.title) && (
              <TitleField
                id={`${props.idSchema.$id}__title`}
                title={props.title || props.uiSchema['ui:title']}
                required={props.required}
                formContext={props.formContext}
              />
            )}
          </>
        )}
        {props.description && (
          <DescriptionField
            id={`${props.idSchema.$id}__description`}
            description={props.description}
            formContext={props.formContext}
          />
        )}
        {(!isColapsible() || !this.state.collapsed) && (
          <>
            {props.properties.map(prop => prop.content)}
            {canExpand() && (
              <AddButton
                className="object-property-expand"
                onClick={props.onAddClick(props.schema)}
                disabled={props.disabled || props.readonly}
              />
            )}
          </>
        )}
      </div>
    );
  }
}
