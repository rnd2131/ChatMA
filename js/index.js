const { Client, Account } = Appwrite;

const client = new Client() 
    .setProject('678a713b001b4ce3aca3'); // Replace with your project ID

const account = new Account(client);

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