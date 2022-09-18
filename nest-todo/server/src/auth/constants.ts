import { SetMetadata } from "@nestjs/common"


export const jwtContants = {
  secret: 'secretKey', //密钥
  expiresIn: 10,//三分钟有效期
}

export const IS_PUBLIC_KEY = 'isPublic'
export const skipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true)