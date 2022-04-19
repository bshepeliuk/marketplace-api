import deserializeObject from './deserializeObject';

function parseDeviceFeatures(features) {
  if (!features) return;

  const data = typeof features === 'string' ? [features] : features;

  return data.map((item) => deserializeObject(item));
}

export default parseDeviceFeatures;
