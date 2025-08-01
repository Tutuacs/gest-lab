import { ROLE } from "@/common/role.enums";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    profile: {
      id: string;
      email: string;
      role: ROLE;
      name: string;
      locationId: number | null;
      periodicity: number;
    };

    tokens: {
      profile: {
        id: string;
        email: string;
        role: ROLE;
        name: string;
        locationId: number | null;
        periodicity: number;
      };
      access: string;
      refresh: string;
      expiresIn: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    profile: {
      id: string;
      email: string;
      role: ROLE;
      name: string;
      locationId: number | null;
      periodicity: number;
    };

    tokens: {
      profile: {
        id: string;
        email: string;
        role: ROLE;
        name: string;
        locationId: number | null;
        periodicity: number;
      };
      access: string;
      refresh: string;
      expiresIn: number;
    };
  }
}
