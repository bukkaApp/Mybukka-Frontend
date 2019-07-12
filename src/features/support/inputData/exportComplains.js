import complainform from './complainform';

export default [
  ...complainform.account,
  ...complainform.order,
  ...complainform.charges,
  ...complainform['bukka services'],
  ...complainform['Report a safety issue'],
];
