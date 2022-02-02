export const getTitle = title => {
  if (!title || title?.length === 0) return '(No title for this board)';
  else if (title.length > 30) {
    return `${title.slice(0, 26)} ...`;
  } else return title;
};
export const getDescription = description => {
  if (!description || description?.length === 0) return '(No description for this ticket)';
  else if (description.length > 100) {
    return `${description.slice(0, 96)} ...`;
  } else return description;
};
export const getName = name => {
  if (!name || name?.length === 0) return 'Couldn´t find a name, Sorry 😅 🤷‍♂️ ';
  else if (name.length > 30) {
    return `${name.slice(0, 26)} ...`;
  } else return name;
};
export const getUsers = users => {
  if (!users || Array.isArray(users)) return;
  return Object.values(users).map((e, key) => {
    const name = e?.email.substring(0, e?.email.indexOf('@'));
    if (e.email && name) return { key: key, text: name, value: e.email };
  });
};
export default {
  getTitle,
  getDescription,
  getName,
};
