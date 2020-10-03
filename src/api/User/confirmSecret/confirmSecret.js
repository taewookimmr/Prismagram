import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        const token = generateToken(user.id);
        // 일단 confirm이 완료되고 나면 loginSecret을 지운다.
        await prisma.updateUser({
          where: { id: user.id },
          data: { loginSecret: "" },
        });
        return token;
      } else {
        throw Error("Wrong email/secret combination");
      }
    },
  },
};
