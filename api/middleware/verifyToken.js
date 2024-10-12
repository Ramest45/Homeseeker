import JWT from "jsonwebtoken";
//import userModel from "../models/userModel.js";

//Protected Routes token base

export const verifyToken = async (req, res, next) => {
  try {
    // const token = JWT.verify(
    //   req.headers.authorization,
    //   process.env.JWT_SECRET
    // );

    const token = req.cookies.token;
    
    if (!token) return res.status(401).json({ message: "Not Authenticated!  Token missing" });
    
     JWT.verify(token , process.env.JWT_SECRET, async(err, payload)=>{
        if(err){
            return res.status(403).json({message : "Token is not valid"});
        }

        if(!payload){
          console.log("payload nhi aya");
          return res.status(403).json({ message: "Token verification failed" });
        }

        // Debugging: Log payload to see if `id` exists
      console.log("Token Payload:", payload);
       
        req.userId = payload.id;
        // console.log(payload.id);
        next();
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error during token verification" });
  }
};

