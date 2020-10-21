import React from 'react';
import { DefaultTemplate, ObjectFieldInlineTemplate } from './templates/DefaultTemplate';

const CancelReason = ({ uiSchema, ...props }) => {
  const { ObjectField } = props.registry.fields;
  return (
    <div>
      <ObjectField
        uiSchema={{
          'ui:ObjectFieldTemplate': ObjectFieldInlineTemplate,
          ...uiSchema,
          cancelReasonText: {
            'ui:title':
              props.schema.properties.cancelReason.enumNames[
                props.schema.properties.cancelReason.enum.findIndex(enm => enm === props.formData.cancelReason)
              ] || 'Cancel Reason (Custom)',
            'ui:FieldTemplate': DefaultTemplate,
            'ui:options': {
              label: true
            },
            ...uiSchema.cancelReasonText
          }
        }}
        {...props}
      />
    </div>
  );
};

export default CancelReason;
