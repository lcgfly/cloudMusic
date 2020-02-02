import axios from "axios";
import {banner} from "./config";

export default{  
    /**
     * 发现页轮播图
     */
    getBanner(){
        return axios.get(banner)
    }
}