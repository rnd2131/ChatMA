const { Client, Account, Databases } = Appwrite;

const client = new Client()
    .setProject('678a713b001b4ce3aca3'); // Replace with your project ID

const account = new Account(client);
const databases = new Databases(client);

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        // Check if user exists
        const user = await account.get(username);
        if (user) {
            // User exists, attempt to create session
            const response = await account.createSession(username, password);
            console.log('Login successful:', response);
            alert('Login successful!');
        }
    } catch (error) {
        if (error.code === 404) {
            // User does not exist, create user
            try {
                const newUser = await account.create(username, password);
                console.log('User created:', newUser);
                alert('User created successfully!');

                // Save user data to database
                const databaseId = '678a7d860018fb7ad72d'; // Replace with your database ID
                const collectionId = '678a7db4000cd42b6a86'; // Replace with your collection ID
                const documentId = 'unique()'; // Use unique ID or specify your own
                const data = {
                    username: username,
                    password: password
                };

                const document = await databases.createDocument(databaseId, collectionId, documentId, data);
                console.log('Document created:', document);
            } catch (createError) {
                console.error('User creation failed:', createError);
                alert('User creation failed. Please try again.');
            }
        } else {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    }
});