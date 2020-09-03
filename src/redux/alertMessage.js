const flasMessage = (action, status, message) => ({
  type: `${action}_FLASH_MESSAGE`,
  status,
  message,
});

export default flasMessage;
