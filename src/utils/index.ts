function searchFormatter(search: string): string {
  const searchArr = search
    .split(" ")
    .map(
      (searchItem) =>
        searchItem.slice(0, 1).toUpperCase() + searchItem.slice(1).toLowerCase()
    );
  return searchArr.join(" ");
}

export { searchFormatter };
