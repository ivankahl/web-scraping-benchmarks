describe("Web Scraping", () => {
  it("Get Reddit Programming Frontpage", async () => {
    const results = cy.visit("https://old.reddit.com/r/programming/");

    const titleElements = results.get("p.title");

    const titles = [];
    await titleElements.each((titleElement) => {
      titles.push(titleElement.text());
    });
  });
});
