export const isItProductionMode = process.env.NODE_ENV === 'production';
export const isItTestMode = () => process.env.NODE_ENV === 'test';
