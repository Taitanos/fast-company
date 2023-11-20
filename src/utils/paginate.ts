import _ from "lodash"
import {UsersType} from "../api/fake.api/user.api";

export function paginate (items: UsersType[], pageNumber: number, pageSize: number) {
    const startIndex = (pageNumber-1)*pageSize
    return _(items).slice(startIndex).take(pageSize).value()
}