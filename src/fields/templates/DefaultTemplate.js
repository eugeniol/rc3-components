import React from 'react';

const REQUIRED_FIELD_SYMBOL = '*';

export function Label(props) {
  const { label, required, id } = props;
  if (!label) {
    return null;
  }
  return (
    <label className="control-label" htmlFor={id}>
      {label}
      {required && <span className="required">{REQUIRED_FIELD_SYMBOL}</span>}
    </label>
  );
}

export function DefaultTemplate(props) {
  const {
    id,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel,
    classNames,
    uiSchema
  } = props;
  if (hidden) {
    return <div className="hidden">{children}</div>;
  }

  return (
    <div className={classNames} style={uiSchema.style}>
      {displayLabel && <Label label={label} required={required} id={id} />}

      {displayLabel && description ? description : null}
      {children}
      {errors}
      {help}
    </div>
  );
}

export function ObjectFieldInlineTemplate(props) {
  const { TitleField, DescriptionField } = props;
  const theId = props.idSchema.$id;
  const theTitle = props.title || props.uiSchema['ui:title'];
  return (
    <div id={theId}>
      {(props.uiSchema['ui:title'] || props.title) && (
        <label id={`${theId}__title`} style={{ fontWeight: 'bold' }} required={props.required}>
          {theTitle}
        </label>
      )}
      {props.description && (
        <DescriptionField
          id={`${theId}__description`}
          description={props.description}
          formContext={props.formContext}
        />
      )}
      <div style={{ display: 'flex' }}>
        {props.properties.map((prop, ix) => (
          <span key={ix} style={{ marginRight: '5px' }}>
            {prop.content}
          </span>
        ))}
      </div>
    </div>
  );
}
