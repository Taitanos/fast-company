import _ from "lodash"
import {UserType} from "../api/fake.api/user.api";

export function paginate (items: UserType[], pageNumber: number, pageSize: number) {
    const startIndex = (pageNumber-1)*pageSize
    return _(items).slice(startIndex).take(pageSize).value()
}