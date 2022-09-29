import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name || name.trim() === '' ||
      !message ||
      !message.trim() === ''
    ) {
      res
        .status(422)
        .json({ message: 'Invalid input.' });
      return;
    }
    // Store it in a database

    const newMessage = {
      email,
      name,
      message
    };

    let client;

    try {
      const uri = 'mongodb+srv://korisnik:44M6pMVM5ltFNSLr@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
      client = await new MongoClient(uri);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' })
      return;
    }

    async function run() {
      try {
        const database = client.db('my-site');
        const messages = await database.collection('messages').insertOne(newMessage);
        newMessage.id = messages.insertedId;

        // const query = { title: 'Back to the Future' };
        // const message = await messages.findOne(query);
        console.log(message);
      } catch (error) {
        client.close();
        res.status(500).json({ message: 'Storing message failed!' });
        return;
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
}

export default handler;