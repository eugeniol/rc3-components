import get from 'lodash/get';
import defaultsDeep from 'lodash/defaultsDeep';

export function getVariationAt(formData, index = 0) {
  if (!formData) return {};
  if (index > 0) {
    return get(formData, ['elements', index - 1], {});
  }

  return formData;
}
export function updateVariationAtWith(formData, selectedVariationIndex, updater) {
  if (selectedVariationIndex < 0) {
    return {
      ...updater(formData),
      elements: (formData.elements || []).map(variation => updater(variation))
    };
  } else if (selectedVariationIndex > 0 && formData.elements) {
    return {
      ...formData,
      elements: (formData.elements || []).map((variation, index) => {
        if (selectedVariationIndex - 1 === index) {
          return updater(variation);
        } else {
          return variation;
        }
      })
    };
  } else {
    return updater(formData);
  }
}

export function isMarkupModifiedAt(initial, actual, index) {
  const { markup: a } = getVariationAt(initial, index);
  const { markup: b } = getVariationAt(actual, index);
  return a !== b;
}

export function isAnyAdvancedModeModified(initial, actual) {
  for (let i = 0; i <= Math.max(get(initial, 'elements.length', 0), get(actual, 'elements.length', 0)); i++) {
    if (!getVariationAt(initial, i).advancedMode && getVariationAt(actual, i).advancedMode) {
      return true;
    }
  }
  return false;
}

export function regenerateOffersMarkup(getMarkup, getStyles, formData, { frequencies }, selectedVariationIndex = -1) {
  const defaults = {
    ...formData,
    settings: {
      ...get(formData, 'settings', {}),
      frequencies: frequencies
    }
  };
  return updateVariationAtWith(formData, selectedVariationIndex, formData => ({
    ...formData,
    advancedMode: !!get(formData, 'advancedMode'),
    ...(!get(formData, 'advancedMode') && {
      markup: getMarkup(defaultsDeep({}, formData, defaults)),
      css: getStyles(defaultsDeep({}, formData, defaults))
    })
  }));
}
