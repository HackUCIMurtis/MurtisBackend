const router = express.Router();

// /createLink?title={}&creator={}&links={}&tags={}
router.post("/createLink", async (req, res) => {
    try {
        if (typeof req.body === "undefined") {
            res.status(400).send("Missing guide information in request body");
        }
        let bodyData = ["title", "creator", "links", "tags"];
        let invReq = bodyData.some(str => {
            return !req.body.hasOwnAttribute(str);
        });
        if (invReq) {
            res.status(400).send("Missing guide fields");
        }
        const groupsDoc = db.collection('guides');
        const doc = await groupsDoc
            .add(req.body)
            .then(guide => {
                console.log("Successfully created guide.");
                return guide;
            })
            .catch(err => {
                console.log(err);
            })
        res.status(200).send({id: doc.id});
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;