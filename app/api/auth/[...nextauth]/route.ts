/**
 * @deprecated This file is maintained for backward compatibility. 
 * Please use the modular version at app/modules/auth/api/[...nextauth]/route.ts instead.
 */

import NextAuth from "next-auth"
import { authOptions } from "@/app/modules/auth/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 