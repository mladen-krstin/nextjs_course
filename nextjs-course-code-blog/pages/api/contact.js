

function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.include('@') ||
      !name || name.trim() === '' ||
      !message ||
      !message.trim() === ''
    ) {
      res.status(422).json({ 'Invalid input.'});
      return;
    }
    // Store it in a database

    const newMessage = {
      email,
      name,
      message
    };
    console.log(newMessage);
  }
}

export default handler;