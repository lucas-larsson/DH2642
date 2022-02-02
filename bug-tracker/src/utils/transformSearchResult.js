const transformSearchResult = searchResult => {
  return searchResult.map(item => ({
    id: item.id,
    html_url: item.html_url,
    title: item.name,
    description: item.description,
    created_at: item.created_at,
    ssh_url: item.ssh_url,
    image: item.owner.avatar_url,
    fork: item.fork,
    forks: item.forks,
    contributors: item.contributors_url,
    language: item.language,
    issue: item.has_issues,
    issue_count: item.open_issues,
  }));
};

export default transformSearchResult;
