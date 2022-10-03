import { MongoClient } from 'mongodb';


export async function connectToDatabase() {
  const url = 'mongodb+srv://korisnik:xCtzqePIyRXJ9rn8@cluster0.2uwmvmr.mongodb.net/?retryWrites=true&w=majority';
  const client = await new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return client;
};
