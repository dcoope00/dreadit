
import {Redis} from "@upstash/redis"

//helper to setup redis for caching

export const redis = new Redis({
    //! tells typescript that it does exist 
    url: process.env.REDIS_URL!,
    token: process.env.REDIS_SECRET!
})