const router = express.Router();

// /search?title=
router.get("/search", async (req, res) => {
    try {
        if (typeof req.body === "undefined" || !req.body.hasOwnProperty("keyword")) {
            res.status(400).send("Missing 'keyword' in request body");
        }
        const keyword = req.body.keyword;
        const docRef = db.collection('guides');
        const guidesDocs = await docRef.get();
        let guides = [];
        guidesDocs.forEach(guide => {
            if (guide.title.includes(keyword)) {
                guides.push(guide);
            }
        });
        if (guides.length === 0) {
            res.status(400).send(`No guides found with keyword ${keyword}`);
        } else {
            res.status(200).json(guides);
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;