function setupPageActions() {
  const actionBar = document.querySelector(".page-actions") as HTMLElement | null
  const copyButton = actionBar?.querySelector(".copy-page") as HTMLButtonElement | null
  const article = document.querySelector("article") as HTMLElement | null
  if (!actionBar || !copyButton || !article) return

  const label = copyButton.querySelector(".copy-page-label")
  let resetTimer: number | undefined

  const copyPage = async () => {
    const title = actionBar.dataset.pageTitle ?? document.title
    const pageText = `# ${title}\n\n${article.innerText.trim()}`

    try {
      await navigator.clipboard.writeText(pageText)
      copyButton.classList.add("copied")
      if (label) label.textContent = "Copied"
      window.clearTimeout(resetTimer)
      resetTimer = window.setTimeout(() => {
        copyButton.classList.remove("copied")
        if (label) label.textContent = "Copy page"
      }, 1800)
    } catch {
      if (label) label.textContent = "Copy failed"
    }
  }

  copyButton.addEventListener("click", copyPage)
  window.addCleanup(() => {
    copyButton.removeEventListener("click", copyPage)
    window.clearTimeout(resetTimer)
  })
}

function setupSearchProxy() {
  const proxy = document.querySelector(".search-proxy") as HTMLButtonElement | null
  const searchButton = document.querySelector(".search-button") as HTMLButtonElement | null
  if (!proxy || !searchButton) return

  const openSearch = () => searchButton.click()
  proxy.addEventListener("click", openSearch)
  window.addCleanup(() => proxy.removeEventListener("click", openSearch))
}

document.addEventListener("nav", () => {
  setupPageActions()
  setupSearchProxy()
})
