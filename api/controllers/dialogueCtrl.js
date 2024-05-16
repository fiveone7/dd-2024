const { getDialoguesCollection } = require("../helpers/db-conn");
const fs = require('fs');
const DialogueCtrl = () => {
    const getCategoryList = async () => {
        try {
            const category = JSON.parse(fs.readFileSync('assets/questions.json', 'utf8'));
            // console.log(category)
            if (category) {
                return { success: true, message: "Success!", data: category['category_questions'] };
            } else {
                return { success: false, message: "Question Category data doesn't exist" };
            }
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    const getFeelingCategoryList = async () => {
        try {
            const category = JSON.parse(fs.readFileSync('assets/feelings.json', 'utf8'));
            // console.log(category)
            if (category) {
                return { success: true, message: "Success!", data: category['category_feelings'] };
            } else {
                return { success: false, message: "Feeling Category data doesn't exist" };
            }
        } catch (e) {
            return { success: false, message: e.message };
        }
    }

    return {
        getCategoryList,
        getFeelingCategoryList
    }
}

module.exports = DialogueCtrl();