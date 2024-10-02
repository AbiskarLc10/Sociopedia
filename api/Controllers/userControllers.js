const User = require("../database/Models/User");

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { id } = req.user;

    if (id !== userId) {
      return next({
        status: 401,
        message: "Unauthorized",
        extraDetails: "Access Denied",
      });
    }

    const userdata = await User.findById(id);

    if (!userdata) {
      return next({ status: 400, message: "User not found" });
    }

    const { password: pass, ...rest } = userdata._doc;

    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const getUserFriends = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { userId } = req.params;

    if (id !== userId) {
      return next({
        status: 401,
        message: "Unauthorized",
        extraDetails: "Access Denied",
      });
    }

    const userData = await User.findById(id);

    if (!userData) {
      return next({ status: 400, message: "User not found" });
    }
    const friends = await Promise.all(
      userData.friends.map((id) => User.findById(id))
    );
     
    console.log(friends);
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    return res.status(200).json(formattedFriends);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { id } = req.user;

    if (userId !== id) {
      return next({
        status: 401,
        message: "Unauthorized User",
        extraDetails: "Access denied",
      });
    }

    const { firstName, lastName, location, picturePath } = req.body;

    if (firstName) {
      if (!firstName.match(/^\w{3,}$/g)) {
        return next({
          status: 400,
          message: "length must be at least 3 character",
          extraDetails: "Fill details correctly",
        });
      }
    }
    if (lastName) {
      if (!lastName.match(/^\w{3,}$/g)) {
        return next({
          status: 400,
          message: "length must be at least 3 character",
          extraDetails: "Fill details correctly",
        });
      }
    }


    const userdata = await User.findByIdAndUpdate(id,req.body,{new:true});

    if(!userdata){
      return next({message:"failed to update User"});
    }

    const {password: pass,...rest} = userdata._doc;
    return res.status(200).json({message:"User Updated Successfully",rest});
  } catch (error) {
    next(error)
  }
};

const addRemoveFriends = async (req, res, next) => {
  try {
    const { userId, friendId } = req.params;
    const { id } = req.user;

    if (id !== userId) {
      return next({
        status: 401,
        message: "Unauthorized access",
        extraDetails: "Access Denied",
      });
    }

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user) {
      return next({ message: "User not found", extraDetails: "invalid id" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => {
        return id !== friendId;
      });
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    return res.status(200).json(formattedFriends);
  } catch (error) {
    console.log(error)
    next(error);
  }
};
module.exports = { getUser, getUserFriends, addRemoveFriends, updateUser };
