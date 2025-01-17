const client = new Client();
client
  .setEndpoint('https://[YOUR_APPWRITE_ENDPOINT]') // Replace with your Appwrite endpoint
  .setProject('[YOUR_PROJECT_ID]'); // Replace with your project ID

// Create an instance of the Account service
const account = new Account(client);

// Function to handle the form submission
document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get input values
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  try {
    // Log in the user
    const response = await account.createSession(username, password);
    console.log('Login successful:', response);
    alert('Login successful!');
    // Redirect or perform further actions
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials and try again.');
  }
});
