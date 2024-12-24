const bcrypt = require('bcryptjs');

const generateHashedPassword = async () => {
    const password = '@Querty123'; // Replace with your desired admin password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);
};

generateHashedPassword();
