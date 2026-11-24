export const getAvatarUrl = (email) => {
  const seed = email?.trim() || "guest";
  return `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(seed)}`;
};
