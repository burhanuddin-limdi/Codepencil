import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: any = userCredential.user;

      res
        .status(200)
        .json({ message: "User logged in successfully", user: user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
