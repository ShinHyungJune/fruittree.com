import axios from "axios";
import axiosInstance from "@/lib/util/axiosInstance";

const prototypesApi = {
    // 목록
    index(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/admin/prototypes", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 상세
    show(id, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.get("/api/admin/prototypes/" + id)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },
    
    // 저장
    store(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.post("/api/admin/prototypes", params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 수정
    update(id, params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.patch("/api/admin/prototypes/" + id, params)
            .then((response) => onSuccess(response))
            .catch(error => onFail(error));
    },

    // 삭제
    destroy(params = {}, onSuccess = () => {}, onFail = () => {}) {
        return axiosInstance.delete("/api/admin/prototypes", {
            params: params
        }).then((response) => onSuccess(response))
            .catch(error => onFail(error));
    }
}
export default prototypesApi;