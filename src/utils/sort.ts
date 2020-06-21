export const sortByProperty = <T>(array: T[], key, ascending = true) =>
  array.sort((a, b) => {
    if (a[key] < b[key]) {
      return ascending ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return ascending ? 1 : -1;
    }

    return 0;
  });
