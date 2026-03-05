function redirectUrl(originalPath)
{
    if(!originalPath)
        return '/listings';
    originalPath = originalPath.split("?")[0];
    const removeKeywords = new Set(["reviews", "delete", "update"]);
    const parts = originalPath.split("/");
    for (let i = 0; i < parts.length; i++) {
        if (removeKeywords.has(parts[i])) {
            return "/" + parts.slice(1, i).join("/");
        }
    }
    return originalPath;
}
module.exports=redirectUrl;