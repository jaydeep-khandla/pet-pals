const userServices = require("../src/services/userServices");

(async () => {
    try {
        const email = process.argv[2];
        
        const filter = { email };
        const update = { userType: "admin" };

        await userServices.updateUserByField(filter,update);

        console.log(`User with email ${email} updated to admin.`);
    } catch (error) {
        console.error(error);
    }
})();