import { prisma } from "../../../../generated/prisma-client"
export default {
    Query: {
        userById: async (_, args, {prisma}) => {
            const { id } = args;
            return await prisma.user({ id: id })
        }
    }
};