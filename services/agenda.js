
const agenda = new _agenda({
    db: {
        address: process.env.TEST_URI,
        collection: "agenda",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
});

agenda.define("air", async () => {
    try {

    } catch (error) {
        console.log(error);
    }
});

agenda.define("ship", async () => {
    try {

    } catch (error) {
        console.log(error);
    }
});

(async function () {
    await agenda.start();
    await agenda.every("0 0   *", "ship");
    await agenda.every("0    ", "air");
})();

module.exports = {
    agenda
};
