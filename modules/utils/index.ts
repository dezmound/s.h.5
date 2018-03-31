export default class Utils {
    public static contentsBetween(text: string, symbols: string): string[] {
        let data = text;
        const result: Set<string> = new Set();
        const [left, right] = symbols.split("|");
        let beginIndex = data.indexOf(left);
        let endIndex = data.indexOf(right);
        while (beginIndex >= 0 && endIndex >= 0) {
            result.add(data.substr(beginIndex + left.length, endIndex - beginIndex - left.length));
            data = data.substr(endIndex + right.length);
            beginIndex = data.indexOf(left);
            endIndex = data.indexOf(right);
        }
        return Array.from(result);
    }
    public static sameObjects(a: any, b: any): boolean {
        let result = true;
        const [aEntries, bEntries] = [Object.entries(a), Object.entries(b)];
        if (aEntries.length !== bEntries.length) {
            return false;
        }
        aEntries.some(([key, value]) => {
            if (!b.hasOwnProperty(key)) {
                return !(result = false);
            } else if (!Object.is(value, b[key])) {
                return !(result = false);
            } else if (value instanceof Object && b[key] instanceof Object) {
                if (!Utils.sameObjects(value, b[key])) {
                    return !(result = false);
                }
            }
        });
        return result;
    }
    public static includes(
        haystack: any[],
        needle: any,
        comparator: (a: any, b: any) => boolean = Object.is,
    ): boolean {
        return haystack.filter((item) => {
            return comparator(item, needle);
        }).length > 0;
    }
    public static getValue(options: {
        obj: any,
        path: string|object,
        delimiter?: string,
        saveStruct?: boolean,
    }): any {
        options = Object.assign({
            delimiter: ".",
            saveStruct: true,
        }, options);
        const {obj, delimiter, saveStruct} = options;
        let {path} = options;
        let value: any = obj;
        const result: any = {};
        if (path instanceof Object) {
            path = Utils.getObjectSchema(path).pop();
        }
        path.split(delimiter).forEach((key) => {
            value = value[key];
            if (value instanceof Object) {
                result[key] = {};
            }
            result[key] = value;
        });
        return saveStruct ? result : value;
    }
    public static getObjectSchema(obj: any, delimiter: string = "."): string[] {
        return Object.keys(obj)
                    .map<string>((key) => {
                        if (
                            obj[key] instanceof Object
                            && !(obj[key] instanceof Array)
                        ) {
                            return [key, ...Utils.getObjectSchema(obj[key])].join(delimiter);
                        }
                        return key;
                    });
    }
    public static intersection(...args: any[]): any {
        const schemaFull: Array<{ schema: string[]; obj: any; }> = [];
        const intersictionedSchema: string[] = Utils.getIntersectionedSchema(args, schemaFull);
        return Object.assign(
            {},
            ...intersictionedSchema.map((path) => {
                return schemaFull.filter((schema) => {
                    return schema.schema.includes(path);
                }).map((schema) => {
                    return Utils.getValue({
                        obj: schema.obj,
                        path,
                    });
                });
            }).reduce((prevObjects, currObjects) => {
                if (prevObjects instanceof Object && currObjects instanceof Object) {
                    return [prevObjects, currObjects];
                }
                return prevObjects.concat(currObjects);
            }),
        );
    }
    private static getIntersectionedSchema(objects: any[], schemaFull?: any[]): string[] {
        let objectsPaths: any[] = [];
        objects.forEach((obj) => {
            const objectSchema = Utils.getObjectSchema(obj);
            schemaFull.push({schema: objectSchema, obj});
            objectsPaths = objectsPaths.length === 0 ?
                            objectSchema :
                            objectsPaths.filter((path) => {
                                return objectSchema.includes(path);
                            });
        });
        return objectsPaths;
    }

}
