import { auth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
