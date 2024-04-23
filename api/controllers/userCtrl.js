const { getUserCollection } = require('../helpers/db-conn');
const { checkExist } = require("./authCtrl");

const UserCtrl = ()=> {
    const updateContact = async (contact)=> {
        const collection = getUserCollection();
        if (validateInfo(contact)){
            const user = checkExist(contact['myEmail']);
            if (user) {
                await collection.updateOne({
                    email: contact['myEmail']
                }, {
                    $set: {
                        contact: contact
                    }
                })
                return {"success": true, "message": "Updated successfully"};
            } else {
                return {"success": false, "message": "Provided email is not correct."}
            }
        } else {
            return {"success": false, "message": "Invalid information"}
        }
    }

    const getContact = async (email) => {
        const user = checkExist(email);
        return {"success": true, "message": "Get contact information", data: user};
    }

    const validateInfo = (value)=> {
		if (!value) {
			return false;
		} else {
			const keys = Object.keys(value);
			for(let i = 0; i < keys.length; i++) {
				if (!value[keys[i]] || value[keys[i]] === '')
				{
					return false;					
				}
			}
			return true;
		}
	}

    return {
        updateContact, getContact
    }
}

module.exports = UserCtrl();