import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res
      .status(422)
      .json({
        message:
          'Invalid input - password should be at least 8 characters long.'
      });
    return;
  }


  const client = await connectToDatabase();

  const existingUser = await client.db().collection("users").findOne({ email: email });
  console.log(existingUser, email);

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  client.connect((err) => {
    const collection = client.db("auth-demo").collection("users");
    collection
      .insertOne({ email: email, password: hashedPassword })
      .then((result) => {
        console.log("New user is added", result);
      });
  });

  res.status(201).json({ message: 'Created user!' });

};

export default handler;