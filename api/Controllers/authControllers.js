const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../database/Models/User");

// Register User into the app endpoint logic
const signUpUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return next({
        message: "All field are required",
        extraDetails: "Empty field detected",
      });
    }
    if (firstName.length < 3 || lastName.length < 3) {
      return next({
        message: "Minimum length of name must be of 3 characters",
        extraDetails: "Validation error",
      });
    }
    if (
      !email.match(
        /^[a-zA-Z][a-zA-Z\d]+(?:\W[a-zA-Z\d]+)*\@[a-zA-Z0-9]+\.[A-Za-z]{2,}/
      )
    ) {
      return next({
        message: "Invalid Email",
        extraDetails: "Validation error",
      });
    }

    if (!password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}$/)) {
      return next({
        message:
          "password must be of minumum 8 characters,one unique character,one uppercase letter",
        extraDetails: "Validation error",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return next({
        message: "User with this email already existed",
        extraDetails: "create new email",
      });
    }

    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      picturePath,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    if (!createdUser) {
      return next({ message: "Failed to register" });
    }

    return res
      .status(201)
      .json({ message: "User Created Successfully"});
  } catch (error) {
    next(error);
  }
};

// login user api logic

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        message: "Email or password field cannot be blank",
        extraDetails: "Blank form data",
      });
    }

    const validateUser = await User.findOne({ email: email });
    if (!validateUser) {
      return next({
        message: "User with this email does not exist",
        extraDetails: "Invalid Credentials",
      });
    } else {
      const hashPassword = validateUser.password;

      const validatePassword = await bcrypt.compare(password, hashPassword);

      if (!validatePassword) {
        return next({
          message: "please enter correct password",
          extraDetails: "Invalid Credentials",
        });
      }

      const { password: pass, ...rest } = validateUser._doc;

      const token = jwt.sign({id:validateUser._id,email:validateUser.email},process.env.PRIVATEKEY);
      

      return res.cookie('token',token).status(200).json(rest);
      }
  } catch (error) {
    next(error);
  }
};

const signOutUser = async (req,res,next) =>{
  try {
    
    const {id} = req.user;

    const {userId} = req.params;

    if(id!==userId){
      return next({status:401, message:"Unauthorized", extraDetails:"Unable to logout"})
    }


    return res.status(200).clearCookie("token").json({message:"Signout Sucessful"});
  } catch (error) {
     next(error)
  }
}
module.exports = { signUpUser, loginUser , signOutUser};
