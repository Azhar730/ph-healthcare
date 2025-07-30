import { UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { JWTHelpers } from "../../../helpars/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorresctPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorresctPassword) {
    throw new Error("Incorrect password");
  }
  const accessToken = JWTHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.access_secret as Secret,
    config.jwt.access_expires_in as string
  );
  const refreshToken = JWTHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghijk",
    "30d"
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = JWTHelpers.verifyToken(token, "abcdefghijk");
  } catch (err) {
    throw new Error("You are not authorized !");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });
  const accessToken = JWTHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    "5m"
  );
  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange
  }
};

export const AuthServices = {
    loginUser,
    refreshToken
}