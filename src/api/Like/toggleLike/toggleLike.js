import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";
export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      try {
        const filterOptions = {
          AND: [{ user: { id: user.id } }, { post: { id: postId } }],
        };
        const existingLike = await prisma.$exists.like(filterOptions);

        if (existingLike) {
          // delete like
          console.log("when exisiting like");
          await prisma.deleteManyLikes(filterOptions);
        } else {
          console.log("when like doesn't exist");
          // make like
          const newLike = await prisma.createLike({
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
          });
        }
        return true;
      } catch (error) {
        console.log(`here catch : ${error}`);
        return false;
      }
    },
  },
};
