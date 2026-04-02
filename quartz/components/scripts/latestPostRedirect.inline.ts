document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  if (e.detail.url !== "index") return

  const data = await fetchData
  const entries = Object.entries(data).filter(([slug, d]) => {
    return (
      slug !== "index" &&
      !slug.endsWith("/index") &&
      !(d.tags ?? []).includes("meta") &&
      d.date !== undefined
    )
  })

  if (entries.length === 0) return

  entries.sort(([, a], [, b]) => {
    const tA = a.date ? new Date(a.date as any).getTime() : 0
    const tB = b.date ? new Date(b.date as any).getTime() : 0
    return tB - tA
  })

  window.spaNavigate(new URL("/" + entries[0][0], window.location.href), false)
})
