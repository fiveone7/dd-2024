const { getUserCollection, getDialoguesCollection } = require("../helpers/db-conn");
const fs = require('fs');
const DialogueCtrl = () => {
    const getCategoryList = async () => {
        try {
            const category = JSON.parse(fs.readFileSync('assets/category.json', 'utf8'));
            console.log(category)
            if (category) {
                return { success: true, message: "Success!", data: category['category_questions'] };
            } else {
                return { success: false, message: "Category data doesn't exist" };
            }
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    const addDialogue = async (data) => {
        try {
            const collection = getDialoguesCollection();
            const dialogue = await collection.insertOne({

            });
            if (dialogue) {
                return { success: true, message: "Add Dialogue Successfully" }
            }
            else {
                return { success: false, message: "MongDB API Error" }
            }
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    return {
        getCategoryList,
        addDialogue
    }
}

module.exports = DialogueCtrl();