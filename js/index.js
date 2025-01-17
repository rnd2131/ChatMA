const { Client, Account } = Appwrite;

const client = new Client() 
    .setProject('678a713b001b4ce3aca3'); // Replace with your project ID

const account = new Account(client);

document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    try {
        const response = await account.createSession(username, password);
        console.log('Login successful:', response);
        alert('Login successful!');
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
    }
});
