import React from 'react';
import { DefaultTemplate, ObjectFieldInlineTemplate } from './templates/DefaultTemplate';

const DefaultFrequencyField = ({ uiSchema, ...props }) => {
  const { ObjectField } = props.registry.fields;

  return (
    <div>
      <ObjectField
        uiSchema={{
          'ui:ObjectFieldTemplate': ObjectFieldInlineTemplate,
          ...uiSchema,
          every: {
            'ui:FieldTemplate': DefaultTemplate,
            style: { display: 'flex', flexDirection: 'column', alignItems: 'start' },
            'ui:widget': 'numericRangeSelect',
            ...uiSchema.every
          },

          period: {
            'ui:FieldTemplate': DefaultTemplate,
            style: { display: 'flex', flexDirection: 'column', alignItems: 'start' },
            'ui:options': {
              label: true,
              components: {
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null
              }
            },
            ...uiSchema.period
          }
        }}
        {...props}
      />
    </div>
  );
};
export default DefaultFrequencyField;
