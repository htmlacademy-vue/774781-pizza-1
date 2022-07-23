import JWTService from "@/services/jwt";
import APIService from "@/services/api";

export default function (store) {
  store.$jwt = JWTService;
  store.$api = APIService;
}
