import { auth } from "../../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { accessToken } = req.body;

        try {
            //    auth.

            res
                .status(200)
                .json({ message: "User logged in successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
