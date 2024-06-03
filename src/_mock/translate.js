export const translate = [];

// Function to generate a random alphanumeric code
const generateUniqueCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 25; i++) {
  translate.push({
    id: generateUniqueCode(), // Generate a unique code
    code: generateUniqueCode(), // Generate another unique code
    type: 'content',
    definition: 'hello',
    status: Math.random() < 0.5 ? 'active' : 'inactive', // Randomly choose 'active' or 'inactive' status
  });
}
