const express = require("express");
const router = express.Router();
const SessionModal = require("../modals/session.js")

router.get("/all", async (req, res) => {
  res.json("all data");
});

// add new sessions
router.post("/create", async (req, res) => {
try {
    const { userId, sessionId, visitId, page, goals, actions, } =
    req.body;
  const data = { 
    userId, 
    sessionId, 
    visitId, 
    page, 
    goals, 
    actions, 
    timestamp:Date.now(),
 };
 console.log(data)
 const sessionData = new SessionModal(data);
 sessionData.timestamp = Date.now();
  await sessionData.save()
res.json("got all data")   

} catch (error) {
    console.log(error)
    res.status(400).json("error")
}
});

// for update goal
router.post('/updateGoal',async(req,res)=>{
    const { sessionId , goals} = req.body;
    if(!sessionId && !goals.goal){
       return res.status(400).json("please add data")
    }
    try{
        await SessionModal.updateOne({sessionId},
        {
            $push:{
                goals:{
                    ...goals,
                    timestamp:Date.now()
                }
            }
        })

        res.status(200).json({
            message: 'Goal updated successfully',
          });

    }catch(err){
        console.log(err);
    }
})

// for action update
router.post('/updateAction',async(req,res)=>{
    const {sessionId,actions}=req.body;
    if(!sessionId && !actions.action){
        return res.status(400).json('please add data')
    }
    try {
        await SessionModal.updateOne({sessionId},{
            $push:{
                actions:{
                    ...actions,
                    timestamp:Date.now()
                }
            }
        })

        res.status(200).json({
            message:"Action updated successfully"
        })

    } catch (error) {
        console.log(error)
    }
})



module.exports = router;
