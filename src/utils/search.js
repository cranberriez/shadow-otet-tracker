export function matchesSearchQuery(item, searchQuery) {
    const lowerQuery = searchQuery.toLowerCase()
    const lowerItem = item.name.toLowerCase()

    return lowerItem.includes(lowerQuery);
}