export function validator (data: any, config: any) {
    const errors: any = {}

    function validate (validateMethod: any, data: string, config: any) {
        let statusValidate = false;
        switch (validateMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g
                statusValidate = !emailRegExp.test(data)
                break
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g
                statusValidate = !capitalRegExp.test(data)
                break
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g
                statusValidate = !digitRegExp.test(data)
                break
            }
            case "min":
                statusValidate = data.length < config.data
                break
            default:
                return "Invalid validation method";
        }
        if (statusValidate) return config.message
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName] [validateMethod]
            )
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }
    return errors
}