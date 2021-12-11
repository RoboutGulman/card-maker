type Value = string|number|null|undefined|boolean;

function withMods(className: string, mods: {[key: string]: Value}) {
    return [
        className,
        ...Object.keys(mods).map(key => createModifier(className, key, mods[key]))
    ].join(' ')
}

function createModifier(className: string, key: string, value: Value) {
    return typeof value == 'boolean' || value === undefined || value == null
        ? value ? `${className}_${key}` : ''
        : `${className}_${key}_${value}`
}

export {
    withMods,
}