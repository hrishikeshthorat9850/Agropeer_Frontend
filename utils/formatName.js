
function toTitleCase(str = "") {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const formatName = (u) => {
  // Handle null/undefined/empty object
  if (!u || typeof u !== 'object') {
    return "Unknown User";
  }

  // First priority: firstName + lastName (check for non-empty strings)
  const firstName = u?.firstName?.trim();
  const lastName = u?.lastName?.trim();
  if (firstName && lastName) {
    return `${toTitleCase(firstName)} ${toTitleCase(lastName)}`;
  }
  
  // Second priority: display_name from userinfo table (check for non-empty string)
  const displayName = u?.display_name?.trim();
  if (displayName) {
    return displayName;
  }
  
  // Last fallback: id or "Unknown User"
  return u?.id?.slice(0, 8) || "Unknown User";
}
