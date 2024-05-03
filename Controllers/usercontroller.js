const Usertable = require("../Models/user")

const  user_creation = async(req,res) => {
   try {
      const { email } = req.body; 
      const createuser = new Usertable({email})
      const response = await createuser.save();
      res.send({ status: "Sucessfull" , data: response});
   } catch(error) {
    if( error.code === 11000 && error.keyPattern.email) {
        return res.json({ status: "failed",errors: { email: `Email already exists` } })
    }
    else {
        console.error('failed to create user', error); 
        res.status(500).json({ status: 'failed', error: ["Internal server error"]})
    }
   }
}

const userlist = async (req, res) => { 
    try{
      const users = await Usertable.find().sort({ createdAt: -1 });
        res.send({status:"successfully 123",data:users})
    
    }catch(err){
        console.log(`  here is errror ${err}`);
        res.send({status:"faild",errors:err.errors})
    
    }
    
    
    }

    const usersingle = async (req, res) => { 
      const userId = req.params.id;
      try {
        const userdetail = await user.findById(userId);
        if (!userdetail) {
          return res.status(404).send({ error: 'user detail not found' });
        }
    
        res.status(200).send({status:"successfully",data:userdetail});
      } catch (err) {
        res.status(500).send({ error: 'An error occurred while fetching userdetail ',servererror:err });
      }
  }

const updateuser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await Usertable.findByIdAndUpdate(userId, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    res.json({ status: "successfully update", data: updatedUser });
  } catch (err) {
    console.error(`Error: ${err}`);
    res.status(500).json({ status: "failed", errors: err.message });
  }
};


const deleteuser = async (req,res) => {
  try {
    const user = await Usertable.findByIdAndDelete(req.params.id)
    res.send({
        status: "sucessfuly delete", 
        data: user 
    });
} catch (err) {
   res
   .status(500)
   .send({ error: "An error occureed while delete"})
  }
};


module.exports = {
    deleteuser,
    updateuser,
    user_creation,
    userlist,
    usersingle
  }