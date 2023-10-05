import _ from "lodash"
import {UserType} from "../components/Users";

export function paginate (items: UserType[], pageNumber: number, pageSize: number) {
    const startIndex = (pageNumber-1)*pageSize
    return _(items).slice(startIndex).take(pageSize).value()
}