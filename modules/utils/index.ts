export default class Utils {
    public static getValue(obj: any, path: string, delimiter: string = "."): any {
        let value: any = obj;
        const result: any = {};
        path.split(delimiter).forEach((key) => {
            value = value[key];
            if (value instanceof Object) {
                result[key] = {};
            }
            result[key] = value;
        });
        return result;
    }
    public static getObjectSchema(obj: any, delimiter: string = "."): string[] {
        return Object.keys(obj)
                    .map<string>((key) => {
                        if (obj[key] instanceof Object) {
                            return [key, ...Utils.getObjectSchema(obj)].join(delimiter);
                        }
                        return key;
                    });
    }
    public static intersection(...args: any[]): any {
        const schemaFull: Array<{ schema: string[]; obj: any; }> = [];
        const intersictionedSchema: string[] = Array.from(new Set(args.map((obj) => {
            const objectSchema = Utils.getObjectSchema(obj);
            schemaFull.push({schema: objectSchema, obj});
            return objectSchema;
        }).reduce((prevSchema, nextSchema) => {
            return prevSchema.concat(nextSchema);
        }, [])));
        return Object.assign(
            {},
            ...intersictionedSchema.map((path) => {
                return schemaFull.filter((schema) => {
                    return schema.schema.includes(path);
                }).map((schema) => {
                    return Utils.getObjectSchema(schema.obj, path);
                });
            }),
        );
    }
}
