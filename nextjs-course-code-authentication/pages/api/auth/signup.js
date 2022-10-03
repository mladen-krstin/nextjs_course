import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  // if (req.method === 'POST') {
  //   return;
  // }

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

  // const db = client.db('auth-demo');

  const hashedPassword = hashPassword(password);

  client.connect((err) => {
    const collection = client.db("auth-demo").collection("users");
    collection
      .insertOne({ email: email, password: hashedPassword })
      .then((result) => {
        console.log("One user added", result);
      });
  });

  // const result = await db.collection('users').insertOne({
  //   email: email,
  //   password: hashedPassword
  // });
  
  res.status(201).json({ message: 'Created user!' });

};

export default handler;