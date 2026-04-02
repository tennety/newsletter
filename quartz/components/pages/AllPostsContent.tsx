import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import { resolveRelative } from "../../util/path"
import { QuartzPluginData } from "../../plugins/vfile"
import { Date as DateComponent, getDate } from "../Date"
import style from "../styles/listPage.scss"

const AllPostsContent: QuartzComponent = ({ allFiles, fileData, cfg }: QuartzComponentProps) => {
  const posts = allFiles
    .filter((f) => {
      const slug = f.slug ?? ""
      return (
        f.dates !== undefined &&
        !f.frontmatter?.tags?.includes("meta") &&
        slug !== "index" &&
        slug !== "archive" &&
        !slug.endsWith("/index")
      )
    })
    .sort((a, b) => {
      const dateA = getDate(cfg, a)
      const dateB = getDate(cfg, b)
      if (!dateA && !dateB) return 0
      if (!dateA) return 1
      if (!dateB) return -1
      return dateB.getTime() - dateA.getTime()
    })

  const byYear = new Map<number, QuartzPluginData[]>()
  for (const post of posts) {
    const date = getDate(cfg, post)
    if (!date) continue
    const year = date.getFullYear()
    if (!byYear.has(year)) byYear.set(year, [])
    byYear.get(year)!.push(post)
  }

  const years = [...byYear.keys()].sort((a, b) => b - a)

  return (
    <div class="archive-content">
      {years.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        years.map((year) => (
          <div>
            <h2 class="archive-year">{year}</h2>
            <ul class="section-ul">
              {byYear.get(year)!.map((page) => {
                const title = page.frontmatter?.title ?? page.slug
                const date = getDate(cfg, page)
                return (
                  <li class="section-li">
                    <div class="section">
                      <p class="meta">
                        {date && <DateComponent date={date} locale={cfg.locale} />}
                      </p>
                      <div class="desc">
                        <h3>
                          <a
                            href={resolveRelative(fileData.slug!, page.slug!)}
                            class="internal"
                          >
                            {title}
                          </a>
                        </h3>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

AllPostsContent.css = style

export default (() => AllPostsContent) satisfies QuartzComponentConstructor
