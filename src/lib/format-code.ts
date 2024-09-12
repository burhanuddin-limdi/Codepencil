export const formatCode = (code: string) => {
    return code.slice(1, -1)
        .replace(/\\n/g, " ")
        .replace(/\\/g, "")
        .trim();
}