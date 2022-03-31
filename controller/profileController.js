const Klaviyo = require("../utils/klaviyo");


const addSubscriber = async (req, res) => {
  const body = req.body;
  const {
    listId
  } = req.query

  try {
    let subscriber = await Klaviyo.lists.addSubscribersToList({
      listId,
      profiles: [
        body
      ]
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  } finally {
    res.status(200).json({
      data: body
    })
  }


}


module.exports = {
  addSubscriber
}