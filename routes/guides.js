const router = express.Router();

// /guides?email=phaniraj
router.get("/guides", async (req, res) => {
    try {
        if (typeof req.body === "undefined" || !req.body.hasOwnProperty("email")) {
            res.status(400).send("Missing 'email' in request body");
        }
        const userEmail = req.body.email;
        const docRef = db.collection('users').doc(userEmail);
        const userSnapshot = await docRef.get();
        if (!userSnapshot.exists) {
            res.status(404).send(missingDataError('email'));
        }
        const user = userSnapshot.data();
        res.status(200).json(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;