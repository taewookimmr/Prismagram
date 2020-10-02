export default {
    Query: {
        allUsers: async(_, args , {prisma}) => prisma.users()
    }
};