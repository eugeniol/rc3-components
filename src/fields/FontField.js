import React from 'react';
import { DefaultTemplate, ObjectFieldInlineTemplate } from './templates/DefaultTemplate';

const Font = ({ uiSchema, ...props }) => {
  const { ObjectField } = props.registry.fields;

  return (
    <div>
      <ObjectField
        uiSchema={{
          'ui:ObjectFieldTemplate': ObjectFieldInlineTemplate,

          ...uiSchema,
          color: {
            'ui:title': 'Color',
            'ui:widget': 'color',
            'ui:FieldTemplate': DefaultTemplate,
            style: { display: 'flex', flexDirection: 'column' },
            'ui:options': {
              label: true
            },
            ...uiSchema.color
          },
          size: {
            'ui:title': 'Size',
            'ui:FieldTemplate': DefaultTemplate,
            style: { display: 'flex', flexDirection: 'column', alignItems: 'start' },
            'ui:widget': 'numericRangeSelect',
            'ui:options': {
              label: true
            },
            ...uiSchema.size
          },
          unit: {
            'ui:title': 'Unit',
            'ui:options': {
              components: {
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null
              }
            },
            ...uiSchema.unit
          }
        }}
        {...props}
      />
    </div>
  );
};
export default Font;
