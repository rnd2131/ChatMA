        // Initialize Appwrite Client
        const client = new Appwrite.Client();
        client
            .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
            .setProject('678a713b001b4ce3aca3'); // Replace with your Project ID

        // Initialize Appwrite Services
        const account = new Appwrite.Account(client);
        const databases = new Appwrite.Databases(client);

        // Database and Collection IDs
        const databaseId = '678a7d860018fb7ad72d'; // Replace with your database ID
        const collectionId = '678a7db4000cd42b6a86'; // Replace with your collection ID

        // Form submit event listener
        document.getElementById('registerForm').addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                // 1. Create a user in Appwrite's Users API
                const user = await account.create(
                    'unique()', // Unique user ID
                    username,   // Email
                    password    // Password
                );
                console.log('User registered successfully:', user);

                // 2. Save the user data in the database collection
                const document = await databases.createDocument(
                    databaseId,
                    collectionId,
                    'unique()', // Unique document ID
                    {
                        username: username,
                        userId: user.$id, // Reference to Appwrite user
                    }
                );
                console.log('User data saved in database:', document);

                alert('User registered successfully!');
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred: ' + error.message);
            }
        });