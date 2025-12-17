// generateHash.js
const bcrypt = require('bcryptjs');

const passwordToHash = 'YourTemporaryAdminPassword123'; // <<< CHANGE THIS to your desired temporary password
const saltRounds = 10; // Standard number of salt rounds

bcrypt.hash(passwordToHash, saltRounds, function(err, hash) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Original Password:', passwordToHash);
    console.log('Generated Bcrypt Hash:');
    console.log(hash);
});
